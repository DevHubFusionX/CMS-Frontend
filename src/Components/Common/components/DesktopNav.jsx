import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DesktopNav = ({ user }) => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <div className="hidden md:flex md:items-center md:space-x-6">
      <Link 
        to="/" 
        className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive('/') ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`}
      >
        Home
      </Link>
      
      {user && (
        <>
          <Link 
            to="/dashboard" 
            className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive('/dashboard') ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/dashboard/posts" 
            className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${location.pathname.includes('/posts') ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`}
          >
            Posts
          </Link>
          <Link 
            to="/dashboard/users" 
            className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${location.pathname.includes('/users') ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`}
          >
            Users
          </Link>
        </>
      )}
    </div>
  );
};

export default DesktopNav;