import api from './apiClient';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.token) {
        sessionStorage.setItem('token', response.data.token);
      }
      
      if (response.data.user) {
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      const errorData = error.response?.data;
      const customError = new Error(errorData?.message || 'Login failed');
      customError.response = error.response;
      throw customError;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },
  
  forgotPassword: async (formData) => {
    try {
      const response = await api.post('/auth/forgot-password', { email: formData.email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to process password reset request');
    }
  },
  
  resetPassword: async (resetData) => {
    try {
      const response = await api.post('/auth/reset-password', resetData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  },
  
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data.data;
    } catch (error) {
      console.warn('Error fetching current user:', error.response?.status, error.response?.data?.message);
      return null;
    }
  },
  
  logout: () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  },
  
  verifyOTP: async (email, otp) => {
    try {
      const response = await api.post('/auth/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'OTP verification failed');
    }
  },
  
  resendVerification: async (email) => {
    try {
      const response = await api.post('/auth/resend-verification', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to resend verification email');
    }
  },
};