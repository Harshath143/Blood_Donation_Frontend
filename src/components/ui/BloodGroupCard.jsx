import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from './Badge';

export const BloodGroupCard = ({
  group,
  donateTo = [],
  receiveFrom = [],
  isUniversalDonor = false,
  isUniversalRecipient = false,
  popularity = '',
  description = ''
}) => {
  return (
    <div className="bg-white p-6 rounded-card border border-stone-200 shadow-sm transition-all duration-300 hover:shadow-elevation hover:-translate-y-1 border-l-0 hover:border-l-4 hover:border-brand-primary flex flex-col justify-between h-full group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-mono text-4xl font-bold text-brand-charcoal">{group}</h3>
          <div>
            {isUniversalDonor && (
              <Badge variant="gold" className="uppercase font-semibold tracking-wider">Universal Donor</Badge>
            )}
            {isUniversalRecipient && (
              <Badge variant="gold" className="uppercase font-semibold tracking-wider">Universal Recipient</Badge>
            )}
          </div>
        </div>
        
        {popularity && (
          <p className="text-xs text-brand-primary font-medium tracking-wide mb-3 uppercase">{popularity}</p>
        )}
        
        <p className="text-sm text-brand-grey mb-5 line-clamp-3">{description}</p>
        
        <div className="space-y-2 mb-6">
          <div className="text-xs">
            <span className="font-semibold text-brand-charcoal block">Can Donate To:</span>
            <span className="font-mono text-brand-grey">{donateTo.join(', ')}</span>
          </div>
          <div className="text-xs">
            <span className="font-semibold text-brand-charcoal block">Can Receive From:</span>
            <span className="font-mono text-brand-grey">{receiveFrom.join(', ')}</span>
          </div>
        </div>
      </div>
      
      <Link 
        to={`/find-donors?type=${encodeURIComponent(group)}`}
        className="text-sm font-semibold text-brand-primary group-hover:text-brand-warm flex items-center gap-1 transition-colors mt-auto"
      >
        Find {group} Donors 
        <span className="transform transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
};
