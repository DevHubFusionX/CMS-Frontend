import React from 'react';
import { FiPlus, FiGrid, FiFolder, FiTrendingUp } from 'react-icons/fi';

const ModernCategoriesHeader = ({ onCreateCategory, stats }) => {
  return (
    <div 
      className="relative overflow-hidden rounded-2xl shadow-lg"
      style={{ 
        backgroundColor: 'var(--color-base-200)',
        border: `1px solid var(--color-base-300)`
      }}
    >
      <div 
        className="absolute inset-0 opacity-5"
        style={{ backgroundColor: 'var(--color-primary)' }}
      ></div>
      <div className="relative p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div 
              className="p-3 rounded-xl shadow-lg"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <FiGrid 
                className="h-7 w-7" 
                style={{ color: 'var(--color-primary-content)' }}
              />
            </div>
            <div>
              <h1 
                className="text-3xl font-bold"
                style={{ color: 'var(--color-base-content)' }}
              >
                Categories
              </h1>
              <p 
                className="mt-2 text-lg opacity-70"
                style={{ color: 'var(--color-base-content)' }}
              >
                Organize and manage your content categories
              </p>
              <div className="flex items-center space-x-6 mt-3">
                <div 
                  className="flex items-center space-x-2 text-sm opacity-60"
                  style={{ color: 'var(--color-base-content)' }}
                >
                  <FiFolder className="h-4 w-4" />
                  <span className="font-medium">{stats.total} categories</span>
                </div>
                <div 
                  className="flex items-center space-x-2 text-sm opacity-60"
                  style={{ color: 'var(--color-base-content)' }}
                >
                  <FiTrendingUp className="h-4 w-4" />
                  <span className="font-medium">{stats.postsCount} posts</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onCreateCategory}
              className="group relative inline-flex items-center px-6 py-3 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              style={{ 
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-content)'
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1';
              }}
            >
              <FiPlus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-200" />
              Create Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernCategoriesHeader;