import React from 'react';

const SearchAndFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  categories 
}) => {
  return (
    <div 
      className="p-4 rounded-lg"
      style={{ backgroundColor: 'var(--color-base-200)' }}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--color-base-100)',
              borderColor: 'var(--color-base-300)',
              color: 'var(--color-base-content)'
            }}
          />
          <svg 
            className="absolute left-3 top-2.5 h-5 w-5" 
            style={{ color: 'var(--color-base-content)', opacity: 0.5 }}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory('All')}
            className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            style={selectedCategory === 'All' ? {
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-content)'
            } : {
              backgroundColor: 'transparent',
              color: 'var(--color-base-content)',
              border: '1px solid var(--color-base-300)'
            }}
          >
            All
          </button>
          {categories.slice(0, 4).map(category => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category.name)}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              style={selectedCategory === category.name ? {
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-content)'
              } : {
                backgroundColor: 'transparent',
                color: 'var(--color-base-content)',
                border: '1px solid var(--color-base-300)'
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;