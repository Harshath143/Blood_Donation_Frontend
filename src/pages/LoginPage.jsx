import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/Button';
import { LogIn, Mail, Lock, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useUserStore(state => state.login);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(email, password);
      setLoading(false);
      toast.success("Successfully logged in!");
      if (redirect) {
        navigate(`/${redirect}`);
      } else {
        navigate('/dashboard');
      }
    }, 1200);
  };

  const handleGoogleLogin = () => {
    toast.success("Redirecting to Google OAuth...");
  };

  const inputStyles = "w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-input text-xs outline-none bg-white focus:ring-2 focus:ring-brand-warm transition-all text-brand-charcoal font-semibold";
  const labelStyles = "text-xs font-bold text-brand-charcoal block mb-1.5";

  return (
    <PageWrapper>
      <div className="min-h-[500px] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-stone-50/50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-card border border-stone-200 shadow-elevation text-left">
          
          {/* Logo & title */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C0392B" className="w-8 h-8">
                <path d="M12 2.69l5.66 5.66A8 8 0 1 1 6.34 8.35L12 2.69z" />
              </svg>
              <span className="font-display text-2xl font-bold text-brand-charcoal">LifeDrop</span>
            </Link>
            <h2 className="text-xl font-bold text-brand-charcoal mt-4">Welcome Back</h2>
            <p className="text-xs text-brand-grey">Login to manage your donations and respond to emergency matches.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {/* Email */}
            <div>
              <label htmlFor="email" className={labelStyles}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputStyles}
                  placeholder="name@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="text-xs font-bold text-brand-charcoal">Password</label>
                <button 
                  type="button"
                  onClick={() => toast.success("Password reset email sent (simulation)")}
                  className="text-[10px] text-brand-primary hover:underline font-bold"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input 
                  type="password" 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputStyles}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                variant="primary" 
                className="w-full font-bold py-3 flex items-center justify-center gap-1.5"
                loading={loading}
              >
                <LogIn className="w-4 h-4" /> Sign In
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-200"></div></div>
            <span className="relative bg-white px-3 text-[10px] text-stone-400 font-semibold uppercase tracking-wider">Or continue with</span>
          </div>

          {/* Social Sign In */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full border border-stone-300 hover:bg-stone-50 py-2.5 rounded-input text-xs font-semibold text-brand-charcoal flex items-center justify-center gap-2 transition-colors focus:outline-none"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg> 
              Sign in with Google
            </button>

            <p className="text-center text-xs text-brand-grey mt-6">
              New to LifeDrop?{' '}
              <Link to={`/register${redirect ? `?redirect=${redirect}` : ''}`} className="text-brand-primary font-bold hover:underline">
                Create an account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
};
