import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../../Services/PostsContext';

const PreviewDrafts = () => {
  const { posts, loading } = usePosts();
  const [draftPosts, setDraftPosts] = useState([]);

  useEffect(() => {
    if (posts) {
      const drafts = posts.filter(post => post.status === 'draft');
      setDraftPosts(drafts);
    }
  }, [posts]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{
        background: `linear-gradient(135deg, var(--color-base-100) 0%, var(--color-base-200) 100%)`
      }}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 rounded-full animate-spin" style={{
              borderColor: 'var(--color-base-300)',
              borderTopColor: 'var(--color-primary)'
            }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{
      background: `linear-gradient(135deg, var(--color-base-100) 0%, var(--color-base-200) 100%)`
    }}>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{color: 'var(--color-base-content)'}}>
            Draft Preview
          </h1>
          <p className="text-lg" style={{color: 'var(--color-base-content-secondary)'}}>
            Review your draft posts before publishing
          </p>
        </div>

        {draftPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center" style={{
              backgroundColor: 'var(--color-base-200)',
              border: '2px dashed var(--color-base-300)'
            }}>
              <svg className="w-12 h-12" style={{color: 'var(--color-base-content-secondary)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{color: 'var(--color-base-content)'}}>
              No Draft Posts
            </h3>
            <p className="mb-4" style={{color: 'var(--color-base-content-secondary)'}}>
              You don't have any draft posts to preview yet.
            </p>
            <Link
              to="/dashboard/posts/create"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {draftPosts.map((post) => (
              <div
                key={post._id}
                className="rounded-xl border shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-base-200)',
                  borderColor: 'var(--color-base-300)'
                }}
              >
                {post.featuredImage && (
                  <div className="mb-4">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Draft
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2" style={{color: 'var(--color-base-content)'}}>
                  {post.title || 'Untitled Post'}
                </h3>
                
                <p className="mb-4 text-sm leading-relaxed" style={{color: 'var(--color-base-content-secondary)'}}>
                  {post.excerpt || truncateContent(post.content || '')}
                </p>
                
                <div className="flex items-center justify-between text-xs mb-4" style={{color: 'var(--color-base-content-secondary)'}}>
                  <span>Created: {formatDate(post.createdAt)}</span>
                  {post.updatedAt !== post.createdAt && (
                    <span>Updated: {formatDate(post.updatedAt)}</span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Link
                    to={`/dashboard/posts/edit/${post._id}`}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      sessionStorage.setItem('previewPost', JSON.stringify(post));
                      window.open('/preview/post', '_blank');
                    }}
                    className="flex-1 px-4 py-2 border text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    style={{
                      borderColor: 'var(--color-base-300)',
                      color: 'var(--color-base-content)'
                    }}
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewDrafts;