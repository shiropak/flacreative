
import { DaySchedule, ActivityType, FlightInfo, HotelInfo } from './types';

export const FLIGHTS: FlightInfo[] = [
  {
    airline: '中華航空 China Airlines',
    flightNo: 'CI 851',
    route: '桃園 TPE (T1) ➔ 清邁 CNX',
    time: '2025/11/28 07:20 ➔ 10:25',
    duration: '4小時 5分鐘'
  },
  {
    airline: '中華航空 China Airlines',
    flightNo: 'CI 852',
    route: '清邁 CNX ➔ 桃園 TPE (T1)',
    time: '2025/12/02 11:25 ➔ 15:50',
    duration: '3小時 25分鐘'
  }
];

export const HOTELS: HotelInfo[] = [
  {
    name: 'Mantrini Hotel (曼特里尼酒店)',
    address: 'Chiang Mai, Thailand',
    checkIn: '11/28',
    checkOut: '11/29'
  },
  {
    name: 'The Raintree Hotel (雨樹酒店)',
    address: 'Chiang Mai, Thailand',
    checkIn: '11/29',
    checkOut: '12/02'
  }
];

export const PACKING_LIST = [
  "護照 (有效期 > 6個月)",
  "行動電源 & 充電線",
  "泰銖現金",
  "網卡 / 漫遊開通",
  "防曬乳 & 墨鏡 & 帽子",
  "防蚊液 (必備)",
  "薄外套 (早晚溫差大)",
  "泳衣 (飯店泳池)",
  "好走的鞋子",
  "個人常備藥品 (腸胃藥/暈車藥)"
];

export const EMERGENCY_CONTACTS = [
  { name: "導遊 (A-Long)", number: "+66 81 234 5678" },
  { name: "觀光警察", number: "1155" },
  { name: "清邁蘭醫院 (Chiang Mai Ram)", number: "053 920 300" },
  { name: "駐泰國台北經濟文化辦事處", number: "+66 2 119 3555" }
];

// Helper to get reliable image URLs
const getImg = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

