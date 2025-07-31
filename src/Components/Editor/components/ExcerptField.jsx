import React from 'react';

const ExcerptField = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="excerpt" className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
        Excerpt
      </label>
      <textarea
        id="excerpt"
        name="excerpt"
        value={value}
        onChange={onChange}
        rows="3"
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
        style={{
          backgroundColor: 'var(--color-base-100)',
          borderColor: 'var(--color-base-300)',
          color: 'var(--color-base-content)'
        }}
        placeholder="Enter a brief excerpt (optional)"
      />
    </div>
  );
};

export default ExcerptField;