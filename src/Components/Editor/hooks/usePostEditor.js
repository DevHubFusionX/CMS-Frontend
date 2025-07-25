import { useState, useEffect } from 'react';
import { categoriesService, tagsService } from '../../../Services/api';

export const usePostEditor = (initialPost) => {
  const [postData, setPostData] = useState(initialPost);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, tagsResponse] = await Promise.all([
          categoriesService.getAllCategories(),
          tagsService.getAllTags()
        ]);
        
        setCategories(categoriesResponse.data || []);
        setTags(tagsResponse.data || []);
      } catch (error) {
        console.error('Error fetching categories and tags:', error);
      }
    };
    
    fetchData();
  }, []);

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
    
    setPostData(prev => ({ ...prev, ...updates }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleContentChange = (content) => {
    setPostData(prev => ({ ...prev, content }));
    
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: null }));
    }
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setPostData(prev => ({ ...prev, categories: selectedOptions }));
  };

  const handleTagChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setPostData(prev => ({ ...prev, tags: selectedOptions }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!postData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!postData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    postData,
    isSaving,
    isPublishing,
    categories,
    tags,
    errors,
    setIsSaving,
    setIsPublishing,
    handleChange,
    handleContentChange,
    handleCategoryChange,
    handleTagChange,
    validateForm
  };
};