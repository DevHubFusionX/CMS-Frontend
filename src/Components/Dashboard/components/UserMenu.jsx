import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../Services/AuthContext';

const UserMenu = ({ onLogout }) => {
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={userMenuRef}>
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center space-x-3 p-2 rounded-xl transition-all duration-300 hover:shadow-lg border backdrop-blur-sm"
        style={{
          backgroundColor: 'var(--color-base-200)',
          borderColor: 'var(--color-base-300)'
        }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-medium">
          {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium" style={{color: 'var(--color-base-content)'}}>
            {user?.name || user?.email?.split('@')[0] || 'User'}
          </p>
          <p className="text-xs capitalize" style={{color: 'var(--color-base-content)', opacity: '0.6'}}>
            {user?.role?.name || user?.role || 'Member'}
          </p>
        </div>
        <svg className="w-4 h-4 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'var(--color-base-content)'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showUserMenu && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl backdrop-blur-sm z-50 border" 
             style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
          <div className="p-4 border-b" style={{borderColor: 'var(--color-base-300)'}}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-medium" style={{color: 'var(--color-base-content)'}}>
                  {user?.name || user?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-sm capitalize" style={{color: 'var(--color-base-content)', opacity: '0.6'}}>
                  {user?.role?.name || user?.role || 'Member'}
                </p>
              </div>
            </div>
          </div>
          <div className="py-2">
            <Link
              to="/profile"
              className="flex items-center px-4 py-3 text-sm hover:bg-opacity-50 transition-colors"
              style={{color: 'var(--color-base-content)'}}
              onClick={() => setShowUserMenu(false)}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile Settings
            </Link>
            <Link
              to="/dashboard/settings"
              className="flex items-center px-4 py-3 text-sm hover:bg-opacity-50 transition-colors"
              style={{color: 'var(--color-base-content)'}}
              onClick={() => setShowUserMenu(false)}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Dashboard Settings
            </Link>
            <button
              onClick={() => {
                onLogout();
                setShowUserMenu(false);
              }}
              className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;