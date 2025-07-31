import React from 'react';

const TitleField = ({ value, onChange, error }) => {
  return (
    <div>
      <label htmlFor="title" className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
        style={{
          backgroundColor: 'var(--color-base-100)',
          borderColor: error ? 'var(--color-error)' : 'var(--color-base-300)',
          color: 'var(--color-base-content)'
        }}
        placeholder="Enter post title"
      />
      {error && (
        <p className="text-xs mt-1" style={{color: 'var(--color-error)'}}>{error}</p>
      )}
    </div>
  );
};

export default TitleField;