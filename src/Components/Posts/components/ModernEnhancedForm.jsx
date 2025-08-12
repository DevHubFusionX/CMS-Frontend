import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import MediaField from '../../Media/MediaField';
import ContentEditor from '../../Editor/components/ContentEditor';
import CategoriesField from '../../Editor/components/CategoriesField';
import AIAssistant from '../../Editor/AIAssistant';
import { EDITOR_LANGUAGES } from '../../../Constants/editorConfig';
import { useAuth } from '../../../Services/AuthContext';
import { categoriesService } from '../../../Services/api';

const ModernEnhancedForm = forwardRef(({ initialData = {}, onSubmit, loading, submitButtonText = 'Save', isEditing = false }, ref) => {
  const { user } = useAuth();
  const userRole = user?.legacyRole || user?.role?.name || user?.role;
  
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
    excerpt: initialData.excerpt || '',
    status: userRole === 'contributor' ? 'draft' : (initialData.status || 'draft'),
    featuredImage: initialData.featuredImage || null,
    galleryImages: initialData.galleryImages || [],
    categories: initialData.categories || [],
    tags: initialData.tags || [],
    focusKeyword: initialData.focusKeyword || '',
    scheduledDate: initialData.scheduledDate || null,
    language: initialData.language || 'en',
    metaDescription: initialData.metaDescription || '',
    slug: initialData.slug || ''
  });
  
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState('');
  const [showAdvancedSeo, setShowAdvancedSeo] = useState(false);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getAllCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);
  
  useImperativeHandle(ref, () => ({
    getCurrentFormData: (callback) => {
      const processedData = {
        ...formData,
        featuredImage: (() => {
          if (!formData.featuredImage) return null;
          if (typeof formData.featuredImage === 'string') return formData.featuredImage;
          if (typeof formData.featuredImage === 'object' && Object.keys(formData.featuredImage).length === 0) return null;
          return formData.featuredImage?.url || null;
        })(),
        galleryImages: Array.isArray(formData.galleryImages) 
          ? formData.galleryImages.map(img => img?.url || img).filter(Boolean)
          : []
      };
      callback(processedData);
    }
  }));
  
  useEffect(() => {
    if (!isEditing && formData.title && !formData.slug) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
      
      setFormData(prevData => ({
        ...prevData,
        slug: generatedSlug
      }));
    }
  }, [formData.title, isEditing, formData.slug]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleContentChange = (content) => {
    setFormData(prevData => ({
      ...prevData,
      content
    }));
  };
  
  const handleFeaturedImageChange = (media) => {
    setFormData(prevData => ({
      ...prevData,
      featuredImage: media
    }));
  };
  
  const handleGalleryImagesChange = (media) => {
    setFormData(prevData => ({
      ...prevData,
      galleryImages: media
    }));
  };
  
  const handleTagAdd = () => {
    if (tagInput.trim()) {
      setFormData(prevData => ({
        ...prevData,
        tags: [...prevData.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };
  
  const handleTagRemove = (tagToRemove) => {
    setFormData(prevData => ({
      ...prevData,
      tags: prevData.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prevData => ({
      ...prevData,
      categories: selectedOptions
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    if (formData.slug && !/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }
    if (formData.metaDescription && formData.metaDescription.length > 160) {
      newErrors.metaDescription = 'Meta description cannot be more than 160 characters';
    }
    if (formData.status === 'scheduled' && !formData.scheduledDate) {
      newErrors.scheduledDate = 'Scheduled date is required when status is scheduled';
    }
    if (formData.scheduledDate && new Date(formData.scheduledDate) <= new Date()) {
      newErrors.scheduledDate = 'Scheduled date must be in the future';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const processedData = {
      ...formData,
      featuredImage: (() => {
        if (!formData.featuredImage) return null;
        if (typeof formData.featuredImage === 'string') return formData.featuredImage;
        if (typeof formData.featuredImage === 'object' && Object.keys(formData.featuredImage).length === 0) return null;
        return formData.featuredImage?.url || null;
      })(),
      galleryImages: Array.isArray(formData.galleryImages) 
        ? formData.galleryImages.map(img => img?.url || img).filter(Boolean)
        : []
    };
    
    onSubmit(processedData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content Column */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">
          {/* Title */}
          <div className="rounded-lg sm:rounded-xl p-3 sm:p-4 border" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
            <label htmlFor="title" className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
              Title <span style={{color: 'var(--color-error)'}}>*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              style={{
                backgroundColor: 'var(--color-base-100)',
                color: 'var(--color-base-content)',
                borderColor: errors.title ? 'var(--color-error)' : 'var(--color-base-300)'
              }}
              onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px var(--color-primary)'}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
              placeholder="Enter post title"
            />
            {errors.title && (
              <p className="mt-1 text-sm" style={{color: 'var(--color-error)'}}>{errors.title}</p>
            )}
          </div>
          
          {/* Slug */}
          <div className="rounded-xl p-4 border" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
            <label htmlFor="slug" className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
              URL Slug
            </label>
            <div className="flex rounded-lg shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 text-sm" style={{backgroundColor: 'var(--color-base-300)', borderColor: 'var(--color-base-300)', color: 'var(--color-base-content)', opacity: 0.7}}>
                /posts/
              </span>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{
                  backgroundColor: 'var(--color-base-100)',
                  color: 'var(--color-base-content)',
                  borderColor: errors.slug ? 'var(--color-error)' : 'var(--color-base-300)'
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px var(--color-primary)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
                placeholder="post-url-slug"
              />
            </div>
            {errors.slug && (
              <p className="mt-1 text-sm" style={{color: 'var(--color-error)'}}>{errors.slug}</p>
            )}
          </div>
          
          {/* AI Assistant */}
          <AIAssistant onContentGenerated={(generated) => {
            if (generated.title && !formData.title) {
              setFormData(prev => ({ ...prev, title: generated.title }));
            }
            if (generated.slug && !formData.slug) {
              setFormData(prev => ({ ...prev, slug: generated.slug }));
            }
            if (generated.content) {
              handleContentChange(generated.content);
            }
            if (generated.excerpt && !formData.excerpt) {
              setFormData(prev => ({ ...prev, excerpt: generated.excerpt }));
            }
            if (generated.focusKeyword && !formData.focusKeyword) {
              setFormData(prev => ({ ...prev, focusKeyword: generated.focusKeyword }));
            }
            if (generated.metaDescription && !formData.metaDescription) {
              setFormData(prev => ({ ...prev, metaDescription: generated.metaDescription }));
            }
            if (generated.tags && generated.tags.length > 0) {
              setFormData(prev => ({ ...prev, tags: [...prev.tags, ...generated.tags.filter(tag => !prev.tags.includes(tag))] }));
            }
          }} />
          
          {/* Content */}
          <div className="rounded-xl p-4 border" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
            <ContentEditor 
              value={formData.content}
              onChange={handleContentChange}
              error={errors.content}
            />
          </div>
          
          {/* Media Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg sm:rounded-xl p-3 sm:p-4 border" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
              <MediaField
                label="Featured Image"
                value={formData.featuredImage}
                onChange={handleFeaturedImageChange}
              />
            </div>
            
            <div className="rounded-lg sm:rounded-xl p-3 sm:p-4 border" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
              <MediaField
                label="Gallery Images"
                value={formData.galleryImages}
                onChange={handleGalleryImagesChange}
                multiple={true}
              />
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Publishing Options */}
          <div className="rounded-xl p-4 border" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{color: 'var(--color-base-content)'}}>
              <span>📝</span>
              Publishing
            </h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:border-transparent"
                  style={{
                    backgroundColor: 'var(--color-base-100)',
                    color: 'var(--color-base-content)',
                    borderColor: 'var(--color-base-300)'
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px var(--color-primary)'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                >
                  <option value="draft">Draft</option>
                  {userRole !== 'contributor' && <option value="published">Published</option>}
                  {userRole !== 'contributor' && <option value="scheduled">Scheduled</option>}
                </select>
              </div>
              
              {formData.status === 'scheduled' && (
                <div>
                  <label htmlFor="scheduledDate" className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
                    Schedule Date & Time <span style={{color: 'var(--color-error)'}}>*</span>
                  </label>
                  <input
                    type="datetime-local"
                    id="scheduledDate"
                    name="scheduledDate"
                    value={formData.scheduledDate ? new Date(formData.scheduledDate).toISOString().slice(0, 16) : ''}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value).toISOString() : null;
                      setFormData(prev => ({ ...prev, scheduledDate: date }));
                    }}
                    min={new Date(Date.now() + 5 * 60000).toISOString().slice(0, 16)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:border-transparent"
                    style={{
                      backgroundColor: 'var(--color-base-100)',
                      color: 'var(--color-base-content)',
                      borderColor: 'var(--color-base-300)'
                    }}
                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px var(--color-primary)'}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                  />
                  <p className="mt-1 text-xs opacity-70" style={{color: 'var(--color-base-content)'}}>
                    Post will be automatically published at this time
                  </p>
                </div>
              )}
              
              <div>
                <label htmlFor="language" className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:border-transparent"
                  style={{
                    backgroundColor: 'var(--color-base-100)',
                    color: 'var(--color-base-content)',
                    borderColor: 'var(--color-base-300)'
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px var(--color-primary)'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                >
                  {EDITOR_LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Typography & Reading */}
          <div className="rounded-xl p-4 border" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{color: 'var(--color-base-content)'}}>
              <span>📖</span>
              Reading Experience
            </h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
                  Excerpt (Preview Text)
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  rows="2"
                  value={formData.excerpt || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:border-transparent"
                  style={{
                    backgroundColor: 'var(--color-base-100)',
                    color: 'var(--color-base-content)',
                    borderColor: 'var(--color-base-300)'
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px var(--color-primary)'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                  placeholder="Brief summary that appears in post previews"
                  maxLength={200}
                />
                <p className="mt-1 text-xs opacity-70 flex justify-between" style={{color: 'var(--color-base-content)'}}>
                  <span>Shows in post cards and previews</span>
                  <span>{(formData.excerpt || '').length}/200</span>
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1 opacity-70" style={{color: 'var(--color-base-content)'}}>
                    Est. Reading Time
                  </label>
                  <div className="text-sm px-2 py-1 rounded" style={{backgroundColor: 'var(--color-base-300)', color: 'var(--color-base-content)'}}>
                    {Math.ceil((formData.content || '').split(' ').length / 200)} min
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 opacity-70" style={{color: 'var(--color-base-content)'}}>
                    Word Count
                  </label>
                  <div className="text-sm px-2 py-1 rounded" style={{backgroundColor: 'var(--color-base-300)', color: 'var(--color-base-content)'}}>
                    {(formData.content || '').split(' ').filter(Boolean).length}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* SEO Options */}
          <div className="rounded-xl p-4 border" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2" style={{color: 'var(--color-base-content)'}}>
                <span>🎯</span>
                SEO
              </h3>
              <button 
                type="button"
                onClick={() => setShowAdvancedSeo(!showAdvancedSeo)}
                className="text-sm hover:opacity-80"
                style={{color: 'var(--color-primary)'}}
              >
                {showAdvancedSeo ? 'Hide Advanced' : 'Show Advanced'}
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="focusKeyword" className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
                  Focus Keyword
                </label>
                <input
                  type="text"
                  id="focusKeyword"
                  name="focusKeyword"
                  value={formData.focusKeyword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:border-transparent"
                  style={{
                    backgroundColor: 'var(--color-base-100)',
                    color: 'var(--color-base-content)',
                    borderColor: 'var(--color-base-300)'
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px var(--color-primary)'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                  placeholder="Main keyword for SEO"
                />
              </div>
              
              {showAdvancedSeo && (
                <div>
                  <label htmlFor="metaDescription" className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
                    Meta Description
                  </label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    rows="3"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:border-transparent"
                    style={{
                      backgroundColor: 'var(--color-base-100)',
                      color: 'var(--color-base-content)',
                      borderColor: 'var(--color-base-300)'
                    }}
                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px var(--color-primary)'}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                    placeholder="Brief description for search engines"
                    maxLength={160}
                  />
                  <p className="mt-1 text-xs opacity-70 flex justify-between" style={{color: 'var(--color-base-content)'}}>
                    <span>Appears in search results</span>
                    <span style={{color: formData.metaDescription.length > 160 ? 'var(--color-error)' : 'var(--color-base-content)'}}>{formData.metaDescription.length}/160</span>
                  </p>
                  {errors.metaDescription && (
                    <p className="mt-1 text-sm" style={{color: 'var(--color-error)'}}>{errors.metaDescription}</p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Categories */}
          <div className="rounded-xl p-4 border" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{color: 'var(--color-base-content)'}}>
              <span>📁</span>
              Categories
            </h3>
            <CategoriesField 
              value={formData.categories}
              onChange={handleCategoryChange}
              categories={categories}
            />
          </div>
          
          {/* Tags */}
          <div className="rounded-xl p-4 border" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{color: 'var(--color-base-content)'}}>
              <span>🏷️</span>
              Tags
            </h3>
            
            <div className="space-y-3">
              <div className="flex rounded-lg shadow-sm">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-l-lg text-sm focus:ring-2 focus:border-transparent"
                  style={{
                    backgroundColor: 'var(--color-base-100)',
                    color: 'var(--color-base-content)',
                    borderColor: 'var(--color-base-300)'
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px var(--color-primary)'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                  placeholder="Add a tag"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleTagAdd();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleTagAdd}
                  className="px-4 py-2 text-sm font-medium rounded-r-lg transition-colors duration-200"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-content)'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  Add
                </button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-primary-content)',
                        opacity: 0.8
                      }}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="ml-1 inline-flex hover:opacity-70 focus:outline-none"
                      >
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 sm:px-6 py-3 font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            style={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
              color: 'var(--color-primary-content)'
            }}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {submitButtonText}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
});

export default ModernEnhancedForm;