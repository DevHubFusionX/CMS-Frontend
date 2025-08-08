import React from 'react';

const ModernCategoriesHeader = ({ onCreateCategory, stats }) => {
  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold transition-colors duration-300" style={{
          background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Category Management
        </h1>
        <p className="text-base sm:text-lg max-w-2xl mx-auto transition-colors duration-300" style={{
          color: 'var(--color-base-content)',
          opacity: '0.8'
        }}>
          Organize your content with categories to help users find what they're looking for
        </p>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={onCreateCategory}
          className="px-6 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-content)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--color-primary-focus)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'var(--color-primary)';
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Category
        </button>
      </div>
    </div>
  );
};

export default ModernCategoriesHeader;