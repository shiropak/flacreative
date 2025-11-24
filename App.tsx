
import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_SCHEDULE } from './constants';
import { DaySchedule, Activity } from './types';
import ActivityCard from './components/ActivityCard';
import ActivityDetail from './components/ActivityDetail';
import InfoTab from './components/InfoTab';
import { enrichActivity, predictWeather, QuotaExceededError } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'info'>('schedule');
  const [schedule, setSchedule] = useState<DaySchedule[]>(INITIAL_SCHEDULE);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  
  const enrichmentStarted = useRef(false);

  // Weather Prediction & AI Enrichment Logic
  useEffect(() => {
    const processEnrichment = async () => {
        if (enrichmentStarted.current) return;
        enrichmentStarted.current = true;

        const newSchedule = [...schedule];
        
        // 1. Predict Weather for each day
        for (let i = 0; i < newSchedule.length; i++) {
             // Always fetch prediction if it's the placeholder, or to ensure sync
             if (newSchedule[i].weatherRange === 'Loading...' || newSchedule[i].weatherIcon === '⏳') {
                 const prediction = await predictWeather(newSchedule[i].date);
                 newSchedule[i].weatherRange = prediction.range;
                 newSchedule[i].weatherIcon = prediction.icon;
                 setSchedule([...newSchedule]); // Update UI immediately after each day resolves
                 await new Promise(r => setTimeout(r, 300)); // Small delay for effect
             }
        }

        // 2. Enrich Activities
        for (let dayIdx = 0; dayIdx < newSchedule.length; dayIdx++) {
            let previousLoc = "The Raintree Hotel Chiang Mai";
            if (dayIdx === 0) previousLoc = "Chiang Mai International Airport";
            
            const day = newSchedule[dayIdx];
            const activities = [...day.activities];
            
            for (let actIdx = 0; actIdx < activities.length; actIdx++) {
                const activity = activities[actIdx];
                
                // Skip if already enriched
                if (activity.aiDescription) {
                    if (activity.location) previousLoc = activity.location;
                    continue;
                }

                try {
                    const startTime = Date.now();
                    const enriched = await enrichActivity(activity, previousLoc);
                    const duration = Date.now() - startTime;
                    
                    if (Object.keys(enriched).length > 0) {
                        // Merge enriched data
                        activities[actIdx] = { 
                            ...activity, 
                            ...enriched,
                            // Prefer AI travel time, fallback to static
                            estimatedTravelTime: enriched.estimatedTravelTime || activity.estimatedTravelTime 
                        };
                        newSchedule[dayIdx].activities = activities;
                        setSchedule([...newSchedule]);
                    }
                    
                    if (activities[actIdx].location) {
                        previousLoc = activities[actIdx].location!;
                    }

                    // Rate limiting delay
                    if (duration > 500) {
                         await new Promise(r => setTimeout(r, 2000));
                    } else {
                         await new Promise(r => setTimeout(r, 100)); 
                    }

                } catch (error) {
                    if (error instanceof QuotaExceededError) {
                        return;
                    }
                }
            }
        }
    };

    processEnrichment();
  }, []);

  // Safety check
  if (!schedule || schedule.length === 0) {
      return <div className="min-h-screen bg-app-bg flex items-center justify-center text-white">Loading Itinerary...</div>;
  }

  const currentDay = schedule[selectedDayIndex] || schedule[0];

  return (
    <div className="min-h-screen w-full bg-app-bg text-text-primary pb-28 relative overflow-x-hidden">
      
      {/* Detail View Overlay */}
      {selectedActivity && (
          <ActivityDetail 
              activity={selectedActivity} 
              weather={{
                temp: currentDay.weatherRange,
                icon: currentDay.weatherIcon || '⛅'
              }}
              onClose={() => setSelectedActivity(null)} 
          />
      )}

      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-app-surface2/30 to-app-bg pointer-events-none z-0"></div>
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-accent-lime/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Top Header Area */}
      <div className="relative z-10 pt-10 px-5 pb-2">
          <div className="flex justify-between items-start mb-6">
              <div>
                  <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-3xl font-extrabold tracking-tight">Travel Itinerary</h1>
                  </div>
                  <p className="text-text-secondary text-sm font-medium">Nov 28 - Dec 02 • Chiang Mai</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-app-surface border border-app-border flex items-center justify-center shadow-lg">
                  <i className="fas fa-user text-text-secondary text-sm"></i>
              </div>
          </div>

          {/* Circular Date Selector */}
          {activeTab === 'schedule' && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
                  {schedule.map((day, idx) => (
                      <button
                          key={day.date}
                          onClick={() => setSelectedDayIndex(idx)}
                          className={`flex-shrink-0 w-[4.2rem] h-[5.5rem] rounded-[1.8rem] flex flex-col items-center justify-center gap-1 transition-all duration-300 group ${
                              idx === selectedDayIndex 
                              ? 'bg-accent-lime shadow-glow scale-105' 
                              : 'bg-app-surface border border-app-border/50 hover:border-accent-lime/30'
                          }`}
                      >
                          <span className={`text-2xl font-bold ${idx === selectedDayIndex ? 'text-text-inverse' : 'text-text-primary group-hover:text-accent-lime'}`}>
                             {idx + 1}
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${idx === selectedDayIndex ? 'text-text-inverse/70' : 'text-text-secondary'}`}>
                             Day
                          </span>
                      </button>
                  ))}
              </div>
          )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 pt-4">
          {activeTab === 'schedule' ? (
              <div className="animate-fadeIn">
                  {/* Info Badge Row */}
                  <div className="flex items-center gap-3 mb-6 overflow-x-auto no-scrollbar">
                       <div className="flex items-center gap-2 px-4 py-2 bg-app-surface2/50 backdrop-blur rounded-full border border-app-border/30 whitespace-nowrap">
                            <i className="fas fa-calendar text-accent-lime text-xs"></i>
                            <span className="text-xs font-medium text-text-primary">{currentDay.fullDate}</span>
                       </div>
                       <div className="flex items-center gap-2 px-4 py-2 bg-app-surface2/50 backdrop-blur rounded-full border border-app-border/30 whitespace-nowrap min-w-[5rem] justify-center transition-all duration-500">
                            <span className="text-sm">{currentDay.weatherIcon}</span>
                            <span className="text-xs font-medium text-text-primary">{currentDay.weatherRange}</span>
                       </div>
                       <div className="flex items-center gap-2 px-4 py-2 bg-app-surface2/50 backdrop-blur rounded-full border border-app-border/30 whitespace-nowrap">
                            <i className="fas fa-tshirt text-accent-lime text-xs"></i>
                            <span className="text-xs font-medium text-text-primary">{currentDay.dressCode}</span>
                       </div>
                  </div>

                  {/* Activity List */}
                  <div className="pb-4 space-y-2">
                      {currentDay.activities.map((activity, idx) => (
                          <ActivityCard 
                              key={activity.id} 
                              activity={activity} 
                              isLast={idx === currentDay.activities.length - 1} 
                              onClick={() => setSelectedActivity(activity)}
                          />
                      ))}
                  </div>
              </div>
          ) : (
              <InfoTab />
          )}
      </div>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-8 left-0 w-full flex justify-center z-40 pointer-events-none">
          <div className="pointer-events-auto bg-[#1E1E1E]/80 border border-white/10 p-1.5 rounded-full shadow-2xl flex items-center gap-1 backdrop-blur-xl">
              <button 
                  onClick={() => setActiveTab('schedule')}
                  className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                    activeTab === 'schedule' 
                    ? 'bg-accent-lime text-text-inverse shadow-glow' 
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
              >
                  <i className="fas fa-map-location-dot text-sm"></i>
                  <span className="text-sm font-bold">Itinerary</span>
              </button>
              
              <button 
                  onClick={() => setActiveTab('info')}
                  className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                    activeTab === 'info' 
                    ? 'bg-accent-lime text-text-inverse shadow-glow' 
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
              >
                  <i className="fas fa-suitcase text-sm"></i>
                  <span className="text-sm font-bold">Guide</span>
              </button>
          </div>
      </div>

    </div>
  );
};

export default App;
