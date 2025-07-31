import React from 'react';

const MobileSidebarToggle = ({ onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden p-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm border"
      style={{
        color: 'var(--color-base-content)',
        backgroundColor: 'var(--color-base-200)',
        borderColor: 'var(--color-base-300)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-base-300)'}
      onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-base-200)'}
      aria-label="Toggle sidebar"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
};

export default MobileSidebarToggle;