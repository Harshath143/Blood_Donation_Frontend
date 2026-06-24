import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { CompatibilityTable } from '../components/ui/CompatibilityTable';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Badge } from '../components/ui/Badge';
import { ArrowDownToLine, Droplet, ShieldCheck, RefreshCw, CalendarCheck, HelpCircle } from 'lucide-react';

// Recharts Mock Data
const BLOOD_USE_DATA = [
  { name: 'Surgery / Operations', value: 34, color: '#C0392B' },
  { name: 'Cancer Treatments', value: 26, color: '#E74C3C' },
  { name: 'Trauma & Emergencies', value: 18, color: '#1A1A2E' },
  { name: 'Blood Disorders / Anaemia', value: 12, color: '#F39C12' },
  { name: 'Pediatrics & Neonatal Care', value: 10, color: '#27AE60' }
];

const MONTHLY_DEMAND = [
  { group: 'O-', stock: 15, optimal: 45 },
  { group: 'O+', stock: 75, optimal: 80 },
  { group: 'A-', stock: 22, optimal: 35 },
  { group: 'A+', stock: 68, optimal: 70 },
  { group: 'B-', stock: 12, optimal: 30 },
  { group: 'B+', stock: 55, optimal: 60 },
  { group: 'AB-', stock: 8, optimal: 25 },
  { group: 'AB+', stock: 80, optimal: 80 }
];

const MYTHS_AND_FACTS = [
  {
    myth: "Donating blood weakens you permanently.",
    fact: "Your body replenishes fluid volume in 24-48 hours. Red blood cells are replaced in 4-6 weeks. Regular donation is healthy!"
  },
  {
    myth: "You can contract infections from donating.",
    fact: "All needles are sterile, single-use, and disposed of immediately. You cannot catch HIV or other blood-borne viruses."
  },
  {
    myth: "The donation process takes hours.",
    fact: "The actual donation takes just 8-10 minutes. The entire appointment (including rest & snacks) fits within an hour."
  },
  {
    myth: "I am too old to donate blood.",
    fact: "Anyone healthy up to age 65 can donate. In many regions, fit seniors donate with simple physician consent."
  }
];

