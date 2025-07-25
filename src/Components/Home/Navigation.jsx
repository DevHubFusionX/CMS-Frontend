import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Services';
import { getDashboardAccess } from '../../Utils/roleNavigation';

const Navigation = ({ isScrolled, activeSection, scrollToSection }) => {
  const { user } = useAuth();

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Brand Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-blue-500/40 transition-all duration-300 transform group-hover:scale-105">
                  <span className="relative z-10">F</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div className="ml-3">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                  FusionX
                </span>
                <div className="text-xs text-gray-400 font-medium tracking-wider">CMS PLATFORM</div>
              </div>
            </Link>
          </div>
          
          {/* Enhanced Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'features', label: 'Features' },
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'pricing', label: 'Pricing' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                )}
              </button>
            ))}
            <Link to="/blog" className="text-gray-300 hover:text-blue-400 px-4 py-2 text-sm font-semibold transition-colors duration-300">
              Blog
            </Link>
          </div>
          
          {/* Enhanced Auth Links */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <>
                {getDashboardAccess(user.role?.name || user.legacyRole) && (
                  <Link
                    to={user.role?.name === 'super_admin' ? '/super-dashboard' : '/dashboard'}
                    className="modern-button bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 px-6 py-3 text-sm font-semibold"
                  >
                    <span className="flex items-center">
                      {user.role?.name === 'super_admin' ? 'Super Dashboard' : 'Dashboard'}
                      <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white px-4 py-2 text-sm font-semibold transition-colors duration-300 hover:bg-gray-800/50 rounded-lg"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="modern-button bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 px-6 py-3 text-sm font-semibold"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;