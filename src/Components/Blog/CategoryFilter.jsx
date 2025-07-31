import React from 'react';

const CategoryFilter = ({ selectedCategory, setSelectedCategory, refreshPosts }) => {
  const categories = ['all', 'technology', 'design', 'business', 'tutorials'];

  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        <button
          onClick={refreshPosts}
          className="px-4 py-2 rounded-lg transition-colors text-sm"
          style={{backgroundColor: 'var(--color-success)', color: 'var(--color-success-content)'}}
          onMouseEnter={(e) => e.target.style.opacity = '0.9'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Refresh Posts
        </button>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="px-6 py-3 rounded-full font-medium transition-all border"
            style={{
              backgroundColor: selectedCategory === category ? 'var(--color-primary)' : 'var(--color-base-100)',
              color: selectedCategory === category ? 'var(--color-primary-content)' : 'var(--color-base-content)',
              borderColor: selectedCategory === category ? 'var(--color-primary)' : 'var(--color-base-300)',
              boxShadow: selectedCategory === category ? '0 10px 15px -3px var(--color-primary)' + '40' : 'none'
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== category) {
                e.target.style.backgroundColor = 'var(--color-base-200)';
                e.target.style.borderColor = 'var(--color-primary)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category) {
                e.target.style.backgroundColor = 'var(--color-base-100)';
                e.target.style.borderColor = 'var(--color-base-300)';
              }
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;