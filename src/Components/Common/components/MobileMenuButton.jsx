import React from 'react';

const MobileMenuButton = ({ isMenuOpen, onToggle }) => {
  return (
    <div className="flex md:hidden items-center">
      <button
        onClick={onToggle}
        className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
        aria-expanded={isMenuOpen}
      >
        <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
        <svg
          className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default MobileMenuButton;