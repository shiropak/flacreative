import React, { useEffect, useState } from 'react';
import { Activity, ActivityType } from '../types';

interface ActivityDetailProps {
  activity: Activity;
  weather: { temp: string; icon: string }; // Receive weather info from parent
  onClose: () => void;
}

const FALLBACK_IMAGES: Record<string, string> = {
  [ActivityType.FOOD]: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80',
  [ActivityType.SIGHTSEEING]: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
  [ActivityType.SHOPPING]: 'https://images.unsplash.com/photo-1533025404451-826cb4c32b41?auto=format&fit=crop&w=800&q=80',
  [ActivityType.FLIGHT]: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
  [ActivityType.HOTEL]: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  [ActivityType.ACTIVITY]: 'https://images.unsplash.com/photo-1599707367072-cd6c66aa22f1?auto=format&fit=crop&w=800&q=80',
  'DEFAULT': 'https://images.unsplash.com/photo-1506665531195-3566aa2b4d43?auto=format&fit=crop&w=800&q=80'
};

const ActivityDetail: React.FC<ActivityDetailProps> = ({ activity, weather, onClose }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // LOGIC CHANGE: Only use image if URL exists.
  const displayImage = activity.imageUrl 
    ? (imgError ? (FALLBACK_IMAGES[activity.type] || FALLBACK_IMAGES.DEFAULT) : activity.imageUrl)
    : null;

  // Helper for Skeleton Loading
  const LoadingSkeleton = ({ className }: { className?: string }) => (
    <div className={`bg-white/5 animate-pulse rounded-lg ${className}`}></div>
  );

  const hasEnrichedData = !!activity.aiDescription;

  // Helper to nicely format bilingual titles
  const renderTitle = (title: string) => {
    // Attempt to split "English Name Chinese Name"
    const match = title.match(/^([a-zA-Z0-9\s\.\-\(\)&]+)\s+([\u4e00-\u9fa5].*)$/);
    
    if (match) {
        return (
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl md:text-4xl font-black text-white leading-none shadow-black drop-shadow-lg pr-4 break-words tracking-tight">
                    {match[1].trim()}
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-white/90 leading-tight shadow-black drop-shadow-lg tracking-wide">
                    {match[2].trim()}
                </h2>
            </div>
        );
    }
    
    return (
        <h1 className="text-3xl md:text-4xl font-black text-white leading-tight shadow-black drop-shadow-lg pr-4 break-words">
            {title}
        </h1>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-app-bg block overflow-y-auto animate-fadeIn h-full w-full">
      
      {/* Hero Image Area or Gradient Header */}
      <div className={`relative w-full flex-shrink-0 ${displayImage ? 'h-[50vh]' : 'pt-24 pb-10'}`}>
        {displayImage ? (
             <>
                <img 
                    src={displayImage} 
                    alt={activity.title} 
                    className="w-full h-full object-cover" 
                    onError={() => setImgError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-app-bg"></div>
             </>
        ) : (
             <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-app-surface2 via-app-surface to-app-bg z-0"></div>
        )}
        
        {/* Top Nav */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20">
            <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center border border-white/10 active:scale-90 transition-transform hover:bg-black/60"
            >
                <i className="fas fa-arrow-left"></i>
            </button>
            <div className="flex gap-3">
                 {/* Weather Widget */}
                 <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur border border-white/10 flex items-center gap-2">
                     <span className="text-lg leading-none">{weather.icon}</span>
                     <span className="text-white text-xs font-bold font-mono">{weather.temp}</span>
                 </div>
            </div>
        </div>

        {/* Title Overlay */}
        <div className={`${displayImage ? 'absolute bottom-0 left-0 w-full p-6 pb-10' : 'relative px-6'} z-10`}>
            <div className="flex gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-accent-lime/20 text-accent-lime text-xs font-bold border border-accent-lime/20 backdrop-blur-md">
                    {activity.type}
                </span>
                {activity.time && (
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold backdrop-blur-md">
                        {activity.time}
                    </span>
                )}
            </div>
            
            {renderTitle(activity.title)}

            <div className="flex flex-col gap-2 mt-4">
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <i className="fas fa-map-marker-alt text-accent-lime"></i>
                    {activity.location || 'Chiang Mai'}
                </div>
                {/* Opening Hours Badge or Loading */}
                {hasEnrichedData ? (
                    activity.openingHours && (
                        <div className="flex items-center gap-2 text-text-secondary text-xs">
                            <i className="far fa-clock text-accent-lime"></i>
                            <span>{activity.openingHours}</span>
                        </div>
                    )
                ) : (
                    <LoadingSkeleton className="h-4 w-32 mt-1" />
                )}
            </div>
        </div>
      </div>

      {/* Content Body */}
      <div className={`bg-app-bg ${displayImage ? '-mt-6 rounded-t-[2rem]' : '-mt-6 rounded-t-[2rem]'} relative z-10 px-6 pt-8 pb-40 space-y-4 min-h-[50vh] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]`}>
         
         {/* Introduction (Description) - Card Style */}
         <div className="bg-app-surface p-6 rounded-2xl border border-white/5">
             <div className="flex items-center gap-2 mb-3 text-accent-lime">
                 <i className="fas fa-circle-info"></i>
                 <span className="text-xs font-bold uppercase tracking-wider">行程說明</span>
             </div>
             {hasEnrichedData ? (
                 <p className="text-text-secondary leading-relaxed font-light text-justify text-sm">
                     {activity.aiDescription || "No description available yet."}
                 </p>
             ) : (
                 <div className="space-y-2">
                     <LoadingSkeleton className="h-4 w-full" />
                     <LoadingSkeleton className="h-4 w-5/6" />
                     <LoadingSkeleton className="h-4 w-4/6" />
                 </div>
             )}
         </div>

         {/* Important Reservation Info - Distinct Warning Card */}
         {activity.reservationInfo && (
             <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20">
                 <div className="flex items-center gap-2 mb-3 text-red-400">
                     <i className="fas fa-exclamation-circle"></i>
                     <span className="text-xs font-bold uppercase tracking-wider">訂位資訊</span>
                 </div>
                 <p className="text-red-200 text-sm leading-relaxed">{activity.reservationInfo}</p>
             </div>
         )}

         {/* Notes & Cautions - Card Style */}
         {hasEnrichedData ? (
             activity.notes && activity.notes.length > 0 && (
                 <div className="bg-app-surface p-6 rounded-2xl border border-white/5">
                     <div className="flex items-center gap-2 mb-3 text-yellow-500">
                         <i className="fas fa-triangle-exclamation"></i>
                         <span className="text-xs font-bold uppercase tracking-wider">注意事項</span>
                     </div>
                     <ul className="space-y-2">
                         {activity.notes.map((note, idx) => (
                             <li key={idx} className="flex items-start gap-3 text-sm text-text-secondary/80 leading-relaxed">
                                 <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500/50 flex-shrink-0"></span>
                                 <span>{note}</span>
                             </li>
                         ))}
                     </ul>
                 </div>
             )
         ) : null}

         {/* Must Eat - Card Style */}
         {(activity.type === ActivityType.FOOD || activity.type === ActivityType.SIGHTSEEING) && (
             <div className="bg-app-surface p-6 rounded-2xl border border-white/5">
                 <div className="flex items-center gap-2 mb-3 text-orange-400">
                     <i className="fas fa-utensils"></i>
                     <span className="text-xs font-bold uppercase tracking-wider">必吃美食 & 菜單</span>
                 </div>
                 {hasEnrichedData ? (
                     activity.mustEat && activity.mustEat.length > 0 ? (
                         <div className="flex flex-wrap gap-3">
                             {activity.mustEat?.map((item, idx) => (
                                 <span key={idx} className="px-4 py-2 bg-orange-500/10 text-orange-300 rounded-xl border border-orange-500/20 text-sm font-medium">
                                     {item}
                                 </span>
                             ))}
                         </div>
                     ) : <p className="text-sm text-text-muted italic">暫無推薦資訊</p>
                 ) : (
                     <div className="flex gap-2">
                         <LoadingSkeleton className="h-8 w-24 rounded-xl" />
                         <LoadingSkeleton className="h-8 w-32 rounded-xl" />
                     </div>
                 )}
             </div>
         )}

         {/* Must Buy - Card Style */}
         {(activity.type === ActivityType.SHOPPING || activity.type === ActivityType.SIGHTSEEING) && (
             <div className="bg-app-surface p-6 rounded-2xl border border-white/5">
                 <div className="flex items-center gap-2 mb-3 text-purple-400">
                     <i className="fas fa-gift"></i>
                     <span className="text-xs font-bold uppercase tracking-wider">必買伴手禮</span>
                 </div>
                 {hasEnrichedData ? (
                     activity.mustBuy && activity.mustBuy.length > 0 ? (
                         <div className="flex flex-wrap gap-3">
                             {activity.mustBuy?.map((item, idx) => (
                                 <span key={idx} className="px-4 py-2 bg-purple-500/10 text-purple-300 rounded-xl border border-purple-500/20 text-sm font-medium">
                                     {item}
                                 </span>
                             ))}
                         </div>
                     ) : <p className="text-sm text-text-muted italic">暫無推薦資訊</p>
                 ) : (
                     <div className="flex gap-2">
                         <LoadingSkeleton className="h-8 w-20 rounded-xl" />
                         <LoadingSkeleton className="h-8 w-28 rounded-xl" />
                     </div>
                 )}
             </div>
         )}
         
         {/* Tips - Card Style */}
         {hasEnrichedData ? (
             activity.tips && activity.tips.length > 0 && (
                 <div className="bg-app-surface p-6 rounded-2xl border border-white/5">
                     <div className="flex items-center gap-2 mb-3 text-accent-lime">
                         <i className="fas fa-lightbulb"></i>
                         <span className="text-xs font-bold uppercase tracking-wider">旅遊攻略</span>
                     </div>
                     <ul className="space-y-3">
                         {activity.tips?.map((tip, idx) => (
                             <li key={idx} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
                                 <i className="fas fa-check-circle text-accent-lime mt-1 opacity-70"></i>
                                 <span>{tip}</span>
                             </li>
                         ))}
                     </ul>
                 </div>
             )
         ) : null}

         {/* Map - Card Style */}
         {activity.location && (
             <div className="rounded-2xl overflow-hidden h-48 w-full map-dark relative border border-white/10 mt-4">
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(activity.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    allowFullScreen
                ></iframe>
             </div>
         )}

      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-app-bg/95 backdrop-blur-xl p-6 border-t border-white/5 z-50">
          <button 
             onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location || '')}`, '_blank')}
             className="w-full bg-accent-lime text-app-bg font-bold py-4 rounded-2xl shadow-glow text-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-[0.98]"
          >
              <i className="fas fa-location-arrow"></i> Start Navigation
          </button>
      </div>
    </div>
  );
};

export default ActivityDetail;