import React, { useState, useRef, useEffect } from 'react';
import ModalHeader from './ModalHeader';
import ProgressSteps from './ProgressSteps';
import BasicInfoStep from './BasicInfoStep';
import TagsInput from './TagsInput';
import ModalFooter from './ModalFooter';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    status: 'draft',
    tags: [],
    categories: [],
    featuredImage: '',
    seoTitle: '',
    seoDescription: '',
    publishDate: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);
  const titleInputRef = useRef(null);

  const steps = [
    { id: 1, title: 'Basic Info', icon: '📝', description: 'Title and content' },
    { id: 2, title: 'Details', icon: '🏷️', description: 'Tags and categories' },
    { id: 3, title: 'SEO & Media', icon: '🎯', description: 'Optimization and images' },
    { id: 4, title: 'Publish', icon: '🚀', description: 'Review and publish' }
  ];

  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      setTimeout(() => titleInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      if (!formData.content.trim()) newErrors.content = 'Content is required';
    }
    
    if (step === 3) {
      if (formData.seoTitle && formData.seoTitle.length > 60) {
        newErrors.seoTitle = 'SEO title should be under 60 characters';
      }
      if (formData.seoDescription && formData.seoDescription.length > 160) {
        newErrors.seoDescription = 'SEO description should be under 160 characters';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (status = 'draft') => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        status,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')
      };
      
      await onSubmit(submitData);
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        status: 'draft',
        tags: [],
        categories: [],
        featuredImage: '',
        seoTitle: '',
        seoDescription: '',
        publishDate: ''
      });
      setCurrentStep(1);
      setErrors({});
    } catch (error) {
      console.error('Error submitting post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
        <div 
          ref={modalRef}
          className="relative w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl rounded-xl sm:rounded-2xl shadow-2xl transform transition-all"
          style={{backgroundColor: 'var(--color-base-200)'}}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalHeader currentStep={currentStep} steps={steps} onClose={onClose} />

          <ProgressSteps steps={steps} currentStep={currentStep} />

          <div className="p-3 sm:p-4 md:p-6 max-h-96 overflow-y-auto">
            {currentStep === 1 && (
              <BasicInfoStep 
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
                titleInputRef={titleInputRef}
              />
            )}
            
            {currentStep === 2 && (
              <div className="space-y-4">
                <TagsInput 
                  tags={formData.tags}
                  tagInput={tagInput}
                  setTagInput={setTagInput}
                  onAddTag={handleAddTag}
                  onRemoveTag={handleRemoveTag}
                />
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
                    SEO Title
                  </label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleInputChange}
                    placeholder="SEO optimized title..."
                    className="w-full px-3 py-2 rounded-lg border"
                    style={{
                      backgroundColor: 'var(--color-base-100)',
                      borderColor: errors.seoTitle ? 'var(--color-error)' : 'var(--color-base-300)',
                      color: 'var(--color-base-content)'
                    }}
                  />
                  {errors.seoTitle && (
                    <p className="text-sm mt-1" style={{color: 'var(--color-error)'}}>
                      {errors.seoTitle}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
                    SEO Description
                  </label>
                  <textarea
                    name="seoDescription"
                    value={formData.seoDescription}
                    onChange={handleInputChange}
                    placeholder="SEO meta description..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border resize-none"
                    style={{
                      backgroundColor: 'var(--color-base-100)',
                      borderColor: errors.seoDescription ? 'var(--color-error)' : 'var(--color-base-300)',
                      color: 'var(--color-base-content)'
                    }}
                  />
                  {errors.seoDescription && (
                    <p className="text-sm mt-1" style={{color: 'var(--color-error)'}}>
                      {errors.seoDescription}
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{color: 'var(--color-base-content)'}}>
                  Review Your Post
                </h3>
                <div className="space-y-2">
                  <p><strong>Title:</strong> {formData.title}</p>
                  <p><strong>Tags:</strong> {formData.tags.join(', ') || 'None'}</p>
                  <p><strong>Content:</strong> {formData.content.substring(0, 100)}...</p>
                </div>
              </div>
            )}
          </div>

          <ModalFooter 
            currentStep={currentStep}
            steps={steps}
            isSubmitting={isSubmitting}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;