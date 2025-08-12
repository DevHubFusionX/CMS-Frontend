import React from 'react';
import { FiEdit3, FiTrash2, FiFileText, FiTag, FiMoreVertical } from 'react-icons/fi';

const CategoryCard = ({ category, onEdit, onDelete }) => {
  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600 bg-blue-50 text-blue-700',
      green: 'from-green-500 to-green-600 bg-green-50 text-green-700',
      purple: 'from-purple-500 to-purple-600 bg-purple-50 text-purple-700',
      red: 'from-red-500 to-red-600 bg-red-50 text-red-700',
      orange: 'from-orange-500 to-orange-600 bg-orange-50 text-orange-700',
      indigo: 'from-indigo-500 to-indigo-600 bg-indigo-50 text-indigo-700'
    };
    return colorMap[color] || colorMap.blue;
  };

  const colorClasses = getColorClasses(category.color);
  const [gradientClasses, bgClasses, textClasses] = colorClasses.split(' bg-');
  const [bgClass, textClass] = bgClasses.split(' text-');

  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Color accent bar */}
      <div className={`h-1 bg-gradient-to-r ${gradientClasses}`}></div>
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 bg-${bgClass} rounded-lg`}>
            <FiTag className={`h-6 w-6 ${textClass}`} />
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onEdit(category)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title="Edit category"
              >
                <FiEdit3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(category._id || category.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
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
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">/{category.slug}</p>
          </div>

          {category.description && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {category.description}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FiFileText className="h-4 w-4" />
              <span>{category.postCount || 0} posts</span>
            </div>
            
            <div className={`px-2 py-1 bg-${bgClass} ${textClass} text-xs font-medium rounded-full`}>
              {category.status || 'active'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryListItem = ({ category, onEdit, onDelete }) => {
  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700',
      purple: 'bg-purple-100 text-purple-700',
      red: 'bg-red-100 text-red-700',
      orange: 'bg-orange-100 text-orange-700',
      indigo: 'bg-indigo-100 text-indigo-700'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className={`p-2 ${getColorClasses(category.color)} rounded-lg`}>
              <FiTag className="h-5 w-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {category.name}
                </h3>
                <span className="text-sm text-gray-500">/{category.slug}</span>
              </div>
              {category.description && (
                <p className="text-gray-600 text-sm mt-1 line-clamp-1">
                  {category.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FiFileText className="h-4 w-4" />
              <span>{category.postCount || 0} posts</span>
            </div>
            
            <div className={`px-3 py-1 ${getColorClasses(category.color)} text-xs font-medium rounded-full`}>
              {category.status || 'active'}
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => onEdit(category)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <FiEdit3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(category._id || category.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
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
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
        <FiTag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
        <p className="text-gray-500">Create your first category to get started organizing your content.</p>
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