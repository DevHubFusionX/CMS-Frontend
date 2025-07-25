import { useState } from 'react';

export const usePostForm = (initialData) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
    status: initialData.status || 'draft',
    featuredImage: initialData.featuredImage || null,
    galleryImages: initialData.galleryImages || [],
    tags: initialData.tags || [],
    slug: initialData.slug || ''
  });
  
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState('');
  
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updates = { [name]: value };
    
    // Auto-generate slug from title
    if (name === 'title' && value) {
      updates.slug = generateSlug(value);
    }
    
    setFormData(prevData => ({
      ...prevData,
      ...updates
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
  
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
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
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    tagInput,
    handleChange,
    handleFeaturedImageChange,
    handleGalleryImagesChange,
    handleTagInputChange,
    handleTagAdd,
    handleTagRemove,
    validateForm
  };
};