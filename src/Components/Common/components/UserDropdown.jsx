import React from 'react';
import { Link } from 'react-router-dom';

const UserDropdown = ({ user, onLogout }) => {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none bg-gray-800/50 rounded-full pl-2 pr-3 py-1 transition-all duration-200 hover:bg-gray-800">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-inner">
          {user.email.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm">{user.email.split('@')[0]}</span>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute right-0 w-48 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-y-0 translate-y-1">
        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
          Dashboard
        </Link>
        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
          Profile
        </Link>
        <button
          onClick={onLogout}
          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;