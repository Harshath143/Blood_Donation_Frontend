import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, HeartPulse, Heart, FileText, BellRing, ShieldCheck } from 'lucide-react';

export const HowItWorksSection = () => {
  const [activeTab, setActiveTab] = useState('donate'); // 'donate' | 'receive'

  const donateSteps = [
    {
      icon: <UserPlus className="w-6 h-6 text-brand-primary" />,
      title: "1. Register Profile",
      desc: "Fill in your blood type, contact number, and location in our secure, private registry."
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-brand-primary" />,
      title: "2. Get Matched",
      desc: "Receive instant notifications when local hospitals or patients urgently request your type."
    },
    {
      icon: <Heart className="w-6 h-6 text-brand-primary fill-brand-primary" />,
      title: "3. Donate & Save",
      desc: "Visit the hospital or donation drive to complete a quick, safe, life-saving donation."
    }
  ];

  const receiveSteps = [
    {
      icon: <FileText className="w-6 h-6 text-brand-primary" />,
      title: "1. Request Blood",
      desc: "Submit patient requirements, hospital name, required units, and urgency level."
    },
    {
      icon: <BellRing className="w-6 h-6 text-brand-primary" />,
      title: "2. Broadcast Alerts",
      desc: "Our platform alerts all matching, available donors within a 15km radius immediately."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-primary" />,
      title: "3. Receive Transfusion",
      desc: "Matched donors arrive at the hospital blood bank to donate directly for your patient."
    }
  ];

  const activeSteps = activeTab === 'donate' ? donateSteps : receiveSteps;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-charcoal mb-4">
          Simple Steps to Save a Life
        </h2>
        <p className="text-sm md:text-base text-brand-grey max-w-xl mx-auto mb-10">
          The LifeDrop matching engine coordinates instant donor matching, bridging communication in critical windows.
        </p>

        {/* Tabs Toggle */}
        <div className="inline-flex p-1 bg-stone-100 rounded-full mb-16 border border-stone-200">
          <button
            onClick={() => setActiveTab('donate')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all focus:outline-none ${
              activeTab === 'donate'
                ? 'bg-brand-primary text-white shadow-sm'
                : 'text-brand-grey hover:text-brand-charcoal'
            }`}
          >
            I want to DONATE
          </button>
          <button
            onClick={() => setActiveTab('receive')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all focus:outline-none ${
              activeTab === 'receive'
                ? 'bg-brand-primary text-white shadow-sm'
                : 'text-brand-grey hover:text-brand-charcoal'
            }`}
          >
            I need BLOOD
          </button>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-stone-300 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <AnimatePresence mode="wait">
              {activeSteps.map((step, idx) => (
                <motion.div
                  key={`${activeTab}-step-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="flex flex-col items-center max-w-sm mx-auto group"
                >
                  {/* Circular Step Badge */}
                  <div className="w-24 h-24 rounded-full bg-red-50 text-brand-primary flex items-center justify-center border-4 border-white shadow-elevation group-hover:scale-105 transition-transform duration-300">
                    {step.icon}
                  </div>

                  <h3 className="text-lg font-bold text-brand-charcoal mt-6 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-brand-grey leading-relaxed px-4">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};
