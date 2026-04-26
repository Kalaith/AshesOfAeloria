import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, onClick }) => {
  return (
    <div className={`frontier-panel ${className}`} onClick={onClick}>
      {title && (
        <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-bronze/70 bg-black/20">
          <h3 className="text-base lg:text-lg frontier-panel-title">{title}</h3>
        </div>
      )}
      <div className="p-4 lg:p-6">{children}</div>
    </div>
  );
};
