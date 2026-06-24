import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { HeroSection } from '../components/sections/HeroSection';
import { StatsSection } from '../components/sections/StatsSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { BloodTypesSection } from '../components/sections/BloodTypesSection';
import { EmergencyRequestSection } from '../components/sections/EmergencyRequestSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { faqData } from '../data/faqData';

export const HomePage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <PageWrapper>
      {/* 1. Hero Banner */}
      <HeroSection />

      {/* 2. Live Stats Counter */}
      <StatsSection />

      {/* 3. Workflow Steps */}
      <HowItWorksSection />

      {/* 4. Blood Groups Glance */}
      <BloodTypesSection />

      {/* 5. Emergency Urgency Broadcast Bar */}
      <EmergencyRequestSection />

      {/* 6. Recipient & Donor Testimonials */}
      <TestimonialsSection />

      {/* 7. FAQ Accordion */}
      <section id="faq" className="py-16 md:py-24 bg-brand-bg/40 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex p-2 bg-red-50 text-brand-primary rounded-full border border-red-100 mb-3">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-charcoal">
              Common Questions
            </h2>
            <p className="text-sm text-brand-grey mt-2">
              Everything you need to know about the blood donation process.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-card border border-stone-200 overflow-hidden shadow-sm transition-shadow hover:shadow-md"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left font-semibold text-brand-charcoal hover:text-brand-primary transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span className="ml-4 shrink-0 text-brand-grey">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-sm text-brand-grey leading-relaxed border-t border-stone-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};
