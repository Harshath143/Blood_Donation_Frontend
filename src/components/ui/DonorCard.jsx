import React from 'react';
import { Badge } from './Badge';
import { Button } from './Button';
import { MapPin, Calendar, Clock, Phone, Mail } from 'lucide-react';
import { formatDistanceString } from '../../utils/formatters';

export const DonorCard = ({
  fullName,
  bloodType,
  city,
  distance,
  lastDonatedDate,
  availability,
  phone,
  email,
  initials,
  isLoggedIn = false,
  onContactClick
}) => {
  // Compute color based on blood type or availability
  const getAvatarBg = (type) => {
    if (type.includes('-')) return 'bg-red-700 text-white';
    return 'bg-brand-primary text-white';
  };

  const getAvailabilityBadge = (status) => {
    switch (status) {
      case 'Available Now':
        return <Badge variant="success"><Clock className="w-3.5 h-3.5 mr-1" />{status}</Badge>;
      case 'Emergency Only':
        return <Badge variant="amber"><Clock className="w-3.5 h-3.5 mr-1" />{status}</Badge>;
      default:
        return <Badge variant="grey"><Clock className="w-3.5 h-3.5 mr-1" />{status}</Badge>;
    }
  };

  // Determine if eligible based on whole blood 56-day rule
  const isEligibleToDonate = () => {
    if (lastDonatedDate === 'Never') return true;
    const days = Math.floor((new Date() - new Date(lastDonatedDate)) / (1000 * 60 * 60 * 24));
    return days >= 56;
  };

  return (
    <div className="bg-white p-6 rounded-card border border-stone-200 shadow-sm transition-all duration-300 hover:shadow-elevation hover:-translate-y-1 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display text-lg font-bold shadow-inner ${getAvatarBg(bloodType)}`}>
              {initials || fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-brand-charcoal text-base">{fullName}</h3>
              <p className="text-xs text-brand-grey flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-brand-warm" />
                {city} {distance !== undefined && `(${formatDistanceString(distance)})`}
              </p>
            </div>
          </div>
          
          <div className="font-mono text-2xl font-bold px-3 py-1 bg-red-50 text-brand-primary rounded border border-red-100">
            {bloodType}
          </div>
        </div>

        <div className="space-y-2.5 my-4 pt-3 border-t border-stone-100 text-sm text-brand-grey">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
            </span>
            <span>
              Last Donated: <span className="font-medium text-brand-charcoal">{lastDonatedDate === 'Never' ? 'Never Donated' : lastDonatedDate}</span>
            </span>
            {isEligibleToDonate() ? (
              <Badge variant="success" size="sm" className="ml-auto">Eligible</Badge>
            ) : (
              <Badge variant="amber" size="sm" className="ml-auto">Deferred</Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
            </span>
            <span className="flex items-center gap-2">
              Status: {getAvailabilityBadge(availability)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-stone-100">
        {isLoggedIn ? (
          <div className="bg-stone-50 p-3 rounded-input border border-stone-200 text-xs space-y-2 font-mono">
            <div className="flex items-center gap-2 text-brand-charcoal">
              <Phone className="w-3.5 h-3.5 text-brand-primary" />
              <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
            </div>
            <div className="flex items-center gap-2 text-brand-charcoal">
              <Mail className="w-3.5 h-3.5 text-brand-primary" />
              <a href={`mailto:${email}`} className="hover:underline">{email}</a>
            </div>
          </div>
        ) : (
          <Button 
            variant="outlineRed" 
            size="sm" 
            className="w-full text-xs font-semibold"
            onClick={onContactClick}
          >
            Contact Donor
          </Button>
        )}
      </div>
    </div>
  );
};
