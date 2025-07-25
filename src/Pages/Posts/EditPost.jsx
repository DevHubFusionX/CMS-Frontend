import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ModernEnhancedForm from '../../Components/Posts/components/ModernEnhancedForm';
import { usePosts } from '../../Services/PostsContext';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      <div className="bg-gray-800 rounded-lg shadow-md p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-md p-6">
        <div className="bg-red-900/80 border border-red-700 text-red-100 px-4 py-3 rounded-lg" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
        <div className="mt-4">
          <Link 
            to="/dashboard/posts" 
            className="text-blue-400 hover:text-blue-300 flex items-center transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Edit Post</h1>
        <Link 
          to="/dashboard/posts" 
          className="text-blue-400 hover:text-blue-300 flex items-center transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Posts
        </Link>
      </div>
      
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
  );
};

export default EditPost;