import api from './apiClient';

export const postsService = {
  getAllPosts: async () => {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch posts');
    }
  },
  
  getAllPostsIncludingDrafts: async (userRole = null) => {
    try {
      // Use appropriate endpoint based on user role
      const endpoint = (['admin', 'editor', 'super_admin'].includes(userRole)) ? '/posts/all' : '/posts/my';
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch posts');
    }
  },
  
  getUserPosts: async () => {
    try {
      const response = await api.get('/posts/my');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user posts');
    }
  },
  
  getPostById: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch post');
    }
  },
  
  getPostBySlug: async (slug) => {
    try {
      const response = await api.get(`/posts/slug/${slug}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch post');
    }
  },
  
  searchPosts: async (query, options = {}) => {
    try {
      const params = new URLSearchParams({
        search: query,
        ...options
      });
      const response = await api.get(`/posts?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search posts');
    }
  },
  
  createPost: async (postData) => {
    try {
      const response = await api.post('/posts', postData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create post');
    }
  },
  
  updatePost: async (id, postData) => {
    try {
      const response = await api.put(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update post');
    }
  },
  
  deletePost: async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete post');
    }
  },
  
  duplicatePost: async (id) => {
    try {
      const response = await api.post(`/posts/${id}/duplicate`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to duplicate post');
    }
  },
  
  getRelatedPosts: async (id) => {
    try {
      const response = await api.get(`/posts/${id}/related`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch related posts');
    }
  },
};