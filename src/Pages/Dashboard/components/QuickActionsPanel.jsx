import React from 'react';

const QuickActionsPanel = () => {
  return (
    <div className="rounded-lg sm:rounded-xl shadow-lg border p-4 sm:p-6 backdrop-blur-sm" style={{
      backgroundColor: 'var(--color-base-200)', 
      borderColor: 'var(--color-base-300)',
      background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
    }}>
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4" style={{color: 'var(--color-base-content)'}}>
        Quick Actions
      </h3>
      <div className="space-y-3">
        <a
          href="/dashboard/posts/create"
          className="flex items-center justify-between w-full px-4 py-3 border border-transparent text-sm font-medium rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          style={{
            background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
            color: 'var(--color-primary-content)'
          }}
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Create New Post</span>
          </div>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
        
        <a
          href="/dashboard/media"
          className="flex items-center justify-between w-full px-4 py-3 border text-sm font-medium rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
          style={{
            backgroundColor: 'var(--color-base-200)',
            borderColor: 'var(--color-base-300)',
            color: 'var(--color-base-content)'
          }}
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Upload Media</span>
          </div>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default QuickActionsPanel;