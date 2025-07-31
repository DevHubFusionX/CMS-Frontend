import React from 'react';

/**
 * Toolbar for the PostEditor with save, publish, and preview actions
 * Supports light/dark theme modes
 */
const PostEditorToolbar = ({ 
  onSave, 
  onPublish, 
  onPreview, 
  isDraft = true,
  isSaving = false,
  isPublishing = false
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between border-b pb-4 mb-6" style={{
      borderColor: 'var(--color-base-300)'
    }}>
      {/* Left side - Status */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2"
            style={{
              backgroundColor: isDraft ? 'var(--color-warning)' : 'var(--color-success)'
            }}
          ></div>
          <span className="text-sm font-medium" style={{color: 'var(--color-base-content)'}}>
            {isDraft ? 'Draft' : 'Published'}
          </span>
        </div>
        
        {(isSaving || isPublishing) && (
          <div className="flex items-center text-sm" style={{color: 'var(--color-base-content)'}}>
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 mr-2" style={{
              borderColor: 'var(--color-primary)'
            }}></div>
            {isSaving ? 'Saving...' : 'Publishing...'}
          </div>
        )}
      </div>
      
      {/* Right side - Actions */}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={onPreview}
          className="px-4 py-2 border rounded-lg text-sm font-medium transition-colors"
          style={{
            borderColor: 'var(--color-base-300)',
            backgroundColor: 'var(--color-base-100)',
            color: 'var(--color-base-content)'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Preview
        </button>
        
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving || isPublishing}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-secondary-content)'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          {isSaving ? 'Saving...' : 'Save Draft'}
        </button>
        
        <button
          type="button"
          onClick={onPublish}
          disabled={isSaving || isPublishing}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-content)'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          {isPublishing ? 'Publishing...' : isDraft ? 'Publish' : 'Update'}
        </button>
      </div>
    </div>
  );
};

export default PostEditorToolbar;