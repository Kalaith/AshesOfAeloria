/**
 * Enhanced Button component following clean code principles
 * Supports multiple variants, sizes, states, and accessibility
 */

import React, { forwardRef } from 'react';
import { uiConfig } from '../../constants';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const variantClassesByVariant = {
  primary:
    'frontier-button frontier-button-primary hover:animate-ember-glow focus:ring-ember',
  secondary:
    'frontier-button hover:animate-forge-flicker focus:ring-bronze',
  success:
    'frontier-button frontier-button-primary hover:animate-forge-flicker focus:ring-ember',
  danger:
    'frontier-button frontier-button-danger hover:animate-battle-shake focus:ring-blood',
  warning:
    'frontier-button frontier-button-primary hover:animate-ember-glow focus:ring-amber',
  ghost: 'frontier-button bg-transparent text-bronze-light hover:text-light-enhanced focus:ring-bronze',
} as const;

const sizeClassesBySize = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-frontier font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-iron-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = variantClassesByVariant[variant];
    const sizeClasses = sizeClassesBySize[size];
    const widthClasses = fullWidth ? 'w-full' : '';

    const combinedClassName = [baseClasses, variantClasses, sizeClasses, widthClasses, className]
      .filter(Boolean)
      .join(' ');

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={isDisabled}
        style={{ minHeight: `${uiConfig.MIN_TOUCH_TARGET}px` }}
        {...props}
      >
        {leftIcon && !loading && <span className="mr-2 -ml-1">{leftIcon}</span>}

        {loading && (
          <span className="mr-2 -ml-1">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}

        <span>{children}</span>

        {rightIcon && !loading && <span className="ml-2 -mr-1">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
