import api from './apiClient';

export const tagsService = {
  getAllTags: async () => {
    try {
      const response = await api.get('/tags');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tags');
    }
  },
  
  createTag: async (tagData) => {
    try {
      const response = await api.post('/tags', tagData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create tag');
    }
  },
  
  updateTag: async (id, tagData) => {
    try {
      const response = await api.put(`/tags/${id}`, tagData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update tag');
    }
  },
  
  deleteTag: async (id) => {
    try {
      const response = await api.delete(`/tags/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete tag');
    }
  },
};