import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite } from '../../Context/SiteContext';
import { useAuth } from '../../Services';

const SiteCreationWizard = ({ onClose, onSiteCreated }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [subdomainChecking, setSubdomainChecking] = useState(false);
  const [subdomainAvailable, setSubdomainAvailable] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { createSite } = useSite();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    subdomain: '',
    type: 'blog',
    title: '',
    tagline: ''
  });

  const siteTypes = [
    { value: 'blog', label: 'Blog', description: 'Share your thoughts and stories' },
    { value: 'portfolio', label: 'Portfolio', description: 'Showcase your work and skills' },
    { value: 'business', label: 'Business', description: 'Promote your business online' },
    { value: 'news', label: 'News', description: 'Share news and updates' },
    { value: 'personal', label: 'Personal', description: 'Your personal space on the web' }
  ];

  const checkSubdomain = async (subdomain) => {
    if (!subdomain || subdomain.length < 3) {
      setSubdomainAvailable(null);
      return;
    }

    setSubdomainChecking(true);
    try {
      const response = await fetch(`/api/sites/check-subdomain/${subdomain}`);
      const data = await response.json();
      setSubdomainAvailable(data.available);
    } catch (error) {
      console.error('Error checking subdomain:', error);
      setSubdomainAvailable(null);
    } finally {
      setSubdomainChecking(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'subdomain') {
      const cleanSubdomain = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
      setFormData(prev => ({ ...prev, subdomain: cleanSubdomain }));
      
      const timeoutId = setTimeout(() => {
        checkSubdomain(cleanSubdomain);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.subdomain || !formData.title) {
      setError('Please fill in all required fields');
      return;
    }

    if (!subdomainAvailable) {
      setError('Please choose an available subdomain');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const newSite = await createSite(formData);
      onSiteCreated?.(newSite);
      onClose();
      navigate(`/sites/${newSite._id}`);
    } catch (err) {
      setError(err.message || 'Failed to create site');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h3 
          className="text-xl font-semibold mb-6"
          style={{ color: 'var(--color-base-content)' }}
        >
          Choose Your Site Type
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {siteTypes.map((type, index) => (
            <motion.div
              key={type.value}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300`}
              style={{
                borderColor: formData.type === type.value ? 'var(--color-primary)' : 'var(--color-base-300)',
                backgroundColor: formData.type === type.value ? 'var(--color-primary)' : 'var(--color-base-100)',
                color: formData.type === type.value ? 'var(--color-primary-content)' : 'var(--color-base-content)'
              }}
              onClick={() => handleInputChange('type', type.value)}
              whileHover={{ 
                scale: 1.02,
                borderColor: 'var(--color-primary)'
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-semibold text-lg mb-2">{type.label}</h4>
              <p className="text-sm opacity-80">{type.description}</p>
              {formData.type === type.value && (
                <motion.div
                  className="mt-3 flex items-center text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Selected
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h3 
          className="text-xl font-semibold mb-6"
          style={{ color: 'var(--color-base-content)' }}
        >
          Site Details
        </h3>
        
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label 
              className="block text-sm font-semibold mb-3"
              style={{ color: 'var(--color-base-content)' }}
            >
              Site Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4"
              style={{
                backgroundColor: 'var(--color-base-200)',
                borderColor: 'var(--color-base-300)',
                color: 'var(--color-base-content)'
              }}
              placeholder="My Awesome Site"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label 
              className="block text-sm font-semibold mb-3"
              style={{ color: 'var(--color-base-content)' }}
            >
              Subdomain *
            </label>
            <div className="flex items-center rounded-xl overflow-hidden border-2 transition-all duration-200"
                 style={{ borderColor: 'var(--color-base-300)' }}>
              <input
                type="text"
                value={formData.subdomain}
                onChange={(e) => handleInputChange('subdomain', e.target.value)}
                className="flex-1 px-4 py-3 border-0 focus:outline-none focus:ring-0"
                style={{
                  backgroundColor: 'var(--color-base-200)',
                  color: 'var(--color-base-content)'
                }}
                placeholder="mysite"
              />
              <span 
                className="px-4 py-3 text-sm font-mono"
                style={{
                  backgroundColor: 'var(--color-base-300)',
                  color: 'var(--color-base-content)'
                }}
              >
                .devhubfusionx.com
              </span>
            </div>
            {subdomainChecking && (
              <motion.p 
                className="text-sm mt-2 flex items-center"
                style={{ color: 'var(--color-info)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="animate-spin rounded-full h-3 w-3 border-b border-current mr-2" />
                Checking availability...
              </motion.p>
            )}
            {subdomainAvailable === true && (
              <motion.p 
                className="text-sm mt-2 flex items-center"
                style={{ color: 'var(--color-success)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Subdomain available
              </motion.p>
            )}
            {subdomainAvailable === false && (
              <motion.p 
                className="text-sm mt-2 flex items-center"
                style={{ color: 'var(--color-error)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Subdomain not available
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label 
              className="block text-sm font-semibold mb-3"
              style={{ color: 'var(--color-base-content)' }}
            >
              Site Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4"
              style={{
                backgroundColor: 'var(--color-base-200)',
                borderColor: 'var(--color-base-300)',
                color: 'var(--color-base-content)'
              }}
              placeholder="Welcome to My Site"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label 
              className="block text-sm font-semibold mb-3"
              style={{ color: 'var(--color-base-content)' }}
            >
              Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => handleInputChange('tagline', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4"
              style={{
                backgroundColor: 'var(--color-base-200)',
                borderColor: 'var(--color-base-300)',
                color: 'var(--color-base-content)'
              }}
              placeholder="A brief description of your site"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop with blur */}
      <motion.div 
        className="absolute inset-0 backdrop-blur-xl"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div 
        className="relative rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border"
        style={{
          backgroundColor: 'var(--color-base-100)',
          borderColor: 'var(--color-base-300)'
        }}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="overflow-y-auto max-h-[90vh]">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <motion.h2 
              className="text-3xl font-bold"
              style={{ color: 'var(--color-base-content)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              Create New Site
            </motion.h2>
            <motion.button
              onClick={onClose}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200"
              style={{ 
                backgroundColor: 'var(--color-base-200)', 
                color: 'var(--color-base-content)' 
              }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'var(--color-base-300)' 
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Progress Steps */}
          <motion.div 
            className="flex items-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className={`flex items-center transition-colors duration-300`}
                 style={{ color: step >= 1 ? 'var(--color-primary)' : 'var(--color-base-content)' }}>
              <motion.div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300`}
                style={{
                  backgroundColor: step >= 1 ? 'var(--color-primary)' : 'var(--color-base-200)',
                  color: step >= 1 ? 'var(--color-primary-content)' : 'var(--color-base-content)'
                }}
                whileHover={{ scale: 1.05 }}
                animate={{ scale: step >= 1 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                1
              </motion.div>
              <span className="ml-3 font-medium">Site Type</span>
            </div>
            <div 
              className="flex-1 h-0.5 mx-6 rounded-full transition-colors duration-300"
              style={{ backgroundColor: step >= 2 ? 'var(--color-primary)' : 'var(--color-base-300)' }}
            />
            <div className={`flex items-center transition-colors duration-300`}
                 style={{ color: step >= 2 ? 'var(--color-primary)' : 'var(--color-base-content)' }}>
              <motion.div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300`}
                style={{
                  backgroundColor: step >= 2 ? 'var(--color-primary)' : 'var(--color-base-200)',
                  color: step >= 2 ? 'var(--color-primary-content)' : 'var(--color-base-content)'
                }}
                whileHover={{ scale: 1.05 }}
                animate={{ scale: step >= 2 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                2
              </motion.div>
              <span className="ml-3 font-medium">Details</span>
            </div>
          </motion.div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Step Content */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}

          {/* Navigation */}
          <motion.div 
            className="flex justify-between mt-8 pt-6 border-t"
            style={{ borderColor: 'var(--color-base-300)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={() => step > 1 ? setStep(step - 1) : onClose()}
              className="px-6 py-3 rounded-xl font-medium transition-colors duration-200"
              style={{ 
                color: 'var(--color-base-content)', 
                backgroundColor: 'var(--color-base-200)' 
              }}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: 'var(--color-base-300)' 
              }}
              whileTap={{ scale: 0.98 }}
            >
              {step > 1 ? '← Back' : 'Cancel'}
            </motion.button>
            
            {step < 2 ? (
              <motion.button
                onClick={() => setStep(step + 1)}
                className="px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                  color: 'var(--color-primary-content)'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Next →
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                disabled={loading || !subdomainAvailable}
                className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                style={{
                  background: loading ? 'var(--color-base-300)' : 'linear-gradient(135deg, var(--color-success) 0%, var(--color-accent) 100%)',
                  color: loading ? 'var(--color-base-content)' : 'var(--color-success-content)'
                }}
                whileHover={!loading && !subdomainAvailable ? {} : { scale: 1.02 }}
                whileTap={!loading && !subdomainAvailable ? {} : { scale: 0.98 }}
              >
                {loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                )}
                <span>{loading ? 'Creating...' : '🚀 Create Site'}</span>
              </motion.button>
            )}
          </motion.div>
        </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SiteCreationWizard;