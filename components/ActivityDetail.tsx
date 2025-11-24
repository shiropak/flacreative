
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
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const displayImage = (activity.imageUrl && !imgError) 
    ? activity.imageUrl 
    : (FALLBACK_IMAGES[activity.type] || FALLBACK_IMAGES.DEFAULT);

  return (
    <div className={`fixed inset-0 z-50 bg-app-bg flex flex-col overflow-y-auto transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Hero Image Area */}
      <div className="relative h-[50vh] w-full flex-shrink-0">
        <img 
            src={displayImage} 
            alt={activity.title} 
            className="w-full h-full object-cover" 
            onError={() => setImgError(true)}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-app-bg"></div>
        
        {/* Top Nav */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20">
            <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center border border-white/10 active:scale-90 transition-transform"
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
        <div className="absolute bottom-0 left-0 w-full p-6 pb-10 z-10">
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
            <h1 className="text-4xl font-black text-white leading-tight shadow-black drop-shadow-lg">
                {activity.title}
            </h1>
            <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <i className="fas fa-map-marker-alt text-accent-lime"></i>
                    {activity.location || 'Chiang Mai'}
                </div>
                {/* Opening Hours Badge */}
                {activity.openingHours && (
                    <div className="flex items-center gap-2 text-text-secondary text-xs">
                        <i className="far fa-clock text-accent-lime"></i>
                        <span>{activity.openingHours}</span>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex-1 bg-app-bg -mt-6 rounded-t-[2rem] relative z-10 px-6 pt-8 pb-20 space-y-8 min-h-[50vh]">
         
         {/* Introduction (Description) */}
         {activity.aiDescription && (
             <div className="bg-app-surface p-5 rounded-2xl border border-white/5">
                 <div className="flex items-center gap-2 mb-3 text-accent-lime">
                     <i className="fas fa-circle-info"></i>
                     <span className="text-xs font-bold uppercase tracking-wider">About</span>
                 </div>
                 <p className="text-text-secondary leading-relaxed font-light text-justify">
                     {activity.aiDescription}
                 </p>
             </div>
         )}

         {/* Important Reservation Info */}
         {activity.reservationInfo && (
             <div className="bg-red-500/10 p-5 rounded-2xl border border-red-500/20">
                 <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                     <i className="fas fa-exclamation-circle"></i> Reservation
                 </h3>
                 <p className="text-red-200 text-sm">{activity.reservationInfo}</p>
             </div>
         )}

         {/* Notes & Cautions (New Section) */}
         {activity.notes && activity.notes.length > 0 && (
             <div className="bg-yellow-500/5 p-5 rounded-2xl border border-yellow-500/10">
                 <h3 className="text-yellow-500 font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                     <i className="fas fa-triangle-exclamation"></i> 注意事項 (Notes)
                 </h3>
                 <ul className="space-y-2">
                     {activity.notes.map((note, idx) => (
                         <li key={idx} className="flex items-start gap-3 text-sm text-text-secondary/80">
                             <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500/50 flex-shrink-0"></span>
                             <span>{note}</span>
                         </li>
                     ))}
                 </ul>
             </div>
         )}

         {/* Highlights Grid */}
         <div className="grid grid-cols-1 gap-6">
             {/* Must Eat */}
             {activity.mustEat && activity.mustEat.length > 0 && (
                 <div>
                     <h3 className="text-text-primary font-bold text-lg mb-4 flex items-center gap-2">
                         <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                         必吃美食 & 菜單
                     </h3>
                     <div className="flex flex-wrap gap-3">
                         {activity.mustEat?.map((item, idx) => (
                             <span key={idx} className="px-4 py-2 bg-orange-500/10 text-orange-300 rounded-xl border border-orange-500/20 text-sm font-medium">
                                 {item}
                             </span>
                         ))}
                     </div>
                 </div>
             )}

             {/* Must Buy */}
             {activity.mustBuy && activity.mustBuy.length > 0 && (
                 <div>
                     <h3 className="text-text-primary font-bold text-lg mb-4 flex items-center gap-2">
                         <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                         必買伴手禮
                     </h3>
                     <div className="flex flex-wrap gap-3">
                         {activity.mustBuy?.map((item, idx) => (
                             <span key={idx} className="px-4 py-2 bg-purple-500/10 text-purple-300 rounded-xl border border-purple-500/20 text-sm font-medium">
                                 {item}
                             </span>
                         ))}
                     </div>
                 </div>
             )}
             
             {/* Tips */}
             {activity.tips && activity.tips.length > 0 && (
                 <div>
                     <h3 className="text-text-primary font-bold text-lg mb-4 flex items-center gap-2">
                         <span className="w-1 h-6 bg-accent-lime rounded-full"></span>
                         旅遊攻略
                     </h3>
                     <ul className="space-y-3">
                         {activity.tips?.map((tip, idx) => (
                             <li key={idx} className="flex items-start gap-3 text-sm text-text-secondary">
                                 <i className="fas fa-check-circle text-accent-lime mt-1"></i>
                                 <span>{tip}</span>
                             </li>
                         ))}
                     </ul>
                 </div>
             )}
         </div>

         {/* Map */}
         {activity.location && (
             <div className="rounded-3xl overflow-hidden h-48 w-full map-dark relative border border-white/10 mt-4">
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
      <div className="fixed bottom-0 left-0 w-full bg-app-bg/90 backdrop-blur p-6 border-t border-white/5 z-30">
          <button 
             onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location || '')}`, '_blank')}
             className="w-full bg-accent-lime text-app-bg font-bold py-4 rounded-2xl shadow-glow text-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all"
          >
              <i className="fas fa-location-arrow"></i> Start Navigation
          </button>
      </div>
    </div>
  );
};

export default ActivityDetail;
