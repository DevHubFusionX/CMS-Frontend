import React, { useState, useEffect, useRef } from 'react';
import RichTextEditor from './RichTextEditor';
import EditorToolbar from './EditorToolbar';
import SEOPanel from './SEOPanel';
import VersionHistory from './VersionHistory';

/**
 * Enhanced Editor component with rich text editing, SEO analysis, and version history
 * 
 * @param {Object} props - Component props
 * @param {string} props.initialValue - Initial content for the editor
 * @param {function} props.onChange - Function to call when content changes
 * @param {string} props.contentId - Unique ID for the content (used for autosave)
 * @param {string} props.postTitle - Title of the post (used for SEO analysis)
 * @param {string} props.focusKeyword - Focus keyword for SEO analysis
 * @param {string} props.language - Content language
 */
const EnhancedEditor = ({ 
  initialValue = '', 
  onChange, 
  contentId = 'new-content',
  postTitle = '',
  focusKeyword = '',
  language = 'en'
}) => {
  const [content, setContent] = useState(initialValue);
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [showSeoPanel, setShowSeoPanel] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [versions, setVersions] = useState([]);
  const [autosaveStatus, setAutosaveStatus] = useState('');
  const editorRef = useRef(null);
  
  // Calculate word count and reading time
  useEffect(() => {
    if (content) {
      // Strip HTML tags for word count
      const textContent = content.replace(/<[^>]*>/g, '');
      const words = textContent.split(/\s+/).filter(Boolean);
      setWordCount(words.length);
      
      // Calculate reading time (average reading speed: 200 words per minute)
      const wordsPerMinute = 200;
      setReadingTime(Math.ceil(words.length / wordsPerMinute));
    } else {
      setWordCount(0);
      setReadingTime(0);
    }
  }, [content]);
  
  // Handle content change
  const handleEditorChange = (newContent) => {
    setContent(newContent);
    onChange(newContent);
    
    // Simulate autosave
    setAutosaveStatus('Saving...');
    setTimeout(() => {
      setAutosaveStatus('Saved');
      
      // Add to version history (in a real app, this would be handled by the backend)
      const now = new Date();
      setVersions(prev => [
        { 
          id: `version-${now.getTime()}`,
          content: newContent,
          timestamp: now,
          wordCount: wordCount
        },
        ...prev.slice(0, 9) // Keep only the last 10 versions
      ]);
    }, 1000);
  };
  
  // Restore a previous version
  const handleRestoreVersion = (versionContent) => {
    setContent(versionContent);
    onChange(versionContent);
    setShowVersionHistory(false);
  };
  
  return (
    <div className="enhanced-editor">
      {/* Editor Toolbar */}
      <EditorToolbar 
        onToggleSeo={() => setShowSeoPanel(!showSeoPanel)}
        onToggleVersionHistory={() => setShowVersionHistory(!showVersionHistory)}
        wordCount={wordCount}
        readingTime={readingTime}
        autosaveStatus={autosaveStatus}
      />
      
      {/* Main Editor */}
      <div className="mt-2">
        <RichTextEditor
          ref={editorRef}
          initialValue={content}
          onEditorChange={handleEditorChange}
          customConfig={{
            height: 500,
            autosave_prefix: `tinymce-autosave-${contentId}-`,
            language: language
          }}
        />
      </div>
      
      {/* SEO Panel */}
      {showSeoPanel && (
        <div className="mt-4">
          <SEOPanel 
            content={content}
            title={postTitle}
            focusKeyword={focusKeyword}
          />
        </div>
      )}
      
      {/* Version History */}
      {showVersionHistory && (
        <div className="mt-4">
          <VersionHistory 
            versions={versions}
            onRestore={handleRestoreVersion}
            onClose={() => setShowVersionHistory(false)}
          />
        </div>
      )}
    </div>
  );
};

export default EnhancedEditor;