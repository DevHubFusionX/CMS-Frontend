import React from 'react';

const TagsField = ({ value, onChange, tags }) => {
  return (
    <div>
      <label htmlFor="tags" className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
        Tags
      </label>
      <select
        id="tags"
        name="tags"
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
        {tags.map(tag => (
          <option key={tag._id} value={tag._id}>
            {tag.name}
          </option>
        ))}
      </select>
      <p className="text-xs mt-1 opacity-70" style={{color: 'var(--color-base-content)'}}>Hold Ctrl (or Cmd) to select multiple tags</p>
    </div>
  );
};

export default TagsField;