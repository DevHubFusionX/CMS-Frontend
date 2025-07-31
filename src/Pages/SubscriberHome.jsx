import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Services';
import { usePosts } from '../Services/PostsContext';
import { useCategories } from '../Services/CategoriesContext';

const SubscriberHome = () => {
  const { user } = useAuth();
  const postsContext = usePosts();
  const categoriesContext = useCategories();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [likedPosts, setLikedPosts] = useState(new Set());

  const posts = postsContext?.posts || [];
  const loading = postsContext?.loading || false;
  const categories = categoriesContext?.categories || [];

  // Filter published posts only
  const publishedPosts = posts.filter(post => post?.status === 'published');

  // Filter posts based on search and category
  const filteredPosts = publishedPosts.filter(post => {
    const matchesSearch = post?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post?.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                           post?.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBookmark = (postId) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-base-100)', color: 'var(--color-base-content)' }}
    >
      {/* Navigation */}
      <nav 
        className="border-b"
        style={{ 
          backgroundColor: 'var(--color-base-200)', 
          borderColor: 'var(--color-base-300)' 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 
                className="text-xl font-bold"
                style={{ color: 'var(--color-primary)' }}
              >
                CMS
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/blog')}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                style={{ color: 'var(--color-base-content)', opacity: 0.8 }}
                onMouseEnter={(e) => e.target.style.opacity = '1'}
                onMouseLeave={(e) => e.target.style.opacity = '0.8'}
              >
                Blog
              </button>
              <button
                onClick={() => navigate('/subscriber-dashboard')}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                style={{ color: 'var(--color-base-content)', opacity: 0.8 }}
                onMouseEnter={(e) => e.target.style.opacity = '1'}
                onMouseLeave={(e) => e.target.style.opacity = '0.8'}
              >
                Dashboard
              </button>
              <div 
                className="text-sm"
                style={{ color: 'var(--color-base-content)', opacity: 0.7 }}
              >
                Welcome, {user?.name || user?.username}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: 'var(--color-primary)' }}
          >
            Welcome back, {user?.name || user?.username}!
          </h1>
          <p 
            className="text-lg"
            style={{ color: 'var(--color-base-content)', opacity: 0.7 }}
          >
            Discover fresh content and stay updated with the latest articles
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border transition-colors"
                style={{
                  backgroundColor: 'var(--color-base-200)',
                  borderColor: 'var(--color-base-300)',
                  color: 'var(--color-base-content)'
                }}
              />
              <svg 
                className="absolute left-3 top-2.5 h-5 w-5" 
                style={{ color: 'var(--color-base-content)', opacity: 0.5 }}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={selectedCategory === 'All' ? {
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-content)'
                } : {
                  backgroundColor: 'transparent',
                  color: 'var(--color-base-content)',
                  borderColor: 'var(--color-base-300)',
                  border: '1px solid'
                }}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category.name)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={selectedCategory === category.name ? {
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-content)'
                  } : {
                    backgroundColor: 'transparent',
                    color: 'var(--color-base-content)',
                    borderColor: 'var(--color-base-300)',
                    border: '1px solid'
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="relative">
              <div 
                className="w-12 h-12 border-4 rounded-full animate-spin"
                style={{ borderColor: 'var(--color-base-300)' }}
              ></div>
              <div 
                className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent rounded-full animate-spin"
                style={{ borderTopColor: 'var(--color-primary)' }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <article
                key={post._id}
                className="rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-base-200)',
                  borderColor: 'var(--color-base-300)'
                }}
                onClick={() => navigate(`/post/${post._id}`)}
              >
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: 'var(--color-accent)',
                        color: 'var(--color-accent-content)'
                      }}
                    >
                      {post.category?.name || 'Uncategorized'}
                    </span>
                    <span 
                      className="text-xs"
                      style={{ color: 'var(--color-base-content)', opacity: 0.6 }}
                    >
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  
                  <h3 
                    className="text-lg font-semibold mb-2 line-clamp-2"
                    style={{ color: 'var(--color-base-content)' }}
                  >
                    {post.title}
                  </h3>
                  
                  <p 
                    className="text-sm mb-4 line-clamp-3"
                    style={{ color: 'var(--color-base-content)', opacity: 0.7 }}
                  >
                    {post.excerpt || post.content.substring(0, 120) + '...'}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(post._id);
                        }}
                        className="flex items-center space-x-1 transition-colors"
                        style={{ 
                          color: likedPosts.has(post._id) ? 'var(--color-error)' : 'var(--color-base-content)',
                          opacity: likedPosts.has(post._id) ? 1 : 0.6
                        }}
                      >
                        <svg className="w-4 h-4" fill={likedPosts.has(post._id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmark(post._id);
                        }}
                        className="flex items-center space-x-1 transition-colors"
                        style={{ 
                          color: bookmarkedPosts.has(post._id) ? 'var(--color-warning)' : 'var(--color-base-content)',
                          opacity: bookmarkedPosts.has(post._id) ? 1 : 0.6
                        }}
                      >
                        <svg className="w-4 h-4" fill={bookmarkedPosts.has(post._id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>
                    
                    <span 
                      className="text-xs"
                      style={{ color: 'var(--color-base-content)', opacity: 0.5 }}
                    >
                      By {post.author?.name || 'Anonymous'}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <svg 
              className="mx-auto h-12 w-12 mb-4"
              style={{ color: 'var(--color-base-content)', opacity: 0.4 }}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 
              className="text-lg font-medium mb-2"
              style={{ color: 'var(--color-base-content)' }}
            >
              No articles found
            </h3>
            <p 
              className="text-sm"
              style={{ color: 'var(--color-base-content)', opacity: 0.6 }}
            >
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriberHome;