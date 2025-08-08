import React, { useState, useEffect } from 'react';

const ModernCategoryForm = ({ isOpen, onClose, initialValues = {}, onSubmit, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#10B981',
    ...initialValues
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        slug: '',
        description: '',
        color: '#10B981',
        ...initialValues
      });
      setErrors({});
    }
  }, [isOpen, initialValues]);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updates = { [name]: value };
    
    // Auto-generate slug from name
    if (name === 'name' && value && !isEditing) {
      updates.slug = generateSlug(value);
    }
    
    setFormData(prev => ({ ...prev, ...updates }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-sm transition-opacity duration-300"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      />
      
      {/* Modal Container - Responsive positioning and sizing */}
      <div className="relative flex min-h-full items-start sm:items-center justify-center p-2 sm:p-4 lg:p-6">
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl transform transition-all duration-300 my-2 sm:my-4 lg:my-8" style={{
          backgroundColor: 'var(--color-base-100)'
        }}>
          {/* Header - Responsive padding and text sizes */}
          <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b rounded-t-lg sm:rounded-t-xl lg:rounded-t-2xl transition-colors duration-300" style={{
            backgroundColor: 'var(--color-base-200)',
            borderColor: 'var(--color-base-300)'
          }}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-300" style={{
                background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {isEditing ? 'Edit Category' : 'Create New Category'}
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-lg transition-all duration-200"
                style={{ color: 'var(--color-base-content)', opacity: '0.7' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--color-base-300)';
                  e.target.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.opacity = '0.7';
                }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form - Responsive padding and spacing */}
          <form onSubmit={handleSubmit} className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 transition-colors duration-300" style={{
                color: 'var(--color-base-content)'
              }}>
                Category Name <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 transition-all duration-200 text-sm sm:text-base`}
                style={{
                  backgroundColor: 'var(--color-base-200)',
                  borderColor: errors.name ? 'var(--color-error)' : 'var(--color-base-300)',
                  color: 'var(--color-base-content)',
                  '--tw-ring-color': 'var(--color-primary)'
                }}
                placeholder="Enter category name"
                onFocus={(e) => {
                  if (!errors.name) e.target.style.borderColor = 'var(--color-primary)';
                }}
                onBlur={(e) => {
                  if (!errors.name) e.target.style.borderColor = 'var(--color-base-300)';
                }}
              />
              {errors.name && (
                <p className="mt-1 text-xs sm:text-sm" style={{ color: 'var(--color-error)' }}>{errors.name}</p>
              )}
            </div>

            {/* Slug Field - Responsive layout */}
            <div>
              <label htmlFor="slug" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 transition-colors duration-300" style={{
                color: 'var(--color-base-content)'
              }}>
                URL Slug <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <div className="flex rounded-lg sm:rounded-xl shadow-sm">
                <span className="inline-flex items-center px-2 sm:px-3 rounded-l-lg sm:rounded-l-xl border border-r-0 text-xs sm:text-sm transition-colors duration-300" style={{
                  backgroundColor: 'var(--color-base-300)',
                  borderColor: 'var(--color-base-300)',
                  color: 'var(--color-base-content)',
                  opacity: '0.7'
                }}>
                  <span className="hidden sm:inline">/categories/</span>
                  <span className="sm:hidden">/cat/</span>
                </span>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border rounded-r-lg sm:rounded-r-xl focus:ring-2 transition-all duration-200 text-sm sm:text-base`}
                  style={{
                    backgroundColor: 'var(--color-base-200)',
                    borderColor: errors.slug ? 'var(--color-error)' : 'var(--color-base-300)',
                    color: 'var(--color-base-content)',
                    '--tw-ring-color': 'var(--color-primary)'
                  }}
                  placeholder="category-slug"
                  onFocus={(e) => {
                    if (!errors.slug) e.target.style.borderColor = 'var(--color-primary)';
                  }}
                  onBlur={(e) => {
                    if (!errors.slug) e.target.style.borderColor = 'var(--color-base-300)';
                  }}
                />
              </div>
              {errors.slug && (
                <p className="mt-1 text-xs sm:text-sm" style={{ color: 'var(--color-error)' }}>{errors.slug}</p>
              )}
              <p className="mt-1 text-xs sm:text-sm transition-colors duration-300" style={{
                color: 'var(--color-base-content)',
                opacity: '0.7'
              }}>
                <span className="hidden sm:inline">URL-friendly name for your category (auto-generated from name)</span>
                <span className="sm:hidden">Auto-generated from name</span>
              </p>
            </div>

            {/* Description Field - Responsive rows */}
            <div>
              <label htmlFor="description" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 transition-colors duration-300" style={{
                color: 'var(--color-base-content)'
              }}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 transition-all duration-200 text-sm sm:text-base sm:rows-3"
                style={{
                  backgroundColor: 'var(--color-base-200)',
                  borderColor: 'var(--color-base-300)',
                  color: 'var(--color-base-content)',
                  '--tw-ring-color': 'var(--color-primary)'
                }}
                placeholder="Brief description (optional)"
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-primary)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--color-base-300)';
                }}
              />
            </div>

            {/* Color Field - Responsive layout */}
            <div>
              <label htmlFor="color" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 transition-colors duration-300" style={{
                color: 'var(--color-base-content)'
              }}>
                Category Color
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-16 h-10 sm:w-12 sm:h-12 rounded-lg border-2 cursor-pointer transition-colors duration-300"
                  style={{ borderColor: 'var(--color-base-300)' }}
                />
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                  className="flex-1 w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 transition-all duration-200 text-sm sm:text-base"
                  style={{
                    backgroundColor: 'var(--color-base-200)',
                    borderColor: 'var(--color-base-300)',
                    color: 'var(--color-base-content)',
                    '--tw-ring-color': 'var(--color-primary)'
                  }}
                  placeholder="#10B981"
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-primary)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-base-300)';
                  }}
                />
              </div>
              <p className="mt-1 text-xs sm:text-sm transition-colors duration-300" style={{
                color: 'var(--color-base-content)',
                opacity: '0.7'
              }}>
                <span className="hidden sm:inline">Choose a color to represent this category</span>
                <span className="sm:hidden">Category color</span>
              </p>
            </div>

            {/* Submit Buttons - Responsive layout and sizing */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t transition-colors duration-300" style={{
              borderColor: 'var(--color-base-300)'
            }}>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 text-sm sm:text-base order-2 sm:order-1"
                style={{
                  color: 'var(--color-base-content)',
                  backgroundColor: 'var(--color-base-200)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--color-base-300)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'var(--color-base-200)';
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base order-1 sm:order-2 ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-content)'
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.target.style.backgroundColor = 'var(--color-primary-focus)';
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.target.style.backgroundColor = 'var(--color-primary)';
                }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="hidden sm:inline">Processing...</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="hidden sm:inline">{isEditing ? 'Update Category' : 'Create Category'}</span>
                    <span className="sm:hidden">{isEditing ? 'Update' : 'Create'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModernCategoryForm;