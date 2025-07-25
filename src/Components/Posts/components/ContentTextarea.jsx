import React from 'react';

const ContentTextarea = ({ value, onChange, error }) => {
  return (
    <div>
      <label htmlFor="content" className="block text-sm font-medium text-gray-700">
        Content <span className="text-red-500">*</span>
      </label>
      <textarea
        id="content"
        name="content"
        rows="8"
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
          error ? 'border-red-500' : ''
        }`}
        placeholder="Enter post content"
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      <p className="mt-1 text-sm text-gray-500">
        You can use HTML tags for formatting.
      </p>
    </div>
  );
};

export default ContentTextarea;