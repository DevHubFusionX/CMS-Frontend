import React from 'react';

const PreviewHeader = ({ status }) => {
  return (
    <div className="py-4 px-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md border-b" style={{
      backgroundColor: 'var(--color-base-100)',
      borderColor: 'var(--color-base-300)',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
    }}>
      <div className="flex items-center space-x-3">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: 'var(--color-accent)'}}></div>
        <span className="font-semibold text-lg" style={{color: 'var(--color-base-content)'}}>Preview Mode</span>
        <span className="px-3 py-1 text-sm font-medium rounded-full" style={{
          backgroundColor: status === 'published' ? 'var(--color-success)' : 'var(--color-warning)',
          color: status === 'published' ? 'var(--color-success-content)' : 'var(--color-warning-content)'
        }}>
          {status === 'published' ? 'Published' : 'Draft'}
        </span>
      </div>
      <button 
        onClick={() => window.close()} 
        className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: 'var(--color-base-200)',
          color: 'var(--color-base-content)',
          border: '1px solid var(--color-base-300)'
        }}
      >
        ✕ Close Preview
      </button>
    </div>
  );
};

export default PreviewHeader;