import React from 'react';

const BasicInfoStep = ({ formData, errors, onInputChange, titleInputRef }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
          Title *
        </label>
        <input
          ref={titleInputRef}
          type="text"
          name="title"
          value={formData.title}
          onChange={onInputChange}
          placeholder="Enter your post title..."
          className="w-full px-3 py-2 rounded-lg border transition-colors"
          style={{
            backgroundColor: 'var(--color-base-100)',
            borderColor: errors.title ? 'var(--color-error)' : 'var(--color-base-300)',
            color: 'var(--color-base-content)'
          }}
        />
        {errors.title && (
          <p className="text-sm mt-1" style={{color: 'var(--color-error)'}}>
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
          Content *
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={onInputChange}
          placeholder="Write your post content..."
          rows={8}
          className="w-full px-3 py-2 rounded-lg border transition-colors resize-none"
          style={{
            backgroundColor: 'var(--color-base-100)',
            borderColor: errors.content ? 'var(--color-error)' : 'var(--color-base-300)',
            color: 'var(--color-base-content)'
          }}
        />
        {errors.content && (
          <p className="text-sm mt-1" style={{color: 'var(--color-error)'}}>
            {errors.content}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
          Excerpt
        </label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={onInputChange}
          placeholder="Brief description of your post..."
          rows={3}
          className="w-full px-3 py-2 rounded-lg border transition-colors resize-none"
          style={{
            backgroundColor: 'var(--color-base-100)',
            borderColor: 'var(--color-base-300)',
            color: 'var(--color-base-content)'
          }}
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;