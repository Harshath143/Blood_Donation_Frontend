import React from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';
import { Heart } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

export const HeartbeatDrop = () => {
  // Target lives saved: 124820
  const livesSaved = useCountUp(124820, 2000, true);

  return (
    <div className="relative flex items-center justify-center w-full min-h-[360px]">
      {/* Outer Pulse Rings */}
      <div className="absolute w-72 h-72 rounded-full bg-brand-primary/5 animate-pulse-slow"></div>
      <div className="absolute w-60 h-60 rounded-full bg-brand-primary/10 animate-ping opacity-10"></div>
      
      {/* Pulsing Blood Drop (72 BPM rhythm via heartbeat-drop-pulse in index.css) */}
      <div className="relative z-10 heartbeat-drop-pulse flex items-center justify-center">
        {/* Blood Drop SVG */}
        <svg 
          viewBox="0 0 100 130" 
          className="w-64 h-80 drop-shadow-[0_12px_36px_rgba(192,57,43,0.3)] filter"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M50 10 C 50 10, 92 65, 92 90 A 42 42 0 1 1 8 90 C 8 65, 50 10, 50 10 Z" 
            fill="#C0392B" 
            stroke="#E74C3C"
            strokeWidth="1.5"
          />
          {/* Subtle light reflection on the drop */}
          <path
            d="M32 65 C 28 75, 28 85, 32 92 C 34 94, 30 94, 28 92 C 24 85, 24 75, 28 65 C 29 63, 31 63, 32 65 Z"
            fill="#FFFFFF"
            opacity="0.25"
          />
        </svg>

        {/* Text inside the Drop */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-8 pt-20 select-none">
          <Heart className="w-8 h-8 mb-2 fill-white animate-[pulse_1s_infinite]" />
          <span className="font-mono text-3xl font-extrabold tracking-tight drop-shadow-md">
            {formatNumber(livesSaved)}
          </span>
          <span className="text-[11px] font-semibold tracking-wider uppercase opacity-90 mt-1 drop-shadow-sm">
            Lives Saved
          </span>
        </div>
      </div>
    </div>
  );
};
