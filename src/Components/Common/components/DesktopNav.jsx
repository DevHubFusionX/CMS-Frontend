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
        Platform
      </Link>
      
      {user && (
        <>
          <Link 
            to="/sites" 
            className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${location.pathname.includes('/sites') ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`}
          >
            My Sites
          </Link>
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
        </>
      )}
      
      <Link 
        to="/blog" 
        className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${location.pathname.includes('/blog') ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`}
      >
        Blog
      </Link>
    </div>
  );
};

export default DesktopNav;