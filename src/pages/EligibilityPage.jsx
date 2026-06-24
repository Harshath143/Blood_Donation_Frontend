import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { EligibilityChecker } from '../components/forms/EligibilityChecker';
import { Search, Info, HelpCircle, Check, X, ShieldAlert } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { DEFERRAL_MEDICATIONS } from '../utils/eligibilityRules';

const MEDICATIONS_DATABASE = [
  ...DEFERRAL_MEDICATIONS,
  { id: 'bp_meds', name: 'Blood Pressure Medications (beta blockers, ACE inhibitors)', status: 'eligible', desc: 'Eligible to donate provided your blood pressure is stable and you have no side effects.' },
  { id: 'diabetes_meds', name: 'Diabetes Medications (Metformin, oral drugs)', status: 'eligible', desc: 'Eligible to donate provided condition is stable and controlled by diet or oral medications.' },
  { id: 'insulin', name: 'Insulin (bovine or human derived)', status: 'eligible', desc: 'Eligible if condition is controlled and you have never used beef-sourced insulin before 1980.' },
  { id: 'flu_vaccine', name: 'Flu Shot / Vaccines (inactivated viruses)', status: 'eligible', desc: 'Eligible immediately if you got the shot as a preventive measure and feel completely healthy.' },
  { id: 'allergy_meds', name: 'Antihistamines / Allergy Meds', status: 'eligible', desc: 'Eligible to donate with no waiting period.' },
  { id: 'birth_control', name: 'Birth Control pills/devices', status: 'eligible', desc: 'Eligible to donate with no waiting period.' }
];

