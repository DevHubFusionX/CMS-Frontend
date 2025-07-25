import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileMenu = ({ isMenuOpen, user, onLogout, onCloseMenu }) => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden bg-gray-800 shadow-lg">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Link 
          to="/" 
          className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
          onClick={onCloseMenu}
        >
          Home
        </Link>
        
        {user && (
          <>
            <Link 
              to="/dashboard" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/dashboard') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
              onClick={onCloseMenu}
            >
              Dashboard
            </Link>
            <Link 
              to="/dashboard/posts" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname.includes('/posts') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
              onClick={onCloseMenu}
            >
              Posts
            </Link>
            <Link 
              to="/dashboard/users" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname.includes('/users') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
              onClick={onCloseMenu}
            >
              Users
            </Link>
          </>
        )}
      </div>
      
      <div className="pt-4 pb-3 border-t border-gray-700">
        {user ? (
          <div>
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-inner">
                  {user.email.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">{user.email.split('@')[0]}</div>
                <div className="text-sm font-medium text-gray-400">{user.email}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link 
                to="/profile" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={onCloseMenu}
              >
                Profile
              </Link>
              <button
                onClick={onLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="px-4 flex flex-col space-y-2">
            <Link
              to="/login"
              className="block text-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={onCloseMenu}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block text-center w-full px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
              onClick={onCloseMenu}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;