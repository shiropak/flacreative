import { Activity } from "../types";
import { ACTIVITY_DETAILS } from "../constants";

// Error class kept for compatibility, though not strictly needed for static mode
export class QuotaExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QuotaExceededError";
  }
}

// Precise Forecast Data (Source: AccuWeather provided by user)
const ACCUWEATHER_DATA: Record<string, { range: string, icon: string }> = {
    '2025-11-28': { range: '12-27°C', icon: '🌤️' }, // Mostly sunny and nice
    '2025-11-29': { range: '14-28°C', icon: '⛅' }, // Sunshine and a few clouds
    '2025-11-30': { range: '17-29°C', icon: '☀️' }, // Plenty of sun
    '2025-12-01': { range: '18-30°C', icon: '☀️' }, // Plenty of sun
    '2025-12-02': { range: '19-31°C', icon: '⛅' }  // Clear to partly cloudy
};

const FALLBACK_ENRICHMENT = {
    aiDescription: "暫無詳細資訊",
    openingHours: "依現場公告為準",
    notes: [],
    mustEat: [],
    mustBuy: [],
    tips: [],
    reservationInfo: "",
    estimatedTravelTime: ""
};

// Function to predict weather for a specific date (STATIC MOCK - No API Key needed)
export const predictWeather = async (date: string): Promise<{ range: string, icon: string }> => {
    // Return precise manual data immediately
    if (ACCUWEATHER_DATA[date]) {
        return ACCUWEATHER_DATA[date];
    }
    return { range: '20-28°C', icon: '☀️' };
};

// Function to enrich activity (STATIC MOCK - No API Key needed)
export const enrichActivity = async (activity: Activity, previousLocation?: string): Promise<Partial<Activity>> => {
  // Look up pre-generated details from constants.ts
  const details = ACTIVITY_DETAILS[activity.id];
  
  if (details) {
      // Simulate a tiny network delay for realism (optional)
      // await new Promise(resolve => setTimeout(resolve, 50)); 
      return details;
  }
  
  return FALLBACK_ENRICHMENT;
};