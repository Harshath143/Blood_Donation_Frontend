import React from 'react';

export const Badge = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md'
}) => {
  const baseStyles = 'inline-flex items-center font-semibold rounded-full';
  
  const variants = {
    primary: 'bg-red-50 text-brand-primary border border-red-200',
    danger: 'bg-brand-primary text-white',
    success: 'bg-emerald-50 text-brand-green border border-emerald-200',
    amber: 'bg-amber-50 text-brand-amber border border-amber-200',
    charcoal: 'bg-brand-charcoal text-white',
    grey: 'bg-slate-50 text-brand-grey border border-slate-200',
    gold: 'bg-yellow-50 text-yellow-700 border border-yellow-300 shadow-sm'
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-4 py-1.5'
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
