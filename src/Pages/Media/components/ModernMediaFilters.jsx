import React from 'react';
import { MdImage, MdVideoLibrary, MdDescription, MdSortByAlpha, MdDateRange, MdStraighten, MdLabel } from 'react-icons/md';
const ModernMediaFilters = ({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
  sortBy,
  onSortChange,
  sortDirection,
  onSortDirectionChange,
  viewMode,
  onViewModeChange,
  totalItems
}) => {
 

  const filterOptions = [
    { value: 'all', label: 'All', count: totalItems },
    { value: 'image', label: 'Images', icon: <MdImage /> },
    { value: 'video', label: 'Videos', icon: <MdVideoLibrary /> },
    { value: 'document', label: 'Docs', icon: <MdDescription /> }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name', icon: <MdSortByAlpha /> },
    { value: 'createdAt', label: 'Date', icon: <MdDateRange /> },
    { value: 'size', label: 'Size', icon: <MdStraighten /> },
    { value: 'type', label: 'Type', icon: <MdLabel /> }
  ];

  return (
    <div className="rounded-2xl border backdrop-blur-sm p-4 sm:p-6" style={{
      backgroundColor: 'var(--color-base-200)',
      borderColor: 'var(--color-base-300)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Top Row: Search + Results */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
        <div className="relative w-full sm:flex-1 sm:max-w-md">
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24" 
               style={{color: 'var(--color-base-content)'}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search media files..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none"
            style={{
              backgroundColor: 'var(--color-base-100)',
              borderColor: searchTerm ? 'var(--color-primary)' : 'var(--color-base-300)',
              color: 'var(--color-base-content)',
              boxShadow: searchTerm ? '0 0 0 3px rgba(var(--color-primary-rgb), 0.1)' : 'none'
            }}
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-opacity-20 transition-colors"
              style={{color: 'var(--color-base-content)'}}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <span className="text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap" 
                style={{backgroundColor: 'var(--color-base-300)', color: 'var(--color-base-content)'}}>
            {totalItems} files
          </span>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: filterType === option.value ? 'var(--color-primary)' : 'var(--color-base-100)',
              color: filterType === option.value ? 'var(--color-primary-content)' : 'var(--color-base-content)',
              border: `2px solid ${filterType === option.value ? 'var(--color-primary)' : 'var(--color-base-300)'}`,
              boxShadow: filterType === option.value ? '0 4px 12px rgba(var(--color-primary-rgb), 0.3)' : 'none'
            }}
          >
            {option.icon && <span>{option.icon}</span>}
            <span>{option.label}</span>
            {option.count && filterType === option.value && (
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs" 
                    style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>
                {option.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Sort Controls */}
        <div className="flex flex-col xs:flex-row xs:items-center gap-2">
          <span className="text-xs sm:text-sm font-medium opacity-70 hidden xs:block" style={{color: 'var(--color-base-content)'}}>
            Sort:
          </span>
          <div className="flex items-center rounded-lg p-1 overflow-x-auto scrollbar-hide" style={{backgroundColor: 'var(--color-base-300)', minWidth: 'fit-content'}}>
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0"
                style={{
                  backgroundColor: sortBy === option.value ? 'var(--color-base-100)' : 'transparent',
                  color: sortBy === option.value ? 'var(--color-primary)' : 'var(--color-base-content)',
                  opacity: sortBy === option.value ? 1 : 0.7
                }}
              >
                <span className="text-sm">{option.icon}</span>
                <span className="hidden xs:inline text-xs">{option.label}</span>
              </button>
            ))}
          </div>
          
          <button
            onClick={() => onSortDirectionChange(sortDirection === 'asc' ? 'desc' : 'asc')}
            className="p-1.5 sm:p-2 rounded-lg transition-all duration-200 hover:scale-110 flex-shrink-0"
            style={{
              backgroundColor: 'var(--color-base-100)',
              color: 'var(--color-primary)',
              border: `2px solid var(--color-base-300)`
            }}
          >
            {sortDirection === 'asc' ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            )}
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-center sm:justify-start rounded-lg p-1" style={{backgroundColor: 'var(--color-base-300)'}}>
          <button
            onClick={() => onViewModeChange('grid')}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: viewMode === 'grid' ? 'var(--color-base-100)' : 'transparent',
              color: viewMode === 'grid' ? 'var(--color-primary)' : 'var(--color-base-content)',
              opacity: viewMode === 'grid' ? 1 : 0.7
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: viewMode === 'list' ? 'var(--color-base-100)' : 'transparent',
              color: viewMode === 'list' ? 'var(--color-primary)' : 'var(--color-base-content)',
              opacity: viewMode === 'list' ? 1 : 0.7
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernMediaFilters;