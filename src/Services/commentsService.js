import api from './apiClient';

export const commentsService = {
  getAllComments: async () => {
    try {
      const response = await api.get('/comments');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch comments');
    }
  },
  
  getPostComments: async (postId) => {
    try {
      const response = await api.get(`/comments/post/${postId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch post comments');
    }
  },
  
  createComment: async (commentData) => {
    try {
      const response = await api.post('/comments', commentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create comment');
    }
  },
  
  updateComment: async (id, commentData) => {
    try {
      const response = await api.put(`/comments/${id}`, commentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update comment');
    }
  },
  
  deleteComment: async (id) => {
    try {
      const response = await api.delete(`/comments/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete comment');
    }
  },
};