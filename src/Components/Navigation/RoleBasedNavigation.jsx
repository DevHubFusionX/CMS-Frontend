import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../Services/AuthContext';
import { getRoleNavigation } from '../../Utils/roleNavigation';

const RoleBasedNavigation = ({ className = '' }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  const userRole = user?.role?.name || user?.legacyRole || 'visitor';
  const navigationItems = getRoleNavigation(userRole);
  
  return (
    <nav className={`role-based-navigation ${className}`}>
      <ul className="flex space-x-4">
        {navigationItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
        {user && (
          <li>
            <button
              onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.location.href = '/';
              }}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default RoleBasedNavigation;