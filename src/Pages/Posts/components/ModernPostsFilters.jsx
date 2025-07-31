import React from 'react';
import { MdArticle, MdOutlineSchedule, MdEditNote } from 'react-icons/md';
import { FaRegCheckCircle } from 'react-icons/fa';
const ModernPostsFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  viewMode,
  onViewModeChange,
  totalItems
}) => {


  const statusOptions = [
    { value: 'all', label: 'All Posts', icon: <MdArticle /> },
    { value: 'published', label: 'Published', icon: <FaRegCheckCircle /> },
    { value: 'draft', label: 'Drafts', icon: <MdEditNote /> },
    { value: 'scheduled', label: 'Scheduled', icon: <MdOutlineSchedule /> }
  ];

  return (
    <div className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 border shadow-lg" style={{
      backgroundColor: 'var(--color-base-200)',
      borderColor: 'var(--color-base-300)',
      background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
    }}>
      <div className="space-y-4 sm:space-y-6">
        {/* Search and Results Count */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5" style={{color: 'var(--color-base-content)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e)}
              className="block w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-offset-2 transition-all duration-200"
              style={{
                backgroundColor: 'var(--color-base-200)',
                borderColor: 'var(--color-base-300)',
                color: 'var(--color-base-content)',
                focusRingColor: 'var(--color-primary)',
                focusBorderColor: 'var(--color-primary)'
              }}
            />
          </div>
          
          <div className="flex items-center gap-2 text-sm" style={{color: 'var(--color-base-content)'}}>
            <span className="font-medium">{totalItems.toLocaleString()}</span>
            <span>posts found</span>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onStatusFilterChange({ target: { value: option.value } })}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 border"
              style={{
                backgroundColor: statusFilter === option.value ? 'var(--color-primary)' : 'var(--color-base-200)',
                color: statusFilter === option.value ? 'var(--color-primary-content)' : 'var(--color-base-content)',
                borderColor: statusFilter === option.value ? 'var(--color-primary)' : 'var(--color-base-300)',
                boxShadow: statusFilter === option.value ? '0 10px 25px rgba(0, 0, 0, 0.15)' : 'none',
                transform: statusFilter === option.value ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (statusFilter !== option.value) {
                  e.target.style.backgroundColor = 'var(--color-base-300)';
                  e.target.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (statusFilter !== option.value) {
                  e.target.style.backgroundColor = 'var(--color-base-200)';
                  e.target.style.transform = 'scale(1)';
                }
              }}
            >
              <span className="text-sm">{option.icon}</span>
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium" style={{color: 'var(--color-base-content)'}}>View:</span>
            <div className="flex rounded-lg p-1 border" style={{
              backgroundColor: 'var(--color-base-300)',
              borderColor: 'var(--color-base-300)'
            }}>
              <button
                onClick={() => onViewModeChange('table')}
                className="px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2"
                style={{
                  backgroundColor: viewMode === 'table' ? 'var(--color-primary)' : 'transparent',
                  color: viewMode === 'table' ? 'var(--color-primary-content)' : 'var(--color-base-content)',
                  boxShadow: viewMode === 'table' ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none'
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Table
              </button>
              <button
                onClick={() => onViewModeChange('grid')}
                className="px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2"
                style={{
                  backgroundColor: viewMode === 'grid' ? 'var(--color-primary)' : 'transparent',
                  color: viewMode === 'grid' ? 'var(--color-primary-content)' : 'var(--color-base-content)',
                  boxShadow: viewMode === 'grid' ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none'
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Grid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernPostsFilters;