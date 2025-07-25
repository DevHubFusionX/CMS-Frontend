// Role-based navigation configuration
export const getRoleNavigation = (userRole) => {
  const role = userRole?.toLowerCase() || 'visitor';
  
  const navigationConfig = {
    visitor: [
      { path: '/', label: 'Home', icon: 'home' },
      { path: '/blog', label: 'Blog', icon: 'blog' },
      { path: '/login', label: 'Login', icon: 'login' },
      { path: '/register', label: 'Register', icon: 'register' }
    ],
    
    subscriber: [
      { path: '/', label: 'Home', icon: 'home' },
      { path: '/blog', label: 'Blog', icon: 'blog' },
      { path: '/profile', label: 'My Profile', icon: 'profile' },
      { path: '/my-comments', label: 'My Comments', icon: 'comments' }
    ],
    
    contributor: [
      { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
      { path: '/dashboard/posts/drafts', label: 'My Drafts', icon: 'drafts' },
      { path: '/dashboard/posts/new', label: 'Add New', icon: 'add' },
      { path: '/profile', label: 'My Profile', icon: 'profile' }
    ],
    
    author: [
      { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
      { path: '/dashboard/posts', label: 'My Posts', icon: 'posts' },
      { path: '/dashboard/posts/new', label: 'Add New', icon: 'add' },
      { path: '/dashboard/posts/drafts', label: 'Drafts', icon: 'drafts' },
      { path: '/dashboard/posts/published', label: 'Published', icon: 'published' },
      { path: '/dashboard/media', label: 'Media', icon: 'media' },
      { path: '/profile', label: 'My Profile', icon: 'profile' }
    ],
    
    editor: [
      { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
      { path: '/dashboard/posts/all', label: 'All Posts', icon: 'posts' },
      { path: '/dashboard/posts/new', label: 'Add New', icon: 'add' },
      { path: '/dashboard/categories', label: 'Categories', icon: 'categories' },
      { path: '/dashboard/tags', label: 'Tags', icon: 'tags' },
      { path: '/dashboard/pages', label: 'All Pages', icon: 'pages' },
      { path: '/dashboard/pages/new', label: 'Add Page', icon: 'add' },
      { path: '/dashboard/media', label: 'Media Library', icon: 'media' },
      { path: '/dashboard/comments', label: 'Comments Moderation', icon: 'comments' },
      { path: '/dashboard/analytics', label: 'Analytics', icon: 'analytics' },
      { path: '/profile', label: 'My Profile', icon: 'profile' }
    ],
    
    admin: [
      { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
      { path: '/dashboard/posts/all', label: 'All Posts', icon: 'posts' },
      { path: '/dashboard/posts/new', label: 'Add New', icon: 'add' },
      { path: '/dashboard/posts/categories', label: 'Categories', icon: 'categories' },
      { path: '/dashboard/pages', label: 'Pages', icon: 'pages' },
      { path: '/dashboard/pages/new', label: 'Add Page', icon: 'add' },
      { path: '/dashboard/media', label: 'Media Library', icon: 'media' },
      { path: '/dashboard/comments', label: 'Comments', icon: 'comments' },
      { path: '/dashboard/users', label: 'Users', icon: 'users' },
      { path: '/dashboard/users/new', label: 'Add User', icon: 'add' },
      { path: '/dashboard/users/roles', label: 'Roles & Permissions', icon: 'roles' },
      { path: '/dashboard/analytics', label: 'Analytics', icon: 'analytics' },
      { path: '/dashboard/settings', label: 'Settings', icon: 'settings' },
      { path: '/profile', label: 'My Profile', icon: 'profile' }
    ],
    
    super_admin: [
      { path: '/super-dashboard', label: 'Super Dashboard', icon: 'dashboard' },
      { path: '/super-dashboard/sites', label: 'Sites', icon: 'sites' },
      { path: '/super-dashboard/sites/new', label: 'Add Site', icon: 'add' },
      { path: '/super-dashboard/users', label: 'Global Users', icon: 'users' },
      { path: '/super-dashboard/settings', label: 'Super Settings', icon: 'settings' },
      { path: '/super-dashboard/logs', label: 'System Logs', icon: 'logs' }
    ]
  };
  
  return navigationConfig[role] || navigationConfig.visitor;
};

// Check if user can access a specific route
export const canAccessRoute = (userRole, routePath) => {
  const navigation = getRoleNavigation(userRole);
  return navigation.some(item => routePath.startsWith(item.path));
};

// Get dashboard access level
export const getDashboardAccess = (userRole) => {
  const role = userRole?.toLowerCase() || 'visitor';
  
  const accessLevels = {
    visitor: null,
    subscriber: null,
    contributor: 'limited',
    author: 'own_content',
    editor: 'content_management',
    admin: 'full_access',
    super_admin: 'system_wide'
  };
  
  return accessLevels[role];
};