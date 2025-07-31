import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ModernEnhancedForm from '../../Components/Posts/components/ModernEnhancedForm';
import { usePosts } from '../../Services/PostsContext';
import { useTheme } from '../../Context/ThemeContext';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  
  const { getPost } = usePosts();
  
  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setFetchLoading(true);
        
        // Fetch post data from API
        const postData = await getPost(id);
        
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post. Please try again.');
      } finally {
        setFetchLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);
  
  const { updatePost } = usePosts();
  
  const handleSave = async (postData) => {
    try {
      setLoading(true);
      await updatePost(id, postData);
      navigate('/dashboard/posts');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
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
              <h1 className="text-2xl font-bold" style={{color: 'var(--color-base-content)'}}>Edit Post</h1>
              <p className="text-sm" style={{color: 'var(--color-base-content)'}}>Update your content</p>
            </div>
          </div>
          
          <Link 
            to="/dashboard/posts" 
            className="flex items-center transition-colors duration-200 text-sm font-medium px-4 py-2 rounded-xl border"
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Posts
          </Link>
        </div>
        
        {/* Editor Container */}
        <div className="backdrop-blur-sm rounded-2xl border shadow-xl" style={{
          backgroundColor: 'var(--color-base-200)',
          borderColor: 'var(--color-base-300)',
          background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
        }}>
          {post && (
            <ModernEnhancedForm 
              initialData={post}
              onSubmit={handleSave}
              loading={loading}
              submitButtonText="Update Post"
              isEditing={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPost;