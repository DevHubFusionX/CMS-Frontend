import React from 'react';

/**
 * Toolbar for the enhanced editor with word count, reading time, and buttons for SEO and version history
 * Supports light/dark theme modes
 */
const EditorToolbar = ({ 
  onToggleSeo, 
  onToggleVersionHistory, 
  wordCount = 0, 
  readingTime = 0,
  autosaveStatus = ''
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between border rounded-t-md p-2" style={{
      backgroundColor: 'var(--color-base-200)',
      borderColor: 'var(--color-base-300)'
    }}>
      {/* Left side - Stats */}
      <div className="flex items-center space-x-4 text-sm opacity-70" style={{color: 'var(--color-base-content)'}}>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <span>{wordCount} words</span>
        </div>
        
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{readingTime} min read</span>
        </div>
        
        {autosaveStatus && (
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <span style={{color: 'var(--color-success)'}}>{autosaveStatus}</span>
          </div>
        )}
      </div>
      
      {/* Right side - Buttons */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={onToggleSeo}
          className="inline-flex items-center px-2.5 py-1.5 border text-xs font-medium rounded"
          style={{
            borderColor: 'var(--color-base-300)',
            backgroundColor: 'var(--color-base-100)',
            color: 'var(--color-base-content)'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          SEO
        </button>
        
        <button
          type="button"
          onClick={onToggleVersionHistory}
          className="inline-flex items-center px-2.5 py-1.5 border text-xs font-medium rounded"
          style={{
            borderColor: 'var(--color-base-300)',
            backgroundColor: 'var(--color-base-100)',
            color: 'var(--color-base-content)'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          History
        </button>
      </div>
    </div>
  );
};

export default EditorToolbar;