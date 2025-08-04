import React from 'react';

const PreviewContent = ({ post }) => {
  return (
    <article className="max-w-none">
      {post.featuredImage && (
        <div className="mb-12 -mx-6">
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-80 object-cover rounded-2xl shadow-lg"
            style={{border: '1px solid var(--color-base-300)'}}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/1200x400?text=Featured+Image';
            }}
          />
        </div>
      )}
      
      <header className="mb-10">
        <h1 className="text-5xl font-bold mb-6 leading-tight" style={{color: 'var(--color-base-content)'}}>
          {post.title}
        </h1>
        
        {post.excerpt && (
          <div className="text-xl leading-relaxed p-6 rounded-xl border-l-4" style={{
            color: 'var(--color-base-content)',
            backgroundColor: 'var(--color-base-200)',
            borderColor: 'var(--color-accent)',
            fontStyle: 'italic'
          }}>
            {post.excerpt}
          </div>
        )}
      </header>
      
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  );
};

export default PreviewContent;