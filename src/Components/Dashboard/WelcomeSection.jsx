import React from 'react';

const WelcomeSection = ({ user }) => {
  return (
    <div>
      <h1 
        className="text-3xl font-bold mb-2"
        style={{ color: 'var(--color-primary)' }}
      >
        Welcome back, {user?.name || user?.username} 👋
      </h1>
      <p 
        className="text-lg"
        style={{ color: 'var(--color-base-content)', opacity: 0.7 }}
      >
        Stay updated with the latest content and manage your reading experience
      </p>
    </div>
  );
};

export default WelcomeSection;