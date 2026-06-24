import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartPulse, Users, Hospital } from 'lucide-react';
import { HeartbeatDrop } from '../ui/HeartbeatDrop';
import { Button } from '../ui/Button';

export const HeroSection = () => {
  return (
    <section className="bg-brand-bg relative overflow-hidden py-12 md:py-20 lg:py-24 border-b border-stone-250/30">
      {/* Background Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-brand-primary/5 via-brand-warm/2 to-transparent rounded-full filter blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Headline & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-charcoal leading-[1.08] lg:-mr-10">
            Every Drop <br />
            <span className="text-brand-primary relative">
              Counts.
              <span className="absolute bottom-1 left-0 right-0 h-1 bg-brand-warm/25 rounded-full" />
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-brand-grey max-w-xl leading-relaxed">
            Register as a voluntary donor today. Just fifteen minutes of your time and one single drop can save up to three lives in urgent hospital care.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link to="/donate">
              <Button variant="primary" size="lg" className="w-full sm:w-auto font-bold flex items-center gap-2">
                <HeartPulse className="w-5 h-5" /> Donate Now
              </Button>
            </Link>
            <Link to="/request-blood">
              <Button variant="outlineRed" size="lg" className="w-full sm:w-auto font-bold">
                Request Blood
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="pt-8 border-t border-stone-200/60 grid grid-cols-3 gap-4 max-w-lg">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 text-center sm:text-left">
              <div className="w-9 h-9 rounded-full bg-red-50 text-brand-primary flex items-center justify-center shrink-0 border border-red-100">
                <Hospital className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-charcoal font-mono leading-none sm:mt-1">500+</p>
                <p className="text-[10px] text-brand-grey font-medium uppercase tracking-wide">Hospitals</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 text-center sm:text-left">
              <div className="w-9 h-9 rounded-full bg-red-50 text-brand-primary flex items-center justify-center shrink-0 border border-red-100">
                <Users className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-charcoal font-mono leading-none sm:mt-1">50,000+</p>
                <p className="text-[10px] text-brand-grey font-medium uppercase tracking-wide">Donors</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 text-center sm:text-left">
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-brand-green flex items-center justify-center shrink-0 border border-emerald-100">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-green font-mono leading-none sm:mt-1">100%</p>
                <p className="text-[10px] text-brand-grey font-medium uppercase tracking-wide">Verified Safe</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Signature Animation */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <HeartbeatDrop />
        </div>

      </div>
    </section>
  );
};
