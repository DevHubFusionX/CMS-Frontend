import { useEffect, useRef } from 'react';
import { postsService } from '../Services/postsService';

export const useAutoSave = (postData, postId, isEnabled = true) => {
  const timeoutRef = useRef(null);
  const lastSavedRef = useRef('');

  useEffect(() => {
    if (!isEnabled || !postData.title || !postData.content) return;

    const currentContent = JSON.stringify(postData);
    if (currentContent === lastSavedRef.current) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const saveData = {
          ...postData,
          status: 'draft',
          isAutoSave: true
        };

        if (postId) {
          await postsService.updatePost(postId, saveData);
        } else {
          const response = await postsService.createPost(saveData);
          if (response.data) {
            window.history.replaceState(null, '', `/dashboard/posts/edit/${response.data._id}`);
          }
        }
        
        lastSavedRef.current = currentContent;
        console.log('Auto-saved at', new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, 3000); // Auto-save after 3 seconds of inactivity

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [postData, postId, isEnabled]);

  return { lastSaved: lastSavedRef.current };
};