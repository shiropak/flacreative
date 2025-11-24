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
      case ActivityType.FLIGHT: return 'fa-plane';
      case ActivityType.FOOD: return 'fa-utensils';
      case ActivityType.SIGHTSEEING: return 'fa-camera';
      case ActivityType.SHOPPING: return 'fa-bag-shopping';
      case ActivityType.HOTEL: return 'fa-bed';
      case ActivityType.ACTIVITY: return 'fa-ticket';
      default: return 'fa-location-dot';
    }
  };

  // In dark mode, we use subtle backgrounds for icons
  const getIconStyle = (type: ActivityType) => {
    switch (type) {
      case ActivityType.FLIGHT: return 'text-blue-400 bg-blue-400/10';
      case ActivityType.FOOD: return 'text-orange-400 bg-orange-400/10';
      case ActivityType.SIGHTSEEING: return 'text-accent-lime bg-accent-lime/10';
      case ActivityType.HOTEL: return 'text-purple-400 bg-purple-400/10';
      case ActivityType.SHOPPING: return 'text-pink-400 bg-pink-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const hasDetails = activity.aiDescription || activity.mustEat?.length || activity.tips?.length || activity.location;

  return (
    <div className="mb-4 animate-slideUp">
      <div 
        className={`
            bg-app-surface border border-app-border/50 rounded-[1.5rem] overflow-hidden transition-all duration-300
            ${expanded ? 'ring-1 ring-accent-lime/50 shadow-glow' : 'active:scale-[0.99] hover:bg-app-surface2'}
        `}
        onClick={() => hasDetails && setExpanded(!expanded)}
      >
        <div className="p-5 flex items-center gap-4">
            {/* Icon Box */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${getIconStyle(activity.type)}`}>
               <i className={`fas ${getIcon(activity.type)} text-lg`}></i>
            </div>

            {/* Main Info */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-text-primary text-base truncate pr-2">{activity.title}</h3>
                    <span className="font-mono text-xs font-bold text-accent-lime bg-accent-lime/10 px-2 py-1 rounded-lg whitespace-nowrap">
                        {activity.time}
                    </span>
                </div>
                <p className="text-sm text-text-secondary truncate">
                    {activity.location || activity.originalDescription || 'Activity Details'}
                </p>
            </div>
            
             {/* Chevron */}
             {hasDetails && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-app-surface2 transition-transform duration-300 ${expanded ? '-rotate-180' : ''}`}>
                     <i className="fas fa-chevron-down text-xs text-text-muted"></i>
                </div>
            )}
        </div>

        {/* Expanded Details */}
        {expanded && (
          <div className="px-5 pb-6 animate-fadeIn">
            <div className="h-px w-full bg-app-border/50 mb-5"></div>
            
            {/* Travel Time Info */}
            {activity.estimatedTravelTime && (
                <div className="flex items-center gap-2 mb-4 text-xs text-text-secondary">
                    <i className="fas fa-car-side"></i>
                    <span>Drive: {activity.estimatedTravelTime}</span>
                </div>
            )}

            {/* AI Description */}
            {activity.aiDescription && (
                <p className="text-sm text-text-primary leading-relaxed mb-5 font-light border-l-2 border-accent-lime pl-3">
                    {activity.aiDescription}
                </p>
            )}

            {/* Map Embed - Dark Mode Style */}
            {activity.location && (
                <div className="mb-5 relative rounded-2xl overflow-hidden h-40 w-full map-dark bg-app-surface2">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(activity.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                        allowFullScreen
                    ></iframe>
                     <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location || '')}`, '_blank');
                        }}
                        className="absolute bottom-3 right-3 bg-app-surface/90 backdrop-blur border border-app-border text-[10px] font-bold text-text-primary px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-app-surface2 transition-colors"
                    >
                        <i className="fas fa-map-marker-alt text-accent-lime"></i> Open Map
                    </button>
                </div>
            )}

            {/* Tag Groups */}
            <div className="space-y-4">
                {/* Must Eat */}
                {activity.mustEat && activity.mustEat.length > 0 && (
                    <div>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Must Eat</p>
                        <div className="flex flex-wrap gap-2">
                            {activity.mustEat.map((item, idx) => (
                                <span key={idx} className="px-3 py-1.5 bg-orange-500/10 text-orange-300 border border-orange-500/20 text-xs rounded-lg font-medium">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tips */}
                 {activity.tips && activity.tips.length > 0 && (
                    <div>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Pro Tips</p>
                        <div className="bg-app-surface2 rounded-xl p-3 border border-app-border/50">
                             <ul className="space-y-2">
                                {activity.tips.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5">
                                        <i className="fas fa-check-circle text-accent-lime text-xs mt-0.5"></i>
                                        <span className="text-xs text-text-secondary leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
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