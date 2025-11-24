import { GoogleGenAI, Type } from "@google/genai";
import { Activity } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const enrichActivity = async (activity: Activity, previousLocation?: string): Promise<Partial<Activity>> => {
  if (!apiKey) {
    console.warn("No API Key found for Gemini");
    return {};
  }

  // Skip simple generic activities to save quota
  if (activity.type === 'FLIGHT' || activity.title.includes('早餐') || activity.title.includes('機上')) return {};

  const prompt = `
    你是一位專業的清邁在地導遊。請分析這個旅遊行程：
    活動名稱："${activity.title}"
    地點："${activity.location || activity.title}"
    原描述："${activity.originalDescription || ''}"
    上一站地點："${previousLocation || 'Chiang Mai Old City'}"。
    
    請提供以下繁體中文資訊 (JSON格式)：
    1. aiDescription: 簡短有趣的一句話介紹，像是導遊在介紹景點故事 (繁體中文, < 30字)。
    2. mustEat: 如果是餐廳或市集，列出2個必吃美食；如果是景點，列出附近知名小吃 (繁體中文)。
    3. mustBuy: 如果是市集或商場，列出2個必買清單；否則留空 (繁體中文)。
    4. tips: 2個旅遊小撇步 (例如：最佳拍照點、穿著建議、預約代號提醒) (繁體中文)。
    5. estimatedTravelTime: 從上一站開車到這裡的預估時間 (例如 "約 20 分鐘")。
    6. coordinates: 該地點的經緯度 { lat, lng }。
  `;

  let retries = 0;
  const maxRetries = 3;

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
      return result;

    } catch (error: any) {
      const isRateLimit = error.message?.includes('429') || error.status === 'RESOURCE_EXHAUSTED' || error.code === 429;
      
      if (isRateLimit && retries < maxRetries) {
        const waitTime = 5000 * Math.pow(2, retries); // 5s, 10s, 20s
        console.warn(`Quota limit hit for "${activity.title}". Retrying in ${waitTime/1000}s...`);
        await delay(waitTime);
        retries++;
      } else {
        console.error(`Gemini enrichment failed for ${activity.title}`, error);
        return {};
      }
    }
  }
  return {};
};