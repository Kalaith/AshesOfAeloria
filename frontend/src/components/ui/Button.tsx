import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'attack' | 'recruit';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  className = '',
  children, 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-frontier font-bold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation border-2 bg-bronze-texture';

  const variantClasses = {
    primary: 'bg-bronze text-parchment-light border-bronze hover:bg-bronze-light hover:animate-ember-glow focus:ring-ember',
    secondary: 'bg-iron text-parchment border-iron-light hover:bg-iron-light hover:border-bronze focus:ring-bronze',
    outline: 'border-bronze text-bronze bg-transparent hover:bg-bronze hover:text-parchment-light focus:ring-bronze',
    attack: 'bg-blood text-parchment-light border-blood-dark hover:bg-blood-light hover:animate-battle-shake focus:ring-blood',
    recruit: 'bg-forest text-parchment-light border-forest-dark hover:bg-forest-light hover:animate-forge-flicker focus:ring-forest'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[44px]',
    md: 'px-4 py-2.5 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[48px]'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
