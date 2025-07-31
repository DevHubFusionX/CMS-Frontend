import React from 'react';

const ErrorState = () => {
  return (
    <div className="rounded-xl shadow-lg border p-6 backdrop-blur-sm" style={{
      backgroundColor: 'var(--color-base-200)', 
      borderColor: 'var(--color-base-300)',
      background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
    }}>
      <div className="text-center py-8">
        <svg className="w-12 h-12 mx-auto mb-4" style={{color: 'var(--color-error)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium mb-2" style={{color: 'var(--color-base-content)'}}>Failed to load activity</h3>
        <p style={{color: 'var(--color-base-content)'}}>Please try refreshing the page</p>
      </div>
    </div>
  );
};

export default ErrorState;