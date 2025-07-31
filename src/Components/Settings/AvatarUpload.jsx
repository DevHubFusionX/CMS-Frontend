import React, { useState } from 'react';
import api from '../../Services/apiClient';

const AvatarUpload = ({ currentAvatar, onAvatarChange }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    console.log('File selected:', file.name, file.type, file.size);
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, WEBP)');
      return;
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB');
      return;
    }
    
    setUploading(true);
    setError('');
    setSuccess(false);
    
    try {
      console.log('Starting upload...');
      
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', `avatar-${Date.now()}`);
      
      console.log('FormData created, calling mediaService...');
      
      // Upload avatar directly (separate from media library)
      const response = await api.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Upload response:', response);
      
      // Call the parent component's handler with the new avatar URL
      const avatarUrl = response.data?.data?.url || response.data?.url || response.data?.data?.path || response.data?.path;
      console.log('Setting avatar URL:', avatarUrl);
      
      if (avatarUrl) {
        await onAvatarChange(avatarUrl);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      } else {
        console.error('Server response:', response.data);
        throw new Error('No avatar URL received from server');
      }
    } catch (error) {
      console.error('Avatar upload error:', error);
      setError(error.message || 'Failed to upload image. Please try again.');
      setTimeout(() => setError(''), 5000);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="relative">
      <label htmlFor="avatar-upload" className="group cursor-pointer">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 ${
          success ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
        }`}>
          {uploading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
          ) : success ? (
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </div>
        <input 
          id="avatar-upload" 
          type="file" 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>
      
      {error && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded-xl text-xs whitespace-nowrap z-10 max-w-xs">
          {error}
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;