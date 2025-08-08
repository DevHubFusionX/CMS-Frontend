import { apiClient } from './apiClient';

export const pagesService = {
  // Get all published pages
  getAllPages: () => apiClient.get('/pages'),
  
  // Get all pages (admin)
  getAllPagesAdmin: () => apiClient.get('/pages/all'),
  
  // Get page by slug
  getPageBySlug: (slug) => apiClient.get(`/pages/slug/${slug}`),
  
  // Create new page
  createPage: (pageData) => apiClient.post('/pages', pageData),
  
  // Update page
  updatePage: (id, pageData) => apiClient.put(`/pages/${id}`, pageData),
  
  // Delete page
  deletePage: (id) => apiClient.delete(`/pages/${id}`)
};