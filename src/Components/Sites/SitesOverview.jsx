import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite } from '../../Context/SiteContext';
import { useAuth } from '../../Services';
import EnhancedSiteCreationWizard from './EnhancedSiteCreationWizard';
import HubFusionXLoader from '../Common/HubFusionXLoader';

const SitesOverview = () => {
  const { sites, loading, fetchSites } = useSite();
  const { user } = useAuth();
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  const ownedSites = sites.filter(site => site.owner === user?._id || !site.role);
  const memberSites = sites.filter(site => site.role && site.owner !== user?._id);

  const SiteCard = ({ site, isOwned = true, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-2xl"
      style={{
        backgroundColor: 'var(--color-base-100)',
        borderColor: 'var(--color-base-300)',
      }}
      whileHover={{ 
        scale: 1.02,
        borderColor: 'var(--color-primary)'
      }}
    >
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
        }}
      />
      
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 
              className="text-lg font-semibold mb-1 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
              style={{
                color: 'var(--color-base-content)',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                WebkitBackgroundClip: 'text'
              }}
            >
              {site.name}
            </h3>
            <p 
              className="text-sm mb-2"
              style={{ color: 'var(--color-base-content)', opacity: '0.7' }}
            >
              {site.settings?.title || site.title}
            </p>
            <div className="flex items-center space-x-2">
              <p 
                className="text-xs font-mono"
                style={{ color: 'var(--color-base-content)', opacity: '0.6' }}
              >
                {site.subdomain}.devhubfusionx.com
              </p>
              <motion.div
                className={`w-2 h-2 rounded-full ${
                  site.isActive ? 'bg-green-500' : 'bg-red-500'
                }`}
                animate={{ scale: site.isActive ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <span 
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                site.subscription?.plan === 'free' 
                  ? 'bg-gray-100 text-gray-800'
                  : site.subscription?.plan === 'pro'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-purple-100 text-purple-800'
              }`}
            >
              {site.subscription?.plan || 'free'}
            </span>
            {!isOwned && (
              <span 
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-accent-content)'
                }}
              >
                {site.role}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Posts', value: site.stats?.totalPosts || 0, icon: '📝' },
            { label: 'Views', value: site.stats?.totalViews || 0, icon: '👁️' },
            { label: 'Users', value: site.stats?.totalSubscribers || 0, icon: '👥' }
          ].map((stat, idx) => (
            <motion.div 
              key={stat.label}
              className="text-center p-3 rounded-lg transition-colors duration-300"
              style={{ backgroundColor: 'var(--color-base-200)' }}
              whileHover={{ backgroundColor: 'var(--color-base-300)' }}
            >
              <div className="text-lg mb-1">{stat.icon}</div>
              <div 
                className="font-bold text-lg"
                style={{ color: 'var(--color-base-content)' }}
              >
                {stat.value.toLocaleString()}
              </div>
              <div 
                className="text-xs"
                style={{ color: 'var(--color-base-content)', opacity: '0.6' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div 
            className="text-xs"
            style={{ color: 'var(--color-base-content)', opacity: '0.5' }}
          >
            Created {new Date(site.createdAt).toLocaleDateString()}
          </div>
          <div className="flex space-x-3">
            <motion.a
              href={`https://${site.subdomain}.devhubfusionx.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: 'var(--color-primary)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Visit →
            </motion.a>
            <motion.button
              onClick={() => navigate(`/sites/${site._id}`)}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: 'var(--color-secondary)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Manage
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-base-100)' }}
      >
        <HubFusionXLoader size="lg" message="Loading your sites..." />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-base-100)' }}
    >
      {/* Header */}
      <motion.div 
        className="sticky top-0 z-30 backdrop-blur-xl border-b"
        style={{
          backgroundColor: 'rgba(var(--color-base-100-rgb), 0.8)',
          borderColor: 'var(--color-base-300)'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 
                className="text-3xl font-bold mb-2"
                style={{ color: 'var(--color-base-content)' }}
              >
                My Sites
              </h1>
              <p 
                className="text-lg"
                style={{ color: 'var(--color-base-content)', opacity: '0.7' }}
              >
                Manage your digital presence across multiple websites
              </p>
            </motion.div>
            
            <motion.button
              onClick={() => setShowCreateWizard(true)}
              className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                color: 'var(--color-primary-content)'
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Create New Site</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Owned Sites */}
        {ownedSites.length > 0 && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 
              className="text-2xl font-bold mb-6 flex items-center"
              style={{ color: 'var(--color-base-content)' }}
            >
              <span className="mr-3">🏠</span>
              Your Sites ({ownedSites.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ownedSites.map((site, index) => (
                <SiteCard key={site._id} site={site} isOwned={true} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Member Sites */}
        {memberSites.length > 0 && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 
              className="text-2xl font-bold mb-6 flex items-center"
              style={{ color: 'var(--color-base-content)' }}
            >
              <span className="mr-3">🤝</span>
              Collaborative Sites ({memberSites.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memberSites.map((site, index) => (
                <SiteCard key={site._id} site={site} isOwned={false} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {ownedSites.length === 0 && memberSites.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl"
              style={{ backgroundColor: 'var(--color-base-200)' }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🚀
            </motion.div>
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--color-base-content)' }}
            >
              Ready to Launch Your Digital Journey?
            </h3>
            <p 
              className="text-lg mb-8 max-w-md mx-auto"
              style={{ color: 'var(--color-base-content)', opacity: '0.7' }}
            >
              Create your first website and start sharing your story with the world.
            </p>
            <motion.button
              onClick={() => setShowCreateWizard(true)}
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                color: 'var(--color-primary-content)'
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              Create Your First Site
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Create Site Wizard with Backdrop Blur */}
      <AnimatePresence>
        {showCreateWizard && (
          <EnhancedSiteCreationWizard
            onClose={() => setShowCreateWizard(false)}
            onSiteCreated={() => {
              setShowCreateWizard(false);
              fetchSites();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SitesOverview;