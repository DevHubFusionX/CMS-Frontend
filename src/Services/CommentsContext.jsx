import React, { createContext, useContext, useState, useEffect } from 'react';
import { commentsService } from './api';

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch comments
  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await commentsService.getAllComments();
      setComments(response.data);
      setError(null);
    } catch (err) {
      // If it's a permission error, just set empty comments array
      if (err.message.includes('not authorized')) {
        setComments([]);
        setError(null);
      } else {
        setError('Failed to fetch comments');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  // Add comment
  const addComment = async (commentData) => {
    try {
      setLoading(true);
      const response = await commentsService.createComment(commentData);
      const newComment = response.data;
      setComments([...comments, newComment]);
      setLoading(false);
      return newComment;
    } catch (err) {
      setError('Failed to add comment');
      console.error(err);
      setLoading(false);
      throw err;
    }
  };

  // Update comment status
  const updateCommentStatus = async (id, status) => {
    try {
      setLoading(true);
      const response = await commentsService.updateComment(id, { status });
      const updatedComment = response.data;
      const updatedComments = comments.map(comment => 
        comment._id === id ? updatedComment : comment
      );
      setComments(updatedComments);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError('Failed to update comment status');
      console.error(err);
      setLoading(false);
      throw err;
    }
  };

  // Delete comment
  const deleteComment = async (id) => {
    try {
      setLoading(true);
      await commentsService.deleteComment(id);
      setComments(comments.filter(comment => comment._id !== id));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError('Failed to delete comment');
      console.error(err);
      setLoading(false);
      throw err;
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <CommentsContext.Provider value={{
      comments,
      loading,
      error,
      fetchComments,
      addComment,
      updateCommentStatus,
      deleteComment
    }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => useContext(CommentsContext);