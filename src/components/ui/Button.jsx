import React from 'react';

export const Button = React.forwardRef(({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-brand-primary hover:bg-brand-warm text-white shadow-elevation hover:-translate-y-[1px]',
    secondary: 'border border-brand-grey text-brand-grey hover:bg-brand-charcoal hover:text-white',
    charcoal: 'bg-brand-charcoal hover:bg-brand-grey text-white',
    outlineRed: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
    danger: 'bg-brand-darkRed hover:bg-brand-primary text-white shadow-elevation',
    success: 'bg-brand-green hover:opacity-90 text-white',
    text: 'text-brand-primary hover:text-brand-warm underline bg-transparent p-0'
  };

  const sizes = {
    sm: 'text-xs px-4 py-2 rounded-input',
    md: 'text-sm px-6 py-3 rounded-pill',
    lg: 'text-base px-8 py-4 rounded-pill font-semibold'
  };

  return (
    <button
      ref={ref}
      type={type}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
