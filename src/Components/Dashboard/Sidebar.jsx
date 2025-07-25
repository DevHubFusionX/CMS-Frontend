import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Services/AuthContext';
import { useTheme } from '../../Context/ThemeContext';
import { authService } from '../../Services/api';

/**
 * Enhanced Sidebar Component
 * 
 * A modern, responsive sidebar with theme support, organized navigation,
 * and smooth animations. Features include:
 * - Collapsible design for space efficiency
 * - Theme-aware styling (light/dark mode)
 * - Grouped navigation items for better organization
 * - Active state indicators with smooth transitions
 * - Accessibility features and keyboard navigation
 * - Responsive behavior for mobile devices
 */
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout: contextLogout } = useAuth();
  const { theme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Get user role for navigation customization
  const userRole = user?.legacyRole || user?.role?.name || user?.role;
  
  // Debug: Log user role for troubleshooting
  console.log('Sidebar - User role:', userRole);
  console.log('Sidebar - User object:', user);
  
  const sidebarItems = {
    
    super_admin: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "All Posts", path: "/dashboard/posts" },
      { label: "Add Post", path: "/dashboard/posts" },
      { label: "Pages", path: "/dashboard/pages" },
      { label: "Media", path: "/dashboard/media" },
      { label: "Comments", path: "/dashboard/comments" },
      { label: "Users", path: "/dashboard/users" },
      { label: "Analytics", path: "/dashboard/analytics" },
      { label: "Settings", path: "/dashboard/settings" },
      { label: "Profile", path: "/profile" },
    ],
    editor: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "All Posts", path: "/dashboard/posts" },
      { label: "Add Post", path: "/dashboard/posts" },
      { label: "Pages", path: "/dashboard/pages" },
      { label: "Media", path: "/dashboard/media" },
      { label: "Comments", path: "/dashboard/comments" },
      { label: "Analytics", path: "/dashboard/analytics" },
      { label: "Profile", path: "/profile" },
    ],
    author: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "My Posts", path: "/dashboard/posts/my" },
      { label: "Add Post", path: "/dashboard/posts" },
      { label: "Media", path: "/dashboard/media" },
      { label: "Profile", path: "/profile" },
    ],
    contributor: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "My Drafts", path: "/dashboard/posts/my" },
      { label: "Add Draft", path: "/dashboard/posts" },
      { label: "Profile", path: "/profile" },
    ],
    subscriber: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Blog", path: "/blog" },
      { label: "Profile", path: "/profile" },
    ],
  };

  const getIcon = (label) => {
    const icons = {
      'Dashboard': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
      'All Posts': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
      'My Posts': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
      'My Drafts': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
      'Add Post': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
      'Add Draft': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
      'Pages': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
      'Media': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      'Comments': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
      'Users': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      'Analytics': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      'Settings': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      'Profile': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
      'Blog': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    };
    return icons[label] || <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
  };

  const getNavigationItems = () => {
    const role = userRole?.toLowerCase() || 'subscriber';
    return sidebarItems[role] || sidebarItems.subscriber;
  };
  
  const navigationItems = getNavigationItems();

  // External links section
  const externalLinks = [
    {
      name: 'View Blog',
      path: '/blog',
      description: 'Visit your public blog',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      external: true
    }
  ];

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    authService.logout();
    contextLogout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const shouldShowItem = (item) => {
    // Safety check: ensure item exists and has required properties
    return item && item.path && item.name;
  };

  return (
    <aside className={`
      bg-white dark:bg-gray-900 
      border-r border-gray-200 dark:border-gray-700 
      transition-all duration-300 ease-in-out
      h-screen flex flex-col
      ${collapsed ? 'w-16' : 'w-64'}
      shadow-lg dark:shadow-gray-900/20
    `}>
      {/* Header Section */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        {!collapsed && (
          <Link to="/" className="flex items-center group">
            <div className="mr-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
              F
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                FusionX
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                CMS Dashboard
              </span>
            </div>
          </Link>
        )}
        
        {collapsed && (
          <Link to="/" className="flex items-center justify-center w-full group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
              F
            </div>
          </Link>
        )}
        
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Navigation Section */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        <div className="px-3">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`
                    group flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive(item.path)
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-sm border-l-4 border-blue-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  title={collapsed ? item.label : item.label}
                >
                  <span className={`
                    flex-shrink-0 transition-transform duration-200
                    ${isActive(item.path) ? 'text-blue-600 dark:text-blue-400' : ''}
                    ${hoveredItem === item.label ? 'scale-110' : ''}
                  `}>
                    {getIcon(item.label)}
                  </span>
                  
                  {!collapsed && (
                    <span className="ml-3 flex-1">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* External Links Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            {!collapsed && (
              <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                External
              </h3>
            )}
            
            <ul className="space-y-1">
              {externalLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                    title={collapsed ? item.name : item.description}
                  >
                    <span className="flex-shrink-0">
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <>
                        <span className="ml-3 flex-1">{item.name}</span>
                        {item.external && (
                          <svg className="w-3 h-3 ml-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        )}
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      
      {/* Footer Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        {!collapsed && (
          <div className="mb-3 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-medium">
                {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
              </div><div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.name || user?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {typeof user?.role === 'string' ? user.role : (user?.role?.name || user?.role?.displayName || 'Member')}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <button
          onClick={handleLogout}
          className={`
            flex items-center w-full px-3 py-2.5 rounded-xl text-sm font-medium 
            text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500
            ${collapsed ? 'justify-center' : ''}
          `}
          title="Sign out"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!collapsed && <span className="ml-3">Sign out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;