
import { DaySchedule, ActivityType, FlightInfo, HotelInfo, Activity } from './types';

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
    name: 'The Mantrini Chiang Rai Resort',
    address: 'Chiang Mai, Thailand',
    checkIn: '11/28',
    checkOut: '11/29'
  },
  {
    name: 'The Raintree Hotel',
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

// --- PRE-GENERATED STATIC DATA (To bypass API Quota) ---
export const ACTIVITY_DETAILS: Record<string, Partial<Activity>> = {
    // Day 1
    '1-1': {
        aiDescription: "準時出發！確認行李與護照是否帶齊，開啟美好的員工旅遊。",
        openingHours: "03:30 出發",
        estimatedTravelTime: "🚌 45 min",
        notes: ["這是出發時間", "若要自行前往，請於04:20前抵達桃園國際機場T1 8號櫃檯"]
    },
    '1-2': {
        aiDescription: "搭乘中華航空前往泰北玫瑰—清邁。享受機上服務與空中美景。",
        estimatedTravelTime: "✈️ 4hr 5m",
        notes: ["起飛前請關閉通訊設備", "注意隨身行李規定"]
    },
    '1-4': {
        aiDescription: "抵達清邁國際機場 (CNX)，感受泰北的熱情與獨特文化氛圍。",
        estimatedTravelTime: "🚌 1hr 20min",
        notes: ["通關後請尋找舉牌人員", "調整手錶時間 (泰國慢台灣1小時)"]
    },
    '1-5': {
        aiDescription: "前往清萊途中的著名休息站，以此處的天然溫泉聞名。雖然不能全身泡湯，但可以在旁邊泡腳舒緩旅途疲勞，順便買些溫泉蛋來吃。",
        openingHours: "07:00 - 18:00",
        estimatedTravelTime: "🚌 1.5 hr", // Airport -> Mae Kachan (~1.5hr)
        mustEat: ["溫泉鵪鶉蛋", "溫泉雞蛋"],
        notes: ["小心地滑", "溫泉水溫高請注意安全"]
    },
    '1-6': { // Lunch
        estimatedTravelTime: "🚗 10 min", // Nearby
    },
    '1-7': { // White Temple
        aiDescription: "龍坤藝術廟 (白廟) 是由泰國著名藝術家 Chalermchai Kositpipat 設計。整座寺廟以純白象徵佛陀的純潔，鑲嵌的鏡片在陽光下閃耀著智慧之光。這不僅是寺廟，更是一件震撼的現代藝術品。",
        openingHours: "08:00 - 17:00",
        estimatedTravelTime: "🚗 50 min", // Mae Kachan -> White Temple
        mustEat: ["椰子冰淇淋 (門口)", "泰式奶茶"],
        mustBuy: ["設計師畫作明信片", "銀飾紀念品"],
        tips: ["經過『奈何橋』時不要回頭", "穿著需遮住肩膀與膝蓋"],
        notes: ["遊客眾多請注意隨身物品", "內部禁止拍照"]
    },
    '1-8': { // Choui Fong
        aiDescription: "翠峰茶園是清萊最大的茶園，擁有壯觀的梯田景觀。這裡不僅是泰劇熱門取景地，更出產高品質的烏龍茶與綠茶。設計感十足的咖啡廳懸浮於茶園之上，是拍照打卡的絕佳地點。",
        openingHours: "08:30 - 17:30",
        estimatedTravelTime: "🚗 1 hr", // White Temple -> Choui Fong (pass by city)
        mustEat: ["綠茶千層蛋糕", "泰式綠茶冰沙", "烏龍茶"],
        mustBuy: ["高品質茶葉", "綠茶保養品"],
        tips: ["建議到頂樓露台拍照", "茶園步道可以走下去拍照"],
        notes: ["戶外無遮蔽注意防曬"]
    },
    '1-9': { // Moon Mai
        aiDescription: "Moon Mai 是一家充滿泰北風情的景觀餐廳，提供正宗的泰北料理 (Lanna Food)。晚上有現場樂團演奏，氣氛極佳，是體驗清萊夜生活的放鬆好去處。",
        openingHours: "11:00 - 23:00",
        estimatedTravelTime: "🚗 45 min", // Choui Fong -> Chiang Rai City
        mustEat: ["泰北拼盤 (Nam Prik Ong)", "炸豬皮", "泰北酸腸"],
        reservationInfo: "團體已預約",
        notes: ["部分菜色較辣可調整", "戶外區可能有蚊蟲"]
    },
    '1-10': { // Hotel
         estimatedTravelTime: "🚗 15 min",
    },
    
    // Day 2
    '2-2': { // Blue Temple
        aiDescription: "清萊藍廟 (Wat Rong Suea Ten) 以其鮮豔的寶藍色與金色為主調，內部巨大的白色佛像在藍色背景下顯得莊嚴而神聖。壁畫風格現代且迷幻，視覺衝擊力極強。",
        openingHours: "07:00 - 20:00",
        estimatedTravelTime: "🚗 15 min",
        mustEat: ["藍色椰子冰淇淋 (特色)", "蝶豆花飲品"],
        tips: ["水晶球拍照道具", "建議穿著淺色衣服對比強烈"],
        notes: ["入殿需脫鞋", "請保持安靜"]
    },
    '2-3': { // Lunch (Back to Chiang Mai)
        aiDescription: "網紅必訪美食！巨型火山排骨以堆疊如山的排骨與滿滿的青辣椒聞名，視覺與味覺的雙重享受。搭配夢幻的蝶豆花飲品，解辣又清爽。",
        openingHours: "11:00 - 22:00",
        estimatedTravelTime: "🚌 3.5 hr", // Chiang Rai -> Chiang Mai Long Drive
        mustEat: ["XXL 火山排骨", "龍蝦麵", "蝶豆花檸檬茶"],
        notes: ["排骨稍微偏辣", "建議戴手套食用"]
    },
    '2-4': { // Coconut Market
        aiDescription: "充滿熱帶風情的椰林市集 (Coconut Market)，彷彿置身夏威夷。這裡主要販售當地農產品、手工藝品與特色小吃，環境在椰子樹蔭下非常舒適，是週末放鬆的好去處。",
        openingHours: "08:00 - 14:00 (週末限定)",
        estimatedTravelTime: "🚗 20 min",
        mustEat: ["椰子殼裝咖啡", "彩色泰式甜點", "烤芭蕉"],
        mustBuy: ["手工編織包", "木製餐具"],
        tips: ["很多可愛的打卡點", "價格比市區夜市親民"],
        notes: ["大部分攤販只收現金"]
    },
    '2-5': { // Dinner
         estimatedTravelTime: "🚗 20 min",
    },
    '2-6': { // Warorot
        aiDescription: "瓦洛洛市場 (Warorot Market) 是清邁最古老、最道地的傳統市場，在地人稱為『咖龍』。這裡白天賣乾貨布料，晚上變身熱鬧夜市，是購買伴手禮最齊全也最便宜的地方。",
        openingHours: "05:00 - 23:00",
        estimatedTravelTime: "🚗 15 min",
        mustEat: ["泰北炸香腸 (Sai Ua)", "炸豬皮", "芒果糯米飯"],
        mustBuy: ["皇家蜂蜜", "手標泰式茶", "各式果乾 (芒果/榴槤)"],
        tips: ["記得殺價", "龍眼乾是特產"],
        notes: ["人潮擁擠注意財物", "市場內部較為悶熱"]
    },
    '2-7': { // Big C
         estimatedTravelTime: "🚗 15 min",
    },
    '2-8': { // Hotel
         estimatedTravelTime: "🚗 10 min",
    },

    // Day 3
    '3-2': { // Jing Jai Market
        aiDescription: "Jing Jai Market (真心市集) 是清邁目前最火紅的文青市集。主打有機農產、手作工藝與環保理念。這裡的商品質感極佳，且重視原創設計，週末早上有現場音樂，氛圍非常Chill。",
        openingHours: "06:30 - 13:00 (週末早市)",
        estimatedTravelTime: "🚗 15 min",
        mustEat: ["有機咖啡", "泰式煎餅", "手作麵包"],
        mustBuy: ["設計師棉麻衣物", "手工陶器", "天然護膚品"],
        tips: ["一定要早上去，中午就收了", "絕佳的文青照拍攝地"],
        notes: ["提倡減塑，建議自備購物袋"]
    },
    '3-3': { // Michelin Thai
        aiDescription: "品嚐米其林推薦的泰國宮廷料理，精緻的擺盤與細膩的調味，重現過往皇室的用餐體驗。環境優雅，服務周到。",
        openingHours: "11:00 - 15:00, 17:00 - 22:00",
        estimatedTravelTime: "🚗 15 min",
        mustEat: ["宮廷開胃菜組合", "瑪莎曼咖哩", "柚子沙拉"],
        reservationInfo: "已預約 VIP 包廂",
        notes: ["請著正式休閒服裝"]
    },
    '3-4': { // Thai Dress
        aiDescription: "體驗穿著傳統泰服 (Chut Thai)，化身泰國貴族。多種顏色與配飾可供選擇，接著前往古城地標拍照，留下最美的回憶。",
        openingHours: "09:00 - 18:00",
        estimatedTravelTime: "🚗 10 min",
        tips: ["建議將頭髮盤起", "金色飾品拍照效果好"],
        notes: ["小心配飾勾到衣物"]
    },
    '3-5': { // Three Kings
        aiDescription: "蘭納古城之旅，參觀三王紀念碑與大塔寺 (Wat Chedi Luang)。大塔寺是清邁古城內最高的建築，雖因地震受損，但仍展現出宏偉的蘭納建築風格。",
        openingHours: "08:00 - 17:00",
        estimatedTravelTime: "🚶 5 min", // Walk from dress shop
        tips: ["穿著泰服在此拍照最適合", "注意寺廟禮儀"],
        notes: ["寺廟內禁止喧嘩", "女性請勿觸碰僧侶"]
    },
    '3-6': { // Massage
        estimatedTravelTime: "🚗 10 min",
    },
    '3-7': { // Jia Tong Heng
        aiDescription: "謝桐興 (Jia Tong Heng) 是清邁老字號的中泰式餐廳，連續多年獲得米其林必比登推薦。以傳統潮州菜結合泰式風味，深受在地人與遊客喜愛。",
        openingHours: "10:00 - 22:00",
        estimatedTravelTime: "🚗 20 min",
        mustEat: ["招牌蠔煎 (Oyster Omelet)", "清蒸魚", "紅燒鵝掌"],
        reservationInfo: "需提前訂位",
        notes: ["口味較符合台灣人習慣"]
    },
    '3-8': { // Hotel
         estimatedTravelTime: "🚗 15 min",
    },

    // Day 4
    '4-2': { // Doi Inthanon
        aiDescription: "茵他儂國家公園是泰國的最高峰，被稱為『泰國屋脊』。這裡氣候終年涼爽，擁有多樣的生態系。著名的國王塔與皇后塔矗立於山頂，花園景觀極美。",
        openingHours: "05:00 - 18:00",
        estimatedTravelTime: "🚗 2 hr", // City -> Mountain Top (~2hr)
        tips: ["山上氣溫低，務必帶外套", "走步道可以看見雲海"],
        notes: ["山路蜿蜒，會暈車者請先吃藥", "請勿摘採花木"]
    },
    '4-3': { // Lunch
         estimatedTravelTime: "🚗 30 min",
    },
    '4-4': { // Kad Farang
        aiDescription: "Kad Farang Village 是一座蘭納風格的購物村，這裡有著『全球最美的星巴克』之一。純白的泰式建築搭配精緻木雕，是必訪的打卡熱點。",
        openingHours: "10:00 - 21:00",
        estimatedTravelTime: "🚗 1.5 hr", // Mountain -> City Outskirts
        mustEat: ["星巴克特色飲品", "週三夜市小吃"],
        mustBuy: ["Outlet 運動品牌", "泰國限定星巴克杯"],
        tips: ["一定要去星巴克門口拍照", "Outlet 有時有驚人折扣"],
        notes: ["週末人潮較多"]
    },
    '4-5': { // Outlet
         estimatedTravelTime: "🚶 5 min",
    },
    '4-6': { // Starbucks
         estimatedTravelTime: "🚶 2 min",
    },
    '4-7': { // Khaomao-Khaofang
        aiDescription: "黑森林餐廳 (Khaomao-Khaofang) 是一家彷彿置身於熱帶雨林中的夢幻餐廳。瀑布、流水、綠植環繞，連續獲得米其林推薦，環境與餐點皆為頂級享受。",
        openingHours: "11:00 - 15:00, 17:00 - 21:30",
        estimatedTravelTime: "🚗 15 min",
        mustEat: ["綠咖哩雞", "炸魚佐藥草", "鳳梨炒飯"],
        reservationInfo: "極難訂位，已確認",
        notes: ["晚上蚊蟲較多", "戶外座位氣氛佳"]
    },
    '4-8': { // Hotel
         estimatedTravelTime: "🚗 25 min",
    },

    // Day 5
    '5-2': {
        aiDescription: "前往清邁國際機場，準備辦理登機手續。利用最後時間在機場購買遺漏的伴手禮。",
        estimatedTravelTime: "🚗 25 min",
        notes: ["請預留 3 小時抵達機場", "檢查退稅單據"]
    },
    '5-4': {
        aiDescription: "抵達溫暖的家，結束五天四夜美好的清邁員旅。期待下次再相聚！",
        estimatedTravelTime: "✈️",
        notes: ["領取行李", "平安回家"]
    }
};

export const INITIAL_SCHEDULE: DaySchedule[] = [
  {
    date: '2025-11-28',
    dayLabel: 'Day 1',
    fullDate: '11.28',
    weatherRange: 'Loading...',
    weatherIcon: '⏳', 
    dressCode: '白+淺藍',
    activities: [
      { 
        id: '1-1', time: '03:30', title: '公司→桃園國際機場', type: ActivityType.TRANSPORT, location: '法樂數位', imageUrl: getImg('1436491865332-7a61a109cc05'), originalDescription: '遊覽車', estimatedTravelTime: '🚌 45 min'
      },
      { 
        id: '1-2', time: '07:20', title: 'CI851 TPE[1] ✈︎ CNX', type: ActivityType.FLIGHT, location: 'Taoyuan International Airport', originalDescription: '中華航空 CI 851',
        imageUrl: getImg('1436491865332-7a61a109cc05'), estimatedTravelTime: '✈️ 4hr 5m'
      },
      { id: '1-3', time: '早餐', title: '飛機餐', type: ActivityType.FOOD, imageUrl: getImg('1542338547-93fa31ea8e6c'), estimatedTravelTime: '' },
      { 
        id: '1-4', time: '10:25', title: '抵達清邁國際機場', type: ActivityType.FLIGHT, location: 'Chiang Mai International Airport',
        imageUrl: getImg('1569336685283-13b2287ebbb9'), estimatedTravelTime: '✈️'
      },
      { 
        id: '1-5', time: '', title: '清萊溫泉休息站', type: ActivityType.SIGHTSEEING, location: 'Mae Kachan Hot Spring',
        imageUrl: getImg('1569336685283-13b2287ebbb9'), estimatedTravelTime: '🚌 1.5 hr'
      },
      { id: '1-6', time: '午餐', title: '泰式自助餐', type: ActivityType.FOOD, imageUrl: getImg('1559314809-0d155014e29e'), estimatedTravelTime: '🚗 10 min' },
      {
        id: '1-7', time: '下午', title: '龍坤藝術廟', type: ActivityType.SIGHTSEEING, location: 'Wat Rong Khun', originalDescription: '龍坤藝術廟',
        imageUrl: 'https://images.unsplash.com/photo-1671188893377-ee825a53d27f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', estimatedTravelTime: '🚗 50 min'
      },
      { 
        id: '1-8', time: '下午', title: '翠峰茶園', type: ActivityType.SIGHTSEEING, location: 'Choui Fong Tea Plantation',
        imageUrl: getImg('1586631006920-4c6b7745971e'), estimatedTravelTime: '🚗 1 hr'
      },
      { 
        id: '1-9', time: '晚餐', title: 'Moon Mai Restaurant 孟美餐廳', type: ActivityType.FOOD, location: 'Moon Mai Restaurant', originalDescription: '北部佳餚風味餐+現場歌手演唱',
        imageUrl: getImg('1517248135467-4c7edcad34c4'), estimatedTravelTime: '🚗 45 min'
      },
      { 
        id: '1-10', time: '住宿', title: 'The Mantrini Chiang Rai Resort', type: ActivityType.HOTEL, location: 'The Mantrini Chiang Rai Resort',
        imageUrl: getImg('1566073771259-6a8506099945'), estimatedTravelTime: '🚗 15 min'
      }
    ]
  },
  {
    date: '2025-11-29',
    dayLabel: 'Day 2',
    fullDate: '11.29',
    weatherRange: 'Loading...',
    weatherIcon: '⏳',
    dressCode: '米白/大地色',
    activities: [
      { id: '2-1', time: '早上', title: '飯店早餐', type: ActivityType.FOOD, location: 'The Mantrini Chiang Rai Resort', imageUrl: getImg('1504754524776-8f4f37790ca0'), estimatedTravelTime: '' },
      { 
        id: '2-2', time: '早上', title: '清萊藍廟 (Wat Rong Suea Ten)', type: ActivityType.SIGHTSEEING, location: 'Wat Rong Suea Ten (Blue Temple)',
        imageUrl: 'https://images.unsplash.com/photo-1707788795785-d6480a45e200?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', estimatedTravelTime: '🚗 15 min'
      },
      { 
        id: '2-3', time: '午餐', title: '火山排骨龍蝦麵 + 蝶豆花創意飲品', type: ActivityType.FOOD, location: 'Chiang Mai',
        imageUrl: getImg('1596627229722-9f669da39580'), estimatedTravelTime: '🚌 3.5 hr'
      },
      { 
        id: '2-4', time: '下午', title: '清邁真心市集 / 椰林市集', type: ActivityType.SIGHTSEEING, location: 'Coconut Market Chiang Mai', originalDescription: '週末市集',
        imageUrl: getImg('1533025404451-826cb4c32b41'), estimatedTravelTime: '🚗 20 min'
      },
      { id: '2-5', time: '晚餐', title: 'Kung Yim Shop (2 Branch)', type: ActivityType.FOOD, location: 'Kung Yim Shop', imageUrl: getImg('1562565652-95e7ebf371f1'), estimatedTravelTime: '🚗 20 min' },
      { 
        id: '2-6', time: '晚上', title: '清邁夜市 / 瓦洛洛市場', type: ActivityType.SHOPPING, location: 'Warorot Market (Kad Luang)', originalDescription: '必逛在地市集',
        imageUrl: getImg('1505881502353-a1986add3762'), estimatedTravelTime: '🚗 15 min'
      },
      { id: '2-7', time: '晚上', title: 'Big C Extra 採購', type: ActivityType.SHOPPING, location: 'Big C Extra Chiang Mai 2', imageUrl: getImg('1534452203293-494d7ddbf7e0'), estimatedTravelTime: '🚗 15 min' },
      { 
        id: '2-8', time: '住宿', title: 'The Raintree Hotel', type: ActivityType.HOTEL, location: 'The Raintree Hotel Chiang Mai',
        imageUrl: getImg('1542314831-068cd1dbfeeb'), estimatedTravelTime: '🚗 10 min'
      }
    ]
  },
  {
    date: '2025-11-30',
    dayLabel: 'Day 3',
    fullDate: '11.30',
    weatherRange: 'Loading...',
    weatherIcon: '⏳',
    dressCode: '泰服',
    activities: [
      { id: '3-1', time: '早上', title: '飯店早餐', type: ActivityType.FOOD, location: 'The Raintree Hotel Chiang Mai', imageUrl: getImg('1504754524776-8f4f37790ca0'), estimatedTravelTime: '' },
      { 
        id: '3-2', time: '早上', title: 'Jing Jai Market 真心市集', type: ActivityType.SHOPPING, location: 'Jing Jai Market Chiang Mai',
        imageUrl: getImg('1488646953014-85cb44e25828'), estimatedTravelTime: '🚗 15 min'
      },
      { id: '3-3', time: '午餐', title: '米其林宮廷泰式餐', type: ActivityType.FOOD, imageUrl: getImg('1548943487-a2e4e43b485c'), estimatedTravelTime: '🚗 15 min' },
      { 
        id: '3-4', time: '下午', title: '泰服體驗', type: ActivityType.ACTIVITY, originalDescription: '換裝體驗',
        imageUrl: getImg('1599707367072-cd6c66aa22f1'), estimatedTravelTime: '🚗 10 min'
      },
      { 
        id: '3-5', time: '下午', title: '蘭納古城之旅', type: ActivityType.SIGHTSEEING, location: 'Three Kings Monument', originalDescription: '大塔寺、水果街、三王紀念碑',
        imageUrl: getImg('1528181304800-259b08848526'), estimatedTravelTime: '🚶 5 min'
      },
      { id: '3-6', time: '下午', title: '泰式按摩', type: ActivityType.ACTIVITY, imageUrl: getImg('1544161515-4ab6ce6db874'), estimatedTravelTime: '🚗 10 min' },
      { id: '3-7', time: '晚餐', title: '米其林謝桐興餐廳', type: ActivityType.FOOD, location: 'Jia Tong Heng Restaurant', imageUrl: getImg('1514933651103-005eec06c04b'), estimatedTravelTime: '🚗 20 min' },
      { id: '3-8', time: '住宿', title: 'The Raintree Hotel', type: ActivityType.HOTEL, location: 'The Raintree Hotel Chiang Mai', imageUrl: getImg('1542314831-068cd1dbfeeb'), estimatedTravelTime: '🚗 15 min' }
    ]
  },
  {
    date: '2025-12-01',
    dayLabel: 'Day 4',
    fullDate: '12.01',
    weatherRange: 'Loading...',
    weatherIcon: '⏳',
    dressCode: '綠色',
    activities: [
      { id: '4-1', time: '早上', title: '飯店早餐', type: ActivityType.FOOD, location: 'The Raintree Hotel Chiang Mai', imageUrl: getImg('1504754524776-8f4f37790ca0'), estimatedTravelTime: '' },
      { 
        id: '4-2', time: '早上', title: '茵他儂國家公園', type: ActivityType.SIGHTSEEING, location: 'Doi Inthanon National Park',
        imageUrl: getImg('1520334292791-75c941c90303'), estimatedTravelTime: '🚗 2 hr'
      },
      { id: '4-3', time: '午餐', title: '茵他儂風味餐', type: ActivityType.FOOD, imageUrl: getImg('1504674900247-0877df9cc836'), estimatedTravelTime: '🚗 30 min' },
      { 
        id: '4-4', time: '下午', title: 'Kad Farang Village 市集', type: ActivityType.SHOPPING, location: 'Kad Farang Village',
        imageUrl: getImg('1441986300917-64674bd600d8'), estimatedTravelTime: '🚗 1.5 hr'
      },
      { id: '4-5', time: '下午', title: 'PREMIUM OUTLET', type: ActivityType.SHOPPING, location: 'Premium Outlet Chiang Mai', imageUrl: getImg('1555529669-e69e7aa0ba9a'), estimatedTravelTime: '🚶 5 min' },
      { id: '4-6', time: '下午', title: '蘭納風星巴克', type: ActivityType.FOOD, location: 'Starbucks Kad Farang', imageUrl: getImg('1559496417-e7f25cb247f3'), estimatedTravelTime: '🚶 2 min' },
      { id: '4-7', time: '晚餐', title: '米其林黑森林泰式餐', type: ActivityType.FOOD, location: 'Khaomao-Khaofang Restaurant', imageUrl: getImg('1550966871-3ed3c6221741'), estimatedTravelTime: '🚗 15 min' },
      { id: '4-8', time: '住宿', title: 'The Raintree Hotel', type: ActivityType.HOTEL, imageUrl: getImg('1542314831-068cd1dbfeeb'), estimatedTravelTime: '🚗 25 min' }
    ]
  },
  {
    date: '2025-12-02',
    dayLabel: 'Day 5',
    fullDate: '12.02',
    weatherRange: 'Loading...',
    weatherIcon: '⏳',
    dressCode: '無',
    activities: [
      { id: '5-1', time: '早上', title: '飯店早餐', type: ActivityType.FOOD, location: 'The Raintree Hotel Chiang Mai', imageUrl: getImg('1504754524776-8f4f37790ca0'), estimatedTravelTime: '🚗 25 min' },
      { id: '5-2', time: '11:25', title: '出發：清邁國際機場 (CI852)', type: ActivityType.FLIGHT, location: 'Chiang Mai International Airport', imageUrl: getImg('1569336685283-13b2287ebbb9'), estimatedTravelTime: '🚗 25 min' },
      { id: '5-3', time: '午餐', title: '飛機餐', type: ActivityType.FOOD, imageUrl: getImg('1542338547-93fa31ea8e6c'), estimatedTravelTime: '✈️' },
      { id: '5-4', time: '15:50', title: '抵達：桃園國際機場 T1', type: ActivityType.FLIGHT, location: 'Taoyuan International Airport', imageUrl: getImg('1570710891163-6d3b5c47248b') }
    ]
  }
];
