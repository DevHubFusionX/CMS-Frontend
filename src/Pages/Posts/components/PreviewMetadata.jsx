import React from 'react';

const PreviewMetadata = ({ categories, tags }) => {
  if (!categories?.length && !tags?.length) return null;

  return (
    <div className="mt-8 pt-6 border-t" style={{borderColor: 'var(--color-base-300)'}}>
      {categories && categories.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2" style={{color: 'var(--color-base-content-secondary)'}}>Categories:</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <span 
                key={index} 
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: 'var(--color-base-200)',
                  color: 'var(--color-base-content)'
                }}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {tags && tags.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2" style={{color: 'var(--color-base-content-secondary)'}}>Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-content)',
                  opacity: '0.8'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewMetadata;