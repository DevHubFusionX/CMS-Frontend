import React, { useState, useEffect } from 'react';
import PreviewHeader from './components/PreviewHeader';
import PreviewContent from './components/PreviewContent';
import PreviewMetadata from './components/PreviewMetadata';
import PreviewEmptyState from './components/PreviewEmptyState';

const PreviewPost = () => {
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    // Get post data from sessionStorage (matches PreviewDrafts)
    const postData = sessionStorage.getItem('previewPost');
    
    if (postData) {
      try {
        setPost(JSON.parse(postData));
      } catch (error) {
        console.error('Error parsing post preview data:', error);
      }
    }
  }, []);
  
  if (!post) {
    return <PreviewEmptyState />;
  }
  
  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--color-base-100)'}}>
      <PreviewHeader status={post.status} />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <PreviewContent post={post} />
        <PreviewMetadata categories={post.categories} tags={post.tags} />
      </div>
    </div>
  );
};

export default PreviewPost;