import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-heading font-bold uppercase tracking-widest transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden';
  
  const variants = {
    primary: 'bg-accent-500 text-primary-950 border-2 border-accent-500 hover:bg-accent-600 hover:border-accent-600 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]',
    secondary: 'bg-primary-900 text-white border-2 border-primary-700 hover:border-accent-500 hover:text-accent-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]',
    outline: 'border-2 border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-primary-950 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]',
    ghost: 'text-white hover:text-accent-500',
  };

  const sizes = {
    sm: 'h-10 px-4 text-xs',
    md: 'h-12 px-6 text-sm',
    lg: 'h-14 px-8 text-base',
    xl: 'h-16 px-10 text-lg',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
