import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostEditor from '../../Components/Posts/PostEditor';
import { usePosts } from '../../Services/PostsContext';

/**
 * Create Post page component
 */
const CreatePost = () => {
  const navigate = useNavigate();
  const { addPost } = usePosts();
  
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleSavePost = async (postData) => {
    try {
      const dataWithSlug = {
        ...postData,
        slug: postData.slug || generateSlug(postData.title || 'untitled')
      };
      await addPost(dataWithSlug);
      navigate('/dashboard/posts');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handlePublishPost = async (postData) => {
    try {
      const dataWithSlug = {
        ...postData,
        status: 'published',
        slug: postData.slug || generateSlug(postData.title || 'untitled')
      };
      await addPost(dataWithSlug);
      navigate('/dashboard/posts');
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  };

  const handlePreviewPost = (postData) => {
    // Store post data in sessionStorage for preview
    sessionStorage.setItem('previewPost', JSON.stringify(postData));
    window.open('/preview/post', '_blank');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <PostEditor 
        onSave={handleSavePost}
        onPublish={handlePublishPost}
        onPreview={handlePreviewPost}
      />
    </div>
  );
};

export default CreatePost;