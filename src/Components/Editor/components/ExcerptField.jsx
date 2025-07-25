import React from 'react';

const ExcerptField = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-2">
        Excerpt
      </label>
      <textarea
        id="excerpt"
        name="excerpt"
        value={value}
        onChange={onChange}
        rows="3"
        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
        placeholder="Enter a brief excerpt (optional)"
      />
    </div>
  );
};

export default ExcerptField;