import React from 'react';

const PreviewContent = ({ post }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {post.featuredImage && (
        <div className="mb-6">
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-64 object-cover rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/1200x400?text=Featured+Image';
            }}
          />
        </div>
      )}
      
      <h1 className="text-4xl font-bold mb-4" style={{color: 'var(--color-base-content)'}}>{post.title}</h1>
      
      {post.excerpt && (
        <div className="text-xl mb-6 italic" style={{color: 'var(--color-base-content-secondary)'}}>
          {post.excerpt}
        </div>
      )}
      
      <div className="prose max-w-none prose-lg" style={{
        color: 'var(--color-base-content)',
        '--tw-prose-headings': 'var(--color-base-content)',
        '--tw-prose-body': 'var(--color-base-content)',
        '--tw-prose-links': 'var(--color-primary)',
        '--tw-prose-code': 'var(--color-base-content)',
        '--tw-prose-pre-code': 'var(--color-base-content)',
        '--tw-prose-pre-bg': 'var(--color-base-300)',
        '--tw-prose-quotes': 'var(--color-base-content-secondary)'
      }}>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
};

export default PreviewContent;