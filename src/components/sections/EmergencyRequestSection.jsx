import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, PlusCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export const EmergencyRequestSection = () => {
  return (
    <section className="bg-brand-primary text-white py-16 md:py-20 relative overflow-hidden">
      {/* Animating EKG/Heartbeat SVG Line */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" 
        viewBox="0 0 1000 200" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M 0 100 L 200 100 L 215 85 L 225 135 L 238 35 L 250 115 L 260 100 L 450 100 L 465 85 L 475 135 L 488 35 L 500 115 L 510 100 L 750 100 L 765 85 L 775 135 L 788 35 L 800 115 L 810 100 L 1000 100" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth="3.5" 
          className="ekg-line" 
        />
      </svg>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex p-2 bg-white/10 rounded-full border border-white/20 animate-pulse">
          <AlertCircle className="w-6 h-6 text-white" />
        </div>
        
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white leading-none">
          Someone needs blood right now.
        </h2>
        
        <p className="text-sm md:text-base text-red-100 max-w-xl mx-auto leading-relaxed">
          Critical emergency requests are instantly broadcasted to verified donors in the hospital radius, achieving a match in under fifteen minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/donate">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-brand-primary border-none hover:bg-red-50 hover:text-brand-darkRed font-bold shadow-md w-full sm:w-auto"
            >
              Register as Emergency Donor
            </Button>
          </Link>
          <Link to="/request-blood">
            <Button 
              variant="outlineRed" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-brand-primary font-bold w-full sm:w-auto"
            >
              <PlusCircle className="w-5 h-5 mr-2" /> Submit Emergency Request
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
