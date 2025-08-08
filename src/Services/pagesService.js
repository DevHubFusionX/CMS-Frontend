import api from './apiClient';

export const pagesService = {
  // Get all published pages
  getAllPages: () => api.get('/pages'),
  
  // Get all pages (admin)
  getAllPagesAdmin: () => api.get('/pages/all'),
  
  // Get page by slug
  getPageBySlug: (slug) => api.get(`/pages/slug/${slug}`),
  
  // Create new page
  createPage: (pageData) => api.post('/pages', pageData),
  
  // Update page
  updatePage: (id, pageData) => api.put(`/pages/${id}`, pageData),
  
  // Delete page
  deletePage: (id) => api.delete(`/pages/${id}`)
};