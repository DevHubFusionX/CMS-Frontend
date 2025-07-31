import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriberNavigation = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav 
      className="border-b"
      style={{ 
        backgroundColor: 'var(--color-base-200)', 
        borderColor: 'var(--color-base-300)' 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => navigate('/subscriber-home')}
              className="text-xl font-bold"
              style={{ color: 'var(--color-primary)' }}
            >
              CMS
            </button>
            <button
              onClick={() => navigate('/subscriber-home')}
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
              style={{ color: 'var(--color-base-content)', opacity: 0.8 }}
            >
              Home
            </button>
            <button
              onClick={() => navigate('/blog')}
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
              style={{ color: 'var(--color-base-content)', opacity: 0.8 }}
            >
              Blog
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <span 
              className="text-sm"
              style={{ color: 'var(--color-base-content)', opacity: 0.7 }}
            >
              {user?.name || user?.username}
            </span>
            <button
              onClick={onLogout}
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
              style={{ 
                backgroundColor: 'var(--color-error)', 
                color: 'var(--color-error-content)' 
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SubscriberNavigation;