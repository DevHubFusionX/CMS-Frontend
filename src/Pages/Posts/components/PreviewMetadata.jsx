import React from 'react';

const PreviewMetadata = ({ categories, tags }) => {
  if (!categories?.length && !tags?.length) return null;

  return (
    <footer className="mt-16 pt-8">
      <div className="p-6 rounded-2xl" style={{
        backgroundColor: 'var(--color-base-200)',
        border: '1px solid var(--color-base-300)'
      }}>
        <div className="grid md:grid-cols-2 gap-6">
          {categories && categories.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center" style={{color: 'var(--color-base-content)'}}>
                <span className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: 'var(--color-secondary)'}}></span>
                Categories
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: 'var(--color-secondary)',
                      color: 'var(--color-secondary-content)',
                      boxShadow: '0 2px 4px rgb(0 0 0 / 0.1)'
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
              <h3 className="text-lg font-semibold mb-4 flex items-center" style={{color: 'var(--color-base-content)'}}>
                <span className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: 'var(--color-accent)'}}></span>
                Tags
              </h3>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-accent-content)',
                      boxShadow: '0 2px 4px rgb(0 0 0 / 0.1)'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default PreviewMetadata;