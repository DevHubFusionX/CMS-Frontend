import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="rounded-2xl shadow-sm border overflow-hidden animate-pulse" style={{backgroundColor: 'var(--color-base-100)', borderColor: 'var(--color-base-300)'}}>
          <div className="h-48" style={{backgroundColor: 'var(--color-base-300)'}}></div>
          <div className="p-6">
            <div className="h-4 rounded mb-4" style={{backgroundColor: 'var(--color-base-300)'}}></div>
            <div className="h-6 rounded mb-3" style={{backgroundColor: 'var(--color-base-300)'}}></div>
            <div className="h-4 rounded mb-4" style={{backgroundColor: 'var(--color-base-300)'}}></div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full" style={{backgroundColor: 'var(--color-base-300)'}}></div>
              <div className="h-4 rounded flex-1" style={{backgroundColor: 'var(--color-base-300)'}}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;