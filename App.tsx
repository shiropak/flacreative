import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_SCHEDULE } from './constants';
import { DaySchedule } from './types';
import ActivityCard from './components/ActivityCard';
import InfoTab from './components/InfoTab';
import { enrichActivity, QuotaExceededError } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'info'>('schedule');
  const [schedule, setSchedule] = useState<DaySchedule[]>(INITIAL_SCHEDULE);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const enrichmentStarted = useRef(false);

  // AI Enrichment Logic (Preserved from previous safe version)
  useEffect(() => {
    const processEnrichment = async () => {
        if (enrichmentStarted.current) return;
        enrichmentStarted.current = true;

        const newSchedule = [...schedule];
        
        for (let dayIdx = 0; dayIdx < newSchedule.length; dayIdx++) {
            let previousLoc = "The Raintree Hotel Chiang Mai";
            if (dayIdx === 0) previousLoc = "Chiang Mai International Airport";
            
            const day = newSchedule[dayIdx];
            const activities = [...day.activities];
            
            for (let actIdx = 0; actIdx < activities.length; actIdx++) {
                const activity = activities[actIdx];
                
                if (activity.aiDescription) {
                    if (activity.location) previousLoc = activity.location;
                    continue;
                }

                try {
                    const startTime = Date.now();
                    const enriched = await enrichActivity(activity, previousLoc);
                    const duration = Date.now() - startTime;
                    
                    if (Object.keys(enriched).length > 0) {
                        activities[actIdx] = { ...activity, ...enriched };
                        newSchedule[dayIdx].activities = activities;
                        setSchedule([...newSchedule]);
                    }
                    
                    if (activities[actIdx].location) {
                        previousLoc = activities[actIdx].location!;
                    }

                    if (duration > 500) {
                         await new Promise(r => setTimeout(r, 4000));
                    } else {
                         await new Promise(r => setTimeout(r, 50)); 
                    }

                } catch (error) {
                    if (error instanceof QuotaExceededError) {
                        console.warn("🛑 Daily Quota Exceeded.");
                        return;
                    }
                    console.error("Enrichment error", error);
                }
            }
        }
    };

    if (process.env.API_KEY) {
        processEnrichment();
    }
  }, []);

  const currentDay = schedule[selectedDayIndex];

  return (
    <div className="min-h-screen w-full bg-app-bg text-text-primary pb-24 relative">
      
      {/* Top Header Area */}
      <div className="pt-14 px-6 pb-4 sticky top-0 bg-app-bg/95 backdrop-blur z-30 border-b border-app-border/30">
          <div className="flex justify-between items-center mb-6">
              <div>
                  <p className="text-accent-lime text-xs font-bold uppercase tracking-widest mb-1">FLA Creative</p>
                  <h1 className="text-3xl font-bold">Chiang Mai</h1>
              </div>
              <div className="w-10 h-10 rounded-full bg-app-surface2 border border-app-border flex items-center justify-center">
                  <i className="fas fa-user text-text-secondary text-sm"></i>
              </div>
          </div>

          {/* Search/Tabs Bar Style Date Selector */}
          {activeTab === 'schedule' && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                  {schedule.map((day, idx) => (
                      <button
                          key={day.date}
                          onClick={() => setSelectedDayIndex(idx)}
                          className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                              idx === selectedDayIndex 
                              ? 'bg-accent-lime text-app-bg font-bold' 
                              : 'bg-app-surface text-text-secondary border border-app-border'
                          }`}
                      >
                          {day.dayLabel}
                      </button>
                  ))}
              </div>
          )}
      </div>

      {/* Main Content */}
      <div className="px-6 pt-6">
          {activeTab === 'schedule' ? (
              <div className="animate-fadeIn">
                  {/* Day Highlights Card */}
                  <div className="mb-8 bg-gradient-to-br from-app-surface2 to-app-bg border border-app-border rounded-[2rem] p-6 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-accent-lime/10 blur-3xl rounded-full"></div>
                       
                       <div className="relative z-10 flex justify-between items-end">
                            <div>
                                <div className="text-5xl font-light mb-1 text-white">{currentDay.fullDate}</div>
                                <div className="text-text-secondary text-sm font-medium">{currentDay.date.split('-')[0]}</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="px-3 py-2 bg-app-surface rounded-xl border border-app-border flex flex-col items-center min-w-[60px]">
                                    <i className="fas fa-temperature-half text-orange-400 text-xs mb-1"></i>
                                    <span className="text-xs font-bold">{currentDay.weatherRange}</span>
                                </div>
                                <div className="px-3 py-2 bg-app-surface rounded-xl border border-app-border flex flex-col items-center min-w-[60px]">
                                    <i className="fas fa-tshirt text-accent-cyan text-xs mb-1"></i>
                                    <span className="text-xs font-bold truncate w-full text-center">{currentDay.dressCode.split(' ')[0]}</span>
                                </div>
                            </div>
                       </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                      <span className="text-text-muted text-xs font-bold uppercase tracking-wider">Timeline</span>
                      <div className="h-px bg-app-border flex-1"></div>
                  </div>

                  {/* Activity List */}
                  <div className="pb-10">
                      {currentDay.activities.map((activity, idx) => (
                          <ActivityCard 
                              key={activity.id} 
                              activity={activity} 
                              isLast={idx === currentDay.activities.length - 1} 
                          />
                      ))}
                  </div>
              </div>
          ) : (
              <InfoTab />
          )}
      </div>

      {/* Bottom Floating Nav */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-auto z-50">
          <div className="glass-nav rounded-full p-1.5 flex items-center shadow-glass">
              <button 
                  onClick={() => setActiveTab('schedule')}
                  className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${activeTab === 'schedule' ? 'bg-text-primary text-app-bg' : 'text-text-secondary hover:text-white'}`}
              >
                  <i className="fas fa-map"></i>
                  {activeTab === 'schedule' && <span className="text-sm font-bold">Plan</span>}
              </button>
              <button 
                  onClick={() => setActiveTab('info')}
                  className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${activeTab === 'info' ? 'bg-text-primary text-app-bg' : 'text-text-secondary hover:text-white'}`}
              >
                  <i className="fas fa-info-circle"></i>
                  {activeTab === 'info' && <span className="text-sm font-bold">Info</span>}
              </button>
          </div>
      </div>

    </div>
  );
};

export default App;