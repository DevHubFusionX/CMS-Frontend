import React from 'react';

const PostContent = ({ content, className = '' }) => {
  if (!content) return null;

  return (
    <div 
      className={`prose prose-lg max-w-none ${className}`}
      style={{
        color: 'var(--color-base-content)',
        '--tw-prose-headings': 'var(--color-base-content)',
        '--tw-prose-body': 'var(--color-base-content)',
        '--tw-prose-links': 'var(--color-primary)',
        '--tw-prose-bold': 'var(--color-base-content)',
        '--tw-prose-quotes': 'var(--color-base-content)',
        '--tw-prose-quote-borders': 'var(--color-primary)',
        '--tw-prose-code': 'var(--color-base-content)',
        '--tw-prose-pre-code': 'var(--color-base-content)',
        '--tw-prose-pre-bg': 'var(--color-base-200)',
        '--tw-prose-th-borders': 'var(--color-base-300)',
        '--tw-prose-td-borders': 'var(--color-base-300)'
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default PostContent;