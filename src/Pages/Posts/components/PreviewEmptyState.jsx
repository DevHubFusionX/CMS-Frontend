import React from 'react';
import { Link } from 'react-router-dom';

const PreviewEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4" style={{backgroundColor: 'var(--color-base-100)'}}>
      <div className="p-8 max-w-2xl w-full text-center shadow-md" style={{
        backgroundColor: 'var(--color-base-200)',
        borderRadius: 'var(--radius-box)'
      }}>
        <h1 className="text-2xl font-bold mb-4" style={{color: 'var(--color-base-content)'}}>No Preview Available</h1>
        <p className="mb-6" style={{color: 'var(--color-base-content-secondary)'}}>No post data found for preview.</p>
        <Link 
          to="/dashboard/posts" 
          className="inline-flex items-center px-4 py-2 transition-colors hover:opacity-80"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-content)',
            borderRadius: 'var(--radius-btn)'
          }}
        >
          Return to Posts
        </Link>
      </div>
    </div>
  );
};

export default PreviewEmptyState;