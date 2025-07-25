import React from 'react';

const TagsInput = ({ tags, tagInput, onTagInputChange, onTagAdd, onTagRemove }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onTagAdd();
    }
  };

  return (
    <div>
      <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
        Tags
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          type="text"
          id="tags"
          value={tagInput}
          onChange={onTagInputChange}
          className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Add a tag"
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          onClick={onTagAdd}
          className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
        >
          Add
        </button>
      </div>
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => onTagRemove(tag)}
                className="ml-1 inline-flex text-blue-400 hover:text-blue-600 focus:outline-none"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsInput;