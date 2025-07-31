import React from 'react';
import { useAuth } from '../../../Services/AuthContext';
import { useTheme } from '../../../Context/ThemeContext';

const SidebarFooter = ({ collapsed, isMobile, onLogout }) => {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <div className="p-4 border-t" style={{ borderColor: 'var(--color-base-300)', backgroundColor: 'var(--color-base-300)' }}>
      {(!collapsed || isMobile) && (
        <div className="mb-3 px-3 py-2 rounded-lg border" style={{ backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)' }}>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-base-content truncate">
                {user?.name || user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs capitalize" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                {typeof user?.role === 'string' ? user.role : (user?.role?.name || user?.role?.displayName || 'Member')}
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={onLogout}
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
        {(!collapsed || isMobile) && <span className="ml-3">Sign out</span>}
      </button>
    </div>
  );
};

export default SidebarFooter;