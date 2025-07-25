import React from 'react';
import EditorToolbar from './EditorToolbar';
import TitleField from './components/TitleField';
import ExcerptField from './components/ExcerptField';
import FeaturedImageField from './components/FeaturedImageField';
import CategoriesField from './components/CategoriesField';
import TagsField from './components/TagsField';
import ContentEditor from './components/ContentEditor';
import { usePostEditor } from './hooks/usePostEditor';

const PostEditor = ({
  post = {
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    categories: [],
    tags: [],
    status: 'draft',
    slug: ''
  },
  onSave,
  onPublish,
  onPreview
}) => {
  const {
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
  } = usePostEditor(post);

  const handleSave = async () => {
    if (!validateForm()) return;
    
    try {
      setIsSaving(true);
      await onSave({ ...postData, status: 'draft' });
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!validateForm()) return;
    
    try {
      setIsPublishing(true);
      await onPublish({ ...postData, status: 'published' });
    } catch (error) {
      console.error('Error publishing post:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handlePreview = () => {
    onPreview(postData);
  };

  return (
    <div className="post-editor">
      <EditorToolbar
        onSave={handleSave}
        onPublish={handlePublish}
        onPreview={handlePreview}
        isDraft={postData.status === 'draft'}
        isSaving={isSaving}
        isPublishing={isPublishing}
      />
      
      <div className="space-y-6">
        <TitleField 
          value={postData.title}
          onChange={handleChange}
          error={errors.title}
        />
        
        <ExcerptField 
          value={postData.excerpt}
          onChange={handleChange}
        />
        
        <FeaturedImageField 
          value={postData.featuredImage}
          onChange={handleChange}
        />
        
        <CategoriesField 
          value={postData.categories}
          onChange={handleCategoryChange}
          categories={categories}
        />
        
        <TagsField 
          value={postData.tags}
          onChange={handleTagChange}
          tags={tags}
        />
        
        <ContentEditor 
          value={postData.content}
          onChange={handleContentChange}
          error={errors.content}
        />
      </div>
    </div>
  );
};

export default PostEditor;