import React from 'react';

const TitleField = ({ value, onChange, error }) => {
  return (
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-gray-700/50 border ${error ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400`}
        placeholder="Enter post title"
      />
      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default TitleField;