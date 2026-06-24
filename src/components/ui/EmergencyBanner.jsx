import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';

export const EmergencyBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('lifeDrop_dismissedEmergencyBanner');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('lifeDrop_dismissedEmergencyBanner', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div role="alert" className="sticky top-0 z-50 bg-brand-primary text-white text-sm py-2 px-4 shadow-md border-b border-brand-warm/30 flex items-center justify-between overflow-hidden">
      {/* Marquee Container */}
      <div className="flex-1 flex items-center overflow-hidden mr-4">
        <div className="animate-[marquee_25s_linear_infinite] whitespace-nowrap flex gap-12 font-medium tracking-wide">
          <span>🩸 O- Blood URGENTLY needed at Chennai City Hospital</span>
          <span>•</span>
          <span>A+ Donors needed in Chennai (South)</span>
          <span>•</span>
          <span>3 emergency requests matched in the last hour</span>
          <span>•</span>
          <span>🩸 O- Blood URGENTLY needed at Chennai City Hospital</span>
          <span>•</span>
          <span>A+ Donors needed in Chennai (South)</span>
          <span>•</span>
          <span>3 emergency requests matched in the last hour</span>
        </div>
      </div>

      {/* Action Button & Dismiss */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => navigate('/emergency')}
          className="bg-white text-brand-primary font-bold px-3 py-1 rounded-pill text-xs flex items-center gap-1 hover:bg-brand-bg transition-colors shadow-sm focus:outline-none"
        >
          Respond Now <ArrowRight className="w-3 h-3" />
        </button>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss Alert"
          className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Inject temporary Tailwind keyframes if not defined in tailwind.config.js */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
