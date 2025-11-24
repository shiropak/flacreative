import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_SCHEDULE } from './constants';
import { DaySchedule } from './types';
import ActivityCard from './components/ActivityCard';
import InfoTab from './components/InfoTab';
import { enrichActivity } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'info'>('schedule');
  const [schedule, setSchedule] = useState<DaySchedule[]>(INITIAL_SCHEDULE);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const enrichmentStarted = useRef(false);

  // Scroll to top when day changes
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedDayIndex, activeTab]);

  // AI Enrichment Logic
  useEffect(() => {
    const processEnrichment = async () => {
        if (enrichmentStarted.current) return;
        enrichmentStarted.current = true;

        const newSchedule = [...schedule];
        
        // Loop through days
        for (let dayIdx = 0; dayIdx < newSchedule.length; dayIdx++) {
            let previousLoc = "The Raintree Hotel Chiang Mai";
            if (dayIdx === 0) previousLoc = "Chiang Mai International Airport";
            
            const day = newSchedule[dayIdx];
            const activities = [...day.activities];
            
            // Loop through activities
            for (let actIdx = 0; actIdx < activities.length; actIdx++) {
                const activity = activities[actIdx];
                
                // Skip if already enriched or simple items to save quota
                if (activity.aiDescription || activity.type === 'FLIGHT') {
                    if (activity.location) previousLoc = activity.location;
                    continue;
                }

                // Call API
                const enriched = await enrichActivity(activity, previousLoc);
                
                // Update state immediately to show progress
                activities[actIdx] = { ...activity, ...enriched };
                newSchedule[dayIdx].activities = activities;
                setSchedule([...newSchedule]);
                
                // Update location for next iteration
                if (activities[actIdx].location) {
                    previousLoc = activities[actIdx].location!;
                }

                // Rate Limit Protection:
                // Free tier is approx 15 RPM (1 req / 4 sec). 
                // We wait 5 seconds to be safe. 
                // The service also has retry logic for 429s.
                await new Promise(r => setTimeout(r, 5000));
            }
        }
    };

    if (process.env.API_KEY) {
        processEnrichment();
    }
  }, []);

  const currentDay = schedule[selectedDayIndex];

  return (
    <div className="h-screen w-full flex flex-col bg-forest-900 font-sans overflow-hidden">
      
      {/* Background Image Layer (Top 45%) */}
      <div className="absolute top-0 left-0 w-full h-[50%] z-0">
         {/* Using a high quality Unsplash image for the "La Selva" deep jungle vibe */}
         <img 
            src="https://images.unsplash.com/photo-1534008753122-a837cf46d24c?q=80&w=1200&auto=format&fit=crop" 
            alt="Chiang Mai Nature" 
            className="w-full h-full object-cover opacity-80"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-forest-900/30 via-transparent to-forest-900"></div>
         {/* Subtle overlay to ensure text readability if header overlaps */}
         <div className="absolute inset-0 bg-forest-900/20"></div>
      </div>

      {/* Main Container - z-10 ensures it sits above bg */}
      <div className="flex-1 flex flex-col z-10 h-full relative">
        
        {/* Header Section */}
        <header className="px-6 pt-14 pb-4 flex-shrink-0">
            <div className="flex justify-between items-center mb-8">
                <div className="animate-fadeIn">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-white/20 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-white tracking-widest uppercase">2025 Trip</span>
                    </div>
                    <h1 className="text-white text-4xl font-bold tracking-tight drop-shadow-lg">Chiang Mai</h1>
                    <p className="text-forest-100 text-sm font-medium tracking-wide opacity-90 mt-1">FLA Creative Employee Travel</p>
                </div>
                <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                    <i className="fas fa-leaf text-white text-sm"></i>
                </div>
            </div>

            {/* Day Selector - Horizontal Scroll Pills */}
            {activeTab === 'schedule' && (
                <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2 animate-fadeIn" style={{animationDelay: '0.1s'}}>
                    {schedule.map((day, idx) => (
                        <button
                            key={day.date}
                            onClick={() => setSelectedDayIndex(idx)}
                            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
                                idx === selectedDayIndex 
                                ? 'bg-white text-forest-900 border-white shadow-lg transform scale-105' 
                                : 'bg-forest-900/30 text-white border-white/20 hover:bg-white/10'
                            }`}
                        >
                            <span className="block text-[10px] uppercase opacity-70 leading-none mb-0.5">{day.dayLabel}</span>
                            <span>{day.fullDate}</span>
                        </button>
                    ))}
                </div>
            )}
        </header>

        {/* Content Sheet - Slides up from bottom */}
        <div className="flex-1 bg-[#F4F6F4] rounded-t-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative mt-2 sheet-container animate-slideUp">
            
            {/* Handle Bar (Visual cue) */}
            <div className="w-full flex justify-center pt-4 pb-2 flex-shrink-0" onClick={() => {}}>
                <div className="w-12 h-1.5 bg-gray-300 rounded-full opacity-40"></div>
            </div>

            {/* Scrollable Content Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar px-5 pb-32 pt-2">
                
                {activeTab === 'schedule' ? (
                    <>
                        {/* Day Header Info */}
                        <div className="flex items-start justify-between mb-8 px-2 mt-2">
                            <div>
                                <h2 className="text-3xl font-bold text-forest-900 tracking-tight">Today's Plan</h2>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm border border-gray-100">
                                        <i className="fas fa-temperature-half text-orange-400"></i> {currentDay.weatherRange}
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm border border-gray-100">
                                        <i className="fas fa-tshirt text-indigo-400"></i> {currentDay.dressCode.split(' ')[0]}
                                    </span>
                                </div>
                            </div>
                            <div className="text-4xl filter drop-shadow-sm">
                                {currentDay.weatherRange.includes('雨') ? '🌧️' : '🌤️'}
                            </div>
                        </div>

                        {/* Activities List */}
                        <div className="space-y-1">
                            {currentDay.activities.map((activity, idx) => (
                                <ActivityCard 
                                    key={activity.id} 
                                    activity={activity} 
                                    isLast={idx === currentDay.activities.length - 1} 
                                />
                            ))}
                        </div>
                        
                        {/* End of Day decoration */}
                        <div className="flex flex-col items-center justify-center py-10 opacity-30">
                            <i className="fas fa-moon text-forest-800 text-2xl mb-2"></i>
                            <span className="text-xs font-mono text-forest-800">End of {currentDay.dayLabel}</span>
                        </div>
                    </>
                ) : (
                    <InfoTab />
                )}
            </div>

            {/* Bottom Navigation Overlay (Gradient fade for scroll) */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F4F6F4] via-[#F4F6F4]/90 to-transparent pointer-events-none"></div>
        </div>

      </div>

      {/* Floating Bottom Navigation Bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[85%] max-w-[320px] glass-nav rounded-full shadow-float p-1.5 z-50 flex justify-between items-center">
          <button 
             onClick={() => setActiveTab('schedule')}
             className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full transition-all duration-500 relative overflow-hidden ${activeTab === 'schedule' ? 'text-white' : 'text-gray-400 hover:text-gray-600'}`}
          >
             {activeTab === 'schedule' && (
                 <div className="absolute inset-0 bg-forest-800 rounded-full shadow-inner"></div>
             )}
             <span className="relative z-10 flex items-center gap-2">
                 <i className={`fas fa-compass text-lg ${activeTab === 'schedule' ? 'animate-pulse' : ''}`}></i>
                 {activeTab === 'schedule' && <span className="text-xs font-bold tracking-wide">行程</span>}
             </span>
          </button>
          
          <button 
             onClick={() => setActiveTab('info')}
             className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full transition-all duration-500 relative overflow-hidden ${activeTab === 'info' ? 'text-white' : 'text-gray-400 hover:text-gray-600'}`}
          >
             {activeTab === 'info' && (
                 <div className="absolute inset-0 bg-forest-800 rounded-full shadow-inner"></div>
             )}
             <span className="relative z-10 flex items-center gap-2">
                 <i className={`fas fa-book-open text-lg ${activeTab === 'info' ? 'animate-pulse' : ''}`}></i>
                 {activeTab === 'info' && <span className="text-xs font-bold tracking-wide">資訊</span>}
             </span>
          </button>
      </div>

    </div>
  );
};

export default App;