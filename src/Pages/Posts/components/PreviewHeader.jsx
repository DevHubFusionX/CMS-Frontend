import React from 'react';

const PreviewHeader = ({ status }) => {
  return (
    <div className="py-2 px-4 flex items-center justify-between sticky top-0 z-10" style={{
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-primary-content)'
    }}>
      <div className="flex items-center">
        <span className="font-medium">Preview Mode</span>
        <span className="ml-2 px-2 py-1 text-xs" style={{
          backgroundColor: 'var(--color-primary-focus)',
          borderRadius: 'var(--radius-btn)'
        }}>
          {status === 'published' ? 'Published' : 'Draft'}
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => window.close()} 
          className="px-3 py-1 text-sm transition-colors hover:opacity-80"
          style={{
            backgroundColor: 'var(--color-primary-focus)',
            borderRadius: 'var(--radius-btn)'
          }}
        >
          Close Preview
        </button>
      </div>
    </div>
  );
};

export default PreviewHeader;