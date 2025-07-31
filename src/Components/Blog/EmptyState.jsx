import React from 'react';

const EmptyState = ({ setSearchTerm, setSelectedCategory }) => {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: 'var(--color-base-200)'}}>
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'var(--color-base-content)', opacity: '0.5'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2" style={{color: 'var(--color-base-content)'}}>No articles found</h3>
      <p className="mb-6" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>Try adjusting your search or filter criteria</p>
      <button 
        onClick={() => {
          setSearchTerm('');
          setSelectedCategory('all');
        }}
        className="px-6 py-3 rounded-lg transition-colors"
        style={{backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-content)'}}
        onMouseEnter={(e) => e.target.style.opacity = '0.9'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default EmptyState;