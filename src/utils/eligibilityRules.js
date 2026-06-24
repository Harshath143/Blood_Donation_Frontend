import { differenceInDays, addDays, parseISO, format } from 'date-fns';

export const DEFERRAL_MEDICATIONS = [
  { id: 'antibiotics', name: 'Antibiotics (defer for 7 days post-last dose)', deferDays: 7 },
  { id: 'blood_thinners', name: 'Blood Thinners / Anticoagulants (defer for 28 days)', deferDays: 28 },
  { id: 'acne_meds', name: 'Acne Medications (e.g. Accutane - defer for 28 days)', deferDays: 28 },
  { id: 'aspirin', name: 'Aspirin (if donating platelets, defer for 2 days)', deferDays: 2 }
];

export const checkEligibility = (data) => {
  const age = Number(data.age);
  const weight = Number(data.weight);
  
  // 1. Critical Rules (Absolute Ineligibility)
  if (age < 18 || age > 65) {
    return {
      status: 'ineligible',
      eligible: false,
      reason: 'Donors must be between 18 and 65 years of age according to global health guidelines.'
    };
  }

  if (weight < 50) {
    return {
      status: 'ineligible',
      eligible: false,
      reason: 'Donors must weigh at least 50 kg (110 lbs) to ensure safe blood volume draw.'
    };
  }

  // 2. Temporary Deferral Rules
  let maxDeferralDate = null;
  let deferralReasons = [];

  // Recent tattoo / piercing (6 months = 180 days)
  if (data.recentTattoo) {
    const deferDate = addDays(new Date(), 180);
    deferralReasons.push('Recent tattoo or body piercing (requires a 6-month safety window)');
    if (!maxDeferralDate || deferDate > maxDeferralDate) maxDeferralDate = deferDate;
  }

  // Recent surgery (6 months = 180 days)
  if (data.recentSurgery) {
    const deferDate = addDays(new Date(), 180);
    deferralReasons.push('Recent surgery (requires a 6-month healing and recovery period)');
    if (!maxDeferralDate || deferDate > maxDeferralDate) maxDeferralDate = deferDate;
  }

  // Pregnancy / Postpartum (6 months postpartum = 180 days)
  if (data.recentPregnancy) {
    const deferDate = addDays(new Date(), 180);
    deferralReasons.push('Pregnancy or lactation (requires a 6-month postpartum deferral to restore iron levels)');
    if (!maxDeferralDate || deferDate > maxDeferralDate) maxDeferralDate = deferDate;
  }

  // Illnesses (malaria: 3 months/90 days, covid/flu: 14 days)
  if (data.recentIllness === 'malaria') {
    const deferDate = addDays(new Date(), 90);
    deferralReasons.push('Recent Malaria infection (requires a 3-month clear window)');
    if (!maxDeferralDate || deferDate > maxDeferralDate) maxDeferralDate = deferDate;
  } else if (data.recentIllness === 'fever' || data.recentIllness === 'flu' || data.recentIllness === 'covid') {
    const deferDate = addDays(new Date(), 14);
    deferralReasons.push('Recent fever, flu, or Covid-19 (requires 14 days recovery post-symptoms)');
    if (!maxDeferralDate || deferDate > maxDeferralDate) maxDeferralDate = deferDate;
  }

  // Medications
  if (data.medications && data.medications.length > 0) {
    data.medications.forEach(medId => {
      const med = DEFERRAL_MEDICATIONS.find(m => m.id === medId);
      if (med) {
        const deferDate = addDays(new Date(), med.deferDays);
        deferralReasons.push(`Taking ${med.name}`);
        if (!maxDeferralDate || deferDate > maxDeferralDate) maxDeferralDate = deferDate;
      }
    });
  }

  // Last Donation Date Interval
  if (data.lastDonationDate) {
    const lastDate = typeof data.lastDonationDate === 'string' ? parseISO(data.lastDonationDate) : data.lastDonationDate;
    const daysSince = differenceInDays(new Date(), lastDate);
    const donationType = data.donationType || 'whole';
    const requiredInterval = donationType === 'double_red' ? 112 : 56; // 112 days for double red cells, 56 days for whole blood
    
    if (daysSince < requiredInterval) {
      const deferDate = addDays(lastDate, requiredInterval);
      deferralReasons.push(`Donation interval constraint (${requiredInterval} days required for ${donationType === 'double_red' ? 'Double Red Cells' : 'Whole Blood'})`);
      if (!maxDeferralDate || deferDate > maxDeferralDate) maxDeferralDate = deferDate;
    }
  }

  if (deferralReasons.length > 0) {
    return {
      status: 'deferred',
      eligible: false,
      reason: `You are temporarily deferred due to: ${deferralReasons.join(', ')}.`,
      deferredUntil: maxDeferralDate ? format(maxDeferralDate, 'yyyy-MM-dd') : null
    };
  }

  return {
    status: 'eligible',
    eligible: true,
    reason: 'Congratulations! You meet all blood donation eligibility criteria.',
    deferredUntil: null
  };
};
