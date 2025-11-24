
import { GoogleGenAI, Type } from "@google/genai";
import { Activity } from "../types";

// DIRECT API KEY USAGE to prevent "process is not defined" crashes on some Vercel build configs
const apiKey = 'AIzaSyDSLxzewowQN4d5ZE955Veedke6_8diBNU';
const ai = new GoogleGenAI({ apiKey });

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const CACHE_KEY_PREFIX = 'gemini_v8_'; 

export class QuotaExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QuotaExceededError";
  }
}

// Safe LocalStorage Wrapper
const safeLocalStorage = {
    getItem: (key: string) => {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    },
    setItem: (key: string, value: string) => {
        try { localStorage.setItem(key, value); } catch (e) { }
    },
    removeItem: (key: string) => {
        try { localStorage.removeItem(key); } catch (e) { }
    }
};

// New Function: Generate Image using Nano Banana (Gemini 2.5 Flash Image)
const generateImage = async (prompt: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: `Create a high quality, photorealistic travel photography style image of: ${prompt}. No text overlay.` }]
            },
            config: {
                imageConfig: {
                    aspectRatio: "16:9",
                    imageSize: "1K"
                }
            }
        });

        // Extract image from response parts
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData && part.inlineData.data) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (e) {
        console.warn("Image generation failed", e);
        return null;
    }
};

export const enrichActivity = async (activity: Activity, previousLocation?: string): Promise<Partial<Activity>> => {
  if (!apiKey) return {};

  // Check Cache safely
  const cacheKey = `${CACHE_KEY_PREFIX}${activity.id}`;
  const cached = safeLocalStorage.getItem(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      safeLocalStorage.removeItem(cacheKey);
    }
  }

  if (activity.type === 'FLIGHT' || activity.title.includes('早餐')) return {};

  // 1. Text Enrichment
  const prompt = `
    你是專業的清邁導遊。分析行程："${activity.title}" (地點: ${activity.location || activity.title})。
    上一站是："${previousLocation || 'Chiang Mai Old City'}"。
    
    請回傳 JSON (繁體中文)：
    1. aiDescription: 景點/餐廳故事 (有趣簡短, <40字)。
    2. mustEat: 餐廳的「必點招牌菜」(如"冬陰功") 或 景點附近的「必吃小吃」，請列出具體菜名 2-3 個。
    3. mustBuy: 必買伴手禮 (具體商品名，如"手標泰奶", "芒果乾")，若無則留空。
    4. tips: 1-2個實用攻略 (如"建議傍晚去拍夕陽", "著裝需遮肩").
    5. reservationInfo: 是否需預約？(簡短註明)。
    6. estimatedTravelTime: 從上一站開車預估時間 (如 "約 20 分")。
    7. coordinates: { lat, lng }
  `;

  let retries = 0;
  const maxRetries = 1; 

  while (retries <= maxRetries) {
    try {
      // Step 1: Get Text Info
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

      let text = response.text || '{}';
      // Robust JSON Extraction: Find the first '{' and the last '}'
      const firstBrace = text.indexOf('{');
      const lastBrace = text.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1) {
          text = text.substring(firstBrace, lastBrace + 1);
      } else {
          // Fallback to basic cleaning
          text = text.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/```$/, '').trim();
      }

      const result = JSON.parse(text);

      // Step 2: Try Generate Image (Optional / Hybrid)
      // Only generate if explicitly requested to save quota, or use a hybrid approach (not enabled by default here to prevent rate limits)
      // const generatedImageBase64 = await generateImage(`Chiang Mai travel spot: ${activity.title}`);
      // if (generatedImageBase64) result.imageUrl = generatedImageBase64;
      
      if (Object.keys(result).length > 0) {
          safeLocalStorage.setItem(cacheKey, JSON.stringify(result));
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
