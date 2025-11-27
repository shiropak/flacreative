
import React from 'react';
import { EMERGENCY_CONTACTS } from '../constants';

const NOTICES = [
  "走路看著地面走，不要邊看風景或邊使用手機走路，避免因地面高低落差導致跌倒扭傷腳。(這很常發生)",
  "隨時都要放一件外套在遊覽車上，避免裡外溫差大感冒。",
  "準時：集合時間及每天早上發車時間一起共同準時，這樣就不會浪費到彼此寶貴的遊覽時間。",
  "安全考量，總是結伴同行，不可以落單。",
  "注意財物安全，包包背前面眼睛看得到的地方，護照一定要妥善保管好，不能遺失。",
  "旅途中隨時都要準備零食，餅乾或巧克力在車上，避免因塞車延誤正餐時間餓肚子；有的時候，甚至13:30或19:30才抵達餐廳(常發生)",
  "飯店洗澡與在外面公共廁所時，留意安全，小心地面濕滑，避免滑倒。",
  "食物以熟食為主，生的儘量不吃，保護腸胃健康。",
  "走室外景點都要隨身攜帶雨具。",
  "泰國遊覽車的階梯離地面落差都很大且很陡峭，下車時要特別小心不要跌倒了。",
  "上公廁時，很容易把手機放旁邊，用完衛生紙沖完水以後，人就直接離開了，手機就遺忘在公廁裡，這也很常發生。"
];

const TAX_REFUND_INFO = [
  "必須在有張貼「VAT REFUND FOR TOURISTS」標誌的商店內購物。",
  "未稅金額要在2,000泰銖以上。",
  "結帳前主動先把護照出示給店員 (護照要記得拿回來，別掉了)",
  "店員給的退稅表格與發票要妥善保管好"
];

const NoticeTab: React.FC = () => {
  return (
    <div className="space-y-6 pb-32 animate-slideUp">
      
      {/* Header */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 text-9xl text-yellow-500/5 opacity-50 rotate-12">
            <i className="fas fa-triangle-exclamation"></i>
        </div>
        <div className="relative z-10">
            <h2 className="text-2xl font-black text-yellow-500 mb-2">泰國旅遊注意事項</h2>
            <p className="text-yellow-200/80 text-sm">
                為了讓旅程更加順利愉快，請務必閱讀以下 11 點重要事項。
            </p>
        </div>
      </div>

      {/* List */}
      <div className="grid gap-4">
        {NOTICES.map((notice, index) => (
            <div key={index} className="bg-app-surface rounded-2xl p-5 border border-white/5 flex gap-4 hover:border-yellow-500/30 transition-colors group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-app-surface2 text-yellow-500 font-bold font-mono flex items-center justify-center border border-white/5 group-hover:bg-yellow-500 group-hover:text-app-bg transition-colors">
                    {index + 1}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed group-hover:text-text-primary transition-colors">
                    {notice}
                </p>
            </div>
        ))}
      </div>

      {/* Tax Refund Section */}
      <div className="pt-6">
        <div className="bg-accent-lime/10 border border-accent-lime/20 rounded-3xl p-6 relative overflow-hidden mb-4">
           <div className="absolute -right-4 -top-4 text-9xl text-accent-lime/5 opacity-50 rotate-12">
              <i className="fas fa-money-bill-wave"></i>
           </div>
           <div className="relative z-10">
              <h2 className="text-xl font-black text-accent-lime mb-1">泰國退稅條件 (VAT Refund)</h2>
              <p className="text-text-secondary text-xs">快樂購物也要記得省荷包！</p>
           </div>
        </div>

        <div className="bg-app-surface rounded-[2rem] p-6 border border-white/5">
             <ul className="space-y-4">
                {TAX_REFUND_INFO.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-accent-lime mt-2 flex-shrink-0 shadow-[0_0_10px_rgba(212,249,118,0.5)]"></div>
                         <p className="text-text-secondary text-sm leading-relaxed">
                            {item}
                         </p>
                    </li>
                ))}
             </ul>
        </div>
      </div>

      {/* Emergency Section */}
      <div className="pt-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6 relative overflow-hidden mb-4">
           <div className="absolute -right-4 -top-4 text-9xl text-red-500/5 opacity-50 rotate-12">
              <i className="fas fa-kit-medical"></i>
           </div>
           <div className="relative z-10">
              <h2 className="text-xl font-black text-red-500 mb-1">緊急聯絡資訊</h2>
              <p className="text-red-200/80 text-xs">遇到緊急狀況時請保持冷靜並立即聯繫</p>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
            {EMERGENCY_CONTACTS.map((contact, idx) => {
                const link = (contact as any).link;
                const isLine = contact.name.includes('LINE');

                return (
                <a key={idx} 
                   href={link || `tel:${contact.number}`} 
                   target={link ? "_blank" : undefined}
                   rel={link ? "noopener noreferrer" : undefined}
                   className="bg-app-surface p-4 rounded-2xl flex items-center justify-between border border-white/5 hover:border-red-500/30 transition-all group">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full ${isLine ? 'bg-green-500/10 text-green-500 group-hover:bg-green-500' : 'bg-red-500/10 text-red-500 group-hover:bg-red-500'} flex items-center justify-center group-hover:text-white transition-colors`}>
                                <i className={isLine ? "fab fa-line text-lg" : "fas fa-phone"}></i>
                            </div>
                            <span className="text-sm text-text-primary font-medium">{contact.name}</span>
                        </div>
                        <span className="text-xs text-text-muted font-mono">{contact.number}</span>
                </a>
                );
            })}
        </div>
      </div>

      <div className="text-center text-text-muted text-xs mt-8">
        祝各位同仁旅途平安、玩得盡興！
      </div>

    </div>
  );
};

export default NoticeTab;
