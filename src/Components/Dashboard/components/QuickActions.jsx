import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      {/* Desktop New Post Button */}
      <div className="hidden xl:flex items-center space-x-2">
        <Link
          to="/dashboard/posts/create"
          className="inline-flex items-center px-4 py-2.5 text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 border"
          style={{
            background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
            color: 'var(--color-primary-content)',
            borderColor: 'var(--color-primary)'
          }}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden lg:inline">New Post</span>
        </Link>
      </div>
      
      {/* Mobile New Post Button */}
      <Link
        to="/dashboard/posts/create"
        className="xl:hidden p-2.5 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 border"
        style={{
          background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
          color: 'var(--color-primary-content)',
          borderColor: 'var(--color-primary)'
        }}
        title="New Post"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </Link>
    </div>
  );
};

export default QuickActions;