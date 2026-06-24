import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Heart, HelpCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-charcoal text-stone-300 pt-16 pb-8 border-t-4 border-brand-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Col 1: Logo & Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C0392B" className="w-7 h-7">
              <path d="M12 2.69l5.66 5.66A8 8 0 1 1 6.34 8.35L12 2.69z" />
            </svg>
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              LifeDrop
            </span>
          </div>
          <p className="text-sm font-display italic text-stone-400">
            "One Drop. Many Lives."
          </p>
          <p className="text-xs leading-relaxed text-stone-400">
            LifeDrop is a public health initiative aiming to bridge the gap between voluntary blood donors and patients in urgent need.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-brand-warm transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h3.3l.7-3H12V6c0-.9.7-1 1-1h2V2h-3C9.5 2 9 3.5 9 5v3z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-brand-warm transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.2 2.4h3.3L14.3 11l8.5 11.3h-6.7L10.9 15l-6 6.8H1.6l7.6-8.7L1 2.4h6.9l4.7 6.2 5.6-6.2zm-1.2 17.6h1.8L7.1 4H5.2l11.8 16z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-warm transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-brand-warm transition-colors" aria-label="Youtube">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.5 6.2c-.3-1.1-1.1-2-2.2-2.3C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.3.4c-1.1.3-1.9 1.2-2.2 2.3C.1 8.2 0 12 0 12s0 3.8.1 5.8c.3 1.1 1.1 2 2.2 2.3 2 .5 9.3.5 9.3.5s7.3 0 9.3-.5c1.1-.3 1.9-1.2 2.2-2.3.4-2 .4-5.8.4-5.8s0-3.8-.4-5.8zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h3 className="text-white font-bold text-base mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-brand-primary">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/donate" className="hover:text-white transition-colors">Donate Blood</Link></li>
            <li><Link to="/request-blood" className="hover:text-white transition-colors">Request Blood</Link></li>
            <li><Link to="/find-donors" className="hover:text-white transition-colors">Find Local Donors</Link></li>
            <li><Link to="/blood-banks" className="hover:text-white transition-colors">Blood Banks Directory</Link></li>
            <li><Link to="/eligibility" className="hover:text-white transition-colors">Eligibility Guidelines</Link></li>
          </ul>
        </div>

        {/* Col 3: Resources */}
        <div>
          <h3 className="text-white font-bold text-base mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-brand-primary">
            Resources
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/learn" className="hover:text-white transition-colors">Learn About Donation</Link></li>
            <li><a href="#faq" className="hover:text-white transition-colors">Common FAQs</a></li>
            <li><Link to="/learn#journey" className="hover:text-white transition-colors">The Blood Journey</Link></li>
            <li><Link to="/learn#myths" className="hover:text-white transition-colors">Myths vs Facts</Link></li>
            <li><a href="/src/assets/guide.pdf" download className="hover:text-white transition-colors flex items-center gap-1.5">Donation Guide (PDF)</a></li>
          </ul>
        </div>

        {/* Col 4: Contact & Emergency */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-base mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-brand-primary">
            Emergency Contacts
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2.5">
              <Phone className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-stone-400">24/7 National Emergency Hotline</p>
                <p className="text-lg font-bold text-brand-primary font-mono tracking-wide">
                  <a href="tel:108">108</a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2.5">
              <HelpCircle className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-stone-400">LifeDrop Helpdesk & Support</p>
                <p className="font-semibold text-white font-mono">
                  <a href="tel:+914428005555">+91 44 2800 5555</a>
                </p>
              </div>
            </div>
            
            <p className="text-xs text-stone-500 leading-relaxed pt-1">
              For urgent matters, please call the emergency hotline directly for immediate dispatch support.
            </p>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-800 text-xs text-stone-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          © 2026 LifeDrop. Built with compassion to save lives.
        </div>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="hover:text-stone-400 transition-colors">Privacy Policy</Link>
          <span>|</span>
          <Link to="/terms" className="hover:text-stone-400 transition-colors">Terms of Service</Link>
          <span>|</span>
          <Link to="/accessibility" className="hover:text-stone-400 transition-colors flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-brand-primary fill-brand-primary" /> Accessibility Statement
          </Link>
        </div>
      </div>
    </footer>
  );
};
