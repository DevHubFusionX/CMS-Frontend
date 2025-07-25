import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PreviewPost = () => {
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    // Get post data from localStorage
    const postData = localStorage.getItem('postPreview');
    
    if (postData) {
      try {
        setPost(JSON.parse(postData));
      } catch (error) {
        console.error('Error parsing post preview data:', error);
      }
    }
  }, []);
  
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Preview Available</h1>
          <p className="text-gray-600 mb-6">No post data found for preview.</p>
          <Link 
            to="/dashboard/posts" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Posts
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white min-h-screen">
      {/* Preview Header */}
      <div className="bg-blue-600 text-white py-2 px-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <span className="font-medium">Preview Mode</span>
          <span className="ml-2 px-2 py-1 bg-blue-700 rounded-md text-xs">
            {post.status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => window.close()} 
            className="px-3 py-1 bg-blue-700 hover:bg-blue-800 rounded-md text-sm transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
      
      {/* Post Content */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        {post.featuredImage && (
          <div className="mb-6">
            <img 
              src={post.featuredImage} 
              alt={post.title} 
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/1200x400?text=Featured+Image';
              }}
            />
          </div>
        )}
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        {post.excerpt && (
          <div className="text-xl text-gray-600 mb-6 italic">
            {post.excerpt}
          </div>
        )}
        
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        
        {/* Categories and Tags */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          {post.categories && post.categories.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPost;