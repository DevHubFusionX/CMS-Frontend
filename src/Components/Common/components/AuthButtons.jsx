import React from 'react';
import { Link } from 'react-router-dom';

const AuthButtons = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link
        to="/login"
        className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
      >
        Register
      </Link>
    </div>
  );
};

export default AuthButtons;