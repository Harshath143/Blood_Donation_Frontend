import React from 'react';
import { StatCounter } from '../ui/StatCounter';
import { Heart, Users, Hospital, Clock } from 'lucide-react';

export const StatsSection = () => {
  return (
    <section className="bg-brand-charcoal py-10 border-y border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 divide-x divide-stone-800">
          
          {/* Counter 1: Lives Saved */}
          <StatCounter 
            target={124820} 
            suffix="+" 
            label="Lives Saved" 
            icon={<Heart className="w-6 h-6 fill-brand-primary text-brand-primary" />} 
          />
          
          {/* Counter 2: Registered Donors */}
          <div className="border-l border-stone-800 lg:border-l-0">
            <StatCounter 
              target={52400} 
              suffix="+" 
              label="Registered Donors" 
              icon={<Users className="w-6 h-6 text-brand-primary" />} 
            />
          </div>

          {/* Counter 3: Partner Hospitals */}
          <div className="border-l border-stone-800 lg:border-l-0">
            <StatCounter 
              target={630} 
              suffix="+" 
              label="Partner Hospitals" 
              icon={<Hospital className="w-6 h-6 text-brand-primary" />} 
            />
          </div>

          {/* Counter 4: Avg Response Time */}
          <div className="border-l border-stone-800 lg:border-l-0">
            <StatCounter 
              target={15} 
              suffix=" Min" 
              label="Avg Response Time" 
              icon={<Clock className="w-6 h-6 text-brand-primary" />} 
            />
          </div>

        </div>
      </div>
    </section>
  );
};
