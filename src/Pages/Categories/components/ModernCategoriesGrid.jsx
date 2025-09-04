import React from 'react';
import { FiEdit3, FiTrash2, FiFileText, FiTag, FiMoreVertical } from 'react-icons/fi';

const CategoryCard = ({ category, onEdit, onDelete }) => {
  const getThemeColor = (color) => {
    const colorMap = {
      blue: '--color-primary',
      green: '--color-success',
      purple: '--color-secondary',
      red: '--color-error',
      orange: '--color-warning',
      indigo: '--color-accent'
    };
    return colorMap[color] || '--color-primary';
  };

  const themeColor = getThemeColor(category.color);

  return (
    <div 
      className="group relative rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
      style={{ 
        backgroundColor: 'var(--color-base-200)',
        border: `1px solid var(--color-base-300)`
      }}
    >
      {/* Color accent bar */}
      <div 
        className="h-1"
        style={{ backgroundColor: `var(${themeColor})` }}
      ></div>
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div 
            className="p-3 rounded-lg"
            style={{ 
              backgroundColor: `var(${themeColor})`,
              opacity: 0.1
            }}
          >
            <FiTag 
              className="h-6 w-6" 
              style={{ color: `var(${themeColor})` }}
            />
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onEdit(category)}
                className="p-2 rounded-lg transition-colors duration-200"
                style={{ 
                  color: 'var(--color-base-content)',
                  opacity: 0.6
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--color-primary)';
                  e.target.style.backgroundColor = 'var(--color-primary)';
                  e.target.style.opacity = '0.1';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--color-base-content)';
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.opacity = '0.6';
                }}
                title="Edit category"
              >
                <FiEdit3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(category._id || category.id)}
                className="p-2 rounded-lg transition-colors duration-200"
                style={{ 
                  color: 'var(--color-base-content)',
                  opacity: 0.6
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--color-error)';
                  e.target.style.backgroundColor = 'var(--color-error)';
                  e.target.style.opacity = '0.1';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--color-base-content)';
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.opacity = '0.6';
                }}
                title="Delete category"
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div>
            <h3 
              className="text-lg font-semibold group-hover:transition-colors duration-200"
              style={{ color: 'var(--color-base-content)' }}
              onMouseEnter={(e) => {
                e.target.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--color-base-content)';
              }}
            >
              {category.name}
            </h3>
            <p 
              className="text-sm mt-1 opacity-60"
              style={{ color: 'var(--color-base-content)' }}
            >
              /{category.slug}
            </p>
          </div>

          {category.description && (
            <p 
              className="text-sm line-clamp-2 opacity-70"
              style={{ color: 'var(--color-base-content)' }}
            >
              {category.description}
            </p>
          )}

          {/* Stats */}
          <div 
            className="flex items-center justify-between pt-3"
            style={{ borderTop: `1px solid var(--color-base-300)` }}
          >
            <div 
              className="flex items-center space-x-2 text-sm opacity-60"
              style={{ color: 'var(--color-base-content)' }}
            >
              <FiFileText className="h-4 w-4" />
              <span>{category.postCount || 0} posts</span>
            </div>
            
            <div 
              className="px-2 py-1 text-xs font-medium rounded-full"
              style={{ 
                backgroundColor: `var(${themeColor})`,
                color: `var(${themeColor}-content)`,
                opacity: 0.9
              }}
            >
              {category.status || 'active'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryListItem = ({ category, onEdit, onDelete }) => {
  const getThemeColor = (color) => {
    const colorMap = {
      blue: '--color-primary',
      green: '--color-success',
      purple: '--color-secondary',
      red: '--color-error',
      orange: '--color-warning',
      indigo: '--color-accent'
    };
    return colorMap[color] || '--color-primary';
  };

  const themeColor = getThemeColor(category.color);

  return (
    <div 
      className="rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
      style={{ 
        backgroundColor: 'var(--color-base-200)',
        border: `1px solid var(--color-base-300)`
      }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div 
              className="p-2 rounded-lg"
              style={{ 
                backgroundColor: `var(${themeColor})`,
                opacity: 0.1
              }}
            >
              <FiTag 
                className="h-5 w-5" 
                style={{ color: `var(${themeColor})` }}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <h3 
                  className="text-lg font-semibold truncate"
                  style={{ color: 'var(--color-base-content)' }}
                >
                  {category.name}
                </h3>
                <span 
                  className="text-sm opacity-60"
                  style={{ color: 'var(--color-base-content)' }}
                >
                  /{category.slug}
                </span>
              </div>
              {category.description && (
                <p 
                  className="text-sm mt-1 line-clamp-1 opacity-70"
                  style={{ color: 'var(--color-base-content)' }}
                >
                  {category.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div 
              className="flex items-center space-x-2 text-sm opacity-60"
              style={{ color: 'var(--color-base-content)' }}
            >
              <FiFileText className="h-4 w-4" />
              <span>{category.postCount || 0} posts</span>
            </div>
            
            <div 
              className="px-3 py-1 text-xs font-medium rounded-full"
              style={{ 
                backgroundColor: `var(${themeColor})`,
                color: `var(${themeColor}-content)`,
                opacity: 0.9
              }}
            >
              {category.status || 'active'}
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => onEdit(category)}
                className="p-2 rounded-lg transition-colors duration-200"
                style={{ 
                  color: 'var(--color-base-content)',
                  opacity: 0.6
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--color-primary)';
                  e.target.style.backgroundColor = 'var(--color-primary)';
                  e.target.style.opacity = '0.1';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--color-base-content)';
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.opacity = '0.6';
                }}
              >
                <FiEdit3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(category._id || category.id)}
                className="p-2 rounded-lg transition-colors duration-200"
                style={{ 
                  color: 'var(--color-base-content)',
                  opacity: 0.6
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--color-error)';
                  e.target.style.backgroundColor = 'var(--color-error)';
                  e.target.style.opacity = '0.1';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--color-base-content)';
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.opacity = '0.6';
                }}
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModernCategoriesGrid = ({ loading, categories, onEdit, onDelete, viewMode }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="rounded-xl shadow-sm p-6 animate-pulse"
            style={{ 
              backgroundColor: 'var(--color-base-200)',
              border: `1px solid var(--color-base-300)`
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-lg"
                style={{ backgroundColor: 'var(--color-base-300)' }}
              ></div>
              <div className="flex space-x-2">
                <div 
                  className="w-8 h-8 rounded-lg"
                  style={{ backgroundColor: 'var(--color-base-300)' }}
                ></div>
                <div 
                  className="w-8 h-8 rounded-lg"
                  style={{ backgroundColor: 'var(--color-base-300)' }}
                ></div>
              </div>
            </div>
            <div className="space-y-3">
              <div 
                className="h-6 rounded w-3/4"
                style={{ backgroundColor: 'var(--color-base-300)' }}
              ></div>
              <div 
                className="h-4 rounded w-1/2"
                style={{ backgroundColor: 'var(--color-base-300)' }}
              ></div>
              <div 
                className="h-4 rounded w-full"
                style={{ backgroundColor: 'var(--color-base-300)' }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div 
        className="text-center py-12 rounded-xl shadow-sm"
        style={{ 
          backgroundColor: 'var(--color-base-200)',
          border: `1px solid var(--color-base-300)`
        }}
      >
        <FiTag 
          className="h-12 w-12 mx-auto mb-4 opacity-40" 
          style={{ color: 'var(--color-base-content)' }}
        />
        <h3 
          className="text-lg font-medium mb-2"
          style={{ color: 'var(--color-base-content)' }}
        >
          No categories found
        </h3>
        <p 
          className="opacity-60"
          style={{ color: 'var(--color-base-content)' }}
        >
          Create your first category to get started organizing your content.
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {categories.map((category) => (
          <CategoryListItem
            key={category._id || category.id}
            category={category}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard
          key={category._id || category.id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ModernCategoriesGrid;