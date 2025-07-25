import React, { useState, useEffect } from 'react';

const AnimatedContainer = ({ 
  children, 
  className = '', 
  delay = 0,
  animation = 'fade-in', // fade-in, slide-up, slide-left, slide-right
  duration = 500,
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  const getAnimationClasses = () => {
    const baseClasses = `transition-all duration-${duration} ease-in-out`;
    
    if (!isVisible) {
      switch (animation) {
        case 'fade-in':
          return `${baseClasses} opacity-0`;
        case 'slide-up':
          return `${baseClasses} opacity-0 translate-y-10`;
        case 'slide-left':
          return `${baseClasses} opacity-0 -translate-x-10`;
        case 'slide-right':
          return `${baseClasses} opacity-0 translate-x-10`;
        default:
          return `${baseClasses} opacity-0`;
      }
    }
    
    return `${baseClasses} opacity-100 translate-x-0 translate-y-0`;
  };
  
  return (
    <div className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  );
};

export default AnimatedContainer;