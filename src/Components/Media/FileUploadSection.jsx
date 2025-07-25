import React, { useState, useRef } from 'react';
import UploadProgress from './UploadProgress';
import { mediaService } from '../../Services/mediaService';

const FileUploadSection = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]);
  const fileInputRef = useRef(null);
  
  const allowedFileTypes = [
    'image/jpeg', 'image/png', 'image/gif', 
    'video/mp4', 
    'application/pdf'
  ];
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = [...e.dataTransfer.files];
    processFiles(files);
  };
  
  const handleFileInputChange = (e) => {
    const files = [...e.target.files];
    if (files.length > 0) {
      processFiles(files);
      // Reset the input to allow selecting the same file again
      e.target.value = '';
    }
  };
  
  const processFiles = async (files) => {
    // Filter out unsupported file types
    const validFiles = files.filter(file => 
      allowedFileTypes.includes(file.type)
    );
    
    if (validFiles.length === 0) {
      alert('No valid files selected. Supported formats: JPG, PNG, GIF, MP4, PDF');
      return;
    }
    
    // Set up progress tracking
    setUploading(true);
    setUploadProgress(
      validFiles.map(file => ({
        name: file.name,
        progress: 0,
        status: 'uploading'
      }))
    );
    
    // Upload files one by one
    const uploadedFiles = [];
    
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      
      try {
        // Create FormData for this file
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', file.name);
        
        // Update progress to show uploading
        setUploadProgress(prev => {
          const newProgress = [...prev];
          newProgress[i] = { ...newProgress[i], progress: 50, status: 'uploading' };
          return newProgress;
        });
        
        // Upload the file
        const response = await mediaService.uploadMedia(formData);
        
        // Update progress to show completion
        setUploadProgress(prev => {
          const newProgress = [...prev];
          newProgress[i] = { ...newProgress[i], progress: 100, status: 'completed' };
          return newProgress;
        });
        
        uploadedFiles.push(response.data);
        
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        
        // Update progress to show error
        setUploadProgress(prev => {
          const newProgress = [...prev];
          newProgress[i] = { ...newProgress[i], progress: 0, status: 'error' };
          return newProgress;
        });
        
        alert(`Failed to upload ${file.name}: ${error.message}`);
      }
    }
    
    // Clean up after a short delay
    setTimeout(() => {
      setUploading(false);
      setUploadProgress([]);
      
      // Call the callback with uploaded files only once
      if (uploadedFiles.length > 0 && onFileUpload) {
        onFileUpload(uploadedFiles);
      }
    }, 1000);
  };
  
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
      <div
        className={`flex flex-col items-center justify-center py-8 ${
          isDragging ? 'bg-blue-50 border border-blue-300 rounded-lg' : ''
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        
        <p className="text-lg text-gray-700 font-medium mb-2">
          Drag and drop files here
        </p>
        <p className="text-sm text-gray-500 mb-4">
          or click to browse your files
        </p>
        
        <button
          type="button"
          onClick={handleButtonClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Upload Media
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="hidden"
          multiple
          accept=".jpg,.jpeg,.png,.gif,.mp4,.pdf"
        />
        
        <p className="text-xs text-gray-500 mt-4">
          Supported formats: JPG, PNG, GIF, MP4, PDF
        </p>
      </div>
      
      {/* Upload Progress */}
      {uploading && uploadProgress.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Uploading Files</h3>
          <div className="space-y-3">
            {uploadProgress.map((item, index) => (
              <UploadProgress
                key={index}
                fileName={item.name}
                progress={item.progress}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadSection;