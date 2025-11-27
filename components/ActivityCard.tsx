import React, { useState } from 'react';
import { Activity, ActivityType } from '../types';

interface ActivityCardProps {
  activity: Activity;
  isLast: boolean;
  onClick: () => void;
}

const FALLBACK_IMAGES: Record<string, string> = {
  [ActivityType.FOOD]: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80', // Thai Food
  [ActivityType.SIGHTSEEING]: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80', // Thai Temple
  [ActivityType.SHOPPING]: 'https://images.unsplash.com/photo-1533025404451-826cb4c32b41?auto=format&fit=crop&w=800&q=80', // Market
  [ActivityType.FLIGHT]: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80', // Plane
  [ActivityType.HOTEL]: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', // Hotel
  [ActivityType.ACTIVITY]: 'https://images.unsplash.com/photo-1599707367072-cd6c66aa22f1?auto=format&fit=crop&w=800&q=80', // Thai Dress
  'DEFAULT': 'https://images.unsplash.com/photo-1506665531195-3566aa2b4d43?auto=format&fit=crop&w=800&q=80' // Nature
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, isLast, onClick }) => {
  const [imgError, setImgError] = useState(false);

  const getIcon = (type: ActivityType) => {
    switch (type) {
      case ActivityType.FLIGHT: return 'fa-plane-departure';
      case ActivityType.FOOD: return 'fa-utensils';
      case ActivityType.SIGHTSEEING: return 'fa-camera';
      case ActivityType.SHOPPING: return 'fa-bag-shopping';
      case ActivityType.HOTEL: return 'fa-bed';
      case ActivityType.ACTIVITY: return 'fa-ticket-simple';
      default: return 'fa-location-dot';
    }
  };

  // Helper to determine travel mode icon based on text content
  const getTravelModeIcon = (timeString: string) => {
      if (timeString.includes('✈') || timeString.toLowerCase().includes('flight')) return 'fa-plane';
      if (timeString.includes('🚶') || timeString.toLowerCase().includes('walk')) return 'fa-person-walking';
      return 'fa-car-side';
  };

  // Helper to remove emojis and symbols, keeping only text, numbers, dots and colons
  const cleanDuration = (timeString: string) => {
      return timeString.replace(/[^a-zA-Z0-9\s\.:]/g, '').trim();
  };

  // Determine which image to show
  // LOGIC CHANGE: Only show image if URL exists. If URL exists but errors, show fallback.
  // If URL is undefined/empty, show NO image (text card).
  const displayImage = activity.imageUrl 
    ? (imgError ? (FALLBACK_IMAGES[activity.type] || FALLBACK_IMAGES.DEFAULT) : activity.imageUrl)
    : null;

  return (
    <div className="relative flex group cursor-pointer w-full" onClick={onClick}>
      {/* Left Timeline Column */}
      <div className="flex flex-col items-center mr-4 min-w-[3.5rem] flex-shrink-0">
        {/* Time */}
        <span className="text-accent-lime font-mono font-bold text-xs mb-2">{activity.time}</span>
        
        {/* Icon Dot */}
        <div className="w-8 h-8 rounded-full bg-app-surface2 flex items-center justify-center text-text-secondary shadow-md z-10 group-hover:bg-accent-lime group-hover:text-app-bg transition-colors duration-300 border border-white/5">
           <i className={`fas ${getIcon(activity.type)} text-xs`}></i>
        </div>
        
        {/* Vertical Connector Line with Travel Time */}
        {!isLast && (
          <div className="flex-1 flex flex-col items-center w-full my-1 min-h-[40px]">
             {/* The Line */}
             <div className="w-[2px] bg-white/10 h-full relative"></div>
             
             {/* Travel Time Pill - Absolute centered on the line */}
             {activity.estimatedTravelTime && (
                <div className="absolute top-1/2 -translate-y-1/2 bg-app-bg border border-accent-lime/30 rounded-full px-2 py-1 z-20 shadow-lg">
                    <span className="text-[9px] text-accent-lime whitespace-nowrap flex items-center gap-1 font-bold tracking-tighter">
                         {/* Unified Icon Logic */}
                         <i className={`fas ${getTravelModeIcon(activity.estimatedTravelTime)} text-[8px]`}></i>
                         {/* Cleaned Text Logic (No Emojis) */}
                         {cleanDuration(activity.estimatedTravelTime)}
                    </span>
                </div>
             )}
          </div>
        )}
      </div>

      {/* Card Content - VERTICAL LAYOUT (Image Top, Text Bottom) */}
      <div className="flex-1 pb-8 min-w-0">
         <div className="bg-app-surface rounded-[1.5rem] border border-white/5 shadow-lg hover:border-accent-lime/50 transition-all duration-300 overflow-hidden group-active:scale-[0.99] w-full flex flex-col">
             
             {/* Image Header (Conditional) */}
             {displayImage ? (
                 <div className="w-full h-48 bg-app-surface2 relative overflow-hidden">
                     <img 
                        src={displayImage}
                        alt={activity.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        loading="lazy" 
                        onError={() => setImgError(true)}
                     />
                     <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                            {activity.type}
                        </span>
                     </div>
                 </div>
             ) : null}

             {/* Text Content Body */}
             <div className="p-5 flex flex-col gap-3">
                 <div>
                    <h3 className="text-lg font-bold text-text-primary leading-tight group-hover:text-accent-lime transition-colors">
                        {activity.title}
                    </h3>
                    {(activity.location || activity.originalDescription) && (
                        <p className="text-xs text-text-secondary mt-1 flex items-center gap-1">
                            <i className="fas fa-map-marker-alt text-accent-lime/70"></i>
                            {activity.location || activity.originalDescription}
                        </p>
                    )}
                 </div>

                 {/* AI Tags Display Area - Safely Mapped */}
                 {(activity.mustEat?.length || activity.mustBuy?.length || activity.tips?.length) ? (
                     <div className="flex flex-wrap gap-2 mt-1">
                         {activity.mustEat?.slice(0, 3).map((food, i) => (
                             <span key={`food-${i}`} className="text-[10px] px-2 py-1 bg-orange-500/10 text-orange-300 rounded-md border border-orange-500/20 truncate max-w-full">
                                 <i className="fas fa-utensils text-[8px] mr-1 opacity-70"></i>{food}
                             </span>
                         ))}
                         {activity.mustBuy?.slice(0, 2).map((item, i) => (
                             <span key={`buy-${i}`} className="text-[10px] px-2 py-1 bg-purple-500/10 text-purple-300 rounded-md border border-purple-500/20 truncate max-w-full">
                                 <i className="fas fa-gift text-[8px] mr-1 opacity-70"></i>{item}
                             </span>
                         ))}
                         {activity.tips && activity.tips.length > 0 && (
                              <span className="text-[10px] px-2 py-1 bg-blue-500/10 text-blue-300 rounded-md border border-blue-500/20 truncate max-w-full">
                                 <i className="fas fa-lightbulb text-[8px] mr-1 opacity-70"></i>攻略
                             </span>
                         )}
                     </div>
                 ) : null}

                 {/* View Details Link */}
                 <div className="flex justify-between items-center pt-2 border-t border-white/5 mt-1">
                     <span className="text-[10px] text-text-muted">Tap for details</span>
                     <i className="fas fa-arrow-right text-accent-lime text-xs group-hover:translate-x-1 transition-transform"></i>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default ActivityCard;