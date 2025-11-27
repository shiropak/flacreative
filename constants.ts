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
        aiDescription: "由泰國名藝術家–查仁猜師父，花十年多時間所建造，獨具的泰國風格把仙境模擬於人間，同時也讓您理解到廣結善緣、惡必有報的人生理論，是一座費盡心思、巧奪天工的白色寺廟。廟堂外觀裝飾鏡子碎片，山形窗則裝飾著Nagas( 多頭蛇和幽冥世界之神祗 ) 、大象及傘等形狀。內部有查仁猜師父手繪的巨幅佛像壁畫。此廟結合傳統與現代創作的藝術塊寶，展現泰國國寶級藝術家的創意。",
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
        aiDescription: "又名舞虎寺(Blue Temple ; Wat RongSuea Ten ; วัดร่องเสือเต้น)，泰文原意為「跳舞的老虎」，始建於1996年。藍廟由清萊白廟設計者的徒弟所設計建造，雖然規模較白廟小，但是整體外觀呈現耀眼宏偉的藍色，內部佛像精緻，是一座傳統與現代藝術完美融合的泰式寺廟。",
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
        aiDescription: "周末限定「椰林市集 Coconut Market」，市集距離古城大約車程 15 分鐘，風景非常漂亮，市集是設置在椰子種植園區內。雖然市集的攤販數量不算很多，逛起來約20分鐘就結束了，但是整體的氛圍是其他市集絕對沒有的，還是很推薦可以來這裡逛逛小市集、市集買點泰式小吃。餓一下小羊喝牛奶，再買顆椰子喝！",
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
        aiDescription: "位於古城附近，是清邁最大的市集也是清邁的唐人街，建築風格與曼谷的唐人街類似。瓦洛洛市場分為三層樓，伴手禮、美食、便宜的衣服在這裡都應有盡有。",
        openingHours: "05:00 - 23:00",
        estimatedTravelTime: "🚗 15 min",
        mustEat: ["泰北炸香腸 (Sai Ua)", "炸豬皮", "芒果糯米飯"],
        mustBuy: ["皇家蜂蜜", "手標泰式茶", "各式果乾 (芒果/榴槤)"],
        tips: ["記得殺價", "龍眼乾是特產"],
        notes: ["人潮擁擠注意財物", "市場內部較為悶熱"]
    },
    '2-7': { // Anusarn Market
        aiDescription: "清邁觀光夜市裡面其實還包含2個夜市，分別是「阿努善夜市」跟「清邁卡爾拉夜市」，「阿努善夜市」的範圍從阿努善市場入口外的街道到市場內，攤位的質感都滿好的；「卡爾拉夜市」是室內夜市，主要是美食廣場，選擇很多，環境也很乾淨，整個「清邁觀光夜市」涵蓋的範圍非常大聚集了各式各樣的美食小吃攤販，從傳統泰食到各國美食通通都有，夜市中央還有美食座位區可以用餐。",
        openingHours: "16:00 - 23:30",
        estimatedTravelTime: "🚗 15 min",
        mustEat: ["烤魚","芒果糯米飯"],
        tips: ["東西重複性很高，建議大家可以多比價再購買", "龍眼乾是特產"],
        notes: ["人潮擁擠注意財物", "謹慎生食"]
    },    
    '2-8': { // Big C
         estimatedTravelTime: "🚗 15 min",
    },
    '2-9': { // Hotel
         estimatedTravelTime: "🚗 10 min",
    },

    // Day 3
    '3-2': { // Jing Jai Market
        aiDescription: "清邁最人氣的文青市集和手工藝市集，也是第一個有機農產市集，這裡的商店和店家都是每天營業，但周末會有超大型的假日市集，不定期還會舉辦一些活動",
        openingHours: "06:30 - 13:00 (週末早市)",
        estimatedTravelTime: "🚗 15 min",
        mustEat: ["有機咖啡", "泰式煎餅", "手作麵包"],
        mustBuy: ["設計師棉麻衣物", "手工陶器", "天然護膚品"],
        tips: ["如果逛街累了可抓時間去按摩"],
        notes: ["由於觀光客日益增加，近期還有中國直播帶貨，所以價格會相對比較貴。"]
    },
    '3-3': { // Michelin Thai
        aiDescription: "2020年起，在泰國清邁餐廳連續五年榮獲米其林必比登推介，以手工製作的菜餚與用心服務一直是許多當地人與遊客必訪的餐廳，能感受到地道泰式家庭氛圍，又能品嚐傳統與創新結合的美食，那麼 Saiyut & Doctor Sai Kitchen 絕對是一個不可錯過的餐廳選擇，這家由母女檔創立的私廚餐廳，以「美食即是生活中的藝術」為理念，不僅有豐富的泰式菜餚，還兼具藝術的擺盤與溫馨的用餐環境。",
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
        aiDescription: "是泰國的國家自然保護區。佔地面積 1005 平方公里，擁有泰國最高山脈茵他儂山，該山最高峰海拔約 2565 米，四周是山峰，有許多徒步路線、瀑布和兩座紀念佛塔。除了來清邁旅遊的遊客會造訪外，這裡也非常受當地人青睞。",
        openingHours: "05:00 - 18:00",
        estimatedTravelTime: "🚗 2 hr", // City -> Mountain Top (~2hr)
        notes: ["山上氣溫比市區低10°C，務必帶外套", "請注意防蚊防曬", "山路蜿蜒，會暈車者請先吃藥", "建議穿著舒適的衣服與鞋子上山"]
    },
    '4-3': { // Lunch
         estimatedTravelTime: "🚗 30 min",
    },
    '4-4': { // Kad Farang
        aiDescription: "跟一般的百貨公司不一樣，有更開闊更舒適的腹地，提供超過2000個車位，到這來逛街是件非常享受悠閒的事情，旁邊還有全清邁唯一的Outlet購物中心可以讓你逛一整天都不是問題，而購物村裡面的蘭納風星巴克可是享有泰北最美星巴克的稱號。",
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
        id: '1-1', time: '03:30', title: '公司→桃園國際機場', type: ActivityType.TRANSPORT, location: '法樂數位', originalDescription: '遊覽車', estimatedTravelTime: '🚌 45 min'
      },
      { 
        id: '1-2', time: '07:20', title: 'CI851 TPE[1] ✈︎ CNX', type: ActivityType.FLIGHT, location: 'Taoyuan International Airport', originalDescription: '中華航空 CI 851', estimatedTravelTime: '✈️ 4hr 5m'
      },
      { id: '1-3', time: '早餐', title: '飛機餐', type: ActivityType.FOOD, estimatedTravelTime: '' 
      },
      { 
        id: '1-4', time: '10:25', title: '抵達清邁國際機場', type: ActivityType.FLIGHT, location: 'Chiang Mai International Airport', estimatedTravelTime: '✈️'
      },
      { 
        id: '1-5', time: '', title: '清萊溫泉休息站', type: ActivityType.SIGHTSEEING, location: 'Mae Kachan Hot Spring',
        imageUrl: getImg('1569336685283-13b2287ebbb9'), estimatedTravelTime: '🚌 1.5 hr'
      },
      { id: '1-6', time: '午餐', title: '泰式自助餐', type: ActivityType.FOOD, estimatedTravelTime: '🚗 10 min' },
      {
        id: '1-7', time: '下午', title: '龍坤藝術廟', type: ActivityType.SIGHTSEEING, location: 'Wat Rong Khun', originalDescription: '龍坤藝術廟',
        imageUrl: 'https://images.unsplash.com/photo-1626514759600-4b24874c7e65?auto=format&fit=crop&w=800&q=80', estimatedTravelTime: '🚗 50 min'
      },
      { 
        id: '1-8', time: '下午', title: '翠峰茶園', type: ActivityType.SIGHTSEEING, location: 'Choui Fong Tea Plantation',
        imageUrl: getImg('1586631006920-4c6b7745971e'), estimatedTravelTime: '🚗 1 hr'
      },
      { 
        id: '1-9', time: '晚餐', title: 'Moon Mai Restaurant 孟美餐廳', type: ActivityType.FOOD, location: 'Moon Mai Restaurant', originalDescription: '北部佳餚風味餐+現場歌手演唱', estimatedTravelTime: '🚗 45 min'
      },
      { 
        id: '1-10', time: '住宿', title: 'The Mantrini Chiang Rai Resort', type: ActivityType.HOTEL, location: 'The Mantrini Chiang Rai Resort', estimatedTravelTime: '🚗 15 min'
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
      { id: '2-1', time: '早上', title: '飯店早餐', type: ActivityType.FOOD, location: 'The Mantrini Chiang Rai Resort', estimatedTravelTime: '' 
      },
      { 
        id: '2-2', time: '早上', title: '清萊藍廟 (Wat Rong Suea Ten)', type: ActivityType.SIGHTSEEING, location: 'Wat Rong Suea Ten (Blue Temple)',
        imageUrl: 'https://images.unsplash.com/photo-1707788795785-d6480a45e200?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', estimatedTravelTime: '🚗 15 min'
      },
      { 
        id: '2-3', time: '午餐', title: '火山排骨龍蝦麵 + 蝶豆花創意飲品', type: ActivityType.FOOD, location: 'Chiang Mai', estimatedTravelTime: '🚌 3.5 hr'
      },
      { 
        id: '2-4', time: '下午', title: '椰林市集', type: ActivityType.SIGHTSEEING, location: 'Coconut Market Chiang Mai', originalDescription: '週末市集',
        imageUrl: getImg('1533025404451-826cb4c32b41'), estimatedTravelTime: '🚗 20 min'
      },
      { id: '2-5', time: '晚餐', title: 'Kung Yim Shop (2 Branch)', type: ActivityType.FOOD, location: 'Kung Yim Shop', estimatedTravelTime: '🚗 20 min' },
      { 
        id: '2-6', time: '晚上', title: '瓦洛洛市場', type: ActivityType.SHOPPING, location: 'Waroros Market (Kad Luang)', originalDescription: '必逛在地市集',
        imageUrl: 'https://i0.wp.com/journey.tw/wp-content/uploads/2025/07/20250728023617_0_9dcdc1.jpg?resize=1100%2C732&quality=99&ssl=1', estimatedTravelTime: '🚗 15 min'
      },
        { 
        id: '2-7', time: '晚上', title: '清邁夜市', type: ActivityType.SHOPPING, location: 'Kalare Night Bazaar', originalDescription: '必逛在地市集',
        imageUrl: getImg('1505881502353-a1986add3762'), estimatedTravelTime: '🚗 15 min'
      },
      { id: '2-8', time: '晚上', title: 'Big C Extra 採購', type: ActivityType.SHOPPING, location: 'Big C Extra Chiang Mai 2', estimatedTravelTime: '🚗 15 min' },
      { 
        id: '2-9', time: '住宿', title: 'The Raintree Hotel', type: ActivityType.HOTEL, location: 'The Raintree Hotel Chiang Mai', estimatedTravelTime: '🚗 10 min'
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
      { id: '3-1', time: '早上', title: '飯店早餐', type: ActivityType.FOOD, location: 'The Raintree Hotel Chiang Mai', estimatedTravelTime: '' 
      },
      { 
        id: '3-2', time: '早上', title: 'Jing Jai Market 真心市集', type: ActivityType.SHOPPING, location: 'Jing Jai Market Chiang Mai',
        imageUrl: getImg('1488646953014-85cb44e25828'), estimatedTravelTime: '🚗 15 min'
      },
      { id: '3-3', time: '午餐', title: '米其林宮廷泰式餐', type: ActivityType.FOOD, location: 'Saiyut & Doctor Sai Kitchen', estimatedTravelTime: '🚗 15 min' },
      { 
        id: '3-4', time: '下午', title: '泰服體驗', type: ActivityType.ACTIVITY, originalDescription: '換裝體驗', estimatedTravelTime: '🚗 10 min'
      },
      { 
        id: '3-5', time: '下午', title: '蘭納古城之旅', type: ActivityType.SIGHTSEEING, location: 'Three Kings Monument', originalDescription: '大塔寺、水果街、三王紀念碑',
        imageUrl: getImg('1528181304800-259b08848526'), estimatedTravelTime: '🚶 5 min'
      },
      { id: '3-6', time: '下午', title: '泰式按摩', type: ActivityType.ACTIVITY, estimatedTravelTime: '🚗 10 min' },
      { id: '3-7', time: '晚餐', title: '米其林謝桐興餐廳', type: ActivityType.FOOD, location: 'Jia Tong Heng Restaurant', estimatedTravelTime: '🚗 20 min' },
      { id: '3-8', time: '住宿', title: 'The Raintree Hotel', type: ActivityType.HOTEL, location: 'The Raintree Hotel Chiang Mai', estimatedTravelTime: '🚗 15 min' }
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
      { id: '4-1', time: '早上', title: '飯店早餐', type: ActivityType.FOOD, location: 'The Raintree Hotel Chiang Mai', estimatedTravelTime: '' 
      },
      { 
        id: '4-2', time: '早上', title: '茵他儂國家公園', type: ActivityType.SIGHTSEEING, location: 'Doi Inthanon National Park',
        imageUrl: 'https://image.kkday.com/v2/image/get/c_fit%2Cq_55%2Ct_webp%2Cw_960/s1.kkday.com/product_133330/20220917104810_jBhSU/jpg', estimatedTravelTime: '🚗 2 hr'
      },
      { id: '4-3', time: '午餐', title: '茵他儂風味餐', type: ActivityType.FOOD, estimatedTravelTime: '🚗 30 min' },
      { 
        id: '4-4', time: '下午', title: 'Kad Farang Village', type: ActivityType.SHOPPING, location: 'Kad Farang Village',
        imageUrl: 'https://api.tourismthailand.org/upload/live/business_content_thumbnail/12603/P06002143.jpeg', estimatedTravelTime: '🚗 1.5 hr'
      },
      { id: '4-5', time: '下午', title: 'PREMIUM OUTLET', type: ActivityType.SHOPPING, location: 'Premium Outlet Chiang Mai', estimatedTravelTime: '🚶 5 min' },
      { id: '4-6', time: '下午', title: '蘭納風星巴克', type: ActivityType.FOOD, location: 'Starbucks Kad Farang', imageUrl: 'https://cc.tvbs.com.tw/img/program/upload/2024/06/18/20240618143959-993eefd8.jpg', estimatedTravelTime: '🚶 2 min' },
      { id: '4-7', time: '晚餐', title: '米其林黑森林泰式餐', type: ActivityType.FOOD, location: 'Khaomao-Khaofang Restaurant', estimatedTravelTime: '🚗 15 min' },
      { id: '4-8', time: '住宿', title: 'The Raintree Hotel', type: ActivityType.HOTEL, estimatedTravelTime: '🚗 25 min' }
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
      { id: '5-1', time: '早上', title: '飯店早餐', type: ActivityType.FOOD, location: 'The Raintree Hotel Chiang Mai', estimatedTravelTime: '🚗 25 min' 
      },
      { id: '5-2', time: '11:25', title: 'CI852 CNX ✈︎ TPE[1]', type: ActivityType.FLIGHT, location: 'Chiang Mai International Airport', estimatedTravelTime: '🚗 25 min' },
      { id: '5-3', time: '午餐', title: '飛機餐', type: ActivityType.FOOD, estimatedTravelTime: '✈️' 
      },
      { id: '5-4', time: '15:50', title: '抵達：桃園國際機場 T1', type: ActivityType.FLIGHT, location: 'Taoyuan International Airport' }
    ]
  }
];