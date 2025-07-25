import React from 'react';
import { Link } from 'react-router-dom';

const NavBrand = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/" className="flex items-center group">
        <div className="mr-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
          F
        </div>
        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">FusionX</span>
      </Link>
    </div>
  );
};

export default NavBrand;