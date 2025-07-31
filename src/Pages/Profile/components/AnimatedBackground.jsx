import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20" style={{
        background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
      }}></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20" style={{
        background: `linear-gradient(135deg, var(--color-secondary) 0%, var(--color-accent) 100%)`,
        animationDelay: '2s'
      }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20" style={{
        background: `linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)`,
        animationDelay: '4s'
      }}></div>
    </div>
  );
};

export default AnimatedBackground;