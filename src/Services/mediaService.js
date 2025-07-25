import api from './apiClient';

export const mediaService = {
  uploadMedia: async (formData) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token exists:', !!token);
      console.log('Making API call to:', api.defaults.baseURL + '/media');
      
      const response = await api.post('/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Upload error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to upload media');
    }
  },
  
  getAllMedia: async () => {
    try {
      const response = await api.get('/media');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch media');
    }
  },
  
  deleteMedia: async (id) => {
    try {
      if (!id) {
        throw new Error('Invalid media ID');
      }
      
      const response = await api.delete(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete media error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to delete media');
    }
  },
};