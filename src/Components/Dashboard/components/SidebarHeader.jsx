import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../../UI/ThemeToggle';

const SidebarHeader = ({ collapsed, isMobile, onMobileClose, onToggleCollapse, showToggleButton = true }) => {
  return (
    <div className="flex items-center justify-between h-16 px-4 border-b backdrop-blur-sm" style={{
      borderColor: 'var(--color-base-300)',
      background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      {(!collapsed || isMobile) && (
        <Link to="/" className="flex items-center group" onClick={isMobile ? onMobileClose : undefined}>
          <div className="mr-3 w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-110 border border-white/20">
            F
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white drop-shadow-lg">
              Fusionyyyy
            </span>
            <span className="text-xs -mt-1 text-white/80 font-medium">
              CMS Dashboard
            </span>
          </div>
        </Link>
      )}

      {collapsed && !isMobile && (
        <Link to="/" className="flex items-center justify-center w-full group">
          <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-110 border border-white/20">
            F
          </div>
        </Link>
      )}

      {!isMobile && showToggleButton && (
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleCollapse}
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
      )}

      {isMobile && (
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={onMobileClose}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close sidebar"
            title="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarHeader;