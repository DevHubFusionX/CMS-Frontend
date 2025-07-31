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
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{backgroundColor: 'var(--color-primary)'}}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'var(--color-primary-content)'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{color: 'var(--color-base-content)'}}>Media Library</h1>
              <p className="opacity-70" style={{color: 'var(--color-base-content)'}}>Manage your images, videos, and documents</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: 'var(--color-primary)'}}></div>
              <span className="text-sm opacity-70" style={{color: 'var(--color-base-content)'}}>
                {stats?.total || 0} total files
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: 'var(--color-success)'}}></div>
              <span className="text-sm opacity-70" style={{color: 'var(--color-base-content)'}}>
                {stats?.images || 0} images
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: 'var(--color-secondary)'}}></div>
              <span className="text-sm opacity-70" style={{color: 'var(--color-base-content)'}}>
                {stats?.videos || 0} videos
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleButtonClick}
            className="inline-flex items-center px-6 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-content)'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-primary)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-primary)'}
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
        className="relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300"
        style={{
          borderColor: isDragOver ? 'var(--color-primary)' : 'var(--color-base-300)',
          backgroundColor: isDragOver ? 'var(--color-base-300)' : 'var(--color-base-200)',
          transform: isDragOver ? 'scale(1.05)' : 'scale(1)'
        }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <div 
            className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300"
            style={{
              backgroundColor: isDragOver ? 'var(--color-primary)' : 'var(--color-base-300)',
              color: isDragOver ? 'var(--color-primary-content)' : 'var(--color-base-content)',
              opacity: isDragOver ? 1 : 0.5,
              transform: isDragOver ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <h3 
            className="text-lg font-semibold mb-2 transition-colors duration-300"
            style={{color: isDragOver ? 'var(--color-primary)' : 'var(--color-base-content)'}}
          >
            {isDragOver ? 'Drop files here' : 'Upload your media'}
          </h3>

          <p className="opacity-70 mb-4" style={{color: 'var(--color-base-content)'}}>
            Drag and drop files here, or click to browse
          </p>

          <button
            onClick={handleButtonClick}
            className="inline-flex items-center px-6 py-3 border rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            style={{
              backgroundColor: 'var(--color-base-100)',
              borderColor: 'var(--color-base-300)',
              color: 'var(--color-base-content)'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-base-200)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-base-100)'}
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

          <p className="text-xs opacity-50 mt-4" style={{color: 'var(--color-base-content)'}}>
            Supported formats: Images (JPG, PNG, GIF, WebP), Videos (MP4, WebM), Documents (PDF, DOC, XLS, PPT)
          </p>
        </div>
      </div>

      {/* Upload Progress */}
      {uploading && uploadProgress.length > 0 && (
        <div className="rounded-2xl border shadow-lg p-6" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
          <h3 className="text-lg font-semibold mb-4 flex items-center" style={{color: 'var(--color-base-content)'}}>
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
                    <span className="text-sm font-medium truncate" style={{color: 'var(--color-base-content)'}}>
                      {item.name}
                    </span>
                    <span 
                      className="text-xs font-medium"
                      style={{color: item.status === 'completed' ? 'var(--color-success)' :
                        item.status === 'error' ? 'var(--color-error)' :
                          'var(--color-primary)'
                      }}
                    >
                      {item.status === 'completed' ? 'Complete' :
                        item.status === 'error' ? 'Failed' :
                          `${item.progress}%`}
                    </span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{backgroundColor: 'var(--color-base-300)'}}>
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: item.status === 'completed' ? 'var(--color-success)' :
                          item.status === 'error' ? 'var(--color-error)' :
                            'var(--color-primary)',
                        width: `${item.progress}%`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {item.status === 'completed' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'var(--color-success)'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {item.status === 'error' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'var(--color-error)'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {item.status === 'uploading' && (
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'var(--color-primary)'}}>
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