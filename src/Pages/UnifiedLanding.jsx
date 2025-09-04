import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../Services';
import HubFusionXLoader from '../Components/Common/HubFusionXLoader';
import ThemeToggle from '../Components/UI/ThemeToggle';
import EnhancedSiteCreationWizard from '../Components/Sites/EnhancedSiteCreationWizard';

const UnifiedLanding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const [userSites, setUserSites] = useState([]);
  const [loadingSites, setLoadingSites] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (user) {
        fetchUserSites();
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [user]);

  const fetchUserSites = async () => {
    if (!user) return;
    
    setLoadingSites(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/sites', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setUserSites([...data.data.owned, ...data.data.member.map(m => m.site)]);
      }
    } catch (error) {
      console.error('Error fetching sites:', error);
    } finally {
      setLoadingSites(false);
    }
  };

  const handleGetStarted = () => {
    if (user) {
      if (userSites.length > 0) {
        navigate('/sites');
      } else {
        setShowCreateWizard(true);
      }
    } else {
      navigate('/register');
    }
  };

  const handleSiteCreated = (newSite) => {
    setUserSites(prev => [newSite, ...prev]);
    setShowCreateWizard(false);
    navigate(`/sites/${newSite._id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: 'var(--color-base-100)'}}>
        <HubFusionXLoader size="lg" message="Welcome to HubFusionX..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: 'var(--color-base-100)'}}>
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-40 backdrop-blur-xl border-b"
        style={{backgroundColor: 'rgba(var(--color-base-100-rgb), 0.8)', borderColor: 'var(--color-base-300)'}}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg"
                style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'var(--color-primary-content)' }}
              >
                H
              </div>
              <div>
                <div className="text-lg font-bold" style={{ color: 'var(--color-base-content)' }}>HubFusionX</div>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {user ? (
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={() => navigate('/sites')}
                    className="px-4 py-2 rounded-lg font-medium transition-colors"
                    style={{ color: 'var(--color-base-content)', backgroundColor: 'var(--color-base-200)' }}
                  >
                    My Sites
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2 rounded-lg font-medium transition-colors"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'var(--color-primary-content)' }}
                  >
                    Dashboard
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 rounded-lg font-medium transition-colors"
                    style={{ color: 'var(--color-base-content)' }}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="px-4 py-2 rounded-lg font-medium transition-colors"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', color: 'var(--color-primary-content)' }}
                  >
                    Get Started
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-300) 100%)'}}></div>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full filter blur-3xl animate-pulse" style={{backgroundColor: 'var(--color-primary)', opacity: '0.1'}}></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full filter blur-3xl animate-pulse" style={{backgroundColor: 'var(--color-secondary)', opacity: '0.1', animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight" 
              style={{color: 'var(--color-base-content)'}}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {user ? (
                <>
                  <span className="block">Welcome Back,</span>
                  <span className="block text-transparent bg-clip-text" 
                        style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text'}}>
                    {user.name || user.email?.split('@')[0]}
                  </span>
                </>
              ) : (
                <>
                  <span className="block">Create Your</span>
                  <span className="block text-transparent bg-clip-text" 
                        style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text'}}>
                    AI-Powered Website
                  </span>
                </>
              )}
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed" 
              style={{color: 'var(--color-base-content)', opacity: '0.8'}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {user ? (
                userSites.length > 0 ? 
                  `Manage your ${userSites.length} site${userSites.length > 1 ? 's' : ''} or create a new one to expand your digital presence.` :
                  "Ready to create your first site? Let's build something amazing together with our AI-powered platform."
              ) : (
                "Build professional websites, blogs, and portfolios with our intelligent platform. No coding required - just your creativity and our AI assistance."
              )}
            </motion.p>

            {/* User Sites Preview */}
            {user && userSites.length > 0 && (
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold mb-4" style={{color: 'var(--color-base-content)'}}>Your Sites</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {userSites.slice(0, 3).map((site) => (
                    <motion.div
                      key={site._id}
                      className="p-4 rounded-xl border cursor-pointer transition-all"
                      style={{backgroundColor: 'var(--color-base-100)', borderColor: 'var(--color-base-300)'}}
                      whileHover={{ scale: 1.02, borderColor: 'var(--color-primary)' }}
                      onClick={() => navigate(`/sites/${site._id}`)}
                    >
                      <h4 className="font-medium" style={{color: 'var(--color-base-content)'}}>{site.name}</h4>
                      <p className="text-sm opacity-60" style={{color: 'var(--color-base-content)'}}>{site.subdomain}.devhubfusionx.com</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs capitalize" style={{color: 'var(--color-base-content)', opacity: '0.7'}}>{site.type}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          site.subscription?.plan === 'free' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {site.subscription?.plan || 'free'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {userSites.length > 3 && (
                  <button
                    onClick={() => navigate('/sites')}
                    className="mt-4 text-sm font-medium"
                    style={{color: 'var(--color-primary)'}}
                  >
                    View all {userSites.length} sites →
                  </button>
                )}
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                onClick={handleGetStarted}
                disabled={loadingSites}
                className="px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 flex items-center disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                  color: 'var(--color-primary-content)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loadingSites ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Loading...
                  </>
                ) : user ? (
                  userSites.length > 0 ? 'Manage Sites' : 'Create Your First Site'
                ) : (
                  'Start Building Free'
                )}
                <motion.svg 
                  className="ml-2 h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  whileHover={{ x: 4 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </motion.button>
              
              <motion.button
                onClick={() => navigate('/blog')}
                className="px-8 py-4 border-2 rounded-xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm flex items-center"
                style={{borderColor: 'var(--color-primary)', color: 'var(--color-primary)', backgroundColor: 'rgba(59, 130, 246, 0.1)'}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Explore Blog
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {[
                { number: '10K+', label: 'Active Sites' },
                { number: '99.9%', label: 'Uptime' },
                { number: '500K+', label: 'Posts Created' },
                { number: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                >
                  <div 
                    className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text mb-2" 
                    style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)', WebkitBackgroundClip: 'text'}}
                  >
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium" style={{color: 'var(--color-base-content)', opacity: '0.6'}}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Site Creation Wizard */}
      <AnimatePresence>
        {showCreateWizard && (
          <EnhancedSiteCreationWizard
            onClose={() => setShowCreateWizard(false)}
            onSiteCreated={handleSiteCreated}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnifiedLanding;