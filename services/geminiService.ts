import { GoogleGenAI, Type } from "@google/genai";
import { Activity } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const CACHE_KEY_PREFIX = 'gemini_enrich_cache_v5_'; // Bump version for new schema

export class QuotaExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QuotaExceededError";
  }
}

export const enrichActivity = async (activity: Activity, previousLocation?: string): Promise<Partial<Activity>> => {
  if (!apiKey) return {};

  // Check Cache
  const cacheKey = `${CACHE_KEY_PREFIX}${activity.id}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      localStorage.removeItem(cacheKey);
    }
  }

  if (activity.type === 'FLIGHT' || activity.title.includes('早餐')) return {};

  // Prompt focusing on Must Order / Must Eat / Travel Time
  const prompt = `
    你是專業的清邁導遊。請分析行程："${activity.title}" (地點: ${activity.location || activity.title})。
    上一站是："${previousLocation || 'Chiang Mai Old City'}"。
    
    請回傳 JSON (繁體中文)：
    1. aiDescription: 景點/餐廳故事 (有趣簡短, <50字)。
    2. mustEat: 必吃美食或餐廳的「必點招牌菜單」 (例如："泰式酸辣湯", "芒果糯米飯")，若無則推薦附近小吃。
    3. mustBuy: 必買伴手禮 (若適用)。
    4. tips: 攻略 (拍照角度、穿著建議)。
    5. reservationInfo: 是否需要預約？如有預約代號或特別注意事項請註明 (例如 "建議提前一週訂位")。
    6. estimatedTravelTime: 從上一站開車到這裡的預估時間 (例如 "約 25 分鐘")。
    7. coordinates: { lat, lng }
  `;

  let retries = 0;
  const maxRetries = 1; 

  while (retries <= maxRetries) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              aiDescription: { type: Type.STRING },
              mustEat: { type: Type.ARRAY, items: { type: Type.STRING } },
              mustBuy: { type: Type.ARRAY, items: { type: Type.STRING } },
              tips: { type: Type.ARRAY, items: { type: Type.STRING } },
              reservationInfo: { type: Type.STRING },
              estimatedTravelTime: { type: Type.STRING },
              coordinates: {
                type: Type.OBJECT,
                properties: {
                  lat: { type: Type.NUMBER },
                  lng: { type: Type.NUMBER }
                }
              }
            }
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      
      if (Object.keys(result).length > 0) {
          localStorage.setItem(cacheKey, JSON.stringify(result));
      }
      return result;

    } catch (error: any) {
      const isRateLimit = error.message?.includes('429') || error.status === 'RESOURCE_EXHAUSTED' || error.code === 429;
      
      if (isRateLimit) {
        if (retries < maxRetries) {
            const waitTime = 2000 * Math.pow(2, retries); 
            await delay(waitTime);
            retries++;
        } else {
            throw new QuotaExceededError("Gemini API Quota Exceeded");
        }
      } else {
        console.error(`Gemini enrichment failed for ${activity.title}`, error);
        return {}; 
      }
    }
  }
  return {};
};