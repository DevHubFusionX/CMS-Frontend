import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || 'https://cms-2prb.onrender.com'}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
  withCredentials: false
});

// Create separate axios instance for CSRF token requests to avoid circular reference
const csrfApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || 'https://cms-2prb.onrender.com'}/api`,
  timeout: 10000
});

// Add a request interceptor to include auth token and CSRF token
api.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add CSRF token for state-changing operations
    if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase())) {
      try {
        let csrfToken = sessionStorage.getItem('csrfToken');
        if (!csrfToken) {
          const response = await csrfApi.get('/csrf-token');
          csrfToken = response.data.csrfToken;
          sessionStorage.setItem('csrfToken', csrfToken);
        }
        config.headers['X-CSRF-Token'] = csrfToken;
      } catch (error) {
        console.warn('Failed to get CSRF token:', error);
      }
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling and CSRF token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle CSRF token expiration
    if (error.response?.status === 403 && 
        error.response?.data?.message?.includes('CSRF') &&
        !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Get new CSRF token using separate axios instance
        const response = await csrfApi.get('/csrf-token');
        const newCsrfToken = response.data.csrfToken;
        sessionStorage.setItem('csrfToken', newCsrfToken);
        
        // Retry original request with new token
        originalRequest.headers['X-CSRF-Token'] = newCsrfToken;
        return api(originalRequest);
      } catch (refreshError) {
        sessionStorage.removeItem('csrfToken');
        return Promise.reject(error);
      }
    }
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('Request timeout - server may be starting up');
      error.message = 'Connection timeout. The server may be starting up, please try again in a moment.';
    } else if (error.response?.status === 504) {
      error.message = 'Database connection timeout. Please try again.';
    } else if (!error.response) {
      error.message = 'Network error. Please check your connection and try again.';
    }
    return Promise.reject(error);
  }
);

export default api;