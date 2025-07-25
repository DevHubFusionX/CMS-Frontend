import api from './apiClient';

export const usersService = {
  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data.data || [];
    } catch (error) {
      if (error.response?.status === 403) {
        console.warn('Access to users list is restricted to admin users');
        return [];
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },
  
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data.data || {};
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  },
  
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data.data || {};
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user');
    }
  },
  
  createUser: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data.data || {};
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create user');
    }
  },
  
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
  },
};