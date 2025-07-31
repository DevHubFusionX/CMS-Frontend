import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Services';
import ThemeToggle from '../UI/ThemeToggle';

const BlogHeader = () => {
  const { user } = useAuth();

  return (
    <header className="backdrop-blur-md border-b sticky top-0 z-50" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)', opacity: '0.95'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'var(--color-primary-content)'}}>
              F
            </div>
            <span className="text-xl font-bold" style={{color: 'var(--color-base-content)'}}>FusionX Blog</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <ThemeToggle />
            <Link to="/" className="transition-colors" style={{color: 'var(--color-base-content)', opacity: '0.8'}} onMouseEnter={(e) => {e.target.style.color = 'var(--color-primary)'; e.target.style.opacity = '1';}} onMouseLeave={(e) => {e.target.style.color = 'var(--color-base-content)'; e.target.style.opacity = '0.8';}}>Home</Link>
            {user ? (
              <Link to="/dashboard" className="px-4 py-2 rounded-lg transition-colors" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'var(--color-primary-content)'}}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="transition-colors" style={{color: 'var(--color-base-content)', opacity: '0.8'}} onMouseEnter={(e) => {e.target.style.color = 'var(--color-primary)'; e.target.style.opacity = '1';}} onMouseLeave={(e) => {e.target.style.color = 'var(--color-base-content)'; e.target.style.opacity = '0.8';}}>Sign In</Link>
                <Link to="/register" className="px-4 py-2 rounded-lg transition-colors" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'var(--color-primary-content)'}}>
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;