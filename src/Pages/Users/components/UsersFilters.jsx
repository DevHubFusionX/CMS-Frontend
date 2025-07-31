import React from 'react';

const UsersFilters = ({ 
  searchTerm, 
  onSearchChange, 
  selectedRole, 
  onRoleChange, 
  viewMode, 
  onViewModeChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange
}) => {
  const roleOptions = [
    { value: 'all', label: 'All Roles', icon: '👥' },
    { value: 'admin', label: 'Admin', icon: '🛡️' },
    { value: 'editor', label: 'Editor', icon: '✏️' },
    { value: 'author', label: 'Author', icon: '📝' },
    { value: 'contributor', label: 'Contributor', icon: '🤝' },
    { value: 'subscriber', label: 'Subscriber', icon: '👤' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name', icon: '🔤' },
    { value: 'email', label: 'Email', icon: '📧' },
    { value: 'role', label: 'Role', icon: '🏷️' },
    { value: 'created', label: 'Join Date', icon: '📅' }
  ];

  return (
    <div className="rounded-2xl border backdrop-blur-sm p-4 sm:p-6" style={{
      backgroundColor: 'var(--color-base-200)',
      borderColor: 'var(--color-base-300)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24" 
               style={{color: 'var(--color-base-content)'}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search users..."
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
      </div>

      {/* Role Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {roleOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onRoleChange(option.value)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: selectedRole === option.value ? 'var(--color-primary)' : 'var(--color-base-100)',
              color: selectedRole === option.value ? 'var(--color-primary-content)' : 'var(--color-base-content)',
              border: `2px solid ${selectedRole === option.value ? 'var(--color-primary)' : 'var(--color-base-300)'}`,
              boxShadow: selectedRole === option.value ? '0 4px 12px rgba(var(--color-primary-rgb), 0.3)' : 'none'
            }}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium opacity-70" style={{color: 'var(--color-base-content)'}}>
            Sort by:
          </span>
          <div className="flex items-center rounded-lg p-1" style={{backgroundColor: 'var(--color-base-300)'}}>
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: sortBy === option.value ? 'var(--color-base-100)' : 'transparent',
                  color: sortBy === option.value ? 'var(--color-primary)' : 'var(--color-base-content)',
                  opacity: sortBy === option.value ? 1 : 0.7
                }}
              >
                <span>{option.icon}</span>
                <span className="hidden sm:inline">{option.label}</span>
              </button>
            ))}
          </div>
          
          <button
            onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: 'var(--color-base-100)',
              color: 'var(--color-primary)',
              border: `2px solid var(--color-base-300)`
            }}
            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            {sortOrder === 'asc' ? (
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
        <div className="flex items-center rounded-lg p-1" style={{backgroundColor: 'var(--color-base-300)'}}>
          <button
            onClick={() => onViewModeChange('grid')}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
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
            onClick={() => onViewModeChange('table')}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: viewMode === 'table' ? 'var(--color-base-100)' : 'transparent',
              color: viewMode === 'table' ? 'var(--color-primary)' : 'var(--color-base-content)',
              opacity: viewMode === 'table' ? 1 : 0.7
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="hidden sm:inline">Table</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersFilters;