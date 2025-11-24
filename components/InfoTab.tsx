import React from 'react';
import { FLIGHTS, HOTELS, PACKING_LIST, EMERGENCY_CONTACTS } from '../constants';

const InfoTab: React.FC = () => {
  return (
    <div className="space-y-8 pb-32 animate-slideUp">
      
      {/* Flight Section */}
      <section>
        <h2 className="text-text-primary text-xl font-bold mb-5 pl-1">
            Flight Details
        </h2>
        <div className="space-y-4">
          {FLIGHTS.map((flight, idx) => (
            <div key={idx} className="bg-app-surface rounded-[2rem] p-6 border border-white/5 relative overflow-hidden group">
               {/* Decoration */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent-lime/5 rounded-bl-[4rem] transition-all group-hover:bg-accent-lime/10"></div>
               
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
                        <div className="text-center">
                            <div className="text-3xl font-black text-text-primary mb-1">TPE</div>
                            <div className="text-[10px] text-text-secondary uppercase tracking-widest">Taipei</div>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center">
                            <div className="text-[10px] text-accent-lime mb-2 font-mono">{flight.duration}</div>
                            <div className="w-full h-[2px] bg-app-surface2 relative rounded-full overflow-hidden">
                                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-lime to-transparent w-1/2 animate-[shimmer_2s_infinite]"></div>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-3xl font-black text-text-primary mb-1">CNX</div>
                            <div className="text-[10px] text-text-secondary uppercase tracking-widest">Chiang Mai</div>
                        </div>
                   </div>

                   <div className="flex justify-between text-xs font-mono text-text-secondary bg-app-surface2/50 rounded-xl p-3 border border-white/5">
                        <span>{flight.time.split('➔')[0].trim()}</span>
                        <i className="fas fa-arrow-right text-text-muted"></i>
                        <span>{flight.time.split('➔')[1].trim()}</span>
                   </div>
               </div>
            </div>
          ))}
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

      {/* Packing & Emergency Grid */}
      <div className="grid grid-cols-1 gap-8">
          <section>
            <h2 className="text-text-primary text-xl font-bold mb-5 pl-1">Emergency</h2>
            <div className="grid grid-cols-1 gap-3">
                {EMERGENCY_CONTACTS.map((contact, idx) => (
                    <a key={idx} href={`tel:${contact.number}`} className="bg-app-surface p-4 rounded-2xl flex items-center justify-between border border-white/5 hover:border-red-500/30 transition-all group">
                         <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                                <i className="fas fa-phone"></i>
                             </div>
                             <span className="text-sm text-text-primary font-medium">{contact.name}</span>
                         </div>
                         <span className="text-xs text-text-muted font-mono">{contact.number}</span>
                    </a>
                ))}
            </div>
          </section>

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

    </div>
  );
};

export default InfoTab;