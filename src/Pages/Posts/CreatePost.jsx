import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModernEnhancedForm from '../../Components/Posts/components/ModernEnhancedForm';
import { usePosts } from '../../Services/PostsContext';
import { useTheme } from '../../Context/ThemeContext';

/**
 * Create Post page component
 */
const CreatePost = () => {
  const navigate = useNavigate();
  const { addPost } = usePosts();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleSubmit = async (postData) => {
    try {
      setLoading(true);
      const dataWithSlug = {
        ...postData,
        slug: postData.slug || generateSlug(postData.title || 'untitled')
      };
      await addPost(dataWithSlug);
      navigate('/dashboard/posts');
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setLoading(false);
    }
  };

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

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button 
              onClick={() => navigate('/dashboard/posts')}
              className="group p-2 sm:p-3 rounded-xl sm:rounded-2xl border backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-colors" style={{color: 'var(--color-base-content)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold" style={{color: 'var(--color-base-content)'}}>Create New Post</h1>
              <p className="text-xs sm:text-sm" style={{color: 'var(--color-base-content)'}}>Write and publish your content</p>
            </div>
          </div>
        </div>

        {/* Editor Container */}
        <div className="backdrop-blur-sm rounded-xl sm:rounded-2xl border shadow-xl p-3 sm:p-4 lg:p-6" style={{
          backgroundColor: 'var(--color-base-200)',
          borderColor: 'var(--color-base-300)',
          background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
        }}>
          <ModernEnhancedForm 
            onSubmit={handleSubmit}
            loading={loading}
            submitButtonText="Create Post"
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;