import React from 'react';

const SidebarPanels = () => {
  return (
    <div className="lg:col-span-1 space-y-4 sm:space-y-6">
      {/* View Blog */}
      <div className="rounded-lg sm:rounded-xl shadow-lg border p-4 sm:p-6 backdrop-blur-sm" style={{
        backgroundColor: 'var(--color-base-200)', 
        borderColor: 'var(--color-base-300)',
        background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
      }}>
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4" style={{color: 'var(--color-base-content)'}}>
          View Blog
        </h3>
        <a
          href="/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-2.5 sm:py-3 border border-transparent text-sm font-medium rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          style={{
            background: `linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)`,
            color: 'var(--color-primary-content)'
          }}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="hidden sm:inline">Visit Your Blog</span>
          <span className="sm:hidden">Visit Blog</span>
          <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      
      {/* Quick Stats */}
      <div className="rounded-lg sm:rounded-xl shadow-lg border p-4 sm:p-6 backdrop-blur-sm" style={{
        backgroundColor: 'var(--color-base-200)', 
        borderColor: 'var(--color-base-300)',
        background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
      }}>
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4" style={{color: 'var(--color-base-content)'}}>
          Quick Stats
        </h3>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm" style={{color: 'var(--color-base-content)'}}>This Week</span>
            <span className="text-xs sm:text-sm font-medium" style={{color: 'var(--color-success)'}}>+12%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm" style={{color: 'var(--color-base-content)'}}>Page Views</span>
            <span className="text-xs sm:text-sm font-medium" style={{color: 'var(--color-base-content)'}}>2,847</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm" style={{color: 'var(--color-base-content)'}}>Engagement</span>
            <span className="text-xs sm:text-sm font-medium" style={{color: 'var(--color-primary)'}}>68%</span>
          </div>
        </div>
      </div>
      
      {/* System Status */}
      <div className="rounded-lg sm:rounded-xl shadow-lg border p-4 sm:p-6 backdrop-blur-sm" style={{
        backgroundColor: 'var(--color-base-200)', 
        borderColor: 'var(--color-base-300)',
        background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
      }}>
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4" style={{color: 'var(--color-base-content)'}}>
          System Status
        </h3>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm" style={{color: 'var(--color-base-content)'}}>Server</span>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: 'var(--color-success)'}}></div>
              <span className="text-xs sm:text-sm font-medium" style={{color: 'var(--color-success)'}}>Online</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm" style={{color: 'var(--color-base-content)'}}>Database</span>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: 'var(--color-success)'}}></div>
              <span className="text-xs sm:text-sm font-medium" style={{color: 'var(--color-success)'}}>Connected</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm" style={{color: 'var(--color-base-content)'}}>Storage</span>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: 'var(--color-warning)'}}></div>
              <span className="text-xs sm:text-sm font-medium" style={{color: 'var(--color-warning)'}}>78% Used</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarPanels;