import api from './apiClient';

export const settingsService = {
  getAllSettings: async () => {
    try {
      const response = await api.get('/settings');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch settings');
    }
  },
  
  getSettingsByGroup: async (group) => {
    try {
      const response = await api.get(`/settings/group/${group}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch settings');
    }
  },
  
  updateSettings: async (settings, group = 'general') => {
    try {
      const response = await api.put(`/settings?group=${group}`, settings);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update settings');
    }
  },
};