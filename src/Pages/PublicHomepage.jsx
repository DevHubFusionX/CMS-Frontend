import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsService } from '../Services/api';
import { HiBookOpen, HiUserAdd, HiArrowRight } from 'react-icons/hi';

const PublicHomepage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPublishedPosts();
  }, []);

  const loadPublishedPosts = async () => {
    try {
      const response = await postsService.getAllPosts();
      const publishedPosts = response.data.filter(post => post.status === 'published');
      setPosts(publishedPosts.slice(0, 6)); // Show latest 6 posts
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-base-100)' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: 'var(--color-base-300)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
              }}>
                <HiBookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--color-base-content)' }}>
                FusionX Blog
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/blog')}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-opacity-10"
                style={{ color: 'var(--color-base-content)' }}
              >
                Blog
              </button>
              <button
                onClick={() => navigate('/auth/login')}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                style={{ color: 'var(--color-base-content)' }}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/auth/register')}
                className="flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-content)'
                }}
              >
                <HiUserAdd className="w-4 h-4" />
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: 'var(--color-base-content)' }}>
            Welcome to Our Blog
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: 'var(--color-base-content)', opacity: 0.7 }}>
            Discover amazing content, insights, and stories. Subscribe to get the latest updates and never miss a post.
          </p>
          <button
            onClick={() => navigate('/auth/register')}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-content)'
            }}
          >
            <span>Start Reading</span>
            <HiArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-base-200)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--color-base-content)' }}>
            Latest Posts
          </h3>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{
                borderColor: 'var(--color-primary)'
              }}></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <article
                  key={post._id}
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                  style={{ backgroundColor: 'var(--color-base-100)' }}
                  onClick={() => navigate(`/posts/${post._id}`)}
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
                      {post.category && (
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'var(--color-primary-content)'
                          }}
                        >
                          {post.category.name}
                        </span>
                      )}
                      <span className="text-sm" style={{ color: 'var(--color-base-content)', opacity: 0.6 }}>
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-base-content)' }}>
                      {post.title}
                    </h4>
                    <p className="text-sm mb-4" style={{ color: 'var(--color-base-content)', opacity: 0.7 }}>
                      {post.excerpt || post.content?.substring(0, 120) + '...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: 'var(--color-base-content)', opacity: 0.6 }}>
                        By {post.author?.name || 'Unknown'}
                      </span>
                      <button
                        className="text-sm font-medium flex items-center space-x-1 hover:underline"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        <span>Read More</span>
                        <HiArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          
          {posts.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: 'var(--color-base-content)', opacity: 0.6 }}>
                No posts available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-base-content)' }}>
            Ready to Join Our Community?
          </h3>
          <p className="text-lg mb-8" style={{ color: 'var(--color-base-content)', opacity: 0.7 }}>
            Subscribe now to get access to exclusive content, bookmark your favorite posts, and never miss an update.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/auth/register')}
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-content)'
              }}
            >
              Subscribe Now
            </button>
            <button
              onClick={() => navigate('/auth/login')}
              className="px-8 py-3 rounded-lg font-semibold border transition-all duration-200 hover:shadow-lg"
              style={{
                borderColor: 'var(--color-base-300)',
                color: 'var(--color-base-content)',
                backgroundColor: 'transparent'
              }}
            >
              Already a Member? Sign In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicHomepage;