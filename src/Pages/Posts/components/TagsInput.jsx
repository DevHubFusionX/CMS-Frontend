import React from 'react';

const TagsInput = ({ tags, tagInput, setTagInput, onAddTag, onRemoveTag }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
        Tags
      </label>
      <div className="space-y-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={onAddTag}
          placeholder="Type a tag and press Enter..."
          className="w-full px-3 py-2 rounded-lg border transition-colors"
          style={{
            backgroundColor: 'var(--color-base-100)',
            borderColor: 'var(--color-base-300)',
            color: 'var(--color-base-content)'
          }}
        />
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-content)'
                }}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => onRemoveTag(tag)}
                  className="hover:opacity-70"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsInput;