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
  const baseClasses =
    'inline-flex items-center justify-center font-frontier font-bold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation border-2';

  const variantClasses = {
    primary:
      'frontier-button frontier-button-primary hover:animate-ember-glow focus:ring-ember',
    secondary: 'frontier-button focus:ring-bronze',
    outline:
      'frontier-button bg-transparent text-bronze-light hover:text-light-enhanced focus:ring-bronze',
    attack:
      'frontier-button frontier-button-danger hover:animate-battle-shake focus:ring-blood',
    recruit:
      'frontier-button frontier-button-primary hover:animate-forge-flicker focus:ring-ember',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[44px]',
    md: 'px-4 py-2.5 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[48px]',
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
