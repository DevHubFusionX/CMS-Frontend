import React from 'react';

const BrandLogo = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      <span className={`font-bold ${sizeClasses[size]} tech-title`}>
        Fusion<span className="text-blue-400">X</span>
      </span>
    </div>
  );
};

export default BrandLogo;