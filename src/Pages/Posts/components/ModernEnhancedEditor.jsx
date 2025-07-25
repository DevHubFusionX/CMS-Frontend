import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedFormWrapper from '../../../Components/Posts/EnhancedFormWrapper';
import { usePosts } from '../../../Services/PostsContext';

const ModernEnhancedEditor = ({ isOpen, onClose, postId = null }) => {
  const navigate = useNavigate();
  const { getPost, createPost, updatePost } = usePosts();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const isEditing = !!postId;

  useEffect(() => {
    if (isOpen && isEditing) {
      setLoading(true);
      getPost(postId)
        .then((data) => {
          setPost(data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load post. Please try again.");
          setLoading(false);
          console.error("Error loading post:", err);
        });
    } else if (isOpen && !isEditing) {
      // Reset for new post
      setPost(null);
    }
  }, [isOpen, postId, getPost, isEditing]);

  const handleSaveDraft = async (formData) => {
    setSubmitLoading(true);
    setError(null);

    try {
      const dataWithStatus = {
        ...formData,
        status: 'draft'
      };

      if (isEditing) {
        await updatePost(postId, dataWithStatus);
      } else {
        await createPost(dataWithStatus);
      }
      onClose();
      navigate('/dashboard/posts');
    } catch (err) {
      setError("Failed to save draft. Please try again.");
      console.error("Error saving draft:", err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handlePublish = async (formData) => {
    setSubmitLoading(true);
    setError(null);

    try {
      const dataWithStatus = {
        ...formData,
        status: 'published'
      };

      if (isEditing) {
        await updatePost(postId, dataWithStatus);
      } else {
        await createPost(dataWithStatus);
      }
      onClose();
      navigate('/dashboard/posts');
    } catch (err) {
      setError("Failed to publish post. Please try again.");
      console.error("Error publishing post:", err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleClose = () => {
    setPost(null);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-7xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl transform transition-all duration-300 max-h-[95vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {isEditing ? "Edit Post" : "Advanced Editor"}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {isEditing
                    ? "Update your post with enhanced features"
                    : "Create a new post with SEO tools, scheduling, and more"}
                </p>
              </div>
              
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Loading editor...</p>
              </div>
            ) : (
              <div className="p-6">
                {error && (
                  <div className="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 rounded-r-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <EnhancedFormWrapper
                  initialData={post || {}}
                  onSaveDraft={handleSaveDraft}
                  onPublish={handlePublish}
                  loading={submitLoading}
                  isEditing={isEditing}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernEnhancedEditor;