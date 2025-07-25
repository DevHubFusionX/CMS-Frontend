import React from 'react';

const CategoriesField = ({ value, onChange, categories }) => {
  return (
    <div>
      <label htmlFor="categories" className="block text-sm font-medium text-gray-300 mb-2">
        Categories
      </label>
      <select
        id="categories"
        name="categories"
        multiple
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
        size="3"
      >
        {categories.map(category => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <p className="text-gray-400 text-xs mt-1">Hold Ctrl (or Cmd) to select multiple categories</p>
    </div>
  );
};

export default CategoriesField;