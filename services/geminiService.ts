
import { GoogleGenAI, Type } from "@google/genai";
import { Activity } from "../types";

// DIRECT API KEY USAGE to prevent "process is not defined" crashes on some Vercel build configs
const apiKey = 'AIzaSyDSLxzewowQN4d5ZE955Veedke6_8diBNU';
const ai = new GoogleGenAI({ apiKey });

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const CACHE_KEY_PREFIX = 'gemini_v9_'; // Bump version to force re-fetch with new prompt fields
const WEATHER_CACHE_PREFIX = 'gemini_weather_v1_';

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

// Precise Forecast Data (Source: AccuWeather provided by user)
const ACCUWEATHER_DATA: Record<string, { range: string, icon: string }> = {
    '2025-11-28': { range: '12-27°C', icon: '🌤️' }, // Mostly sunny and nice
    '2025-11-29': { range: '14-28°C', icon: '⛅' }, // Sunshine and a few clouds
    '2025-11-30': { range: '17-29°C', icon: '☀️' }, // Plenty of sun
    '2025-12-01': { range: '18-30°C', icon: '☀️' }, // Plenty of sun
    '2025-12-02': { range: '19-31°C', icon: '⛅' }  // Clear to partly cloudy
};

// Function to predict weather for a specific date
export const predictWeather = async (date: string): Promise<{ range: string, icon: string }> => {
    // 1. Prioritize Manual Accurate Data for the specific trip
    if (ACCUWEATHER_DATA[date]) {
        return ACCUWEATHER_DATA[date];
    }

    if (!apiKey) return { range: '22-30°C', icon: '☀️' };

    const cacheKey = `${WEATHER_CACHE_PREFIX}${date}`;
    const cached = safeLocalStorage.getItem(cacheKey);
    if (cached) {
        try { return JSON.parse(cached); } catch(e) {}
    }

    const prompt = `
        Predict the historical average weather for Chiang Mai, Thailand on the date: ${date}.
        Return ONLY a JSON object with this structure:
        {
            "range": "High-Low°C" (e.g. "18-28°C"),
            "icon": "Emoji" (Choose ONE from: ☀️, ⛅, 🌧️ based on historical rain probability)
        }
        Do not include markdown code blocks.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        range: { type: Type.STRING },
                        icon: { type: Type.STRING }
                    }
                }
            }
        });

        let text = response.text || '{}';
        const firstBrace = text.indexOf('{');
        const lastBrace = text.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
            text = text.substring(firstBrace, lastBrace + 1);
        }
        
        const result = JSON.parse(text);
        if (result.range) {
            safeLocalStorage.setItem(cacheKey, JSON.stringify(result));
            return result;
        }
    } catch (error) {
        console.warn('Weather prediction failed', error);
    }

    return { range: '20-28°C', icon: '☀️' }; // Generic fallback
};

export const enrichActivity = async (activity: Activity, previousLocation?: string): Promise<Partial<Activity>> => {
  if (!apiKey) return {};

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

  const prompt = `
    你是專業的清邁導遊。分析行程："${activity.title}" (地點: ${activity.location || activity.title})。
    上一站是："${previousLocation || 'Chiang Mai Old City'}"。
    
    請回傳 JSON (繁體中文)：
    1. aiDescription: 景點/餐廳介紹 (約 80-100 字，包含歷史背景、特色或氛圍描述)。
    2. openingHours: 營業時間 (例如 "09:00 - 18:00" 或 "24小時開放")，若不確定請估計。
    3. notes: 注意事項 (列出 1-3 點，如 "需脫鞋", "禁止拍照", "蚊蟲多", "穿著需遮肩")。
    4. mustEat: 餐廳的「必點招牌菜」或景點附近的「必吃小吃」(具體菜名 2-3 個)。
    5. mustBuy: 必買伴手禮 (具體商品名)，若無則留空。
    6. tips: 實用攻略 (如 "建議傍晚去", "最佳拍照點")。
    7. reservationInfo: 是否需預約？(簡短註明)。
    8. estimatedTravelTime: 從上一站開車預估時間 (如 "約 20 分")。
    9. coordinates: { lat, lng }
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
              openingHours: { type: Type.STRING },
              notes: { type: Type.ARRAY, items: { type: Type.STRING } },
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
      const firstBrace = text.indexOf('{');
      const lastBrace = text.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
          text = text.substring(firstBrace, lastBrace + 1);
      } else {
          text = text.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/```$/, '').trim();
      }

      const result = JSON.parse(text);

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
