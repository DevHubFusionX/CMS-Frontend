import React from 'react';

const PostContent = ({ content, className = '' }) => {
  // Simple Markdown-like formatting
  const formatContent = (text) => {
    if (!text) return '';
    
    return text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">$1</h1>')
      
      // Bold and Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700 dark:text-gray-300">$1</em>')
      
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')
      
      // Lists
      .replace(/^- (.*$)/gim, '<li class="ml-4 text-gray-700 dark:text-gray-300">• $1</li>')
      
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">')
      
      // Line breaks
      .replace(/\n/g, '<br>');
  };

  return (
    <div 
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ 
        __html: `<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">${formatContent(content)}</p>` 
      }}
    />
  );
};

export default PostContent;