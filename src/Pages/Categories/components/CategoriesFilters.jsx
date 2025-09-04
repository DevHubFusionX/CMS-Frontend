import React from 'react';
import { FiSearch, FiGrid, FiList, FiFilter } from 'react-icons/fi';

const CategoriesFilters = ({ 
  searchTerm, 
  onSearchChange, 
  viewMode, 
  onViewModeChange, 
  totalItems 
}) => {
  return (
    <div 
      className="rounded-xl shadow-sm p-6"
      style={{ 
        backgroundColor: 'var(--color-base-200)',
        border: `1px solid var(--color-base-300)`
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <FiSearch 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 opacity-50" 
              style={{ color: 'var(--color-base-content)' }}
            />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg transition-all duration-200"
              style={{ 
                backgroundColor: 'var(--color-base-300)',
                border: `1px solid var(--color-base-300)`,
                color: 'var(--color-base-content)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.boxShadow = `0 0 0 2px var(--color-primary)33`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-base-300)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Results count and filters */}
        <div className="flex items-center space-x-4">
          <div 
            className="flex items-center space-x-2 text-sm opacity-70"
            style={{ color: 'var(--color-base-content)' }}
          >
            <FiFilter className="h-4 w-4" />
            <span className="font-medium">{totalItems} categories</span>
          </div>

          {/* View mode toggle */}
          <div 
            className="flex items-center rounded-lg p-1"
            style={{ backgroundColor: 'var(--color-base-300)' }}
          >
            <button
              onClick={() => onViewModeChange('grid')}
              className="p-2 rounded-md transition-all duration-200"
              style={{
                backgroundColor: viewMode === 'grid' ? 'var(--color-base-200)' : 'transparent',
                color: viewMode === 'grid' ? 'var(--color-primary)' : 'var(--color-base-content)',
                boxShadow: viewMode === 'grid' ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' : 'none'
              }}
              title="Grid view"
            >
              <FiGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className="p-2 rounded-md transition-all duration-200"
              style={{
                backgroundColor: viewMode === 'list' ? 'var(--color-base-200)' : 'transparent',
                color: viewMode === 'list' ? 'var(--color-primary)' : 'var(--color-base-content)',
                boxShadow: viewMode === 'list' ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' : 'none'
              }}
              title="List view"
            >
              <FiList className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesFilters;