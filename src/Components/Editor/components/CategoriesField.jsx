import React, { useState } from 'react';
import { FiChevronDown, FiX, FiFolder } from 'react-icons/fi';

const CategoriesField = ({ value, onChange, categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCategories = categories.filter(cat => value.includes(cat._id));

  const handleCategoryToggle = (categoryId) => {
    const newValue = value.includes(categoryId)
      ? value.filter(id => id !== categoryId)
      : [...value, categoryId];
    
    onChange({ target: { selectedOptions: newValue.map(id => ({ value: id })) } });
  };

  const removeCategory = (categoryId) => {
    const newValue = value.filter(id => id !== categoryId);
    onChange({ target: { selectedOptions: newValue.map(id => ({ value: id })) } });
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium" style={{color: 'var(--color-base-content)'}}>
        Categories
      </label>
      
      {/* Selected Categories */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map(category => (
            <span
              key={category._id}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${getColorClasses(category.color)}`}
            >
              <FiFolder className="h-3 w-3" />
              {category.name}
              <button
                type="button"
                onClick={() => removeCategory(category._id)}
                className="ml-1 hover:bg-black/10 rounded-full p-0.5"
              >
                <FiX className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 border rounded-lg flex items-center justify-between text-sm focus:ring-2 focus:border-transparent"
          style={{
            backgroundColor: 'var(--color-base-100)',
            borderColor: 'var(--color-base-300)',
            color: 'var(--color-base-content)'
          }}
        >
          <span className="text-left">
            {selectedCategories.length > 0 
              ? `${selectedCategories.length} categories selected`
              : 'Select categories...'
            }
          </span>
          <FiChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div 
            className="absolute z-10 w-full mt-1 border rounded-lg shadow-lg max-h-48 overflow-y-auto"
            style={{
              backgroundColor: 'var(--color-base-100)',
              borderColor: 'var(--color-base-300)'
            }}
          >
            {categories.length === 0 ? (
              <div className="p-3 text-sm text-center" style={{color: 'var(--color-base-content)', opacity: 0.6}}>
                No categories available
              </div>
            ) : (
              categories.map(category => (
                <label
                  key={category._id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={value.includes(category._id)}
                    onChange={() => handleCategoryToggle(category._id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
                  <span className="text-sm" style={{color: 'var(--color-base-content)'}}>
                    {category.name}
                  </span>
                </label>
              ))
            )}
          </div>
        )}
      </div>

      <p className="text-xs opacity-70" style={{color: 'var(--color-base-content)'}}>
        Select one or more categories for this post
      </p>
    </div>
  );
};

export default CategoriesField;