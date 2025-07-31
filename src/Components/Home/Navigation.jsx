import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../Services';
import { getDashboardAccess } from '../../Utils/roleNavigation';
import ThemeToggle from '../UI/ThemeToggle';

const Navigation = ({ isScrolled, activeSection, scrollToSection }) => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'features', label: 'Features', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'how-it-works', label: 'Process', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { id: 'testimonials', label: 'Reviews', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
    { id: 'pricing', label: 'Pricing', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' }
  ];

  return (
    <>
      {/* Floating Navigation Trigger */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={() => setIsSidebarOpen(true)}
          className="w-14 h-14 rounded-2xl backdrop-blur-xl border shadow-2xl flex items-center justify-center group"
          style={{
            backgroundColor: 'var(--color-base-100)',
            borderColor: 'var(--color-base-300)',
            opacity: '0.9'
          }}
          whileHover={{ scale: 1.05, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.div
            className="w-6 h-6 flex flex-col justify-center items-center space-y-1"
            style={{ color: 'var(--color-primary)' }}
          >
            <motion.div
              className="w-5 h-0.5 rounded-full"
              style={{ backgroundColor: 'currentColor' }}
              animate={{ width: isSidebarOpen ? 0 : 20 }}
            />
            <motion.div
              className="w-4 h-0.5 rounded-full"
              style={{ backgroundColor: 'currentColor' }}
              animate={{ width: isSidebarOpen ? 0 : 16 }}
            />
            <motion.div
              className="w-3 h-0.5 rounded-full"
              style={{ backgroundColor: 'currentColor' }}
              animate={{ width: isSidebarOpen ? 0 : 12 }}
            />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Modern Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed left-0 top-0 h-full w-80 z-50 backdrop-blur-2xl border-r shadow-2xl"
            style={{
              backgroundColor: 'var(--color-base-100)',
              borderColor: 'var(--color-base-300)',
              opacity: '0.98'
            }}
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 0.98 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Sidebar Header */}
            <div className="p-8 border-b" style={{ borderColor: 'var(--color-base-300)' }}>
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'var(--color-primary-content)' }}
                  >
                    F
                  </div>
                  <div>
                    <div className="text-xl font-bold" style={{ color: 'var(--color-base-content)' }}>FusionX</div>
                    <div className="text-xs font-medium tracking-wider" style={{ color: 'var(--color-base-content)', opacity: '0.6' }}>CMS PLATFORM</div>
                  </div>
                </motion.div>
                
                <motion.button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'var(--color-base-200)', color: 'var(--color-base-content)', opacity: '0.7' }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 0.7, rotate: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <ThemeToggle />
              </motion.div>
            </div>

            {/* Navigation Items */}
            <div className="p-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 group"
                  style={{
                    backgroundColor: activeSection === item.id ? 'var(--color-primary)' : 'transparent',
                    color: activeSection === item.id ? 'var(--color-primary-content)' : 'var(--color-base-content)'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: activeSection === item.id ? 'var(--color-primary)' : 'var(--color-base-200)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="w-6 h-6 flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </motion.div>
                  <span className="font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <motion.div
                      className="ml-auto w-2 h-2 rounded-full"
                      style={{ backgroundColor: 'var(--color-primary-content)' }}
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <Link
                  to="/blog"
                  className="w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 group"
                  style={{ color: 'var(--color-base-content)' }}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <div className="w-6 h-6 flex-shrink-0">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <span className="font-medium">Blog</span>
                </Link>
              </motion.div>
            </div>

            {/* User Section */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t" style={{ borderColor: 'var(--color-base-300)' }}>
              {user ? (
                <div className="space-y-3">
                  {getDashboardAccess(user.role?.name || user.legacyRole) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <Link
                        to={user.role?.name === 'super_admin' ? '/super-dashboard' : '/dashboard'}
                        className="w-full flex items-center justify-center px-4 py-3 rounded-xl font-medium transition-all duration-300"
                        style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'var(--color-primary-content)' }}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        {user.role?.name === 'super_admin' ? 'Super Dashboard' : 'Dashboard'}
                      </Link>
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                  >
                    <Link
                      to="/profile"
                      className="w-full flex items-center justify-center px-4 py-3 rounded-xl font-medium transition-all duration-300"
                      style={{ backgroundColor: 'var(--color-base-200)', color: 'var(--color-base-content)' }}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      Profile
                    </Link>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <Link
                    to="/login"
                    className="w-full flex items-center justify-center px-4 py-3 rounded-xl font-medium transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'var(--color-primary-content)' }}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Sign In
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;