export const LearnPage = () => {
  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-brand-charcoal text-white py-12 md:py-16 text-center border-b border-stone-850">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Badge variant="primary" className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-red-950/45 border border-red-500/20">Learning Center</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">One Drop. Many Lives.</h1>
          <p className="text-sm md:text-base text-stone-400 max-w-xl mx-auto leading-relaxed">
            Discover the science of blood groups, donation components, and learn how one donation helps secure emergency ward supply.
          </p>
        </div>
      </section>

      {/* Why Donate & Recharts Stats Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 text-left space-y-4">
            <h2 className="font-display text-3xl font-bold text-brand-charcoal">Why Donate Blood?</h2>
            <p className="text-sm text-brand-grey leading-relaxed">
              Blood is a biological fluid that cannot be manufactured synthetically. Voluntary donations are the *only* source of supply for hospitals, making donors critical anchors in public health.
            </p>
            <p className="text-xs text-brand-grey leading-relaxed bg-stone-50 border p-4 rounded-input border-stone-200">
              <strong className="text-brand-charcoal font-bold">The Three Lives Rule:</strong> One standard whole blood donation is separated into three components (red cells, platelets, and plasma) to support three different patients.
            </p>
          </div>

          <div className="lg:col-span-7 bg-white p-6 rounded-card border border-stone-200 shadow-sm text-left">
            <h3 className="text-sm font-bold text-brand-charcoal mb-4">Percentage of Blood Usage by Department</h3>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BLOOD_USE_DATA} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={170} tick={{ fontSize: 11, fill: '#1A1A2E', fontWeight: 'semibold' }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => [`${value}%`, 'UsageShare']} contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                  <Bar dataKey="value" fill="#C0392B" radius={[0, 4, 4, 0]} barSize={16}>
                    {BLOOD_USE_DATA.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Chart 2: Inventory vs Demand */}
        <div className="bg-white p-6 rounded-card border border-stone-200 shadow-sm text-left">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-brand-charcoal">Blood Stock vs. Optimal Demand</h3>
            <p className="text-[10px] text-brand-grey">Current stock levels (red) vs. safety stock inventory levels (grey) by group</p>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_DEMAND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="group" tick={{ fontSize: 11, fontWeight: 'bold', fill: '#1A1A2E' }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                <Bar dataKey="optimal" fill="#E2D6CC" name="Optimal Stock" radius={[4, 4, 0, 0]} />
                <Bar dataKey="stock" fill="#C0392B" name="Current Stock" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Blood Types Compatibility Matrix */}
      <section className="bg-white py-16 border-y border-stone-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div>
            <h2 className="font-display text-3xl font-bold text-brand-charcoal">Blood Types & Compatibility</h2>
            <p className="text-xs text-brand-grey mt-2">Interact with our matrix below to trace compatible red cell matches</p>
          </div>

          <CompatibilityTable />
        </div>
      </section>

      {/* Types of Donation */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-12">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-brand-charcoal">Types of Donation</h2>
          <p className="text-xs text-brand-grey mt-2">Which blood component can you contribute?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Whole Blood", time: "8-10 Min", gap: "56 Days", desc: "The most common donation. Used for surgeries, organ transplants, and trauma victims." },
            { title: "Platelets", time: "1.5 Hours", gap: "7 Days", desc: "Tiny cell fragments that help clot blood. Essential for cancer patients going through chemo." },
            { title: "Plasma", time: "1.25 Hours", gap: "28 Days", desc: "Liquid component containing proteins. Restores blood volume and treats shock or burns." },
            { title: "Double Red Cells", time: "30 Min", gap: "112 Days", desc: "Automated drawing that collects double the concentration of red cells. Used for severe blood loss cases." }
          ].map((type, idx) => (
            <div key={idx} className="bg-white p-6 rounded-card border border-stone-200 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-base text-brand-charcoal">{type.title}</h4>
                <Badge variant="primary" size="sm">Component</Badge>
              </div>
              <p className="text-xs text-brand-grey leading-relaxed">{type.desc}</p>
              <div className="pt-2 border-t border-stone-100 flex justify-between text-[10px] font-bold text-brand-charcoal">
                <span>Draw: {type.time}</span>
                <span>Wait: {type.gap}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Blood Journey Infographic Timeline */}
      <section id="journey" className="bg-white py-16 border-y border-stone-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div>
            <h2 className="font-display text-3xl font-bold text-brand-charcoal">The Blood Journey</h2>
            <p className="text-xs text-brand-grey mt-2">What happens to your blood after you leave?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left relative mt-6">
            <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-[2px] bg-stone-100 z-0"></div>
            
            {[
              { icon: <Droplet className="w-5 h-5" />, title: "1. Donation", desc: "Donor donates whole blood unit (450ml) in under 10 minutes at center." },
              { icon: <RefreshCw className="w-5 h-5" />, title: "2. Processing & Testing", desc: "Blood is centrifuged into components and tested for diseases to ensure absolute safety." },
              { icon: <ShieldCheck className="w-5 h-5" />, title: "3. Storage", desc: "Packed red cells kept at 4°C, platelets kept at 22°C (agitated), plasma frozen at -30°C." },
              { icon: <CalendarCheck className="w-5 h-5" />, title: "4. Transfusion", desc: "Dispatched to emergency rooms, oncology clinics, and operating rooms to save lives." }
            ].map((step, idx) => (
              <div key={idx} className="bg-stone-50 md:bg-transparent p-5 md:p-0 rounded-input border md:border-none border-stone-200 relative z-10 text-center">
                <div className="w-12 h-12 bg-red-50 text-brand-primary border-2 border-white shadow-md rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h4 className="font-bold text-sm text-brand-charcoal mb-1">{step.title}</h4>
                <p className="text-[11px] text-brand-grey leading-relaxed px-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Myths vs Facts Hover Card Flip */}
      <section id="myths" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-brand-charcoal">Common Myths vs. Facts</h2>
          <p className="text-xs text-brand-grey mt-2">Hover over each card to reveal the truth behind donation misconceptions</p>
        </div>

        {/* 3D Card flips in Tailwind */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {MYTHS_AND_FACTS.map((item, idx) => (
            <div key={idx} className="group [perspective:1000px] w-full h-[180px]">
              <div className="relative w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all duration-700 cursor-pointer">
                
                {/* Front Side: Myth */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white p-6 rounded-card border border-stone-200 shadow-sm flex flex-col justify-center items-center text-center">
                  <HelpCircle className="w-8 h-8 text-brand-primary mb-3" />
                  <span className="text-xs font-bold text-brand-primary uppercase tracking-wider block mb-1">Myth #{idx+1}</span>
                  <p className="text-sm font-bold text-brand-charcoal leading-snug">"{item.myth}"</p>
                  <span className="text-[10px] text-stone-400 mt-3 font-semibold uppercase tracking-wider block">Hover to reveal Fact &rarr;</span>
                </div>
                
                {/* Back Side: Fact */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-brand-primary text-white p-6 rounded-card border border-brand-warm/30 shadow-md [transform:rotateY(180deg)] flex flex-col justify-center items-center text-center">
                  <ShieldCheck className="w-8 h-8 text-white mb-2" />
                  <span className="text-[10px] font-bold text-red-200 uppercase tracking-widest block mb-1">The Truth</span>
                  <p className="text-xs leading-relaxed text-red-50 font-medium px-2">{item.fact}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Downloadable Guide */}
      <section className="bg-brand-primary text-white py-12 md:py-16 text-center border-t border-brand-warm/25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold">Download Free Resource Guides</h2>
          <p className="text-xs text-red-100 max-w-md mx-auto">Read comprehensive guidelines regarding preparation, post-donation diets, and center protocols.</p>
          <div className="pt-3">
            <a 
              href="/src/assets/guide.pdf" 
              download 
              className="inline-flex items-center justify-center bg-white text-brand-primary font-bold px-6 py-3 rounded-pill text-xs shadow-md hover:bg-stone-50 transition-all gap-1.5 focus:outline-none"
            >
              <ArrowDownToLine className="w-4.5 h-4.5" /> Download Donation Guide (PDF)
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};
