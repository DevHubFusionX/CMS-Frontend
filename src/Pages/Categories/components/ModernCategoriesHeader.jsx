import React from 'react';
import { FiPlus, FiGrid, FiFolder, FiTrendingUp } from 'react-icons/fi';

const ModernCategoriesHeader = ({ onCreateCategory, stats }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl border border-blue-100 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
      <div className="relative p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <FiGrid className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Categories
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Organize and manage your content categories
              </p>
              <div className="flex items-center space-x-6 mt-3">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FiFolder className="h-4 w-4" />
                  <span className="font-medium">{stats.total} categories</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FiTrendingUp className="h-4 w-4" />
                  <span className="font-medium">{stats.postsCount} posts</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onCreateCategory}
              className="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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