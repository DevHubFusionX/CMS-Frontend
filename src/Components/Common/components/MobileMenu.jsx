import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileMenu = ({ isMenuOpen, user, onLogout, onCloseMenu }) => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  // Get user role for navigation customization
  const userRole = user?.legacyRole || user?.role?.name || user?.role;
  
  const sidebarItems = {
    super_admin: [
      { label: "Dashboard", path: "/dashboard", icon: "🏠" },
      { label: "All Posts", path: "/dashboard/posts", icon: "📝" },
      { label: "Pages", path: "/dashboard/pages", icon: "📄" },
      { label: "Media", path: "/dashboard/media", icon: "🖼️" },
      { label: "Comments", path: "/dashboard/comments", icon: "💬" },
      { label: "Users", path: "/dashboard/users", icon: "👥" },
      { label: "Analytics", path: "/dashboard/analytics", icon: "📊" },
      { label: "Settings", path: "/dashboard/settings", icon: "⚙️" },
    ],
    editor: [
      { label: "Dashboard", path: "/dashboard", icon: "🏠" },
      { label: "All Posts", path: "/dashboard/posts", icon: "📝" },
      { label: "Pages", path: "/dashboard/pages", icon: "📄" },
      { label: "Media", path: "/dashboard/media", icon: "🖼️" },
      { label: "Comments", path: "/dashboard/comments", icon: "💬" },
      { label: "Analytics", path: "/dashboard/analytics", icon: "📊" },
    ],
    author: [
      { label: "Dashboard", path: "/dashboard", icon: "🏠" },
      { label: "My Posts", path: "/dashboard/posts/my", icon: "📝" },
      { label: "Add Post", path: "/dashboard/posts", icon: "➕" },
      { label: "Media", path: "/dashboard/media", icon: "🖼️" },
    ],
    contributor: [
      { label: "Dashboard", path: "/dashboard", icon: "🏠" },
      { label: "My Drafts", path: "/dashboard/posts/my", icon: "📝" },
      { label: "Add Draft", path: "/dashboard/posts", icon: "➕" },
    ],
    subscriber: [
      { label: "Dashboard", path: "/dashboard", icon: "🏠" },
      { label: "Blog", path: "/blog", icon: "📖" },
    ],
  };

  const getNavigationItems = () => {
    const role = userRole?.toLowerCase() || 'subscriber';
    return sidebarItems[role] || sidebarItems.subscriber;
  };
  
  const navigationItems = getNavigationItems();

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden bg-gray-900/95 backdrop-blur-sm shadow-2xl border-t border-gray-700">
      {/* Mobile Search */}
      <div className="px-4 pt-4 pb-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2.5 pl-10 pr-4 text-gray-100 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
          />
        </div>
      </div>
      
      <div className="px-4 pb-3 space-y-2 max-h-80 overflow-y-auto">
        <Link 
          to="/" 
          className={`flex items-center px-3 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
            isActive('/') 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
          onClick={onCloseMenu}
        >
          <span className="mr-3">🏠</span>
          Home
        </Link>
        
        {user && (
          <>
            <div className="pt-2 pb-1">
              <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Dashboard
              </h3>
            </div>
            {navigationItems.map((item) => (
              <Link 
                key={item.label}
                to={item.path} 
                className={`flex items-center px-3 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  isActive(item.path) 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
                onClick={onCloseMenu}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            
            <div className="pt-2 pb-1">
              <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                External
              </h3>
            </div>
            <Link 
              to="/blog" 
              className="flex items-center px-3 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200"
              onClick={onCloseMenu}
            >
              <span className="mr-3">📖</span>
              View Blog
              <svg className="w-3 h-3 ml-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </>
        )}
      </div>
      
      <div className="pt-4 pb-4 border-t border-gray-700 bg-gray-800/50">
        {user ? (
          <div>
            <div className="flex items-center px-4 mb-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                  {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="text-base font-semibold text-white truncate">
                  {user?.name || user?.email?.split('@')[0] || 'User'}
                </div>
                <div className="text-sm text-gray-400 truncate">{user?.email}</div>
                <div className="text-xs text-green-400 font-medium capitalize">
                  {typeof user?.role === 'string' ? user.role : (user?.role?.name || user?.role?.displayName || 'Member')}
                </div>
              </div>
            </div>
            <div className="px-2 space-y-2">
              <Link 
                to="/profile" 
                className="flex items-center px-3 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200"
                onClick={onCloseMenu}
              >
                <span className="mr-3">👤</span>
                Profile
              </Link>
              <button
                onClick={onLogout}
                className="flex items-center w-full px-3 py-3 rounded-xl text-base font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-200"
              >
                <span className="mr-3">🚪</span>
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="px-4 flex flex-col space-y-3">
            <Link
              to="/login"
              className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-600 transition-all duration-200"
              onClick={onCloseMenu}
            >
              <span className="mr-2">🔑</span>
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all duration-200"
              onClick={onCloseMenu}
            >
              <span className="mr-2">✨</span>
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;