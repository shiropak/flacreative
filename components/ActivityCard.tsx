import React, { useState } from 'react';
import { Activity, ActivityType } from '../types';

interface ActivityCardProps {
  activity: Activity;
  isLast: boolean;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, isLast }) => {
  const [expanded, setExpanded] = useState(false);

  const getIcon = (type: ActivityType) => {
    switch (type) {
      case ActivityType.FLIGHT: return 'fa-plane-departure';
      case ActivityType.FOOD: return 'fa-utensils';
      case ActivityType.SIGHTSEEING: return 'fa-mountain-sun';
      case ActivityType.SHOPPING: return 'fa-bag-shopping';
      case ActivityType.HOTEL: return 'fa-bed';
      case ActivityType.ACTIVITY: return 'fa-person-walking';
      default: return 'fa-location-dot';
    }
  };

  const getIconColor = (type: ActivityType) => {
    switch (type) {
      case ActivityType.FLIGHT: return 'text-sky-600 bg-sky-50';
      case ActivityType.FOOD: return 'text-orange-600 bg-orange-50';
      case ActivityType.SIGHTSEEING: return 'text-forest-700 bg-forest-50';
      case ActivityType.HOTEL: return 'text-indigo-600 bg-indigo-50';
      case ActivityType.SHOPPING: return 'text-amber-600 bg-amber-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const hasDetails = activity.aiDescription || activity.mustEat?.length || activity.tips?.length || activity.location;

  return (
    <div className="mb-5 relative group animate-slideUp">
      <div 
        className={`bg-white rounded-[2rem] p-5 shadow-soft border border-transparent transition-all duration-300 ${expanded ? 'shadow-lg ring-1 ring-forest-100' : 'active:scale-[0.98]'}`}
        onClick={() => hasDetails && setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4">
          {/* Time & Icon Column */}
          <div className="flex flex-col items-center gap-3 pt-1">
             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${expanded ? 'bg-forest-900 text-white' : getIconColor(activity.type)}`}>
               <i className={`fas ${getIcon(activity.type)} text-xl`}></i>
             </div>
             <span className="text-[11px] font-bold text-gray-400 font-mono tracking-wide">{activity.time}</span>
          </div>

          {/* Content Column */}
          <div className="flex-1 min-w-0 pt-1">
             <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900 text-lg leading-tight tracking-tight">{activity.title}</h3>
                {hasDetails && (
                    <i className={`fas fa-chevron-down text-xs text-gray-300 mt-1.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}></i>
                )}
             </div>
             
             {activity.originalDescription && (
               <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{activity.originalDescription}</p>
             )}

            {/* Travel Time Badge - Only show if not expanded to save space, or keep if crucial */}
            {!expanded && activity.estimatedTravelTime && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-100/50">
                    <i className="fas fa-route text-[10px] text-forest-600"></i>
                    <span className="text-[10px] font-semibold text-forest-700">{activity.estimatedTravelTime}</span>
                </div>
            )}
          </div>
        </div>

        {/* Expanded Details */}
        {expanded && (
          <div className="mt-6 pt-5 border-t border-gray-100 animate-fadeIn space-y-6">
            
            {/* AI Description */}
            {activity.aiDescription && (
                <div className="relative pl-4 border-l-2 border-forest-300">
                    <p className="text-sm text-gray-600 italic leading-relaxed">
                        "{activity.aiDescription}"
                    </p>
                </div>
            )}

            {/* Map Embed */}
            {activity.location && (
                <div className="rounded-2xl overflow-hidden shadow-inner bg-gray-100 h-40 relative map-grayscale">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(activity.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        allowFullScreen
                    ></iframe>
                    <div className="absolute bottom-2 right-2">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location || '')}`, '_blank');
                            }}
                            className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm hover:bg-white text-gray-800 flex items-center gap-1"
                        >
                            <i className="fas fa-external-link-alt"></i> 開啟 App
                        </button>
                    </div>
                </div>
            )}

            {/* Grid for Information */}
            <div className="grid grid-cols-1 gap-4">
                {/* Must Eat */}
                {activity.mustEat && activity.mustEat.length > 0 && (
                    <div className="bg-orange-50/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <i className="fas fa-utensils text-orange-400 text-xs"></i>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">必吃推薦</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {activity.mustEat.map((item, idx) => (
                                <span key={idx} className="px-2.5 py-1 bg-white text-gray-700 text-xs rounded-md font-medium shadow-sm border border-orange-100/50">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Must Buy */}
                {activity.mustBuy && activity.mustBuy.length > 0 && (
                    <div className="bg-amber-50/50 rounded-xl p-3">
                         <div className="flex items-center gap-2 mb-2">
                            <i className="fas fa-shopping-basket text-amber-400 text-xs"></i>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">必買好物</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {activity.mustBuy.map((item, idx) => (
                                <span key={idx} className="px-2.5 py-1 bg-white text-gray-700 text-xs rounded-md font-medium shadow-sm border border-amber-100/50">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                 {/* Tips */}
                 {activity.tips && activity.tips.length > 0 && (
                    <div className="bg-forest-50/50 rounded-xl p-3">
                         <div className="flex items-center gap-2 mb-2">
                            <i className="fas fa-lightbulb text-forest-400 text-xs"></i>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">貼心提醒</p>
                        </div>
                        <ul className="space-y-2">
                            {activity.tips.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="w-1 h-1 rounded-full bg-forest-400 mt-1.5 flex-shrink-0"></span>
                                    <span className="text-xs text-gray-600 leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;