import React from 'react';

const BlogHero = ({ searchTerm, setSearchTerm }) => {
  return (
    <section className="py-20" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-accent) 100%)', color: 'var(--color-primary-content)'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Insights & Stories
        </h1>
        <p className="text-xl md:text-2xl mb-8 leading-relaxed" style={{color: 'var(--color-primary-content)', opacity: '0.9'}}>
          Discover the latest trends, tips, and insights from our team of content experts
        </p>
        
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-12 rounded-2xl shadow-lg focus:outline-none focus:ring-4 transition-all"
              style={{backgroundColor: 'var(--color-base-100)', color: 'var(--color-base-content)', borderColor: 'var(--color-base-300)'}}
              onFocus={(e) => e.target.style.boxShadow = '0 0 0 4px var(--color-primary)' + '40'}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'var(--color-base-content)', opacity: '0.5'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;