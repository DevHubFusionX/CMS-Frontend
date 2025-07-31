import React from 'react';
import { Link } from 'react-router-dom';

const LoginPrompt = ({ feature, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-2xl p-8 max-w-md mx-4 shadow-2xl" style={{backgroundColor: 'var(--color-base-100)', border: '1px solid var(--color-base-300)'}}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: 'var(--color-primary)', opacity: '0.1'}}>
            <svg className="w-8 h-8" style={{color: 'var(--color-primary)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-bold mb-2" style={{color: 'var(--color-base-content)'}}>
            Sign in required
          </h3>
          
          <p className="mb-6" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>
            To {feature}, please sign in to your account or create a new one.
          </p>
          
          <div className="flex gap-3">
            <Link
              to="/login"
              className="flex-1 px-4 py-3 rounded-lg font-medium text-center transition-all duration-300"
              style={{backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-content)'}}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="flex-1 px-4 py-3 rounded-lg font-medium text-center transition-all duration-300 border"
              style={{borderColor: 'var(--color-primary)', color: 'var(--color-primary)', backgroundColor: 'transparent'}}
            >
              Sign Up
            </Link>
          </div>
          
          <button
            onClick={onClose}
            className="mt-4 text-sm transition-colors duration-300"
            style={{color: 'var(--color-base-content)', opacity: '0.6'}}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.6'}
          >
            Continue reading without account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;