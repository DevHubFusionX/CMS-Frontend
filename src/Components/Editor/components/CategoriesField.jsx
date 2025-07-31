import React from 'react';

const CategoriesField = ({ value, onChange, categories }) => {
  return (
    <div>
      <label htmlFor="categories" className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
        Categories
      </label>
      <select
        id="categories"
        name="categories"
        multiple
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
        style={{
          backgroundColor: 'var(--color-base-100)',
          borderColor: 'var(--color-base-300)',
          color: 'var(--color-base-content)'
        }}
        size="3"
      >
        {categories.map(category => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <p className="text-xs mt-1 opacity-70" style={{color: 'var(--color-base-content)'}}>Hold Ctrl (or Cmd) to select multiple categories</p>
    </div>
  );
};

export default CategoriesField;