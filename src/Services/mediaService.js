import api from './apiClient';

export const mediaService = {
  uploadMedia: async (formData) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token exists:', !!token);
      console.log('Making API call to:', api.defaults.baseURL + '/media');
      
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }
      
      const response = await api.post('/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Upload successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Upload error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      }
      
      throw new Error(error.response?.data?.message || error.message || 'Failed to upload media');
    }
  },
  
  getAllMedia: async () => {
    try {
      const response = await api.get('/media');
      return response.data;
    } catch (error) {
      console.error('Get media error:', error.response?.data || error.message);
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