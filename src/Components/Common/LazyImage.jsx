import React, { useState } from 'react';

const LazyImage = ({ src, alt, className = "", ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`} {...props}>
        <span className="text-gray-400 text-sm">Image not found</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {!isLoaded && (
        <div className={`bg-gray-200 animate-pulse ${className}`} {...props} />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        {...props}
      />
    </div>
  );
};

export default LazyImage;