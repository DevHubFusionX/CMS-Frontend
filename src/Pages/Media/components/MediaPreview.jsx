import React from 'react';

const MediaPreview = ({ media, size = "w-full h-full" }) => {
  const getFileTypeFromMimetype = (mimetype) => {
    if (!mimetype) return 'unknown';
    
    if (mimetype.startsWith('image/')) return 'image';
    if (mimetype.startsWith('video/')) return 'video';
    if (mimetype.includes('pdf')) return 'pdf';
    if (mimetype.includes('word') || mimetype.includes('document')) return 'document';
    if (mimetype.includes('sheet') || mimetype.includes('excel')) return 'spreadsheet';
    if (mimetype.includes('presentation') || mimetype.includes('powerpoint')) return 'presentation';
    
    return 'file';
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const fileType = media.type || getFileTypeFromMimetype(media.mimetype);
  const fileSize = formatFileSize(media.size);

  if (fileType === 'image') {
    return (
      <div className={`${size} relative overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-lg`}>
        <img 
          src={media.url || media.path} 
          alt={media.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback for broken images */}
        <div className="w-full h-full items-center justify-center bg-gray-200 dark:bg-gray-600 hidden">
          <div className="text-center">
            <svg className="w-8 h-8 mx-auto text-gray-400 dark:text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-gray-500 dark:text-gray-400">Image unavailable</p>
          </div>
        </div>
        
        {/* Image overlay info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-xs truncate">{media.name}</p>
          <p className="text-white/80 text-xs">{fileSize}</p>
        </div>
      </div>
    );
  }

  if (fileType === 'video') {
    return (
      <div className={`${size} relative overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto text-purple-600 dark:text-purple-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-purple-800 dark:text-purple-300 text-xs font-medium">Video</p>
          <p className="text-purple-600 dark:text-purple-400 text-xs">{fileSize}</p>
        </div>
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // File type icons and colors
  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return {
          icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          ),
          bgColor: 'from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30',
          textColor: 'text-red-600 dark:text-red-400',
          label: 'PDF'
        };
      case 'document':
        return {
          icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          bgColor: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
          textColor: 'text-blue-600 dark:text-blue-400',
          label: 'DOC'
        };
      case 'spreadsheet':
        return {
          icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0V4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V10z" />
            </svg>
          ),
          bgColor: 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30',
          textColor: 'text-green-600 dark:text-green-400',
          label: 'XLS'
        };
      case 'presentation':
        return {
          icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v14a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1h1m0 0h8m-8 0v16h8V4H7z" />
            </svg>
          ),
          bgColor: 'from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30',
          textColor: 'text-orange-600 dark:text-orange-400',
          label: 'PPT'
        };
      default:
        return {
          icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          bgColor: 'from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600',
          textColor: 'text-gray-600 dark:text-gray-400',
          label: 'FILE'
        };
    }
  };

  const fileInfo = getFileIcon(fileType);

  return (
    <div className={`${size} relative overflow-hidden bg-gradient-to-br ${fileInfo.bgColor} rounded-lg flex items-center justify-center`}>
      <div className="text-center">
        <div className={`mx-auto mb-2 ${fileInfo.textColor}`}>
          {fileInfo.icon}
        </div>
        <p className={`${fileInfo.textColor} text-xs font-medium mb-1`}>{fileInfo.label}</p>
        <p className={`${fileInfo.textColor} text-xs opacity-75`}>{fileSize}</p>
      </div>
      
      {/* File name overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-xs truncate">{media.name}</p>
      </div>
    </div>
  );
};

export default MediaPreview;