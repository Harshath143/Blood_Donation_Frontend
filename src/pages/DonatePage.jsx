import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, ClipboardSignature, Apple, GlassWater, Clock, Award, Activity } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { EligibilityChecker } from '../components/forms/EligibilityChecker';
import { DonorRegistrationForm } from '../components/forms/DonorRegistrationForm';

export const DonatePage = () => {
  const [activeTab, setActiveTab] = useState('check'); // 'check' | 'register'
  const [prefilledData, setPrefilledData] = useState({});

  const handleEligibilityPassed = (checkerData) => {
    setPrefilledData({
      age: checkerData.age,
      gender: checkerData.gender,
      lastDonationDate: checkerData.lastDonationDate,
      neverDonated: !checkerData.lastDonationDate
    });
    // Auto transition to registration form
    setActiveTab('register');
  };

  const expectSteps = [
    { title: "Arrive at Center", time: "5 Min", desc: "Show your ID, fill registration cards, and have a seat." },
    { title: "Health Screening", time: "10 Min", desc: "Quick check of temperature, pulse, blood pressure, and haemoglobin levels." },
    { title: "Donation Process", time: "8-10 Min", desc: "Relax in a reclining chair. The actual whole blood draw is fast and safe." },
    { title: "Refreshments & Rest", time: "15 Min", desc: "Enjoy free drinks and snacks in our recovery lounge before departing." },
    { title: "Leave a Hero", time: "Instant", desc: "Walk out knowing your single donation helps save up to three lives." }
  ];

  return (
    <PageWrapper>
      {/* Header Banner */}
      <section className="bg-brand-charcoal text-white py-12 md:py-16 text-center border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Donate Blood, Save Lives</h1>
          <p className="text-sm md:text-base text-stone-400 max-w-xl mx-auto leading-relaxed">
            Your choice to donate whole blood supports accident victims, surgeries, cancer patients, and newborns in critical care.
          </p>
        </div>
      </section>

      {/* Main Forms tabs */}
      <section className="py-12 md:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Buttons */}
        <div className="flex border-b border-stone-200 mb-8 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('check')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-all flex items-center justify-center gap-2 focus:outline-none ${
              activeTab === 'check'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-brand-grey hover:text-brand-charcoal'
            }`}
          >
            <CheckSquare className="w-4 h-4" /> 1. Check Eligibility
          </button>
          
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-all flex items-center justify-center gap-2 focus:outline-none ${
              activeTab === 'register'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-brand-grey hover:text-brand-charcoal'
            }`}
          >
            <ClipboardSignature className="w-4 h-4" /> 2. Register as Donor
          </button>
        </div>

        {/* Tab Contents */}
        <div className="min-h-[400px]">
          {activeTab === 'check' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <EligibilityChecker onEligibleSubmit={handleEligibilityPassed} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <DonorRegistrationForm initialData={prefilledData} />
            </motion.div>
          )}
        </div>
      </section>

      {/* 2c - What to Expect Section */}
      <section className="bg-white py-16 border-y border-stone-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-brand-charcoal">What to Expect</h2>
            <p className="text-xs text-brand-grey mt-2">A step-by-step walkthrough of your donation day</p>
          </div>

          {/* Timeline Grid (Horizontal on Desktop, Vertical on Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative mt-6">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-stone-100 z-0"></div>
            
            {expectSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-14 h-14 rounded-full bg-red-50 border-2 border-white shadow-md text-brand-primary flex items-center justify-center font-mono font-bold text-sm mb-4 group-hover:scale-105 transition-transform duration-300">
                  {idx + 1}
                </div>
                <h4 className="text-sm font-bold text-brand-charcoal">{step.title}</h4>
                <span className="text-[10px] font-bold text-brand-primary bg-red-50 px-2 py-0.5 rounded-pill mt-1.5 mb-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {step.time}
                </span>
                <p className="text-[11px] text-brand-grey leading-relaxed px-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2d - Before/After Tips Section */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-brand-charcoal">Donation Tips</h2>
          <p className="text-xs text-brand-grey mt-2">Important guidelines to guarantee a safe and smooth donation experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before Donation */}
          <div className="bg-white p-6 rounded-card border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-brand-charcoal flex items-center gap-2 border-b border-stone-150 pb-2">
              <Apple className="w-5 h-5 text-brand-primary" /> Before Your Donation
            </h3>
            <ul className="space-y-3 text-xs text-brand-grey">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0 mt-1.5"></span>
                <span><strong className="text-brand-charcoal font-bold">Stay Hydrated:</strong> Drink plenty of water or juice (approx. 500ml) in the 24 hours leading up to your session.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0 mt-1.5"></span>
                <span><strong className="text-brand-charcoal font-bold">Eat Well:</strong> Consume a healthy, low-fat meal rich in iron (like spinach, beans, poultry, or red meat) before you donate.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0 mt-1.5"></span>
                <span><strong className="text-brand-charcoal font-bold">Get Quality Sleep:</strong> Aim for 7 to 8 hours of restful sleep the night before your appointment.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0 mt-1.5"></span>
                <span><strong className="text-brand-charcoal font-bold">Dress Comfortably:</strong> Wear clothes with sleeves that can easily be rolled up past the elbow.</span>
              </li>
            </ul>
          </div>

          {/* After Donation */}
          <div className="bg-white p-6 rounded-card border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-brand-charcoal flex items-center gap-2 border-b border-stone-150 pb-2">
              <GlassWater className="w-5 h-5 text-brand-green" /> After Your Donation
            </h3>
            <ul className="space-y-3 text-xs text-brand-grey">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0 mt-1.5"></span>
                <span><strong className="text-brand-charcoal font-bold">Rest:</strong> Stay seated and rest in our recovery bay for 10 to 15 minutes before driving or leaving.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0 mt-1.5"></span>
                <span><strong className="text-brand-charcoal font-bold">Drink Fluids:</strong> Continue to hydrate and consume extra liquids over the next 24 to 48 hours.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0 mt-1.5"></span>
                <span><strong className="text-brand-charcoal font-bold">Avoid Lifting:</strong> Do not lift heavy objects or engage in strenuous exercise for the remainder of the day.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0 mt-1.5"></span>
                <span><strong className="text-brand-charcoal font-bold">Avoid Alcohol:</strong> Do not consume alcoholic beverages for 24 hours post-donation.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};
