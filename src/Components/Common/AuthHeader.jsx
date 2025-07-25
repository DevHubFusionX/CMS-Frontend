import React from 'react';
import { Link } from 'react-router-dom';

const AuthHeader = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-50 p-4">
      <Link 
        to="/" 
        className="flex items-center space-x-2 text-white bg-gray-800/50 hover:bg-gray-800/70 px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default AuthHeader;