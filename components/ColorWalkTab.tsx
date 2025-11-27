
import React from 'react';

const TEAMS = [
  { color: '紅', label: 'Red', style: 'bg-red-500/10 text-red-400 border-red-500/20', dot: 'bg-red-500', members: ['Enya', 'Amy', '琪琪'] },
  { color: '橙', label: 'Orange', style: 'bg-orange-500/10 text-orange-400 border-orange-500/20', dot: 'bg-orange-500', members: ['wawa(珠珠)', 'Alice', 'LANI'] },
  { color: '黃', label: 'Yellow', style: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', dot: 'bg-yellow-400', members: ['Joy', '-0', 'Wendy'] },
  { color: '綠', label: 'Green', style: 'bg-green-500/10 text-green-400 border-green-500/20', dot: 'bg-green-500', members: ['vvn', '廖機', 'yoyo'] },
  { color: '藍', label: 'Blue', style: 'bg-blue-500/10 text-blue-400 border-blue-500/20', dot: 'bg-blue-500', members: ['阿平', '博欽', 'Kelly'] },
  { color: '紫', label: 'Purple', style: 'bg-purple-500/10 text-purple-400 border-purple-500/20', dot: 'bg-purple-500', members: ['厦白', '大壮', 'Ricky'] },
];

const ColorWalkTab: React.FC = () => {
  return (
    <div className="space-y-8 pb-32 animate-slideUp">
      
      {/* Event Hero */}
      <section className="relative rounded-[2.5rem] overflow-hidden min-h-[14rem] flex flex-col justify-end p-8 bg-app-surface border border-white/10">
         <div className="absolute inset-0 bg-black">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-40 mix-blend-screen animate-pulse"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500 rounded-full blur-[80px] opacity-40 mix-blend-screen animate-pulse" style={{animationDelay: '1s'}}></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-lime rounded-full blur-[80px] opacity-30 mix-blend-screen"></div>
         </div>
         
         <div className="relative z-10">
             <div className="inline-block px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-bold text-white mb-4">
                ✨ Bonus Event
             </div>
             <h2 className="text-3xl font-black text-white leading-tight mb-2">
                法樂清邁/台北<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-accent-lime to-pink-500">Color Walk</span>
             </h2>
             <p className="text-white/80 text-sm font-medium">
                你的清邁/台北是什麼顏色？
             </p>
         </div>
      </section>

      {/* Team Assignments */}
      <section>
          <div className="flex items-center gap-3 mb-6 pl-1">
             <div className="w-8 h-8 rounded-full bg-yellow-500 text-app-bg flex items-center justify-center font-bold shadow-glow">
                <i className="fas fa-star"></i>
             </div>
             <h3 className="text-xl font-bold text-white">轉盤登記</h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
              {TEAMS.map((team, idx) => (
                  <div key={idx} className={`rounded-2xl border flex items-center p-1 pr-4 gap-4 ${team.style} bg-opacity-10 backdrop-blur-sm transition-transform hover:scale-[1.01]`}>
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg ${team.dot}`}>
                          {team.color}
                      </div>
                      <div className="flex-1">
                          <div className="text-xs opacity-60 font-mono mb-1 uppercase tracking-widest">{team.label} Team</div>
                          <div className="text-sm font-medium text-white flex flex-wrap gap-2">
                              {team.members.map((member, mIdx) => (
                                  <span key={mIdx} className="bg-white/10 px-2 py-0.5 rounded text-white/90">
                                      {member}
                                  </span>
                              ))}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* Rules */}
      <section className="bg-app-surface rounded-[2rem] p-6 border border-white/5">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                <i className="fas fa-list-check"></i>
             </div>
             <h3 className="text-xl font-bold text-white">比賽規則</h3>
          </div>

          <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-white/10">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-accent-lime"></div>
                  <h4 className="font-bold text-white mb-2">1. 出發前抽顏色</h4>
                  <p className="text-text-secondary text-sm">全公司同事皆可參加，每位同事隨機抽出一種顏色（紅、橙、黃、綠、藍、紫）。</p>
              </div>

              <div className="relative pl-6 border-l-2 border-white/10">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-accent-lime"></div>
                  <h4 className="font-bold text-white mb-2">2. 五天清邁/台灣旅途中完成任務</h4>
                  <ul className="text-text-secondary text-sm list-disc pl-4 space-y-1">
                      <li>拍攝與顏色相關的街道物品、場景、人物。</li>
                      <li>不限拍攝器材，但<span className="text-red-400 font-bold">不得修圖或用 AI 處理</span>，拍下旅途中直覺的畫面。</li>
                  </ul>
              </div>

              <div className="relative pl-6 border-l-2 border-white/10">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-accent-lime"></div>
                  <h4 className="font-bold text-white mb-2">3. 回程後交稿</h4>
                  <p className="text-text-secondary text-sm">每人挑選 <span className="text-white font-bold">5 張最佳作品</span>，附一句文字說明（15字內），上傳至指定收件雲端。</p>
              </div>
          </div>
          
          <div className="mt-8 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-5 border border-white/10">
              <h4 className="text-center font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 text-lg mb-4">
                  🏆 激勵獎勵
              </h4>
              
              <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 rounded-xl bg-app-bg/50 border border-white/5">
                      <div className="text-2xl">🎁</div>
                      <div>
                          <div className="font-bold text-white text-sm">最佳 Color Walk 攝影獎 (2名)</div>
                          <div className="text-xs text-text-secondary mt-1">由兩位老闆各自評選</div>
                          <div className="text-accent-lime font-bold mt-1">獎金 NT$3,000</div>
                      </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-xl bg-app-bg/50 border border-white/5">
                      <div className="text-2xl">📸</div>
                      <div>
                          <div className="font-bold text-white text-sm">Color Walk 人氣分享獎 (1名)</div>
                          <div className="text-xs text-text-secondary mt-1">每人挑選 1 張上傳 Wawa IG，最高票者獲勝</div>
                          <div className="text-accent-lime font-bold mt-1">獎金 NT$1,000</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

    </div>
  );
};

export default ColorWalkTab;
