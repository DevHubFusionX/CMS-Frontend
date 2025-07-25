import React from 'react';

const ModernCategoriesHeader = ({ onCreateCategory, stats }) => {
  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Category Management
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Organize your content with categories to help users find what they're looking for
        </p>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={onCreateCategory}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
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