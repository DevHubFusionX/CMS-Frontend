import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsService } from '../../Services/postsService';

const RelatedPosts = ({ postId, className = "" }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!postId) return;
      
      try {
        const response = await postsService.getRelatedPosts(postId);
        setRelatedPosts(response.data || []);
      } catch (error) {
        console.error('Failed to fetch related posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [postId]);

  if (loading) {
    return (
      <div className={`${className}`}>
        <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedPosts.length === 0) return null;

  return (
    <div className={`${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Related Posts</h3>
      <div className="space-y-4">
        {relatedPosts.map(post => (
          <Link
            key={post._id}
            to={`/blog/${post.slug}`}
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h4>
            <div className="flex items-center text-sm text-gray-500">
              <span>{post.author?.name}</span>
              <span className="mx-2">•</span>
              <span>{post.views || 0} views</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;