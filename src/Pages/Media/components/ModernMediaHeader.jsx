import React, { useState, useRef } from 'react';
import { mediaService } from '../../../Services/mediaService';
import { useMedia } from '../../../Services/MediaContext';

const ModernMediaHeader = ({ onFileUpload, stats }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]);
  const fileInputRef = useRef(null);
  const { addMedia } = useMedia();

  const allowedFileTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/webm',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ];

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = [...e.dataTransfer.files];
    processFiles(files);
  };

  const handleFileInputChange = (e) => {
    const files = [...e.target.files];
    processFiles(files);
  };

  const processFiles = async (files) => {
    // Filter out unsupported file types
    const validFiles = files.filter(file =>
      allowedFileTypes.includes(file.type)
    );

    if (validFiles.length === 0) {
      alert('No valid files selected. Please select images, videos, or documents.');
      return;
    }

    if (validFiles.length !== files.length) {
      alert(`${files.length - validFiles.length} file(s) were skipped due to unsupported format.`);
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

      // Call the callback with uploaded files
      if (uploadedFiles.length > 0) {
        addMedia(uploadedFiles);
        onFileUpload && onFileUpload(uploadedFiles);
      }
    }, 1000);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Media Library</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your images, videos, and documents</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stats?.total || 0} total files
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stats?.images || 0} images
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stats?.videos || 0} videos
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleButtonClick}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Upload Files
          </button>
        </div>
      </div>

      {/* Drag & Drop Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${isDragOver
          ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 scale-105'
          : 'border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${isDragOver
            ? 'bg-blue-500 text-white scale-110'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
            }`}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${isDragOver ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
            }`}>
            {isDragOver ? 'Drop files here' : 'Upload your media'}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Drag and drop files here, or click to browse
          </p>

          <button
            onClick={handleButtonClick}
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Choose Files
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          />

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Supported formats: Images (JPG, PNG, GIF, WebP), Videos (MP4, WebM), Documents (PDF, DOC, XLS, PPT)
          </p>
        </div>
      </div>

      {/* Upload Progress */}
      {uploading && uploadProgress.length > 0 && (
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Uploading Files
          </h3>
          <div className="space-y-3">
            {uploadProgress.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                      {item.name}
                    </span>
                    <span className={`text-xs font-medium ${item.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                      item.status === 'error' ? 'text-red-600 dark:text-red-400' :
                        'text-blue-600 dark:text-blue-400'
                      }`}>
                      {item.status === 'completed' ? 'Complete' :
                        item.status === 'error' ? 'Failed' :
                          `${item.progress}%`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${item.status === 'completed' ? 'bg-green-500' :
                        item.status === 'error' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {item.status === 'completed' && (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {item.status === 'error' && (
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {item.status === 'uploading' && (
                    <svg className="w-5 h-5 text-blue-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernMediaHeader;