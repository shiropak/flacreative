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
    <div className="relative flex group cursor-pointer" onClick={onClick}>
      {/* Left Timeline Column */}
      <div className="flex flex-col items-center mr-4 min-w-[4rem]">
        {/* Time */}
        <span className="text-accent-lime font-mono font-bold text-sm mb-2">{activity.time}</span>
        
        {/* Icon Dot */}
        <div className="w-10 h-10 rounded-full bg-app-surface2 flex items-center justify-center text-text-secondary shadow-md z-10 group-hover:bg-accent-lime group-hover:text-app-bg transition-colors duration-300">
           <i className={`fas ${getIcon(activity.type)}`}></i>
        </div>
        
        {/* Vertical Connector Line with Travel Time */}
        {!isLast && (
          <div className="flex-1 w-[2px] bg-white/10 my-1 relative flex items-center justify-center min-h-[40px]">
             {/* Travel Time Pill */}
             {activity.estimatedTravelTime && (
                <div className="absolute bg-app-bg border border-white/10 rounded-full px-2 py-0.5 z-20">
                    <span className="text-[10px] text-text-muted whitespace-nowrap flex items-center gap-1">
                         <i className="fas fa-car text-accent-lime"></i>
                         {activity.estimatedTravelTime}
                    </span>
                </div>
             )}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex-1 pb-6">
         <div className="bg-app-surface rounded-3xl p-2 pr-4 border border-white/5 shadow-lg hover:border-accent-lime/30 transition-all duration-300 flex items-center gap-4 overflow-hidden h-24">
             {/* Image Thumbnail */}
             <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-800">
                 {activity.imageUrl ? (
                     <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-600"><i className="fas fa-image"></i></div>
                 )}
             </div>

             {/* Text Info */}
             <div className="flex-1 min-w-0">
                 <h3 className="text-base font-bold text-text-primary truncate group-hover:text-accent-lime transition-colors">
                     {activity.title}
                 </h3>
                 <p className="text-xs text-text-secondary truncate mt-1">
                     {activity.location || activity.originalDescription}
                 </p>
                 
                 {/* Quick Badges */}
                 <div className="flex gap-2 mt-2">
                     {activity.reservationInfo && (
                         <span className="text-[9px] px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full font-bold border border-red-500/20">
                             預約
                         </span>
                     )}
                     {activity.mustEat && activity.mustEat.length > 0 && (
                         <span className="text-[9px] px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/20">
                             必吃
                         </span>
                     )}
                 </div>
             </div>

             {/* Chevron */}
             <div className="text-white/20 group-hover:translate-x-1 transition-transform">
                 <i className="fas fa-chevron-right"></i>
             </div>
         </div>
      </div>
    </div>
  );
};

export default ActivityCard;