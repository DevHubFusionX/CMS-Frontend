import api from './apiClient';

export const analyticsService = {
  getAnalytics: async (dateRange = '30') => {
    try {
      const response = await api.get(`/analytics?dateRange=${dateRange}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch analytics');
    }
  }
};