import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertTriangle, X, ArrowLeft, ArrowRight, RefreshCw, Heart } from 'lucide-react';
import { DEFERRAL_MEDICATIONS, checkEligibility } from '../../utils/eligibilityRules';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/formatters';

export const EligibilityChecker = ({ onEligibleSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    gender: 'male',
    recentIllness: 'none',
    medications: [],
    recentSurgery: false,
    recentTattoo: false,
    recentPregnancy: false,
    lastDonationDate: '',
    donationType: 'whole',
    hasDonatedBefore: false
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMedicationChange = (medId) => {
    setFormData(prev => {
      const exists = prev.medications.includes(medId);
      if (exists) {
        return { ...prev, medications: prev.medications.filter(m => m !== medId) };
      } else {
        return { ...prev, medications: [...prev.medications, medId] };
      }
    });
  };

  const nextStep = () => {
    // Basic validation for Step 1
    if (step === 1) {
      if (!formData.age || !formData.weight) {
        alert("Please enter both age and weight.");
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const evaluation = checkEligibility(formData);
    setResult(evaluation);
    setStep(4);
  };

  const resetWizard = () => {
    setStep(1);
    setFormData({
      age: '',
      weight: '',
      gender: 'male',
      recentIllness: 'none',
      medications: [],
      recentSurgery: false,
      recentTattoo: false,
      recentPregnancy: false,
      lastDonationDate: '',
      donationType: 'whole',
      hasDonatedBefore: false
    });
    setResult(null);
  };

  // Form styles
  const labelStyles = "block text-sm font-semibold text-brand-charcoal mb-1.5";
  const inputStyles = "w-full border border-stone-300 rounded-input px-4 py-2.5 text-brand-charcoal bg-white focus:ring-2 focus:ring-brand-warm focus:border-brand-warm outline-none transition-all text-sm";
  const radioStyles = "w-4 h-4 text-brand-primary border-stone-300 focus:ring-brand-warm";

  const totalSteps = 3;

  return (
    <div className="bg-white rounded-card border border-stone-200 shadow-elevation overflow-hidden max-w-2xl mx-auto">
      {/* Progress Bar (not shown on results screen step 4) */}
      {step < 4 && (
        <div className="w-full bg-stone-100 h-1.5 relative">
          <div 
            className="bg-brand-primary h-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
          <div className="absolute top-4 left-6 text-xs font-semibold text-brand-grey uppercase tracking-wider">
            Step {step} of {totalSteps}: {
              step === 1 ? "Basic Information" :
              step === 2 ? "Medical & Health History" :
              "Donation History"
            }
          </div>
        </div>
      )}

      <div className="p-6 md:p-8 pt-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-display text-2xl font-bold text-brand-charcoal mb-6">Let's check your eligibility</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="age" className={labelStyles}>Age (years)</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    min="1"
                    max="120"
                    placeholder="e.g. 25"
                    className={inputStyles}
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-[11px] text-stone-400 mt-1">Must be between 18 and 65 years old</p>
                </div>
                
                <div>
                  <label htmlFor="weight" className={labelStyles}>Weight (kg)</label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    min="10"
                    max="300"
                    placeholder="e.g. 68"
                    className={inputStyles}
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-[11px] text-stone-400 mt-1">Must weigh at least 50 kg (110 lbs)</p>
                </div>

                <div className="md:col-span-2">
                  <span className={labelStyles}>Gender</span>
                  <div className="flex gap-6 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        className={radioStyles}
                        checked={formData.gender === 'male'}
                        onChange={handleInputChange}
                      />
                      Male
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        className={radioStyles}
                        checked={formData.gender === 'female'}
                        onChange={handleInputChange}
                      />
                      Female
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        className={radioStyles}
                        checked={formData.gender === 'other'}
                        onChange={handleInputChange}
                      />
                      Other
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-6 flex justify-end">
                <Button onClick={nextStep} variant="primary" className="gap-2">
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-display text-2xl font-bold text-brand-charcoal mb-6">Medical History & Screening</h3>
              
              <div className="space-y-6 mb-8">
                {/* Illnesses */}
                <div>
                  <label htmlFor="recentIllness" className={labelStyles}>Have you had any recent illness or infection?</label>
                  <select
                    id="recentIllness"
                    name="recentIllness"
                    className={inputStyles}
                    value={formData.recentIllness}
                    onChange={handleInputChange}
                  >
                    <option value="none">No illness (Healthy)</option>
                    <option value="fever">Fever / Cold / Sore Throat (within last 14 days)</option>
                    <option value="flu">Flu-like Symptoms / Covid-19 (within last 14 days)</option>
                    <option value="malaria">Malaria (within last 3 months)</option>
                    <option value="other">Other infection/illness</option>
                  </select>
                </div>

                {/* Yes / No switches */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-stone-50 p-4 rounded-input border border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-brand-charcoal block">Recent Surgery?</span>
                      <span className="text-xs text-stone-400">Within the last 6 months</span>
                    </div>
                    <input
                      type="checkbox"
                      name="recentSurgery"
                      checked={formData.recentSurgery}
                      onChange={handleInputChange}
                      className="w-5 h-5 accent-brand-primary"
                    />
                  </div>

                  <div className="bg-stone-50 p-4 rounded-input border border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-brand-charcoal block">Tattoo / Piercing?</span>
                      <span className="text-xs text-stone-400">Within the last 6 months</span>
                    </div>
                    <input
                      type="checkbox"
                      name="recentTattoo"
                      checked={formData.recentTattoo}
                      onChange={handleInputChange}
                      className="w-5 h-5 accent-brand-primary"
                    />
                  </div>

                  {formData.gender === 'female' && (
                    <div className="bg-stone-50 p-4 rounded-input border border-stone-100 flex items-center justify-between md:col-span-2">
                      <div>
                        <span className="text-sm font-semibold text-brand-charcoal block">Pregnancy / Breastfeeding?</span>
                        <span className="text-xs text-stone-400">Currently pregnant or gave birth in the last 6 months</span>
                      </div>
                      <input
                        type="checkbox"
                        name="recentPregnancy"
                        checked={formData.recentPregnancy}
                        onChange={handleInputChange}
                        className="w-5 h-5 accent-brand-primary"
                      />
                    </div>
                  )}
                </div>

                {/* Medications */}
                <div>
                  <span className={labelStyles}>Are you currently taking any of these medications?</span>
                  <div className="space-y-2 mt-2">
                    {DEFERRAL_MEDICATIONS.map(med => (
                      <label key={med.id} className="flex items-start gap-3 p-3 bg-stone-50 border border-stone-150 rounded-input text-xs cursor-pointer hover:bg-stone-100/50 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.medications.includes(med.id)}
                          onChange={() => handleMedicationChange(med.id)}
                          className="w-4 h-4 accent-brand-primary mt-0.5"
                        />
                        <div>
                          <span className="font-semibold text-brand-charcoal block">{med.name.split(' (')[0]}</span>
                          <span className="text-stone-400">{med.name.substring(med.name.indexOf('('))}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-6 flex justify-between">
                <Button onClick={prevStep} variant="secondary" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button onClick={nextStep} variant="primary" className="gap-2">
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-display text-2xl font-bold text-brand-charcoal mb-6">Donation History</h3>
              
              <div className="space-y-6 mb-8">
                <div>
                  <span className={labelStyles}>Have you donated blood before?</span>
                  <div className="flex gap-6 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="hasDonatedBefore"
                        value="true"
                        className={radioStyles}
                        checked={formData.hasDonatedBefore === true}
                        onChange={() => setFormData(prev => ({ ...prev, hasDonatedBefore: true }))}
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="hasDonatedBefore"
                        value="false"
                        className={radioStyles}
                        checked={formData.hasDonatedBefore === false}
                        onChange={() => setFormData(prev => ({ ...prev, hasDonatedBefore: false, lastDonationDate: '' }))}
                      />
                      No (First Time Donor)
                    </label>
                  </div>
                </div>

                {formData.hasDonatedBefore && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-stone-50 rounded-input border border-stone-150"
                  >
                    <div>
                      <label htmlFor="lastDonationDate" className={labelStyles}>Date of Last Donation</label>
                      <input
                        type="date"
                        id="lastDonationDate"
                        name="lastDonationDate"
                        className={inputStyles}
                        value={formData.lastDonationDate}
                        onChange={handleInputChange}
                        required={formData.hasDonatedBefore}
                      />
                    </div>

                    <div>
                      <label htmlFor="donationType" className={labelStyles}>Type of Last Donation</label>
                      <select
                        id="donationType"
                        name="donationType"
                        className={inputStyles}
                        value={formData.donationType}
                        onChange={handleInputChange}
                      >
                        <option value="whole">Whole Blood (56-day gap)</option>
                        <option value="double_red">Double Red Cells (112-day gap)</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                <div className="bg-red-50/50 p-4 border border-brand-primary/10 rounded-input flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0 mt-0.5 font-bold">!</div>
                  <p className="text-xs text-brand-grey leading-relaxed">
                    <span className="font-semibold text-brand-charcoal block mb-0.5">Note on Haemoglobin Levels:</span>
                    Minimum haemoglobin levels of <span className="font-semibold text-brand-charcoal">12.5 g/dL for women</span> and <span className="font-semibold text-brand-charcoal">13.0 g/dL for men</span> are checked on-site via a quick, painless finger prick test before donation.
                  </p>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-6 flex justify-between">
                <Button onClick={prevStep} variant="secondary" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button onClick={handleSubmit} variant="success" className="gap-2 font-bold text-white shadow-md">
                  Check Eligibility <Check className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && result && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-6"
            >
              {result.status === 'eligible' && (
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-emerald-100 text-brand-green border-4 border-white shadow-md rounded-full flex items-center justify-center mx-auto text-4xl animate-bounce">
                    <Check className="w-10 h-10 stroke-[3]" />
                  </div>
                  
                  <div className="max-w-md mx-auto">
                    <h3 className="font-display text-3xl font-bold text-brand-green mb-3">You're Eligible!</h3>
                    <p className="text-sm text-brand-grey leading-relaxed">
                      {result.reason} Thank you for matching all global WHO guidelines. You are fully ready to save lives today.
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-50/50 border border-brand-green/20 rounded-card max-w-md mx-auto flex items-center gap-3">
                    <Heart className="w-6 h-6 text-brand-primary fill-brand-primary shrink-0 animate-pulse" />
                    <p className="text-xs text-brand-green text-left font-medium">
                      One standard whole blood donation can save up to three lives in emergency wards, neonatal care, and surgeries.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Button onClick={resetWizard} variant="secondary">
                      Start Checker Again
                    </Button>
                    <Button 
                      onClick={() => onEligibleSubmit && onEligibleSubmit(formData)} 
                      variant="primary" 
                      className="font-bold gap-2"
                    >
                      Register to Donate Now <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {result.status === 'deferred' && (
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-amber-100 text-brand-amber border-4 border-white shadow-md rounded-full flex items-center justify-center mx-auto text-4xl">
                    <AlertTriangle className="w-10 h-10 stroke-[2.5]" />
                  </div>

                  <div className="max-w-md mx-auto">
                    <h3 className="font-display text-3xl font-bold text-brand-amber mb-3">Temporarily Deferred</h3>
                    <p className="text-sm text-brand-grey leading-relaxed">
                      {result.reason}
                    </p>
                    {result.deferredUntil && (
                      <p className="text-base font-bold text-brand-charcoal mt-4 font-mono">
                        You can donate again starting: {formatDate(result.deferredUntil)}
                      </p>
                    )}
                  </div>

                  <div className="p-4 bg-amber-50/50 border border-brand-amber/20 rounded-card max-w-md mx-auto text-left text-xs text-brand-amber">
                    <span className="font-bold block mb-1">Why is this important?</span>
                    Deferral periods are established by medical boards to protect both donor recovery cycles and recipient safety. We appreciate your support and look forward to welcoming you soon.
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button onClick={resetWizard} variant="primary" className="gap-2">
                      <RefreshCw className="w-4 h-4" /> Reset Checker
                    </Button>
                  </div>
                </div>
              )}

              {result.status === 'ineligible' && (
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-red-100 text-brand-primary border-4 border-white shadow-md rounded-full flex items-center justify-center mx-auto text-4xl">
                    <X className="w-10 h-10 stroke-[3]" />
                  </div>

                  <div className="max-w-md mx-auto">
                    <h3 className="font-display text-3xl font-bold text-brand-primary mb-3">Not Eligible</h3>
                    <p className="text-sm text-brand-grey leading-relaxed">
                      {result.reason}
                    </p>
                  </div>

                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-card max-w-md mx-auto text-left text-xs space-y-2">
                    <p className="font-semibold text-brand-charcoal">You can still support our mission by:</p>
                    <ul className="list-disc pl-4 text-brand-grey space-y-1">
                      <li>Volunteering at our local donation drives.</li>
                      <li>Sharing emergency requests on social media.</li>
                      <li>Helping family and friends register as donors.</li>
                    </ul>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button onClick={resetWizard} variant="primary" className="gap-2">
                      <RefreshCw className="w-4 h-4" /> Reset Checker
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
