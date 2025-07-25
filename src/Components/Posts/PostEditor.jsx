import React, { useState } from 'react';

/**
 * Post editor component for creating and editing posts
 * @param {Object} props - Component props
 * @param {Object} props.post - Existing post data (if editing)
 * @param {function} props.onSave - Function to call when post is saved
 */
const PostEditor = ({ post = {}, onSave }) => {
  const [title, setTitle] = useState(post.title || '');
  const [content, setContent] = useState(post.content || '');
  const [excerpt, setExcerpt] = useState(post.excerpt || '');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      content,
      excerpt,
      // Add other post metadata as needed
    });
  };

  return (
    <div className="post-editor">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows="10"
            placeholder="Write your post content here..."
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;