import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi';

const ArticlesList = ({ 
  posts, 
  loading, 
  title = "Recent Articles", 
  onPostClick, 
  bookmarkedPosts = new Set(), 
  onToggleBookmark,
  emptyMessage = "No articles found."
}) => {
  const navigate = useNavigate();

  const handlePostClick = (post) => {
    if (onPostClick) onPostClick(post);
    navigate(`/posts/${post._id}`);
  };

  const handleBookmarkClick = (e, postId) => {
    e.stopPropagation();
    if (onToggleBookmark) onToggleBookmark(postId);
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div>
        <h2 
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--color-base-content)' }}
        >
          {title}
        </h2>
        <div className="flex justify-center py-8">
          <div className="relative">
            <div 
              className="w-8 h-8 border-4 rounded-full animate-spin"
              style={{ borderColor: 'var(--color-base-300)' }}
            ></div>
            <div 
              className="absolute top-0 left-0 w-8 h-8 border-4 border-transparent rounded-full animate-spin"
              style={{ borderTopColor: 'var(--color-primary)' }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 
        className="text-xl font-semibold mb-4"
        style={{ color: 'var(--color-base-content)' }}
      >
        {title}
      </h2>
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{
            backgroundColor: 'var(--color-base-200)'
          }}>
            <span className="text-2xl">📚</span>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-base-content)', opacity: 0.6 }}>
            {emptyMessage}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div
              key={post._id}
              className="p-4 rounded-xl border cursor-pointer hover:shadow-lg transition-all duration-200 group"
              style={{
                backgroundColor: 'var(--color-base-200)',
                borderColor: 'var(--color-base-300)',
                background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
              }}
              onClick={() => handlePostClick(post)}
            >
            <div className="flex justify-between items-start mb-2">
              <h3 
                className="font-semibold text-lg group-hover:text-primary transition-colors"
                style={{ color: 'var(--color-base-content)' }}
              >
                {post.title}
              </h3>
              <div className="flex items-center space-x-2">
                {onToggleBookmark && (
                  <button
                    onClick={(e) => handleBookmarkClick(e, post._id)}
                    className="p-1 rounded-full hover:bg-opacity-20 transition-all duration-200"
                    style={{ 
                      backgroundColor: bookmarkedPosts.has(post._id) ? 'var(--color-primary)' : 'transparent',
                      color: bookmarkedPosts.has(post._id) ? 'var(--color-primary-content)' : 'var(--color-base-content)'
                    }}
                    title={bookmarkedPosts.has(post._id) ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    {bookmarkedPosts.has(post._id) ? (
                      <HiBookmark className="w-4 h-4" />
                    ) : (
                      <HiOutlineBookmark className="w-4 h-4" />
                    )}
                  </button>
                )}
                <span 
                  className="text-sm"
                  style={{ color: 'var(--color-base-content)', opacity: 0.6 }}
                >
                  {formatDate(post.createdAt)}
                </span>
              </div>
            </div>
            <p 
              className="text-sm mb-3"
              style={{ color: 'var(--color-base-content)', opacity: 0.7 }}
            >
              {post.content?.substring(0, 150)}...
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {post.category && (
                  <span 
                    className="px-2 py-1 rounded-full text-xs"
                    style={{ 
                      backgroundColor: 'var(--color-primary)', 
                      color: 'var(--color-primary-content)' 
                    }}
                  >
                    {post.category.name}
                  </span>
                )}
                <span 
                  className="text-xs"
                  style={{ color: 'var(--color-base-content)', opacity: 0.6 }}
                >
                  By {post.author?.name || 'Unknown'}
                </span>
              </div>
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesList;