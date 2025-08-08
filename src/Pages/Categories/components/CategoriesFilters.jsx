import React from 'react';

const CategoriesFilters = ({ searchTerm, onSearchChange, viewMode, onViewModeChange, totalItems }) => {
  return (
    <div className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 border shadow-lg transition-all duration-300" style={{
      backgroundColor: 'var(--color-base-100)',
      borderColor: 'var(--color-base-300)',
      border: 'var(--border) solid var(--color-base-300)'
    }}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{
              color: 'var(--color-base-content)',
              opacity: '0.5'
            }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 transition-all duration-200"
            style={{
              backgroundColor: 'var(--color-base-200)',
              borderColor: 'var(--color-base-300)',
              color: 'var(--color-base-content)',
              '--tw-ring-color': 'var(--color-primary)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-primary)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--color-base-300)';
            }}
          />
        </div>

        {/* Results Count and View Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm transition-colors duration-300" style={{
            color: 'var(--color-base-content)',
            opacity: '0.7'
          }}>
            <span className="font-medium">{totalItems.toLocaleString()}</span>
            <span>categories</span>
          </div>
          
          <div className="flex rounded-lg p-1" style={{
            backgroundColor: 'var(--color-base-200)'
          }}>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2`}
              style={{
                backgroundColor: viewMode === 'grid' ? 'var(--color-base-100)' : 'transparent',
                color: viewMode === 'grid' ? 'var(--color-base-content)' : 'var(--color-base-content)',
                opacity: viewMode === 'grid' ? '1' : '0.7',
                boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Grid
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2`}
              style={{
                backgroundColor: viewMode === 'table' ? 'var(--color-base-100)' : 'transparent',
                color: viewMode === 'table' ? 'var(--color-base-content)' : 'var(--color-base-content)',
                opacity: viewMode === 'table' ? '1' : '0.7',
                boxShadow: viewMode === 'table' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesFilters;