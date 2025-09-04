import React, { useState, useEffect } from 'react';
import { FiX, FiSave, FiTag, FiType, FiFileText, FiDroplet } from 'react-icons/fi';

const ModernCategoryForm = ({ isOpen, onClose, initialValues, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    color: 'blue',
    status: 'active'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const colorOptions = [
    { value: 'blue', label: 'Primary', colorVar: '--color-primary' },
    { value: 'green', label: 'Success', colorVar: '--color-success' },
    { value: 'purple', label: 'Secondary', colorVar: '--color-secondary' },
    { value: 'red', label: 'Error', colorVar: '--color-error' },
    { value: 'orange', label: 'Warning', colorVar: '--color-warning' },
    { value: 'indigo', label: 'Accent', colorVar: '--color-accent' }
  ];

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: initialValues.name || '',
        slug: initialValues.slug || '',
        description: initialValues.description || '',
        color: initialValues.color || 'blue',
        status: initialValues.status || 'active'
      });
      setErrors({});
    }
  }, [isOpen, initialValues]);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div 
        className="relative w-full max-w-4xl backdrop-blur-md rounded-3xl shadow-2xl z-10 transform transition-all duration-300 scale-100 my-8"
        style={{ 
          backgroundColor: 'var(--color-base-100)',
          border: `1px solid var(--color-base-300)`
        }}
      >
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div 
            className="flex items-center justify-between mb-6 pb-4"
            style={{ borderBottom: `1px solid var(--color-base-300)` }}
          >
            <div className="flex items-center space-x-3">
              <div 
                className="p-2 rounded-xl shadow-lg"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <FiTag 
                  className="h-6 w-6" 
                  style={{ color: 'var(--color-primary-content)' }}
                />
              </div>
              <div>
                <h3 
                  className="text-xl font-bold"
                  style={{ color: 'var(--color-base-content)' }}
                >
                  {isEditing ? 'Edit Category' : 'Create Category'}
                </h3>
                <p 
                  className="text-sm opacity-60"
                  style={{ color: 'var(--color-base-content)' }}
                >
                  {isEditing ? 'Update category details' : 'Add a new category to organize content'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl transition-all duration-200 opacity-60 hover:opacity-100"
              style={{ 
                color: 'var(--color-base-content)',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--color-base-200)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label 
                    className="flex items-center space-x-2 text-sm font-semibold mb-2"
                    style={{ color: 'var(--color-base-content)' }}
                  >
                    <FiType className="h-4 w-4" />
                    <span>Category Name</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={handleNameChange}
                    className="w-full px-3 py-3 border-2 rounded-lg transition-all duration-200"
                    style={{
                      backgroundColor: errors.name ? 'var(--color-error)' : 'var(--color-base-200)',
                      borderColor: errors.name ? 'var(--color-error)' : 'var(--color-base-300)',
                      color: 'var(--color-base-content)',
                      opacity: errors.name ? 0.1 : 1
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--color-primary)';
                      e.target.style.boxShadow = `0 0 0 2px var(--color-primary)33`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.name ? 'var(--color-error)' : 'var(--color-base-300)';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="Enter category name"
                  />
                  {errors.name && (
                    <p 
                      className="text-sm mt-1"
                      style={{ color: 'var(--color-error)' }}
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Slug */}
                <div>
                  <label 
                    className="flex items-center space-x-2 text-sm font-semibold mb-2"
                    style={{ color: 'var(--color-base-content)' }}
                  >
                    <FiTag className="h-4 w-4" />
                    <span>URL Slug</span>
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-3 py-3 border-2 rounded-lg transition-all duration-200"
                    style={{
                      backgroundColor: errors.slug ? 'var(--color-error)' : 'var(--color-base-200)',
                      borderColor: errors.slug ? 'var(--color-error)' : 'var(--color-base-300)',
                      color: 'var(--color-base-content)',
                      opacity: errors.slug ? 0.1 : 1
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--color-primary)';
                      e.target.style.boxShadow = `0 0 0 2px var(--color-primary)33`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.slug ? 'var(--color-error)' : 'var(--color-base-300)';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="category-slug"
                  />
                  {errors.slug && (
                    <p 
                      className="text-sm mt-1"
                      style={{ color: 'var(--color-error)' }}
                    >
                      {errors.slug}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label 
                    className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--color-base-content)' }}
                  >
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-3 border-2 rounded-lg transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--color-base-200)',
                      borderColor: 'var(--color-base-300)',
                      color: 'var(--color-base-content)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--color-primary)';
                      e.target.style.boxShadow = `0 0 0 2px var(--color-primary)33`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--color-base-300)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Description */}
                <div>
                  <label 
                    className="flex items-center space-x-2 text-sm font-semibold mb-2"
                    style={{ color: 'var(--color-base-content)' }}
                  >
                    <FiFileText className="h-4 w-4" />
                    <span>Description</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-3 border-2 rounded-lg transition-all duration-200 resize-none"
                    style={{
                      backgroundColor: 'var(--color-base-200)',
                      borderColor: 'var(--color-base-300)',
                      color: 'var(--color-base-content)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--color-primary)';
                      e.target.style.boxShadow = `0 0 0 2px var(--color-primary)33`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--color-base-300)';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="Brief description of this category"
                  />
                </div>

                {/* Color */}
                <div>
                  <label 
                    className="flex items-center space-x-2 text-sm font-semibold mb-3"
                    style={{ color: 'var(--color-base-content)' }}
                  >
                    <FiDroplet className="h-4 w-4" />
                    <span>Color Theme</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                        className="flex items-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200"
                        style={{
                          borderColor: formData.color === color.value ? 'var(--color-primary)' : 'var(--color-base-300)',
                          backgroundColor: formData.color === color.value ? 'var(--color-primary)' : 'var(--color-base-200)',
                          opacity: formData.color === color.value ? 0.1 : 1,
                          boxShadow: formData.color === color.value ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' : 'none'
                        }}
                        onMouseEnter={(e) => {
                          if (formData.color !== color.value) {
                            e.target.style.borderColor = 'var(--color-base-300)';
                            e.target.style.backgroundColor = 'var(--color-base-300)';
                            e.target.style.opacity = '0.5';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.color !== color.value) {
                            e.target.style.borderColor = 'var(--color-base-300)';
                            e.target.style.backgroundColor = 'var(--color-base-200)';
                            e.target.style.opacity = '1';
                          }
                        }}
                      >
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: `var(${color.colorVar})` }}
                        ></div>
                        <span 
                          className="text-sm font-medium"
                          style={{ color: 'var(--color-base-content)' }}
                        >
                          {color.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Error message */}
            {errors.submit && (
              <div 
                className="mt-4 p-3 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--color-error)',
                  border: `1px solid var(--color-error)`,
                  opacity: 0.1
                }}
              >
                <p 
                  className="text-sm"
                  style={{ color: 'var(--color-error)' }}
                >
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Actions */}
            <div 
              className="flex items-center justify-end space-x-3 pt-6 mt-6"
              style={{ borderTop: `1px solid var(--color-base-300)` }}
            >
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg transition-all duration-200 font-medium"
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
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-6 py-2 rounded-lg transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                style={{ 
                  backgroundColor: isSubmitting ? 'var(--color-neutral)' : 'var(--color-primary)',
                  color: isSubmitting ? 'var(--color-neutral-content)' : 'var(--color-primary-content)'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.opacity = '0.9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.opacity = '1';
                  }
                }}
              >
                <FiSave className="h-4 w-4" />
                <span>{isSubmitting ? 'Saving...' : (isEditing ? 'Update' : 'Create')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModernCategoryForm;