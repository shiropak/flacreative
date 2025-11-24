
import React from 'react';
import { Activity, ActivityType } from '../types';

interface ActivityCardProps {
  activity: Activity;
  isLast: boolean;
  onClick: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, isLast, onClick }) => {
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
                         {activity.estimatedTravelTime.includes('✈') ? '' : <i className="fas fa-car-side text-[8px]"></i>}
                         {activity.estimatedTravelTime}
                    </span>
                </div>
             )}
          </div>
        )}
      </div>

      {/* Card Content - VERTICAL LAYOUT (Image Top, Text Bottom) */}
      <div className="flex-1 pb-8 min-w-0">
         <div className="bg-app-surface rounded-[1.5rem] border border-white/5 shadow-lg hover:border-accent-lime/50 transition-all duration-300 overflow-hidden group-active:scale-[0.99] w-full flex flex-col">
             
             {/* Image Header (Full Width) */}
             <div className="w-full h-48 bg-app-surface2 relative overflow-hidden">
                 {activity.imageUrl ? (
                     <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                 ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-600"><i className="fas fa-image text-3xl"></i></div>
                 )}
                 
                 {/* Type Badge Overlay */}
                 <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                        {activity.type}
                    </span>
                 </div>
             </div>

             {/* Text Content Body */}
             <div className="p-5 flex flex-col gap-3">
                 <div>
                    <h3 className="text-lg font-bold text-text-primary leading-tight group-hover:text-accent-lime transition-colors">
                        {activity.title}
                    </h3>
                    <p className="text-xs text-text-secondary mt-1 flex items-center gap-1">
                        <i className="fas fa-map-marker-alt text-accent-lime/70"></i>
                        {activity.location || activity.originalDescription}
                    </p>
                 </div>

                 {/* AI Tags Display Area */}
                 <div className="flex flex-wrap gap-2 mt-1">
                     {activity.mustEat && activity.mustEat.slice(0, 3).map((food, i) => (
                         <span key={`food-${i}`} className="text-[10px] px-2 py-1 bg-orange-500/10 text-orange-300 rounded-md border border-orange-500/20 truncate max-w-full">
                             <i className="fas fa-utensils text-[8px] mr-1 opacity-70"></i>{food}
                         </span>
                     ))}
                     {activity.mustBuy && activity.mustBuy.slice(0, 2).map((item, i) => (
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
