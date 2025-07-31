import React, { createContext, useContext, useState, useEffect } from 'react';
import { postsService } from './api';
import { useAuth } from './AuthContext';

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const userRole = user?.legacyRole || user?.role?.name || user?.role;
      const response = await postsService.getAllPostsIncludingDrafts(userRole);
      setPosts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add post
  const addPost = async (postData) => {
    try {
      setLoading(true);
      const response = await postsService.createPost(postData);
      setPosts([...posts, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to add post');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update post
  const updatePost = async (id, postData) => {
    try {
      setLoading(true);
      const response = await postsService.updatePost(id, postData);
      setPosts(posts.map(post => post._id === id ? response.data : post));
      return response.data;
    } catch (err) {
      setError('Failed to update post');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete post
  const deletePost = async (id) => {
    try {
      setLoading(true);
      await postsService.deletePost(id);
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      setError('Failed to delete post');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  // Get single post
  const getPost = async (id) => {
    try {
      const response = await postsService.getPostById(id);
      return response.data;
    } catch (err) {
      console.error('Failed to get post:', err);
      throw err;
    }
  };

  return (
    <PostsContext.Provider value={{
      posts,
      loading,
      error,
      fetchPosts,
      addPost,
      createPost: addPost, // Alias for consistency
      getPost,
      updatePost,
      deletePost
    }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);