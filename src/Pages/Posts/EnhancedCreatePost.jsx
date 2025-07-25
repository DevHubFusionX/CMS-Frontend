import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Enhanced Create Post page - redirects to posts page with modal
 * The enhanced editor is now a modal component
 */
const EnhancedCreatePost = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to posts page where the enhanced editor modal can be opened
    navigate('/dashboard/posts', { replace: true });
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default EnhancedCreatePost;
