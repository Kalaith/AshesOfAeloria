import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, onClick }) => {
  return (
    <div
      className={`bg-parchment border-2 border-bronze rounded-lg bg-metal-texture ${className}`}
      onClick={onClick}
    >
      {title && (
        <div className="px-4 lg:px-6 py-3 lg:py-4 border-b-2 border-bronze bg-bronze-texture">
          <h3 className="text-base lg:text-lg font-frontier font-bold text-parchment-light text-battle-worn">{title}</h3>
        </div>
      )}
      <div className="p-4 lg:p-6">
        {children}
      </div>
    </div>
  );
};
