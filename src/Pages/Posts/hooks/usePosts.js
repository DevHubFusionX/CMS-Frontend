import { useState, useEffect } from 'react';
import { postsService } from '../../../Services/api';
import { useAuth } from '../../../Services/AuthContext';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const userRole = user?.role?.name || user?.legacyRole || user?.role;
        const response = await postsService.getAllPostsIncludingDrafts(userRole);
        
        const formattedPosts = response.data.map(post => ({
          id: post._id || post.id,
          title: post.title,
          author: post.author?.name || 'Unknown Author',
          status: post.status || 'draft',
          date: new Date(post.createdAt).toLocaleDateString()
        }));
        
        setPosts(formattedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [user]);

  const deletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsService.deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  return { posts, loading, deletePost };
};