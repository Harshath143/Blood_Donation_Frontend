import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, X, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

const requestSchema = z.object({
  patientName: z.string().min(3, { message: 'Patient Name must be at least 3 characters' }),
  age: z.coerce.number().min(0, { message: 'Age is required' }).max(120),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']),
  unitsRequired: z.coerce.number().min(1, { message: 'Minimum 1 unit required' }).max(10, { message: 'Maximum 10 units per request online' }),
  hospitalName: z.string().min(5, { message: 'Please specify the full hospital name' }),
  city: z.string().min(2, { message: 'City is required' }),
  state: z.string().min(2, { message: 'State is required' }),
  requiredDate: z.string().min(1, { message: 'Date is required' }),
  requiredTime: z.string().min(1, { message: 'Time is required' }),
  urgencyLevel: z.enum(['CRITICAL', 'URGENT', 'PLANNED']),
  contactName: z.string().min(3, { message: 'Contact Name is required' }),
  phone: z.string().min(10, { message: 'Phone must be a valid 10-digit number' }),
  description: z.string().max(300, { message: 'Limit case description to 300 characters' })
});

export const BloodRequestForm = ({ onSubmitSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      patientName: '',
      age: '',
      bloodType: 'A+',
      unitsRequired: 1,
      hospitalName: '',
      city: 'Chennai',
      state: 'Tamil Nadu',
      requiredDate: new Date().toISOString().split('T')[0],
      requiredTime: '12:00',
      urgencyLevel: 'URGENT',
      contactName: '',
      phone: '',
      description: ''
    }
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setFilePreview(null);
    setValue('prescription', null);
  };

  const onSubmit = (data) => {
    setLoading(true);
    // Rate limit simulated (disable submit button for 3s / simulate processing)
    setTimeout(() => {
      setLoading(false);
      if (onSubmitSuccess) {
        onSubmitSuccess({
          ...data,
          prescriptionUrl: filePreview
        });
      }
    }, 1500);
  };

  // Form styles
  const inputGroup = "flex flex-col gap-1.5";
  const labelStyles = "text-xs font-semibold text-brand-charcoal";
  const inputStyles = "border border-stone-300 rounded-input px-3.5 py-2 text-brand-charcoal bg-white focus:ring-2 focus:ring-brand-warm focus:border-brand-warm outline-none transition-all text-sm";
  const errorStyles = "text-[11px] font-semibold text-brand-primary";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white p-6 rounded-card border border-stone-200 shadow-sm">
      <div className="border-b border-stone-100 pb-3">
        <h3 className="text-xl font-bold text-brand-charcoal">Blood Request Details</h3>
        <p className="text-xs text-brand-grey mt-0.5">Submit patient requirements below to broadcast to matching donors.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Patient Name */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="patientName">Patient Name</label>
          <input 
            type="text" 
            id="patientName" 
            className={inputStyles} 
            placeholder="Patient's Full Name"
            {...register('patientName')}
          />
          {errors.patientName && <span className={errorStyles}>{errors.patientName.message}</span>}
        </div>

        {/* Patient Age */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="age">Patient Age</label>
          <input 
            type="number" 
            id="age" 
            className={inputStyles} 
            placeholder="e.g. 45"
            {...register('age')}
          />
          {errors.age && <span className={errorStyles}>{errors.age.message}</span>}
        </div>

        {/* Blood Group */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="bloodType">Blood Group Needed</label>
          <select 
            id="bloodType" 
            className={inputStyles}
            {...register('bloodType')}
          >
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.bloodType && <span className={errorStyles}>{errors.bloodType.message}</span>}
        </div>

        {/* Units required */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="unitsRequired">Units Required (1-10)</label>
          <input 
            type="number" 
            id="unitsRequired" 
            min="1" 
            max="10" 
            className={inputStyles}
            {...register('unitsRequired')}
          />
          {errors.unitsRequired && <span className={errorStyles}>{errors.unitsRequired.message}</span>}
        </div>

        {/* Hospital Name */}
        <div className={`${inputGroup} sm:col-span-2`}>
          <label className={labelStyles} htmlFor="hospitalName">Hospital Name & Branch</label>
          <input 
            type="text" 
            id="hospitalName" 
            className={inputStyles} 
            placeholder="e.g. Apollo Hospital, Greams Road"
            {...register('hospitalName')}
          />
          {errors.hospitalName && <span className={errorStyles}>{errors.hospitalName.message}</span>}
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

        {/* Date Required */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="requiredDate">Required By (Date)</label>
          <input 
            type="date" 
            id="requiredDate" 
            className={inputStyles} 
            {...register('requiredDate')}
          />
          {errors.requiredDate && <span className={errorStyles}>{errors.requiredDate.message}</span>}
        </div>

        {/* Time Required */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="requiredTime">Required By (Time)</label>
          <input 
            type="time" 
            id="requiredTime" 
            className={inputStyles} 
            {...register('requiredTime')}
          />
          {errors.requiredTime && <span className={errorStyles}>{errors.requiredTime.message}</span>}
        </div>

        {/* Urgency Level */}
        <div className={`${inputGroup} sm:col-span-2`}>
          <label className={labelStyles}>Urgency Level</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'CRITICAL', label: 'CRITICAL (< 2 hrs)', color: 'border-brand-primary text-brand-primary bg-red-50/50' },
              { id: 'URGENT', label: 'URGENT (< 12 hrs)', color: 'border-brand-amber text-brand-amber bg-amber-50/30' },
              { id: 'PLANNED', label: 'PLANNED / Standby', color: 'border-brand-grey text-brand-grey hover:bg-stone-50' }
            ].map(urg => (
              <label 
                key={urg.id} 
                className="flex items-center justify-center p-2.5 border rounded-input cursor-pointer text-center select-none"
              >
                <input 
                  type="radio" 
                  value={urg.id}
                  className="sr-only" 
                  {...register('urgencyLevel')} 
                />
                <span className="text-[11px] font-bold">{urg.label}</span>
              </label>
            ))}
          </div>
          {errors.urgencyLevel && <span className={errorStyles}>{errors.urgencyLevel.message}</span>}
        </div>

        {/* Contact Name */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="contactName">Contact Person Name</label>
          <input 
            type="text" 
            id="contactName" 
            className={inputStyles} 
            placeholder="Name of attendant/relative"
            {...register('contactName')}
          />
          {errors.contactName && <span className={errorStyles}>{errors.contactName.message}</span>}
        </div>

        {/* Contact Phone */}
        <div className={inputGroup}>
          <label className={labelStyles} htmlFor="phone">Contact Phone Number</label>
          <div className="flex gap-2">
            <span className="bg-stone-50 border border-stone-300 rounded-input px-3 py-2 text-xs text-brand-charcoal flex items-center justify-center font-mono">+91</span>
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

        {/* Case Description */}
        <div className={`${inputGroup} sm:col-span-2`}>
          <label className={labelStyles} htmlFor="description">Case Description & Details (Max 300 chars)</label>
          <textarea 
            id="description" 
            rows="3" 
            maxLength="300"
            className={`${inputStyles} resize-none`}
            placeholder="Please detail the patient condition, diagnosis, surgery context, or specific request details..."
            {...register('description')}
          />
          {errors.description && <span className={errorStyles}>{errors.description.message}</span>}
        </div>

        {/* Prescription Upload with Preview */}
        <div className={`${inputGroup} sm:col-span-2`}>
          <label className={labelStyles}>Prescription / Hospital Requisition Letter (Optional)</label>
          {filePreview ? (
            <div className="relative border border-stone-300 rounded-input p-3 bg-stone-50 flex items-center gap-3">
              <img 
                src={filePreview} 
                alt="Prescription preview" 
                className="w-16 h-16 object-cover rounded border border-stone-200 bg-white" 
              />
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-semibold text-brand-charcoal truncate">Prescription_Document.jpg</p>
                <p className="text-[10px] text-stone-400">Ready to upload</p>
              </div>
              <button 
                type="button" 
                onClick={removeFile}
                className="p-1.5 hover:bg-stone-200 text-stone-400 hover:text-brand-charcoal rounded-full transition-colors"
                aria-label="Remove uploaded file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-stone-300 hover:border-brand-primary rounded-input p-6 bg-stone-50 hover:bg-stone-100/50 flex flex-col items-center justify-center cursor-pointer transition-colors">
              <Upload className="w-6 h-6 text-stone-400 mb-1" />
              <span className="text-xs font-semibold text-brand-charcoal">Click to upload prescription</span>
              <span className="text-[10px] text-stone-400 mt-0.5">JPEG, PNG formats up to 5MB</span>
              <input 
                type="file" 
                accept="image/*"
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      </div>

      <div className="bg-amber-50/50 border border-brand-amber/15 p-3 rounded-input flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
        <p className="text-[10.5px] text-brand-amber leading-relaxed">
          Ensure patient details are verified. Submitting false requests or spamming is a punishable public offense and accounts will be banned from our systems.
        </p>
      </div>

      <div className="pt-3">
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full font-bold shadow-md"
          loading={loading}
        >
          Submit Blood Request
        </Button>
      </div>
    </form>
  );
};
