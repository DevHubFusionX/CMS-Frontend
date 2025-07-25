// Re-export all services from their individual files for backward compatibility
export { authService } from './authService';
export { postsService } from './postsService';
export { categoriesService } from './categoriesService';
export { tagsService } from './tagsService';
export { mediaService } from './mediaService';
export { commentsService } from './commentsService';
export { usersService } from './usersService';
export { settingsService } from './settingsService';

// Export the API client as default
export { default } from './apiClient';