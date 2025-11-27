import { Activity } from "../types";
import { ACTIVITY_DETAILS } from "../constants";

// Error class kept for compatibility
export class QuotaExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QuotaExceededError";
  }
}

// 資料來源：泰國氣象局 (Thai Meteorological Department) 11月歷史氣候與預報
// Updated to match specific AccuWeather screenshot values provided by user
const THAI_MET_DEPT_DATA: Record<string, { range: string; icon: string }> = {
  "2025-11-28": { range: "13-27°C", icon: "⛅" }, // Day 1: Partly Cloudy
  "2025-11-29": { range: "12-27°C", icon: "☀️" }, // Day 2: Clear
  "2025-11-30": { range: "12-28°C", icon: "☀️" }, // Day 3: Clear
  "2025-12-01": { range: "14-29°C", icon: "☀️" }, // Day 4: Clear
  "2025-12-02": { range: "15-29°C", icon: "☀️" }, // Day 5: Clear
};

// 預設的行程補充資訊（抓不到時的 fallback）
const FALLBACK_ENRICHMENT = {
  aiDescription: "暫無詳細資訊",
  openingHours: "依現場公告為準",
  notes: [] as string[],
  mustEat: [] as string[],
  mustBuy: [] as string[],
  tips: [] as string[],
  reservationInfo: "",
  estimatedTravelTime: "",
};

// 完全不串 API 的 predictWeather：只看你手動的表，其他一律用通用 fallback
export const predictWeather = async (
  date: string
): Promise<{ range: string; icon: string }> => {
  // 如果在你手動設定的清單裡，直接用那一筆（最準）
  if (THAI_MET_DEPT_DATA[date]) {
    return THAI_MET_DEPT_DATA[date];
  }

  // 其他日期：給一個你覺得「清邁大致合理」的通用預設
  return {
    range: "20-28°C",
    icon: "☀️",
  };
};

// 行程 enrich（保持原本邏輯，讀取靜態資料）
export const enrichActivity = async (
  activity: Activity,
  previousLocation?: string
): Promise<Partial<Activity>> => {
  const details = ACTIVITY_DETAILS[activity.id];

  if (details) {
    return details;
  }

  return FALLBACK_ENRICHMENT;
};