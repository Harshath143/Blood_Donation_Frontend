import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Check, CheckCircle2, Award, Heart } from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import { Button } from '../ui/Button';

// Zod Validation Schema
const schema = z.object({
  fullName: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  age: z.coerce.number().min(18, { message: 'Must be 18+' }).max(65, { message: 'Must be 65 or younger' }),
  gender: z.enum(['male', 'female', 'other'], { errorMap: () => ({ message: 'Gender is required' }) }),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], { errorMap: () => ({ message: 'Please select a blood type' }) }),
  phone: z.string().min(10, { message: 'Phone must be a valid 10-digit number' }),
  email: z.string().email({ message: 'Invalid email address' }),
  city: z.string().min(2, { message: 'City is required' }),
  state: z.string().min(2, { message: 'State is required' }),
  pinCode: z.string().regex(/^\d{6}$/, { message: 'PIN code must be exactly 6 digits' }),
  lastDonationDate: z.string().optional(),
  neverDonated: z.boolean().default(false),
  availability: z.enum(['Available Now', 'Weekends Only', 'Emergency Only']),
  notifyEmergency: z.boolean().default(true),
  consent: z.literal(true, { errorMap: () => ({ message: 'You must confirm eligibility consent' }) })
});

export const DonorRegistrationForm = ({ initialData = {}, onSuccess }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const registerAsDonor = useUserStore(state => state.registerAsDonor);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: initialData.fullName || '',
      age: initialData.age || '',
      gender: initialData.gender || 'male',
      bloodType: initialData.bloodType || 'A+',
      phone: '',
      email: initialData.email || '',
      city: initialData.city || 'Chennai',
      state: initialData.state || 'Tamil Nadu',
      pinCode: '',
      lastDonationDate: initialData.lastDonationDate || '',
      neverDonated: !initialData.lastDonationDate,
      availability: 'Available Now',
      notifyEmergency: true,
      consent: false,
      ...initialData
    }
  });

  const neverDonatedVal = watch('neverDonated');

  const onSubmit = (data) => {
    setLoading(true);
    // Rate limit simulated
    setTimeout(() => {
      const success = registerAsDonor({
        ...data,
        lastDonationDate: data.neverDonated ? 'Never' : data.lastDonationDate
      });
      setLoading(false);
      if (success) {
        setIsSuccess(true);
        if (onSuccess) onSuccess();
      }
    }, 1500);
  };

  // Form styles
  const inputGroup = "flex flex-col gap-1.5";
  const labelStyles = "text-sm font-semibold text-brand-charcoal";
  const inputStyles = "border border-stone-300 rounded-input px-4 py-2.5 text-brand-charcoal bg-white focus:ring-2 focus:ring-brand-warm focus:border-brand-warm outline-none transition-all text-sm disabled:bg-stone-100 disabled:text-stone-400";
  const errorStyles = "text-xs font-semibold text-brand-primary";

  if (isSuccess) {
    return (
      <div className="bg-white rounded-card border border-stone-200 shadow-elevation p-8 max-w-lg mx-auto text-center">
        {/* Animated filling blood drop SVG */}
        <div className="relative w-36 h-44 mx-auto mb-6 flex items-center justify-center">
          {/* Drop outline */}
          <svg viewBox="0 0 100 130" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M50 10 C 50 10, 92 65, 92 90 A 42 42 0 1 1 8 90 C 8 65, 50 10, 50 10 Z" 
              fill="none" 
              stroke="#C0392B"
              strokeWidth="4"
            />
          </svg>

          {/* Filling mask red drop */}
          <motion.div 
            initial={{ height: "0%" }}
            animate={{ height: "92%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute bottom-[4%] left-0 right-0 overflow-hidden w-full origin-bottom"
          >
            <div className="relative w-full h-44">
              <svg viewBox="0 0 100 130" className="absolute bottom-0 left-0 right-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M50 10 C 50 10, 92 65, 92 90 A 42 42 0 1 1 8 90 C 8 65, 50 10, 50 10 Z" 
                  fill="#C0392B" 
                />
              </svg>
            </div>
          </motion.div>

          <div className="relative z-10 text-white pt-10 font-bold flex flex-col items-center justify-center">
            <CheckCircle2 className="w-10 h-10 drop-shadow" />
            <span className="text-xs uppercase tracking-wider mt-1 drop-shadow">Registered</span>
          </div>
        </div>

        <h3 className="font-display text-3xl font-bold text-brand-charcoal mb-4">You're a Hero!</h3>
        <p className="text-sm text-brand-grey leading-relaxed mb-6">
          Your details are now securely visible to verified partner hospitals and recipients in emergencies. Thank you for stepping up to make a difference.
        </p>

        <div className="bg-stone-50 border border-stone-200 rounded-input p-4 mb-6 flex items-center justify-start text-left gap-3">
          <div className="w-10 h-10 bg-amber-50 rounded-full border border-amber-200 text-brand-amber flex items-center justify-center font-bold shrink-0">
            <Award className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-brand-charcoal">Badge Unlocked: "First Drop"</h4>
            <p className="text-[11px] text-stone-400">View details and download certificate in your Dashboard profile.</p>
          </div>
        </div>

        <Link to="/dashboard" className="inline-block w-full">
          <Button variant="primary" className="w-full">
            Go to My Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-card border border-stone-200 shadow-elevation p-6 md:p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h3 className="font-display text-2xl font-bold text-brand-charcoal">Donor Registration</h3>
        <p className="text-xs text-brand-grey mt-1">Please provide accurate health credentials. All fields are required unless marked optional.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="fullName">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            className={inputStyles} 
            placeholder="e.g. John Doe"
            {...register('fullName')}
          />
          {errors.fullName && <span className={errorStyles}>{errors.fullName.message}</span>}
        </div>

        {/* Age */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="age">Age</label>
          <input 
            type="number" 
            id="age" 
            className={inputStyles} 
            placeholder="e.g. 28"
            {...register('age')}
          />
          {errors.age && <span className={errorStyles}>{errors.age.message}</span>}
        </div>

        {/* Gender */}
        <div className={inputGroup}>
          <label className={labelStyles}>Gender</label>
          <div className="flex gap-4 mt-2">
            {['male', 'female', 'other'].map(g => (
              <label key={g} className="flex items-center gap-2 cursor-pointer text-sm capitalize">
                <input 
                  type="radio" 
                  value={g}
                  className="w-4 h-4 text-brand-primary focus:ring-brand-warm" 
                  {...register('gender')} 
                />
                {g}
              </label>
            ))}
          </div>
          {errors.gender && <span className={errorStyles}>{errors.gender.message}</span>}
        </div>

        {/* Blood Group */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="bloodType">Blood Group</label>
          <select 
            id="bloodType" 
            className={inputStyles}
            {...register('bloodType')}
          >
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.bloodType && <span className={errorStyles}>{errors.bloodType.message}</span>}
        </div>

        {/* Phone */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="phone">Phone Number</label>
          <div className="flex gap-2">
            <span className="bg-stone-100 border border-stone-300 rounded-input px-3 py-2.5 text-sm text-brand-charcoal flex items-center justify-center font-mono">
              +91
            </span>
            <input 
              type="tel" 
              id="phone" 
              className={`${inputStyles} flex-1 font-mono`} 
              placeholder="98401 23456"
              {...register('phone')}
            />
          </div>
          {errors.phone && <span className={errorStyles}>{errors.phone.message}</span>}
        </div>

        {/* Email */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            className={inputStyles} 
            placeholder="johndoe@email.com"
            {...register('email')}
          />
          {errors.email && <span className={errorStyles}>{errors.email.message}</span>}
        </div>

        {/* City */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="city">City</label>
          <input 
            type="text" 
            id="city" 
            className={inputStyles} 
            {...register('city')}
          />
          {errors.city && <span className={errorStyles}>{errors.city.message}</span>}
        </div>

        {/* State */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="state">State</label>
          <input 
            type="text" 
            id="state" 
            className={inputStyles} 
            {...register('state')}
          />
          {errors.state && <span className={errorStyles}>{errors.state.message}</span>}
        </div>

        {/* Pin Code */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="pinCode">PIN Code</label>
          <input 
            type="text" 
            id="pinCode" 
            className={`${inputStyles} font-mono`}
            maxLength="6"
            placeholder="600001"
            {...register('pinCode')}
          />
          {errors.pinCode && <span className={errorStyles}>{errors.pinCode.message}</span>}
        </div>

        {/* Last Donation Date */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="lastDonationDate">Last Donation Date</label>
          <input 
            type="date" 
            id="lastDonationDate" 
            className={inputStyles}
            disabled={neverDonatedVal}
            {...register('lastDonationDate')}
          />
          <label className="flex items-center gap-2 mt-1 cursor-pointer text-xs font-semibold text-brand-grey">
            <input 
              type="checkbox" 
              className="w-4 h-4 accent-brand-primary" 
              {...register('neverDonated')} 
              onChange={(e) => {
                setValue('neverDonated', e.target.checked);
                if (e.target.checked) setValue('lastDonationDate', '');
              }}
            />
            I have never donated blood before
          </label>
        </div>

        {/* Availability */}
        <div className="md:col-span-2 space-y-2">
          <label className={labelStyles}>My Availability</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'Available Now', desc: 'Ready to donate instantly' },
              { id: 'Weekends Only', desc: 'Available on Saturdays/Sundays' },
              { id: 'Emergency Only', desc: 'Call only for critical needs' }
            ].map(av => (
              <label key={av.id} className="flex flex-col p-3 border border-stone-200 rounded-input bg-stone-50 hover:bg-stone-100/50 cursor-pointer transition-all">
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    value={av.id}
                    className="w-4 h-4 text-brand-primary accent-brand-primary" 
                    {...register('availability')} 
                  />
                  <span className="text-xs font-bold text-brand-charcoal">{av.id}</span>
                </div>
                <span className="text-[10px] text-brand-grey ml-6 mt-0.5">{av.desc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Emergency Notify toggle */}
        <div className="md:col-span-2 bg-red-50/50 border border-brand-primary/10 p-4 rounded-input flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold text-brand-charcoal block">Emergency Alerts</span>
            <span className="text-xs text-brand-grey">Notify me via WhatsApp/Phone for critical hospital requests in my area</span>
          </div>
          <input 
            type="checkbox" 
            className="w-5 h-5 accent-brand-primary" 
            {...register('notifyEmergency')} 
          />
        </div>

        {/* Consent Checkbox */}
        <div className="md:col-span-2">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs leading-relaxed text-brand-grey">
            <input 
              type="checkbox" 
              className="w-5 h-5 accent-brand-primary shrink-0 mt-0.5" 
              {...register('consent')}
            />
            <span>
              I confirm that I meet the basic blood donation age (18-65) and weight (min 50kg) criteria. I consent to having my blood group and location details securely displayed to matching hospitals and verified recipients in need.
            </span>
          </label>
          {errors.consent && <span className={`${errorStyles} block mt-1`}>{errors.consent.message}</span>}
        </div>
      </div>

      <div className="border-t border-stone-100 pt-6 flex justify-end">
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full sm:w-auto font-bold"
          loading={loading}
        >
          Submit Registration
        </Button>
      </div>
    </form>
  );
};
