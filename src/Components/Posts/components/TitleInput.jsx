import React from 'react';

const TitleInput = ({ value, onChange, error }) => {
  return (
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
        Title <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
          error ? 'border-red-500' : ''
        }`}
        placeholder="Enter post title"
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default TitleInput;