export const EligibilityPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeds = MEDICATIONS_DATABASE.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const criteriaList = [
    { label: "Age Limit", value: "18 to 65 years", desc: "Protecting donor recovery and bone marrow replenishment cycle." },
    { label: "Minimum Weight", value: "50 kg / 110 lbs", desc: "Ensures donor holds sufficient blood volume for a standard 450ml draw." },
    { label: "Haemoglobin Level", value: "Women: 12.5 g/dL | Men: 13.0 g/dL", desc: "Checked on-site. Ensures donation doesn't induce temporary anaemia." },
    { label: "Blood Pressure", value: "Systolic: 90-180 | Diastolic: 50-100", desc: "Ensures blood flow and cardiovascular stability during and post draw." },
    { label: "Tattoos & Piercings", value: "6 Months Deferral", desc: "Safety window against blood-borne transmission risks (e.g. Hepatitis)." },
    { label: "Major Surgery", value: "6 Months Deferral", desc: "Ensures donor is fully healed and has restored default red cell counts." }
  ];

  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-brand-charcoal text-white py-12 md:py-16 text-center border-b border-stone-850">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Badge variant="danger" className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-red-950/45 border border-red-500/20">Medical Guidelines</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Eligibility Guidelines</h1>
          <p className="text-sm md:text-base text-stone-400 max-w-xl mx-auto leading-relaxed">
            Review the official World Health Organization (WHO) eligibility specifications to ensure a safe donation.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 md:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Eligibility Checker */}
        <div>
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal">Interactive Screening Tool</h2>
            <p className="text-xs text-brand-grey mt-1">Run a quick check of your credentials before booking an appointment</p>
          </div>
          <EligibilityChecker />
        </div>

        {/* WHO Criteria Reference Table */}
        <div className="space-y-6">
          <div className="text-left border-b border-stone-200 pb-3">
            <h3 className="text-xl font-bold text-brand-charcoal">WHO Reference Standards</h3>
            <p className="text-xs text-brand-grey">Key health indexes checked on-site prior to donation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {criteriaList.map((crit, idx) => (
              <div key={idx} className="bg-white p-5 rounded-card border border-stone-200 shadow-sm flex items-start gap-4 text-left">
                <div className="w-8 h-8 rounded-full bg-red-50 text-brand-primary border border-red-100 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-charcoal">{crit.label}</h4>
                  <p className="text-sm font-bold text-brand-primary font-mono mt-1">{crit.value}</p>
                  <p className="text-[11px] text-brand-grey mt-2 leading-relaxed">{crit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Searchable Medication Database */}
        <div className="space-y-6">
          <div className="text-left border-b border-stone-200 pb-3">
            <h3 className="text-xl font-bold text-brand-charcoal">Searchable Medications Database</h3>
            <p className="text-xs text-brand-grey">Find deferral details and waiting intervals for common medical prescriptions</p>
          </div>

          <div className="max-w-md text-left">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400" />
              <input
                type="text"
                placeholder="Search prescription name (e.g. Antibiotics)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-input text-xs outline-none bg-white focus:ring-2 focus:ring-brand-warm transition-all text-brand-charcoal font-semibold shadow-sm"
              />
            </div>
          </div>

          <div className="bg-white rounded-card border border-stone-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-brand-charcoal">
                    <th className="p-4 w-1/3">Medication / Treatment Name</th>
                    <th className="p-4 w-1/4">Status</th>
                    <th className="p-4">Donation Guideline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {filteredMeds.length > 0 ? (
                    filteredMeds.map(med => (
                      <tr key={med.id} className="hover:bg-stone-50/50 transition-colors">
                        <td className="p-4 font-semibold text-brand-charcoal">{med.name.split(' (')[0]}</td>
                        <td className="p-4">
                          {med.status === 'eligible' ? (
                            <Badge variant="success">Eligible</Badge>
                          ) : (
                            <Badge variant="amber">Deferred</Badge>
                          )}
                        </td>
                        <td className="p-4 text-brand-grey leading-relaxed">
                          {med.desc || med.name.substring(med.name.indexOf('(') + 1, med.name.length - 1) || 'Requires specific waiting window.'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="p-8 text-center text-brand-grey font-medium">
                        No medications found matching "{searchQuery}". Please check spelling or consult our coordinators.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Specific Deferral FAQ */}
        <div className="space-y-6">
          <div className="text-left border-b border-stone-200 pb-3">
            <h3 className="text-xl font-bold text-brand-charcoal">Guidelines & Exceptions FAQ</h3>
            <p className="text-xs text-brand-grey">Answers to common specific questions regarding donor screening</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-brand-charcoal flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-brand-primary" /> Can I donate if I got a vaccine?
              </h4>
              <p className="text-xs text-brand-grey leading-relaxed">
                Yes, for most standard seasonal vaccines like the Influenza vaccine or Covid-19 vaccine, you can donate immediately, provided you feel completely healthy. Vaccines containing live attenuated viruses (like MMR or Chickenpox) require a 4-week deferral.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-sm text-brand-charcoal flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-brand-primary" /> What if I got a tattoo in another state or country?
              </h4>
              <p className="text-xs text-brand-grey leading-relaxed">
                The standard deferral for a tattoo is 6 months regardless of location. However, in some jurisdictions, if the tattoo was applied at a state-regulated shop using sterile, single-use needles, the deferral may be waived. Our screening team will verify details on-site.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-sm text-brand-charcoal flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-brand-primary" /> Can I donate if I have a high blood pressure history?
              </h4>
              <p className="text-xs text-brand-grey leading-relaxed">
                Yes. If your blood pressure is well-controlled by daily medications and falls within the acceptable range (Systolic &le; 180 and Diastolic &le; 100) at the time of screening, you are eligible to donate.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-sm text-brand-charcoal flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-brand-primary" /> What happens if my haemoglobin is too low?
              </h4>
              <p className="text-xs text-brand-grey leading-relaxed">
                If your test shows low haemoglobin, we will temporarily defer you for your safety to prevent anaemia. We will provide you with dietary advice on iron-rich foods (red meats, leafy vegetables, beans) and suggest retesting in a few weeks.
              </p>
            </div>
          </div>
        </div>

      </section>
    </PageWrapper>
  );
};
