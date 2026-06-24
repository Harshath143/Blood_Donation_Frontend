import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, Activity } from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDrawerOpen(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/donate', label: 'Donate Blood' },
    { path: '/request-blood', label: 'Request Blood' },
    { path: '/find-donors', label: 'Find Donors' },
    { path: '/blood-banks', label: 'Blood Banks' },
    { path: '/learn', label: 'Learn' },
    { path: '/emergency', label: 'Emergency' }
  ];

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-stone-200' 
        : 'bg-white py-4 border-b border-stone-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group focus:outline-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="#C0392B" 
            className="w-8 h-8 transform group-hover:scale-110 transition-transform duration-300"
          >
            <path d="M12 2.69l5.66 5.66A8 8 0 1 1 6.34 8.35L12 2.69z" />
          </svg>
          <span className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">
            LifeDrop
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                text-sm font-medium tracking-wide transition-colors relative py-1 focus:outline-none
                ${link.path === '/emergency' 
                  ? 'text-brand-primary font-bold hover:text-brand-darkRed' 
                  : isActive 
                    ? 'text-brand-primary font-semibold' 
                    : 'text-brand-grey hover:text-brand-charcoal'}
              `}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && link.path !== '/emergency' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard" 
                className="text-sm font-semibold text-brand-charcoal hover:text-brand-primary flex items-center gap-1.5 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-red-50 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                  <User className="w-4 h-4" />
                </div>
                <span>Dashboard</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="text-stone-400 hover:text-brand-primary transition-colors focus:outline-none"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="lg:hidden p-2 text-brand-charcoal hover:text-brand-primary focus:outline-none"
          aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
        >
          {isDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-35 bg-brand-charcoal/40 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
      )}

      {/* Mobile Drawer (Slide-in) */}
      <div className={`lg:hidden fixed top-0 right-0 z-40 w-72 h-full bg-white shadow-xl p-6 transition-transform duration-300 transform ${
        isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex justify-between items-center mb-8 border-b border-stone-100 pb-4">
          <span className="font-display text-xl font-bold text-brand-charcoal">Menu</span>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="p-1 text-brand-grey hover:text-brand-charcoal focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-4 mb-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsDrawerOpen(false)}
              className={({ isActive }) => `
                text-base font-medium py-1 transition-colors
                ${link.path === '/emergency' 
                  ? 'text-brand-primary font-bold' 
                  : isActive 
                    ? 'text-brand-primary font-semibold' 
                    : 'text-brand-grey hover:text-brand-charcoal'}
              `}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-stone-100 pt-6">
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-50 border border-brand-primary/20 flex items-center justify-center text-brand-primary text-sm font-bold">
                  {user.fullName[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-charcoal">{user.fullName}</p>
                  <p className="text-xs text-brand-grey">{user.email}</p>
                </div>
              </div>
              <Link 
                to="/dashboard" 
                onClick={() => setIsDrawerOpen(false)}
                className="w-full flex items-center justify-center gap-2 border border-brand-primary text-brand-primary py-2.5 rounded-pill font-medium hover:bg-red-50 text-sm transition-colors focus:outline-none"
              >
                <Activity className="w-4 h-4" /> Go to Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full bg-stone-100 hover:bg-stone-200 text-brand-charcoal py-2.5 rounded-pill font-medium text-sm transition-colors flex items-center justify-center gap-2 focus:outline-none"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsDrawerOpen(false)} className="w-full">
                <Button variant="secondary" className="w-full" size="md">Login</Button>
              </Link>
              <Link to="/register" onClick={() => setIsDrawerOpen(false)} className="w-full">
                <Button variant="primary" className="w-full" size="md">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
