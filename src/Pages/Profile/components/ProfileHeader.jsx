import React from 'react';

const ProfileHeader = ({ onBack }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="group p-3 rounded-2xl border backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: 'var(--color-base-200)',
            borderColor: 'var(--color-base-300)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--color-primary)';
            e.target.style.borderColor = 'var(--color-primary)';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'var(--color-base-200)';
            e.target.style.borderColor = 'var(--color-base-300)';
            e.target.style.color = 'var(--color-base-content)';
          }}
        >
          <svg className="w-5 h-5 transition-colors" style={{color: 'var(--color-base-content)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold" style={{color: 'var(--color-base-content)'}}>Profile Settings</h1>
          <p className="mt-1" style={{color: 'var(--color-base-content)'}}>Manage your account and preferences</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;