export const INITIAL_SCHEDULE: DaySchedule[] = [
  {
    date: '2025-11-28',
    dayLabel: 'Day 1',
    fullDate: '11.28',
    weatherRange: '17-21°C',
    dressCode: '白+淺藍',
    activities: [
      { 
        id: '1-1', time: '07:20', title: '出發：桃園國際機場', type: ActivityType.FLIGHT, location: 'Taoyuan International Airport', originalDescription: '中華航空 CI 851',
        imageUrl: getImg('1569154941061-e00328c27717'), estimatedTravelTime: '✈️ 4hr 5m'
      },
      { 
        id: '1-2', time: '10:25', title: '抵達：清邁國際機場', type: ActivityType.FLIGHT, location: 'Chiang Mai International Airport',
        imageUrl: getImg('1569336685283-13b2287ebbb9'), estimatedTravelTime: '🚗 20 min'
      },
      { id: '1-3', time: '早午餐', title: '機上餐點 / 機場', type: ActivityType.FOOD, imageUrl: getImg('1542338547-93fa31ea8e6c'), estimatedTravelTime: '🚗 30 min' },
      { 
        id: '1-4', time: '下午', title: '清萊白廟 (Wat Rong Khun)', type: ActivityType.SIGHTSEEING, location: 'Wat Rong Khun', originalDescription: '龍坤藝術廟',
        imageUrl: getImg('1598935898639-3237d2e0ae4d'), estimatedTravelTime: '🚗 15 min'
      },
      { id: '1-5', time: '午餐', title: '泰式自助餐', type: ActivityType.FOOD, imageUrl: getImg('1559314809-0d155014e29e'), estimatedTravelTime: '🚗 40 min' },
      { 
        id: '1-6', time: '下午', title: '翠峰茶園', type: ActivityType.SIGHTSEEING, location: 'Choui Fong Tea Plantation',
        imageUrl: getImg('1586631006920-4c6b7745971e'), estimatedTravelTime: '🚗 30 min'
      },
      { 
        id: '1-7', time: '晚餐', title: 'Moon Mai Restaurant 孟美餐廳', type: ActivityType.FOOD, location: 'Moon Mai Restaurant', originalDescription: '北部佳餚風味餐+現場歌手演唱',
        imageUrl: getImg('1517248135467-4c7edcad34c4'), estimatedTravelTime: '🚗 20 min'
      },
      { 
        id: '1-8', time: '住宿', title: 'Mantrini Hotel', type: ActivityType.HOTEL, location: 'The Mantrini Chiang Mai',
        imageUrl: getImg('1566073771259-6a8506099945') 
      }
    ]
  },
  {
    date: '2025-11-29',
    dayLabel: 'Day 2',
    fullDate: '11.29',
    weatherRange: '17-20°C',
    dressCode: '米白/大地色',
    activities: [
      { id: '2-1', time: '早上', title: '飯店早餐', type: ActivityType.FOOD, imageUrl: getImg('1504754524776-8f4f37790ca0'), estimatedTravelTime: '🚗 15 min' },
      { 
        id: '2-2', time: '早上', title: '清萊藍廟 (Wat Rong Suea Ten)', type: ActivityType.SIGHTSEEING, location: 'Wat Rong Suea Ten (Blue Temple)',
        imageUrl: getImg('1626092624062-a4787a997452'), estimatedTravelTime: '🚗 10 min'
      },
      { 
        id: '2-3', time: '午餐', title: '火山排骨龍蝦麵 + 蝶豆花創意飲品', type: ActivityType.FOOD, location: 'Chiang Mai',
        imageUrl: getImg('1596627229722-9f669da39580'), estimatedTravelTime: '🚗 25 min'
      },
      { 
        id: '2-4', time: '下午', title: '清邁真心市集 / 椰林市集', type: ActivityType.SIGHTSEEING, location: 'Coconut Market Chiang Mai', originalDescription: '週末市集',
        imageUrl: getImg('1533025404451-826cb4c32b41'), estimatedTravelTime: '🚗 20 min'
      },
      { id: '2-5', time: '晚餐', title: 'Kung Yim Shop (2nd Branch)', type: ActivityType.FOOD, location: 'Kung Yim Shop', imageUrl: getImg('1562565652-95e7ebf371f1'), estimatedTravelTime: '🚗 15 min' },
      { 
        id: '2-6', time: '晚上', title: '清邁夜市 / 瓦洛洛市場', type: ActivityType.SHOPPING, location: 'Warorot Market (Kad Luang)', originalDescription: '必逛在地市集',
        imageUrl: getImg('1505881502353-a1986add3762'), estimatedTravelTime: '🚗 10 min'
      },
      { id: '2-7', time: '晚上', title: 'Big C Extra 採購', type: ActivityType.SHOPPING, location: 'Big C Extra Chiang Mai 2', imageUrl: getImg('1534452203293-494d7ddbf7e0'), estimatedTravelTime: '🚗 15 min' },
      { 
        id: '2-8', time: '住宿', title: 'The Raintree Hotel', type: ActivityType.HOTEL, location: 'The Raintree Hotel Chiang Mai',
        imageUrl: getImg('1542314831-068cd1dbfeeb')
      }
    ]
  },
  {
    date: '2025-11-30',
    dayLabel: 'Day 3',
    fullDate: '11.30',
    weatherRange: '15-20°C',
    dressCode: '泰服',
    activities: [
      { id: '3-1', time: '早上', title: '飯店早餐', type: ActivityType.FOOD, imageUrl: getImg('1504754524776-8f4f37790ca0'), estimatedTravelTime: '🚗 15 min' },
      { 
        id: '3-2', time: '早上', title: 'Jing Jai Market 真心市集', type: ActivityType.SHOPPING, location: 'Jing Jai Market Chiang Mai',
        imageUrl: getImg('1488646953014-85cb44e25828'), estimatedTravelTime: '🚗 20 min'
      },
      { id: '3-3', time: '午餐', title: '米其林宮廷泰式餐', type: ActivityType.FOOD, imageUrl: getImg('1548943487-a2e4e43b485c'), estimatedTravelTime: '🚗 15 min' },
      { 
        id: '3-4', time: '下午', title: '泰服體驗', type: ActivityType.ACTIVITY, originalDescription: '換裝體驗',
        imageUrl: getImg('1599707367072-cd6c66aa22f1'), estimatedTravelTime: '🚶 5 min'
      },
      { 
        id: '3-5', time: '下午', title: '蘭納古城之旅', type: ActivityType.SIGHTSEEING, location: 'Three Kings Monument', originalDescription: '大塔寺、水果街、三王紀念碑',
        imageUrl: getImg('1528181304800-259b08848526'), estimatedTravelTime: '🚶 10 min'
      },
      { id: '3-6', time: '下午', title: '泰式按摩', type: ActivityType.ACTIVITY, imageUrl: getImg('1544161515-4ab6ce6db874'), estimatedTravelTime: '🚗 15 min' },
      { id: '3-7', time: '晚餐', title: '米其林謝桐興餐廳', type: ActivityType.FOOD, location: 'Jia Tong Heng Restaurant', imageUrl: getImg('1514933651103-005eec06c04b'), estimatedTravelTime: '🚗 20 min' },
      { id: '3-8', time: '住宿', title: 'The Raintree Hotel', type: ActivityType.HOTEL, location: 'The Raintree Hotel Chiang Mai', imageUrl: getImg('1542314831-068cd1dbfeeb') }
    ]
  },
  {
    date: '2025-12-01',
    dayLabel: 'Day 4',
    fullDate: '12.01',
    weatherRange: '11-18°C',
    dressCode: '綠色',
    activities: [
      { id: '4-1', time: '早上', title: '飯店早餐', type: ActivityType.FOOD, imageUrl: getImg('1504754524776-8f4f37790ca0'), estimatedTravelTime: '🚗 1.5 hr' },
      { 
        id: '4-2', time: '早上', title: '茵他儂國家公園', type: ActivityType.SIGHTSEEING, location: 'Doi Inthanon National Park',
        imageUrl: getImg('1520334292791-75c941c90303'), estimatedTravelTime: '🚗 20 min'
      },
      { id: '4-3', time: '午餐', title: '茵他儂風味餐', type: ActivityType.FOOD, imageUrl: getImg('1504674900247-0877df9cc836'), estimatedTravelTime: '🚗 1 hr' },
      { 
        id: '4-4', time: '下午', title: 'Kad Farang Village 市集', type: ActivityType.SHOPPING, location: 'Kad Farang Village',
        imageUrl: getImg('1441986300917-64674bd600d8'), estimatedTravelTime: '🚶 5 min'
      },
      { id: '4-5', time: '下午', title: 'PREMIUM OUTLET', type: ActivityType.SHOPPING, location: 'Premium Outlet Chiang Mai', imageUrl: getImg('1555529669-e69e7aa0ba9a'), estimatedTravelTime: '🚶 5 min' },
      { id: '4-6', time: '下午', title: '蘭納風星巴克', type: ActivityType.FOOD, location: 'Starbucks Kad Farang', imageUrl: getImg('1559496417-e7f25cb247f3'), estimatedTravelTime: '🚗 30 min' },
      { id: '4-7', time: '晚餐', title: '米其林黑森林泰式餐', type: ActivityType.FOOD, location: 'Khaomao-Khaofang Restaurant', imageUrl: getImg('1550966871-3ed3c6221741'), estimatedTravelTime: '🚗 20 min' },
      { id: '4-8', time: '住宿', title: 'The Raintree Hotel', type: ActivityType.HOTEL, imageUrl: getImg('1542314831-068cd1dbfeeb') }
    ]
  },
  {
    date: '2025-12-02',
    dayLabel: 'Day 5',
    fullDate: '12.02',
    weatherRange: '9-12°C',
    dressCode: '無',
    activities: [
      { id: '5-1', time: '早上', title: '飯店早餐', type: ActivityType.FOOD, imageUrl: getImg('1504754524776-8f4f37790ca0'), estimatedTravelTime: '🚗 20 min' },
      { id: '5-2', time: '11:25', title: '出發：清邁國際機場 (CI852)', type: ActivityType.FLIGHT, location: 'Chiang Mai International Airport', imageUrl: getImg('1569336685283-13b2287ebbb9'), estimatedTravelTime: '✈️' },
      { id: '5-3', time: '午餐', title: '機上餐點', type: ActivityType.FOOD, imageUrl: getImg('1542338547-93fa31ea8e6c'), estimatedTravelTime: '✈️' },
      { id: '5-4', time: '15:50', title: '抵達：桃園國際機場 T1', type: ActivityType.FLIGHT, location: 'Taoyuan International Airport', imageUrl: getImg('1570710891163-6d3b5c47248b') }
    ]
  }
];
