import React from 'react';

const TagsField = ({ value, onChange, tags }) => {
  return (
    <div>
      <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
        Tags
      </label>
      <select
        id="tags"
        name="tags"
        multiple
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
        size="3"
      >
        {tags.map(tag => (
          <option key={tag._id} value={tag._id}>
            {tag.name}
          </option>
        ))}
      </select>
      <p className="text-gray-400 text-xs mt-1">Hold Ctrl (or Cmd) to select multiple tags</p>
    </div>
  );
};

export default TagsField;