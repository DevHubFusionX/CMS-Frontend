import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite } from '../../Context/SiteContext';
import { useAuth } from '../../Services';

const EnhancedSiteCreationWizard = ({ onClose, onSiteCreated }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { createSite } = useSite();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    type: '',
    template: '',
    name: '',
    subdomain: '',
    title: '',
    tagline: '',
    logo: null,
    colorScheme: 'default'
  });

  // Site types with templates and features
  const siteTypes = {
    blog: {
      label: 'Blog',
      icon: '📝',
      description: 'Share your thoughts and stories',
      features: ['Post feed', 'Categories', 'Comments', 'RSS feed'],
      templates: [
        { id: 'blog-minimal', name: 'Minimal', preview: '/templates/blog-minimal.jpg', description: 'Clean and focused on content' },
        { id: 'blog-magazine', name: 'Magazine', preview: '/templates/blog-magazine.jpg', description: 'Rich layout with featured posts' },
        { id: 'blog-personal', name: 'Personal', preview: '/templates/blog-personal.jpg', description: 'Warm and personal touch' }
      ]
    },
    portfolio: {
      label: 'Portfolio',
      icon: '🎨',
      description: 'Showcase your work and skills',
      features: ['Project gallery', 'About page', 'Contact form', 'Skills section'],
      templates: [
        { id: 'portfolio-grid', name: 'Grid', preview: '/templates/portfolio-grid.jpg', description: 'Masonry grid layout' },
        { id: 'portfolio-slider', name: 'Slider', preview: '/templates/portfolio-slider.jpg', description: 'Full-screen project slider' },
        { id: 'portfolio-minimal', name: 'Minimal', preview: '/templates/portfolio-minimal.jpg', description: 'Clean and professional' }
      ]
    },
    business: {
      label: 'Business',
      icon: '🏢',
      description: 'Promote your business online',
      features: ['Landing page', 'Services', 'Team page', 'Contact form'],
      templates: [
        { id: 'business-corporate', name: 'Corporate', preview: '/templates/business-corporate.jpg', description: 'Professional and trustworthy' },
        { id: 'business-modern', name: 'Modern', preview: '/templates/business-modern.jpg', description: 'Contemporary design' },
        { id: 'business-startup', name: 'Startup', preview: '/templates/business-startup.jpg', description: 'Dynamic and innovative' }
      ]
    },
    news: {
      label: 'News',
      icon: '📰',
      description: 'Share news and updates',
      features: ['Multi-author', 'Categories', 'Trending', 'Newsletter'],
      templates: [
        { id: 'news-classic', name: 'Classic', preview: '/templates/news-classic.jpg', description: 'Traditional newspaper layout' },
        { id: 'news-modern', name: 'Modern', preview: '/templates/news-modern.jpg', description: 'Contemporary news design' },
        { id: 'news-magazine', name: 'Magazine', preview: '/templates/news-magazine.jpg', description: 'Rich media layout' }
      ]
    },
    personal: {
      label: 'Personal',
      icon: '👤',
      description: 'Your personal space on the web',
      features: ['About page', 'Blog', 'Photo gallery', 'Contact'],
      templates: [
        { id: 'personal-diary', name: 'Diary', preview: '/templates/personal-diary.jpg', description: 'Intimate and personal' },
        { id: 'personal-creative', name: 'Creative', preview: '/templates/personal-creative.jpg', description: 'Artistic and expressive' },
        { id: 'personal-simple', name: 'Simple', preview: '/templates/personal-simple.jpg', description: 'Clean and straightforward' }
      ]
    }
  };

  const colorSchemes = [
    { id: 'default', name: 'Default', colors: ['#3B82F6', '#8B5CF6', '#06B6D4'] },
    { id: 'warm', name: 'Warm', colors: ['#F59E0B', '#EF4444', '#F97316'] },
    { id: 'cool', name: 'Cool', colors: ['#10B981', '#06B6D4', '#8B5CF6'] },
    { id: 'monochrome', name: 'Monochrome', colors: ['#374151', '#6B7280', '#9CA3AF'] },
    { id: 'vibrant', name: 'Vibrant', colors: ['#EC4899', '#8B5CF6', '#06B6D4'] }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.subdomain || !formData.title || !formData.type || !formData.template) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const siteData = {
        ...formData,
        settings: {
          title: formData.title,
          tagline: formData.tagline,
          template: formData.template,
          colorScheme: formData.colorScheme,
          features: siteTypes[formData.type].features
        }
      };

      const newSite = await createSite(siteData);
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
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--color-base-content)' }}
        >
          What type of site do you want to create?
        </h3>
        <p 
          className="text-lg mb-8"
          style={{ color: 'var(--color-base-content)', opacity: '0.7' }}
        >
          Choose the type that best fits your goals. Each comes with tailored features and layouts.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(siteTypes).map(([key, type], index) => (
            <motion.div
              key={key}
              className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 group`}
              style={{
                borderColor: formData.type === key ? 'var(--color-primary)' : 'var(--color-base-300)',
                backgroundColor: formData.type === key ? 'var(--color-primary)' : 'var(--color-base-100)',
                color: formData.type === key ? 'var(--color-primary-content)' : 'var(--color-base-content)'
              }}
              onClick={() => handleInputChange('type', key)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">{type.icon}</div>
              <h4 className="font-bold text-xl mb-2">{type.label}</h4>
              <p className="text-sm opacity-80 mb-4">{type.description}</p>
              
              <div className="space-y-2">
                <p className="text-xs font-semibold opacity-60">INCLUDES:</p>
                <div className="flex flex-wrap gap-2">
                  {type.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: formData.type === key ? 'rgba(255,255,255,0.2)' : 'var(--color-base-200)',
                        color: formData.type === key ? 'inherit' : 'var(--color-base-content)'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {formData.type === key && (
                <motion.div
                  className="mt-4 flex items-center text-sm font-semibold"
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
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--color-base-content)' }}
        >
          Choose your template
        </h3>
        <p 
          className="text-lg mb-8"
          style={{ color: 'var(--color-base-content)', opacity: '0.7' }}
        >
          Pick a design that matches your style. You can customize it later.
        </p>

        {formData.type && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteTypes[formData.type].templates.map((template, index) => (
              <motion.div
                key={template.id}
                className={`border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300`}
                style={{
                  borderColor: formData.template === template.id ? 'var(--color-primary)' : 'var(--color-base-300)'
                }}
                onClick={() => handleInputChange('template', template.id)}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                  style={{
                    background: formData.template === template.id 
                      ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
                      : 'linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-300) 100%)'
                  }}
                >
                  <div 
                    className="text-6xl"
                    style={{ 
                      color: formData.template === template.id ? 'var(--color-primary-content)' : 'var(--color-base-content)',
                      opacity: '0.5'
                    }}
                  >
                    {siteTypes[formData.type].icon}
                  </div>
                </div>
                <div className="p-4">
                  <h4 
                    className="font-bold text-lg mb-2"
                    style={{ color: 'var(--color-base-content)' }}
                  >
                    {template.name}
                  </h4>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--color-base-content)', opacity: '0.7' }}
                  >
                    {template.description}
                  </p>
                  {formData.template === template.id && (
                    <motion.div
                      className="mt-3 flex items-center text-sm font-semibold"
                      style={{ color: 'var(--color-primary)' }}
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
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h3 
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--color-base-content)' }}
        >
          Site Information
        </h3>
        <p 
          className="text-lg mb-8"
          style={{ color: 'var(--color-base-content)', opacity: '0.7' }}
        >
          Give your site a name and customize its appearance.
        </p>
        
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
              placeholder="Franklin Writes"
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
              Site URL *
            </label>
            <div className="flex items-center rounded-xl overflow-hidden border-2 transition-all duration-200"
                 style={{ borderColor: 'var(--color-base-300)' }}>
              <input
                type="text"
                value={formData.subdomain}
                onChange={(e) => handleInputChange('subdomain', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                className="flex-1 px-4 py-3 border-0 focus:outline-none focus:ring-0"
                style={{
                  backgroundColor: 'var(--color-base-200)',
                  color: 'var(--color-base-content)'
                }}
                placeholder="franklin"
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
              placeholder="Welcome to Franklin's Writing World"
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
              placeholder="Stories that inspire and connect"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label 
              className="block text-sm font-semibold mb-3"
              style={{ color: 'var(--color-base-content)' }}
            >
              Color Scheme
            </label>
            <div className="grid grid-cols-5 gap-3">
              {colorSchemes.map((scheme) => (
                <motion.div
                  key={scheme.id}
                  className={`p-3 rounded-xl cursor-pointer border-2 transition-all duration-200`}
                  style={{
                    borderColor: formData.colorScheme === scheme.id ? 'var(--color-primary)' : 'var(--color-base-300)',
                    backgroundColor: 'var(--color-base-200)'
                  }}
                  onClick={() => handleInputChange('colorScheme', scheme.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex space-x-1 mb-2">
                    {scheme.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <p 
                    className="text-xs font-medium text-center"
                    style={{ color: 'var(--color-base-content)' }}
                  >
                    {scheme.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  const steps = [
    { number: 1, title: 'Site Type', component: renderStep1 },
    { number: 2, title: 'Template', component: renderStep2 },
    { number: 3, title: 'Information', component: renderStep3 }
  ];

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
        className="relative rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border"
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
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 
                  className="text-3xl font-bold"
                  style={{ color: 'var(--color-base-content)' }}
                >
                  Create New Site
                </h2>
                <p 
                  className="text-lg mt-1"
                  style={{ color: 'var(--color-base-content)', opacity: '0.6' }}
                >
                  Step {step} of {steps.length}
                </p>
              </motion.div>
              
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
              className="flex items-center mb-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {steps.map((stepItem, index) => (
                <React.Fragment key={stepItem.number}>
                  <div className="flex items-center">
                    <motion.div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300`}
                      style={{
                        backgroundColor: step >= stepItem.number ? 'var(--color-primary)' : 'var(--color-base-200)',
                        color: step >= stepItem.number ? 'var(--color-primary-content)' : 'var(--color-base-content)'
                      }}
                      whileHover={{ scale: 1.05 }}
                      animate={{ scale: step >= stepItem.number ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stepItem.number}
                    </motion.div>
                    <div className="ml-4">
                      <p 
                        className="font-semibold"
                        style={{ color: step >= stepItem.number ? 'var(--color-primary)' : 'var(--color-base-content)' }}
                      >
                        {stepItem.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div 
                      className="flex-1 h-1 mx-6 rounded-full transition-colors duration-300"
                      style={{ backgroundColor: step > stepItem.number ? 'var(--color-primary)' : 'var(--color-base-300)' }}
                    />
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            {/* Error Display */}
            {error && (
              <motion.div 
                className="mb-6 p-4 rounded-xl border"
                style={{
                  backgroundColor: 'var(--color-error)',
                  borderColor: 'var(--color-error)',
                  color: 'var(--color-error-content)'
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <p className="font-medium">{error}</p>
              </motion.div>
            )}

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {steps[step - 1].component()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <motion.div 
              className="flex justify-between mt-12 pt-6 border-t"
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
              
              {step < steps.length ? (
                <motion.button
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && !formData.type || step === 2 && !formData.template}
                  className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  disabled={loading || !formData.name || !formData.subdomain || !formData.title}
                  className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  style={{
                    background: loading ? 'var(--color-base-300)' : 'linear-gradient(135deg, var(--color-success) 0%, var(--color-accent) 100%)',
                    color: loading ? 'var(--color-base-content)' : 'var(--color-success-content)'
                  }}
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                >
                  {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                  )}
                  <span>{loading ? 'Creating Site...' : '🚀 Create Site'}</span>
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedSiteCreationWizard;