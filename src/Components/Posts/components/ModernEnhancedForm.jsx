import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import MediaField from '../../Media/MediaField';
import { EDITOR_LANGUAGES } from '../../../Constants/editorConfig';

const ModernEnhancedForm = forwardRef(({ initialData = {}, onSubmit, loading, submitButtonText = 'Save', isEditing = false }, ref) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
    excerpt: initialData.excerpt || '',
    status: initialData.status || 'draft',
    featuredImage: initialData.featuredImage || null,
    galleryImages: initialData.galleryImages || [],
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
  
  useImperativeHandle(ref, () => ({
    getCurrentFormData: (callback) => {
      // Process form data to extract URLs from media objects
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
  
  // Generate slug from title
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
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
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Process form data to extract URLs from media objects
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 ${
                errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter post title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>
          
          {/* Slug */}
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL Slug
            </label>
            <div className="flex rounded-lg shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                /posts/
              </span>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className={`flex-1 px-4 py-3 bg-white dark:bg-gray-700 border rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-200 ${
                  errors.slug ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="post-url-slug"
              />
            </div>
            {errors.slug && (
              <p className="mt-1 text-sm text-red-500">{errors.slug}</p>
            )}
          </div>
          
          {/* Content */}
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            
            {/* Formatting Toolbar */}
            <div className="flex flex-wrap gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
              <button type="button" className="px-2 py-1 text-sm bg-white dark:bg-gray-600 border rounded hover:bg-gray-100 dark:hover:bg-gray-500" title="Bold">
                <strong>B</strong>
              </button>
              <button type="button" className="px-2 py-1 text-sm bg-white dark:bg-gray-600 border rounded hover:bg-gray-100 dark:hover:bg-gray-500" title="Italic">
                <em>I</em>
              </button>
              <button type="button" className="px-2 py-1 text-sm bg-white dark:bg-gray-600 border rounded hover:bg-gray-100 dark:hover:bg-gray-500" title="Heading">
                H1
              </button>
              <button type="button" className="px-2 py-1 text-sm bg-white dark:bg-gray-600 border rounded hover:bg-gray-100 dark:hover:bg-gray-500" title="List">
                •
              </button>
              <button type="button" className="px-2 py-1 text-sm bg-white dark:bg-gray-600 border rounded hover:bg-gray-100 dark:hover:bg-gray-500" title="Link">
                🔗
              </button>
            </div>
            
            <textarea
              value={formData.content}
              onChange={(e) => handleContentChange(e.target.value)}
              rows={12}
              className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border-0 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 font-mono text-sm leading-relaxed ${
                errors.content ? 'ring-2 ring-red-500' : ''
              }`}
              placeholder="Write your content here... Use Markdown for formatting:\n\n# Heading 1\n## Heading 2\n**Bold text**\n*Italic text*\n- List item\n[Link text](URL)"
            />
            
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              💡 Tip: Use Markdown formatting for better text styling
            </div>
            
            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content}</p>
            )}
          </div>
          
          {/* Media Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <MediaField
                label="Featured Image"
                value={formData.featuredImage}
                onChange={handleFeaturedImageChange}
              />
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
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
        <div className="space-y-6">
          {/* Publishing Options */}
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-blue-500">📝</span>
              Publishing
            </h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-purple-500">📖</span>
              Reading Experience
            </h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Excerpt (Preview Text)
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  rows="2"
                  value={formData.excerpt || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief summary that appears in post previews"
                  maxLength={200}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                  <span>Shows in post cards and previews</span>
                  <span>{(formData.excerpt || '').length}/200</span>
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Est. Reading Time
                  </label>
                  <div className="text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {Math.ceil((formData.content || '').split(' ').length / 200)} min
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Word Count
                  </label>
                  <div className="text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {(formData.content || '').split(' ').filter(Boolean).length}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* SEO Options */}
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-green-500">🎯</span>
                SEO
              </h3>
              <button 
                type="button"
                onClick={() => setShowAdvancedSeo(!showAdvancedSeo)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                {showAdvancedSeo ? 'Hide Advanced' : 'Show Advanced'}
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="focusKeyword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Focus Keyword
                </label>
                <input
                  type="text"
                  id="focusKeyword"
                  name="focusKeyword"
                  value={formData.focusKeyword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Main keyword for SEO"
                />
              </div>
              
              {showAdvancedSeo && (
                <div>
                  <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    rows="3"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description for search engines"
                    maxLength={160}
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                    <span>Appears in search results</span>
                    <span>{formData.metaDescription.length}/160</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Tags */}
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-purple-500">🏷️</span>
              Tags
            </h3>
            
            <div className="space-y-3">
              <div className="flex rounded-lg shadow-sm">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-r-lg transition-colors duration-200"
                >
                  Add
                </button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="ml-1 inline-flex text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 focus:outline-none"
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
            className={`w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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