import React from 'react';
import { bloodGroupsData } from '../../data/bloodGroups';
import { BloodGroupCard } from '../ui/BloodGroupCard';

export const BloodTypesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-bg/50 border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-charcoal mb-4">
          Blood Groups at a Glance
        </h2>
        <p className="text-sm md:text-base text-brand-grey max-w-xl mx-auto mb-16">
          Understanding compatibility and stock demands helps save time and lives in emergency situations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bloodGroupsData.map((bg) => (
            <BloodGroupCard 
              key={bg.group}
              group={bg.group}
              donateTo={bg.donateTo}
              receiveFrom={bg.receiveFrom}
              isUniversalDonor={bg.isUniversalDonor}
              isUniversalRecipient={bg.isUniversalRecipient}
              popularity={bg.popularity}
              description={bg.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
