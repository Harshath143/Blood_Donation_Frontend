import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/Badge';

const TESTIMONIALS = [
  {
    quote: "My son needed 4 units of O+ in 2 hours after an accident. LifeDrop connected us to a donor in 12 minutes. He's alive because of this platform.",
    name: "Priya K.",
    role: "Mother of recipient",
    bloodType: "O+",
    city: "Chennai",
    initials: "PK",
    color: "bg-red-500"
  },
  {
    quote: "I've been a regular blood donor, but the coordination was always scattered. LifeDrop makes it transparent and direct. Knowing exactly when my donation reaches the ward is an incredible feeling.",
    name: "Vikram R.",
    role: "Regular Donor",
    bloodType: "B+",
    city: "Chennai",
    initials: "VR",
    color: "bg-amber-500"
  },
  {
    quote: "During my chemotherapy sessions, my platelet count dropped dangerously. LifeDrop connected my husband to three verified donors in our neighborhood in under an hour. Truly life-saving.",
    name: "Amrin B.",
    role: "Cancer Survivor",
    bloodType: "A-",
    city: "Chennai",
    initials: "AB",
    color: "bg-blue-500"
  }
];

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-stone-200/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-charcoal mb-12">
          Stories of Hope & Survival
        </h2>

        {/* Carousel Area */}
        <div className="min-h-[280px] flex flex-col items-center justify-center relative px-6 md:px-12">
          {/* Quote Icon */}
          <div className="text-brand-warm/25 mb-4">
            <Quote className="w-16 h-16 fill-current rotate-180 mx-auto" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <p className="text-base md:text-xl text-brand-charcoal font-medium leading-relaxed italic px-4">
                "{current.quote}"
              </p>

              <div className="flex items-center justify-center gap-3">
                <div className={`w-11 h-11 rounded-full ${current.color} text-white flex items-center justify-center font-display font-bold text-sm shadow-inner`}>
                  {current.initials}
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-brand-charcoal">{current.name}</h4>
                  <p className="text-xs text-brand-grey">{current.role} • {current.city}</p>
                </div>
                <Badge variant="primary" className="ml-2 font-mono">{current.bloodType}</Badge>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full border border-stone-200 hover:bg-stone-50 hover:text-brand-primary transition-all focus:outline-none"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full border border-stone-200 hover:bg-stone-50 hover:text-brand-primary transition-all focus:outline-none"
            aria-label="Next story"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none ${
                idx === activeIndex 
                  ? 'bg-brand-primary w-6' 
                  : 'bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
