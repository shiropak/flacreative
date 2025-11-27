
import React from 'react';
import { FLIGHTS, HOTELS, PACKING_LIST } from '../constants';

const InfoTab: React.FC = () => {

  const getAirportData = (route: string) => {
    // Use Regex to find all 3-letter airport codes (e.g., TPE, CNX)
    // This correctly handles "TPE ➔ CNX" and "CNX ➔ TPE" regardless of arrow char
    const matches = route.match(/([A-Z]{3})/g);
    
    const fromCode = matches && matches[0] ? matches[0] : '???';
    const toCode = matches && matches[1] ? matches[1] : '???';

    const getAirportName = (code: string) => {
        if (code === 'TPE') return '桃園國際機場';
        if (code === 'CNX') return '清邁國際機場';
        return '';
    };

    return {
        from: { code: fromCode, name: getAirportName(fromCode) },
        to: { code: toCode, name: getAirportName(toCode) }
    };
  };

  const getFlightTimes = (timeStr: string) => {
      // Split by arrow or potential variations
      const parts = timeStr.split(/➔|->|to/);
      if (parts.length === 2) {
          return { start: parts[0].trim(), end: parts[1].trim() };
      }
      return { start: timeStr, end: '' };
  };

  return (
    <div className="space-y-8 pb-32 animate-slideUp">
      
      {/* Flight Section */}
      <section>
        <h2 className="text-text-primary text-xl font-bold mb-5 pl-1">
            Flight Details
        </h2>
        <div className="space-y-4">
          {FLIGHTS.map((flight, idx) => {
            const { from, to } = getAirportData(flight.route);
            const { start, end } = getFlightTimes(flight.time);
            
            return (
                <div key={idx} className="bg-app-surface rounded-[2rem] p-6 border border-white/5 relative overflow-hidden group">
                   
                   <div className="relative z-10">
                       <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-app-surface2 flex items-center justify-center">
                                    <i className="fas fa-plane-up text-accent-lime"></i>
                                 </div>
                                 <div>
                                     <span className="block text-sm font-bold text-text-primary">{flight.airline}</span>
                                     <span className="text-xs text-text-muted">{flight.flightNo}</span>
                                 </div>
                            </div>
                       </div>
    
                       <div className="flex items-center justify-between gap-4 mb-6 relative">
                            {/* Origin */}
                            <div className="text-center w-24">
                                <div className="text-3xl font-black text-text-primary mb-1">{from.code}</div>
                                <div className="text-[10px] text-text-secondary uppercase tracking-widest truncate">{from.name}</div>
                            </div>
                            
                            {/* Flight Path Visual */}
                            <div className="flex-1 flex flex-col items-center">
                                <div className="text-[10px] text-accent-lime mb-2 font-mono">{flight.duration}</div>
                                <div className="w-full h-[2px] bg-app-surface2 relative rounded-full overflow-hidden">
                                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-lime to-transparent w-1/2 animate-[shimmer_2s_infinite]"></div>
                                </div>
                            </div>
    
                            {/* Destination */}
                            <div className="text-center w-24">
                                <div className="text-3xl font-black text-text-primary mb-1">{to.code}</div>
                                <div className="text-[10px] text-text-secondary uppercase tracking-widest truncate">{to.name}</div>
                            </div>
                       </div>
    
                       <div className="flex justify-between text-xs font-mono text-text-secondary bg-app-surface2/50 rounded-xl p-3 border border-white/5">
                            <span>{start}</span>
                            <i className="fas fa-arrow-right text-text-muted"></i>
                            <span>{end}</span>
                       </div>
                   </div>
                </div>
            );
          })}
        </div>
      </section>

      {/* Hotel Section */}
      <section>
        <h2 className="text-text-primary text-xl font-bold mb-5 pl-1">Accommodation</h2>
        <div className="space-y-4">
            {HOTELS.map((hotel, idx) => (
                <div key={idx} className="bg-app-surface rounded-[2rem] overflow-hidden border border-white/5 group">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                             <h3 className="font-bold text-text-primary text-xl max-w-[80%]">{hotel.name}</h3>
                             <div className="w-8 h-8 rounded-full bg-app-surface2 flex items-center justify-center">
                                <i className="fas fa-star text-[10px] text-yellow-500"></i>
                             </div>
                        </div>
                        <p className="text-text-muted text-xs mb-6 flex items-center gap-1">
                            <i className="fas fa-map-pin text-accent-lime"></i> {hotel.address}
                        </p>
                        
                        <div className="flex gap-4 mb-6">
                            <div className="flex-1 bg-app-surface2 rounded-2xl p-3 border border-white/5">
                                <p className="text-[10px] text-text-muted uppercase mb-1">Check In</p>
                                <p className="text-sm font-bold text-text-primary">{hotel.checkIn}</p>
                            </div>
                            <div className="flex-1 bg-app-surface2 rounded-2xl p-3 border border-white/5">
                                <p className="text-[10px] text-text-muted uppercase mb-1">Check Out</p>
                                <p className="text-sm font-bold text-text-primary">{hotel.checkOut}</p>
                            </div>
                        </div>

                         <button 
                            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name)}`, '_blank')}
                            className="w-full py-4 rounded-xl bg-accent-lime text-text-inverse text-sm font-bold hover:bg-accent-limeDark transition-colors shadow-glow"
                        >
                            View Location
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Insurance & Tipping Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Insurance Section */}
          <section>
              <h2 className="text-text-primary text-xl font-bold mb-5 pl-1">保險資訊</h2>
              <div className="bg-app-surface rounded-[2rem] p-6 border border-white/5 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center">
                              <i className="fas fa-shield-heart"></i>
                          </div>
                          <div>
                              <h3 className="font-bold text-white leading-tight">旅行業責任保險</h3>
                              <p className="text-[10px] text-text-secondary">旅行社提供之基本保險</p>
                          </div>
                      </div>
                      <ul className="space-y-3 mb-5">
                          <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                              <span className="text-text-secondary">意外險</span>
                              <span className="font-bold text-white">250 萬元</span>
                          </li>
                          <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                              <span className="text-text-secondary">醫療險</span>
                              <span className="font-bold text-white">20 萬元</span>
                          </li>
                      </ul>
                    </div>
                    <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                      <p className="text-xs text-red-300 leading-relaxed flex gap-2">
                          <i className="fas fa-circle-info mt-0.5 flex-shrink-0"></i>
                          <span>不含旅遊不便險，若有需要額外保險的同仁，請務必自行提前投保喔。</span>
                      </p>
                    </div>
              </div>
          </section>

          {/* Tipping Section */}
          <section>
              <h2 className="text-text-primary text-xl font-bold mb-5 pl-1">小費資訊</h2>
              <div className="bg-app-surface rounded-[2rem] p-6 border border-white/5 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
                          <i className="fas fa-coins"></i>
                      </div>
                      <h3 className="font-bold text-white">建議小費參考</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                          { label: "古式按摩", value: "50~100 泰銖", sub: "/人/次" },
                          { label: "行李小費", value: "20 泰銖", sub: "/一間/次" },
                          { label: "床頭小費", value: "20 泰銖", sub: "/一間/天" },
                      ].map((tip, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-app-surface2 border border-white/5">
                              <span className="text-text-secondary text-sm">{tip.label}</span>
                              <div className="text-right">
                                  <span className="text-accent-lime font-bold block">{tip.value}</span>
                                  <span className="text-[10px] text-text-muted block">{tip.sub}</span>
                              </div>
                          </div>
                      ))}
                    </div>
              </div>
          </section>
      </div>

      {/* Packing List Only - Emergency Moved to Notice Tab */}
      <section>
        <h2 className="text-text-primary text-xl font-bold mb-5 pl-1">Packing List</h2>
        <div className="bg-app-surface rounded-[2rem] p-6 border border-white/5">
            {PACKING_LIST.map((item, idx) => (
                <label key={idx} className="flex items-center py-3.5 border-b border-white/5 last:border-0 cursor-pointer group hover:bg-white/5 -mx-2 px-2 rounded-lg transition-colors">
                        <div className="relative flex items-center justify-center w-6 h-6 mr-3">
                        <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-app-border rounded-md checked:bg-accent-lime checked:border-accent-lime transition-all" />
                        <i className="fas fa-check absolute text-black text-[10px] opacity-0 peer-checked:opacity-100"></i>
                    </div>
                    <span className="text-sm text-text-secondary peer-checked:text-text-muted peer-checked:line-through transition-colors">{item}</span>
                </label>
            ))}
        </div>
      </section>

    </div>
  );
};

export default InfoTab;
