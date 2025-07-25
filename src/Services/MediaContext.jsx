import React, { createContext, useContext, useState, useEffect } from 'react';
import { mediaService } from './mediaService';
import { useAuth } from './AuthContext';

// Create context
const MediaContext = createContext();

// Provider component
export const MediaProvider = ({ children }) => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  // Filter media based on user role
  const getFilteredMedia = (allMedia) => {
    if (!user) return [];
    
    const userRole = user.legacyRole || user.role?.name || user.role;
    
    // Admin and Editor can see all media
    if (['admin', 'super_admin', 'editor'].includes(userRole?.toLowerCase())) {
      return allMedia;
    }
    
    // Author and Contributor can only see their own media
    if (['author', 'contributor'].includes(userRole?.toLowerCase())) {
      const currentUserId = user.id || user._id;
      return allMedia.filter(item => {
        const itemUserId = item.uploadedBy?.id || item.uploadedBy?._id || item.userId;
        return itemUserId === currentUserId;
      });
    }
    
    // Subscriber has no access
    return [];
  };
  
  // Fetch media from the API
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await mediaService.getAllMedia();
        const filteredMedia = getFilteredMedia(response.data);
        setMediaItems(filteredMedia);
      } catch (error) {
        console.error('Error fetching media:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchMedia();
    }
  }, [user]);
  
  // Add new media (expects already uploaded media data)
  const addMedia = (uploadedMediaData) => {
    try {
      // Handle both single item and array of items
      const itemsToAdd = Array.isArray(uploadedMediaData) ? uploadedMediaData : [uploadedMediaData];
      
      setMediaItems(prevItems => {
        // Filter out duplicates based on ID
        const existingIds = prevItems.map(item => item._id || item.id);
        const newItems = itemsToAdd.filter(item => {
          const itemId = item._id || item.id;
          return !existingIds.includes(itemId);
        });
        
        return [...newItems, ...prevItems];
      });
      return itemsToAdd;
    } catch (error) {
      console.error('Error adding media to context:', error);
      throw error;
    }
  };
  
  // Check if user can delete media
  const canDeleteMedia = (mediaItem) => {
    if (!user) return false;
    
    const userRole = user.legacyRole || user.role?.name || user.role;
    
    // Admin and Editor can delete any media
    if (['admin', 'super_admin', 'editor'].includes(userRole?.toLowerCase())) {
      return true;
    }
    
    // Author can only delete their own media
    if (userRole?.toLowerCase() === 'author') {
      const currentUserId = user.id || user._id;
      const itemUserId = mediaItem.uploadedBy?.id || mediaItem.uploadedBy?._id || mediaItem.userId;
      return itemUserId === currentUserId;
    }
    
    // Contributor and Subscriber cannot delete
    return false;
  };
  
  // Delete media
  const deleteMedia = async (id) => {
    try {
      if (!id) {
        console.error('Error: No media ID provided for deletion');
        return;
      }
      
      // Find the media item to check permissions
      const mediaItem = mediaItems.find(item => (item._id || item.id) === id);
      if (!mediaItem || !canDeleteMedia(mediaItem)) {
        alert('You do not have permission to delete this media file.');
        return;
      }
      
      // Show confirmation dialog
      if (!window.confirm('Are you sure you want to delete this media file? This action cannot be undone.')) {
        return;
      }
      
      // Optimistically remove from UI first
      setMediaItems(prevItems => prevItems.filter(item => {
        const itemId = item._id || item.id;
        return itemId !== id;
      }));
      
      try {
        const result = await mediaService.deleteMedia(id);
        if (!result.success) {
          throw new Error('Delete operation failed');
        }
      } catch (error) {
        console.error('Server error when deleting media:', error);
        // If server delete fails, restore the item
        const response = await mediaService.getAllMedia();
        const filteredMedia = getFilteredMedia(response.data);
        setMediaItems(filteredMedia);
        alert('Failed to delete media file. Please try again.');
      }
    } catch (error) {
      console.error('Error in deleteMedia function:', error);
      alert('An error occurred while deleting the media file.');
    }
  };
  
  // Check if user can upload media
  const canUploadMedia = () => {
    if (!user) return false;
    
    const userRole = user.legacyRole || user.role?.name || user.role;
    return ['admin', 'super_admin', 'editor', 'author'].includes(userRole?.toLowerCase());
  };
  
  return (
    <MediaContext.Provider value={{ mediaItems, loading, addMedia, deleteMedia, canUploadMedia, canDeleteMedia }}>
      {children}
    </MediaContext.Provider>
  );
};

// Custom hook for using the media context
export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};