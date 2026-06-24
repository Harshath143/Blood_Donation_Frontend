import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/Button';
import { MailCheck, User, Mail, Lock, MapPin, Compass } from 'lucide-react';
import toast from 'react-hot-toast';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const registerUser = useUserStore(state => state.register);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'donor', // 'donor' | 'recipient' | 'both'
    bloodType: 'A+',
    city: 'Chennai',
    terms: false
  });
  const [loading, setLoading] = useState(false);
  const [isVerificationScreen, setIsVerificationScreen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.city) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!formData.terms) {
      toast.error("You must accept the terms & conditions.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      registerUser(
        formData.fullName,
        formData.email,
        formData.password,
        formData.role,
        formData.bloodType,
        formData.city
      );
      setLoading(false);
      setIsVerificationScreen(true);
      toast.success("Account created successfully!");
    }, 1500);
  };

  const handleVerificationProceed = () => {
    if (redirect) {
      navigate(`/${redirect}`);
    } else {
      navigate('/dashboard');
    }
  };

  const inputStyles = "w-full pl-10 pr-4 py-2 border border-stone-300 rounded-input text-xs outline-none bg-white focus:ring-2 focus:ring-brand-warm transition-all text-brand-charcoal font-semibold";
  const labelStyles = "text-xs font-bold text-brand-charcoal block mb-1.5";

  if (isVerificationScreen) {
    return (
      <PageWrapper>
        <div className="min-h-[500px] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-stone-50/50">
          <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-card border border-stone-200 shadow-elevation text-center">
            <div className="w-16 h-16 bg-red-50 text-brand-primary border border-red-100 rounded-full flex items-center justify-center mx-auto">
              <MailCheck className="w-8 h-8 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-brand-charcoal font-display">Verify your Email</h2>
            <p className="text-xs text-brand-grey leading-relaxed">
              We have sent a simulated verification link to <span className="font-bold text-brand-charcoal">{formData.email}</span>. Please click the link inside the email to activate your account.
            </p>
            <div className="pt-4 space-y-3">
              <Button 
                variant="primary" 
                onClick={handleVerificationProceed}
                className="w-full font-bold py-3"
              >
                Proceed to Dashboard (Demo Bypass)
              </Button>
              <button 
                onClick={() => toast.success("Resent email verification link")}
                className="text-xs font-bold text-brand-primary hover:underline"
              >
                Resend verification email
              </button>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-[600px] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-stone-50/50">
        <div className="max-w-lg w-full space-y-6 bg-white p-6 md:p-8 rounded-card border border-stone-200 shadow-elevation text-left">
          
          <div className="text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C0392B" className="w-8 h-8">
                <path d="M12 2.69l5.66 5.66A8 8 0 1 1 6.34 8.35L12 2.69z" />
              </svg>
              <span className="font-display text-2xl font-bold text-brand-charcoal">LifeDrop</span>
            </Link>
            <h2 className="text-xl font-bold text-brand-charcoal mt-3">Join the LifeDrop Network</h2>
            <p className="text-xs text-brand-grey">Register today to start donating or matching requests in Chennai.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className={labelStyles}>Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input 
                    type="text" 
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={inputStyles}
                    placeholder="e.g. Jane Doe"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label htmlFor="email" className={labelStyles}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputStyles}
                    placeholder="jane.doe@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className={labelStyles}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input 
                    type="password" 
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={inputStyles}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className={labelStyles}>Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input 
                    type="password" 
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={inputStyles}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="sm:col-span-2 space-y-1.5">
                <span className={labelStyles}>I am registering as:</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'donor', label: 'Donor' },
                    { id: 'recipient', label: 'Recipient' },
                    { id: 'both', label: 'Both' }
                  ].map(role => (
                    <label key={role.id} className="flex items-center justify-center p-2.5 border rounded-input cursor-pointer text-center select-none text-xs font-semibold text-brand-charcoal bg-stone-50 hover:bg-stone-100 transition-colors">
                      <input 
                        type="radio" 
                        name="role"
                        value={role.id}
                        className="sr-only"
                        checked={formData.role === role.id}
                        onChange={handleInputChange}
                      />
                      <span>{role.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label htmlFor="bloodType" className={labelStyles}>Blood Group (Optional)</label>
                <select 
                  id="bloodType"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                  className="w-full border border-stone-300 rounded-input px-3.5 py-2.5 text-brand-charcoal bg-white focus:ring-2 focus:ring-brand-warm outline-none transition-all text-xs font-semibold"
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className={labelStyles}>Registered City</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input 
                    type="text" 
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-input text-xs outline-none bg-white focus:ring-2 focus:ring-brand-warm transition-all text-brand-charcoal font-semibold"
                    placeholder="Chennai"
                    required
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="sm:col-span-2 mt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-[11px] leading-relaxed text-brand-grey select-none">
                  <input 
                    type="checkbox" 
                    name="terms"
                    checked={formData.terms}
                    onChange={handleInputChange}
                    className="w-4.5 h-4.5 accent-brand-primary shrink-0 mt-0.5"
                    required
                  />
                  <span>
                    I accept the LifeDrop <Link to="/terms" className="text-brand-primary font-bold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-brand-primary font-bold hover:underline">Privacy Policy</Link>. I confirm that the details provided are accurate and matching official municipal ID documents.
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                variant="primary" 
                className="w-full font-bold py-3.5"
                loading={loading}
              >
                Sign Up & Verify Email
              </Button>
            </div>
          </form>

          {/* Login redirection */}
          <div className="text-center text-xs text-brand-grey mt-4 border-t border-stone-100 pt-4">
            Already have an account?{' '}
            <Link to={`/login${redirect ? `?redirect=${redirect}` : ''}`} className="text-brand-primary font-bold hover:underline">
              Login here
            </Link>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
};
