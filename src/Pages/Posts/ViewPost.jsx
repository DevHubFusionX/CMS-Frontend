import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { postsService } from '../../Services/api';
import { useTheme } from '../../Context/ThemeContext';
import PostAnalytics from '../../Components/Analytics/PostAnalytics';
import RelatedPosts from '../../Components/Posts/RelatedPosts';

const ViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  
  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        // Fetch post data from API
        const response = await postsService.getPostById(id);
        const postData = response.data;
        
        // Format the post data
        const formattedPost = {
          id: postData._id || postData.id,
          title: postData.title,
          content: postData.content,
          author: postData.author?.name || 'Unknown Author',
          status: postData.status,
          date: new Date(postData.createdAt).toLocaleDateString(),
          image: postData.featuredImage,
          tags: postData.tags || []
        };
        
        setPost(formattedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return {
          bg: 'var(--color-success)',
          text: 'white'
        };
      case 'draft':
        return {
          bg: 'var(--color-warning)',
          text: 'white'
        };
      case 'scheduled':
        return {
          bg: 'var(--color-secondary)',
          text: 'white'
        };
      default:
        return {
          bg: 'var(--color-base-300)',
          text: 'var(--color-base-content)'
        };
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen" style={{
        background: `linear-gradient(135deg, var(--color-base-100) 0%, var(--color-base-200) 100%)`
      }}>
        <div className="relative z-10 container mx-auto px-4 py-6">
          <div className="backdrop-blur-sm rounded-2xl shadow-lg p-6 flex justify-center items-center h-64 border" style={{
            backgroundColor: 'var(--color-base-200)',
            borderColor: 'var(--color-base-300)'
          }}>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 rounded-full animate-spin" style={{
                borderColor: 'var(--color-base-300)',
                borderTopColor: 'var(--color-primary)'
              }}></div>
              <p style={{color: 'var(--color-base-content)'}}>Loading post...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen" style={{
        background: `linear-gradient(135deg, var(--color-base-100) 0%, var(--color-base-200) 100%)`
      }}>
        <div className="relative z-10 container mx-auto px-4 py-6">
          <div className="backdrop-blur-sm rounded-2xl shadow-lg p-6 border" style={{
            backgroundColor: 'var(--color-base-200)',
            borderColor: 'var(--color-base-300)'
          }}>
            <div className="border rounded-lg p-4 mb-4" style={{
              backgroundColor: 'var(--color-error)',
              borderColor: 'var(--color-error)',
              color: 'white'
            }}>
              <span className="block sm:inline">{error}</span>
            </div>
            <div className="mt-4">
              <Link 
                to="/dashboard/posts" 
                className="flex items-center transition-colors duration-200 text-sm font-medium"
                style={{color: 'var(--color-primary)'}}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-secondary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--color-primary)'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Posts
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen" style={{
      background: `linear-gradient(135deg, var(--color-base-100) 0%, var(--color-base-200) 100%)`
    }}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20" style={{
          background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
        }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20" style={{
          background: `linear-gradient(135deg, var(--color-secondary) 0%, var(--color-accent) 100%)`,
          animationDelay: '2s'
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/dashboard/posts')}
              className="group p-3 rounded-2xl border backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'var(--color-base-200)',
                borderColor: 'var(--color-base-300)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--color-primary)';
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--color-base-200)';
                e.target.style.borderColor = 'var(--color-base-300)';
                e.target.style.color = 'var(--color-base-content)';
              }}
            >
              <svg className="w-5 h-5 transition-colors" style={{color: 'var(--color-base-content)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold" style={{color: 'var(--color-base-content)'}}>View Post</h1>
              <p className="text-sm" style={{color: 'var(--color-base-content)'}}>Read your content</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Link 
              to={`/dashboard/posts/edit/${id}`} 
              className="flex items-center transition-all duration-300 text-sm font-medium px-4 py-2 rounded-xl border shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{
                background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
                color: 'var(--color-primary-content)',
                borderColor: 'var(--color-primary)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </Link>
            <Link 
              to="/dashboard/posts" 
              className="flex items-center transition-colors duration-200 border rounded-xl px-4 py-2 text-sm font-medium"
              style={{
                color: 'var(--color-primary)',
                backgroundColor: 'var(--color-base-200)',
                borderColor: 'var(--color-base-300)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--color-primary)';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--color-base-200)';
                e.target.style.color = 'var(--color-primary)';
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </Link>
          </div>
        </div>
        
        {/* Professional Blog Post Layout */}
        <div className="max-w-4xl mx-auto py-12 px-4 md:px-8" style={{color: 'var(--color-base-content)'}}>
          {post && (
            <div>
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mb-4">
                  <span className="text-sm font-medium" style={{color: 'var(--color-primary)'}}>
                    #{post.tags[0]}
                  </span>
                </div>
              )}
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{color: 'var(--color-base-content)'}}>
                {post.title}
              </h1>
              
              {/* Meta Information */}
              <div className="text-sm mb-8 flex gap-3 items-center" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>
                <span>By <strong>{post.author}</strong></span>
                <span>• {post.date}</span>
                <span>• {Math.ceil((post.content?.replace(/<[^>]*>/g, '').split(' ').length || 0) / 200)} min read</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" style={{
                  backgroundColor: getStatusColor(post.status).bg,
                  color: getStatusColor(post.status).text
                }}>
                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </span>
              </div>
              
              {/* Featured Image */}
              {post.image && (
                <div className="mb-8">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              )}
              
              {/* Article Content */}
              <article 
                className="prose prose-lg max-w-none prose-headings:mt-8 prose-headings:mb-4 prose-headings:font-semibold prose-p:leading-7 prose-p:mb-4 prose-ul:my-4 prose-ol:my-4 prose-li:my-1 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6 prose-code:bg-gray-100 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-pre:bg-gray-800 prose-pre:text-white prose-pre:rounded-md prose-pre:p-4 prose-pre:overflow-x-auto prose-img:rounded-lg prose-img:shadow-md"
                style={{
                  color: 'var(--color-base-content)',
                  '--tw-prose-headings': 'var(--color-base-content)',
                  '--tw-prose-body': 'var(--color-base-content)',
                  '--tw-prose-links': 'var(--color-primary)',
                  '--tw-prose-bold': 'var(--color-base-content)',
                  '--tw-prose-quotes': 'var(--color-base-content)',
                  '--tw-prose-quote-borders': 'var(--color-primary)',
                  '--tw-prose-code': 'var(--color-base-content)',
                  '--tw-prose-pre-code': '#ffffff',
                  '--tw-prose-pre-bg': '#1f2937'
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Tags Footer */}
              {post.tags && post.tags.length > 1 && (
                <div className="mt-12 pt-6 border-t" style={{borderColor: 'var(--color-base-300)'}}>
                  <h3 className="text-sm font-medium mb-3" style={{color: 'var(--color-base-content)'}}>Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-sm px-3 py-1 rounded-full border transition-colors hover:opacity-80"
                        style={{
                          backgroundColor: 'var(--color-base-200)',
                          color: 'var(--color-base-content)',
                          borderColor: 'var(--color-base-300)'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Analytics Section */}
              <div className="mt-12">
                <PostAnalytics post={post} />
              </div>
              
              {/* Related Posts Section */}
              <div className="mt-12">
                <RelatedPosts postId={post.id} />
              </div>
              
              {/* Author Section */}
              <div className="mt-12 pt-6 border-t" style={{borderColor: 'var(--color-base-300)'}}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold" style={{
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
                  }}>
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{color: 'var(--color-base-content)'}}>{post.author}</h4>
                    <p className="text-sm" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>Content Author</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPost;