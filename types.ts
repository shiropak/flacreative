export enum ActivityType {
  FLIGHT = 'FLIGHT',
  FOOD = 'FOOD',
  SIGHTSEEING = 'SIGHTSEEING',
  TRANSPORT = 'TRANSPORT',
  HOTEL = 'HOTEL',
  SHOPPING = 'SHOPPING',
  ACTIVITY = 'ACTIVITY'
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  type: ActivityType;
  location?: string;
  originalDescription?: string;
  // Enhanced fields from AI
  aiDescription?: string;
  mustEat?: string[];
  mustBuy?: string[];
  tips?: string[];
  coordinates?: { lat: number; lng: number };
  estimatedTravelTime?: string; // Time from previous activity
}

export interface DaySchedule {
  date: string;
  dayLabel: string; // e.g., "Day 1"
  fullDate: string; // e.g., "11.28"
  weatherRange: string;
  dressCode: string;
  activities: Activity[];
}

export interface FlightInfo {
  airline: string;
  flightNo: string;
  route: string;
  time: string;
  duration?: string;
}

export interface HotelInfo {
  name: string;
  address: string;
  checkIn: string;
  checkOut: string;
  bookingCode?: string;
}

export interface WeatherData {
  temp: string;
  condition: string;
  icon: string;
}