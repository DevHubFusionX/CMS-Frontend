import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Services';

const PostCard = ({ post, formatDate, getReadingTime, truncateContent }) => {
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleBookmark = () => {
    if (!user) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }
    setIsBookmarked(!isBookmarked);
  };
  return (
    <article className="group rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-300" style={{backgroundColor: 'var(--color-base-100)', borderColor: 'var(--color-base-300)'}} onMouseEnter={(e) => e.target.style.borderColor = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.borderColor = 'var(--color-base-300)'}>
      <div className="relative h-48 overflow-hidden" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'}}>
        {post.featuredImage ? (
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium" style={{backgroundColor: 'var(--color-base-100)', color: 'var(--color-primary)', opacity: '0.95'}}>
            {post.categories?.[0]?.name || 'Article'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center text-sm mb-3" style={{color: 'var(--color-base-content)', opacity: '0.6'}}>
          <time>{formatDate(post.createdAt)}</time>
          <span className="mx-2">•</span>
          <span>{getReadingTime(post.content)} min read</span>
        </div>

        <h2 className="text-xl font-bold mb-3 transition-colors line-clamp-2" style={{color: 'var(--color-base-content)'}}>
          {post.title}
        </h2>

        <p className="mb-4 line-clamp-3" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>
          {post.excerpt || truncateContent(post.content)}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'var(--color-primary-content)'}}>
              {post.author?.name?.charAt(0) || 'A'}
            </div>
            <span className="text-sm font-medium" style={{color: 'var(--color-base-content)', opacity: '0.8'}}>
              {post.author?.name || 'Anonymous'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleBookmark}
              className="p-2 rounded-lg transition-all duration-200 relative"
              style={{color: isBookmarked ? 'var(--color-warning)' : 'var(--color-base-content)', opacity: '0.7'}}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.7'}
              title={user ? 'Bookmark this post' : 'Sign in to bookmark'}
            >
              <svg className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {showLoginPrompt && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                  Sign in required
                </div>
              )}
            </button>
            
            <Link 
              to={`/blog/${post.slug}`}
              className="inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-content)',
                border: '1px solid var(--color-primary)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--color-secondary)';
                e.target.style.borderColor = 'var(--color-secondary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--color-primary)';
                e.target.style.borderColor = 'var(--color-primary)';
              }}
            >
              Read more
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;