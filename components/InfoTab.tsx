import React from 'react';
import { FLIGHTS, HOTELS, PACKING_LIST, EMERGENCY_CONTACTS } from '../constants';

const InfoTab: React.FC = () => {
  return (
    <div className="space-y-8 pb-32 animate-slideUp">
      
      {/* Flight Section */}
      <section>
        <h2 className="text-text-primary text-lg font-bold mb-4 flex items-center gap-2">
            Flights
        </h2>
        <div className="space-y-4">
          {FLIGHTS.map((flight, idx) => (
            <div key={idx} className="bg-app-surface rounded-[1.5rem] p-6 border border-app-border/50 relative overflow-hidden">
               {/* Decoration */}
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-lime/5 rounded-full blur-3xl"></div>
               
               <div className="relative z-10">
                   <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                             <i className="fas fa-plane-up text-text-muted"></i>
                             <span className="text-sm font-bold text-text-primary">{flight.airline}</span>
                        </div>
                        <span className="px-2 py-1 bg-app-surface2 text-text-secondary rounded-md text-xs font-mono border border-app-border">{flight.flightNo}</span>
                   </div>

                   <div className="flex items-center justify-between gap-4 mb-4">
                        <div>
                            <div className="text-2xl font-bold text-text-primary">TPE</div>
                            <div className="text-[10px] text-text-muted">Taipei</div>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center">
                            <div className="text-[10px] text-text-muted mb-1">{flight.duration}</div>
                            <div className="w-full h-px bg-app-border relative">
                                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent-lime rounded-full"></div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-2xl font-bold text-text-primary">CNX</div>
                            <div className="text-[10px] text-text-muted">Chiang Mai</div>
                        </div>
                   </div>

                   <div className="bg-app-surface2 rounded-xl p-3 flex justify-between text-xs text-text-secondary font-mono">
                        <span>{flight.time.split('➔')[0].trim()}</span>
                        <span>{flight.time.split('➔')[1].trim()}</span>
                   </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hotel Section */}
      <section>
        <h2 className="text-text-primary text-lg font-bold mb-4">Hotels</h2>
        <div className="space-y-4">
            {HOTELS.map((hotel, idx) => (
                <div key={idx} className="bg-app-surface rounded-[1.5rem] overflow-hidden border border-app-border/50">
                    {/* Fake Image Placeholder if we had one, using color block for now */}
                    <div className="h-24 bg-gradient-to-r from-app-surface2 to-app-surface flex items-center justify-center">
                         <i className="fas fa-hotel text-3xl text-app-border"></i>
                    </div>
                    
                    <div className="p-5">
                        <h3 className="font-bold text-text-primary text-lg mb-1">{hotel.name}</h3>
                        <p className="text-text-muted text-xs mb-4">{hotel.address}</p>
                        
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-app-surface2 rounded-lg p-2 text-center">
                                <p className="text-[10px] text-text-muted uppercase">In</p>
                                <p className="text-sm font-bold text-text-primary">{hotel.checkIn}</p>
                            </div>
                            <div className="bg-app-surface2 rounded-lg p-2 text-center">
                                <p className="text-[10px] text-text-muted uppercase">Out</p>
                                <p className="text-sm font-bold text-text-primary">{hotel.checkOut}</p>
                            </div>
                        </div>

                         <button 
                            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name)}`, '_blank')}
                            className="w-full py-3 rounded-xl bg-text-primary text-app-bg text-sm font-bold hover:bg-gray-200 transition-colors"
                        >
                            View on Map
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Packing & Emergency Grid */}
      <div className="grid grid-cols-1 gap-8">
          <section>
            <h2 className="text-text-primary text-lg font-bold mb-4">Emergency</h2>
            <div className="grid grid-cols-1 gap-2">
                {EMERGENCY_CONTACTS.map((contact, idx) => (
                    <a key={idx} href={`tel:${contact.number}`} className="bg-app-surface p-4 rounded-2xl flex items-center justify-between border border-app-border/50 hover:border-accent-lime/50 transition-colors">
                         <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs">
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
            <h2 className="text-text-primary text-lg font-bold mb-4">Packing List</h2>
            <div className="bg-app-surface rounded-[2rem] p-5 border border-app-border/50">
                {PACKING_LIST.map((item, idx) => (
                    <label key={idx} className="flex items-center py-3 border-b border-app-border/30 last:border-0 cursor-pointer group">
                         <div className="relative flex items-center justify-center w-5 h-5">
                            <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-app-border rounded checked:bg-accent-lime checked:border-accent-lime transition-all" />
                            <i className="fas fa-check absolute text-app-bg text-[10px] opacity-0 peer-checked:opacity-100"></i>
                        </div>
                        <span className="ml-3 text-sm text-text-secondary peer-checked:text-text-muted peer-checked:line-through transition-colors">{item}</span>
                    </label>
                ))}
            </div>
          </section>
      </div>

    </div>
  );
};

export default InfoTab;