import React from 'react';
import { FLIGHTS, HOTELS, PACKING_LIST, EMERGENCY_CONTACTS } from '../constants';

const InfoTab: React.FC = () => {
  return (
    <div className="space-y-8 pb-32 px-1 animate-slideUp">
      
      {/* Flight Section */}
      <section>
        <h2 className="text-gray-900 text-lg font-bold mb-4 px-2 flex items-center gap-2">
            <i className="fas fa-plane text-forest-600 text-sm"></i> 航班資訊
        </h2>
        <div className="space-y-4">
          {FLIGHTS.map((flight, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-6 shadow-soft relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-40 h-40 bg-sky-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60 pointer-events-none group-hover:opacity-80 transition-opacity"></div>
               
               <div className="relative z-10">
                   <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Airline</span>
                            <span className="text-base font-bold text-gray-900">{flight.airline}</span>
                        </div>
                        <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-lg text-xs font-bold font-mono tracking-wide">{flight.flightNo}</span>
                   </div>

                   <div className="flex items-center justify-between gap-2 mb-6">
                        <div className="text-center min-w-[3rem]">
                            <div className="text-3xl font-black text-gray-900">{flight.route.split('➔')[0].split(' ')[1]}</div>
                            <div className="text-[10px] text-gray-400 font-bold mt-1 bg-gray-50 rounded-full py-0.5">TPE</div>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center px-2">
                            <span className="text-[10px] text-gray-400 mb-1 font-medium">{flight.duration}</span>
                            <div className="w-full flex items-center gap-2">
                                <div className="h-[2px] bg-gray-100 flex-1 rounded-full"></div>
                                <i className="fas fa-plane text-gray-300 text-xs transform rotate-90"></i>
                                <div className="h-[2px] bg-gray-100 flex-1 rounded-full"></div>
                            </div>
                        </div>

                        <div className="text-center min-w-[3rem]">
                            <div className="text-3xl font-black text-gray-900">{flight.route.split('➔')[1].split(' ')[1]}</div>
                             <div className="text-[10px] text-gray-400 font-bold mt-1 bg-gray-50 rounded-full py-0.5">CNX</div>
                        </div>
                   </div>

                   <div className="flex justify-between text-sm font-medium text-gray-600 bg-gray-50/80 rounded-xl p-3">
                        <span>{flight.time.split('➔')[0].split(' ')[1]}</span>
                        <span>{flight.time.split('➔')[1].trim()}</span>
                   </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hotel Section */}
      <section>
        <h2 className="text-gray-900 text-lg font-bold mb-4 px-2 flex items-center gap-2">
            <i className="fas fa-hotel text-forest-600 text-sm"></i> 住宿資訊
        </h2>
        <div className="space-y-4">
            {HOTELS.map((hotel, idx) => (
                <div key={idx} className="bg-white rounded-[2rem] p-6 shadow-soft group">
                    <div className="flex items-start gap-4 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                            <i className="fas fa-hotel text-indigo-500 text-lg"></i>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg leading-tight">{hotel.name}</h3>
                            <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">{hotel.address}</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-1">Check-in</p>
                            <p className="text-sm font-bold text-gray-900">{hotel.checkIn}</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-1">Check-out</p>
                            <p className="text-sm font-bold text-gray-900">{hotel.checkOut}</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name)}`, '_blank')}
                        className="w-full py-3.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
                    >
                        <i className="fas fa-map-location-dot"></i> 看地圖
                    </button>
                </div>
            ))}
        </div>
      </section>

      {/* Emergency Contacts */}
      <section>
        <h2 className="text-gray-900 text-lg font-bold mb-4 px-2 flex items-center gap-2">
            <i className="fas fa-kit-medical text-red-500 text-sm"></i> 緊急聯絡
        </h2>
        <div className="bg-white rounded-[2rem] p-3 shadow-soft divide-y divide-gray-50">
            {EMERGENCY_CONTACTS.map((contact, idx) => (
                <a key={idx} href={`tel:${contact.number}`} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                            <i className="fas fa-phone text-sm"></i>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm">{contact.name}</p>
                            <p className="text-gray-400 text-xs font-mono mt-0.5">{contact.number}</p>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm">
                        <i className="fas fa-chevron-right text-gray-300 text-xs"></i>
                    </div>
                </a>
            ))}
        </div>
      </section>

      {/* Packing List */}
      <section>
        <h2 className="text-gray-900 text-lg font-bold mb-4 px-2 flex items-center gap-2">
            <i className="fas fa-suitcase-rolling text-forest-600 text-sm"></i> 行李檢查
        </h2>
        <div className="bg-white rounded-[2rem] p-5 shadow-soft">
            <div className="space-y-1">
                {PACKING_LIST.map((item, idx) => (
                    <label key={idx} className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                            <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-forest-600 checked:border-forest-600 transition-all" />
                            <i className="fas fa-check absolute text-white text-[10px] opacity-0 peer-checked:opacity-100 pointer-events-none transform scale-50 peer-checked:scale-100 transition-transform"></i>
                        </div>
                        <span className="ml-3.5 text-sm text-gray-700 font-medium peer-checked:text-gray-400 peer-checked:line-through transition-all select-none">{item}</span>
                    </label>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default InfoTab;