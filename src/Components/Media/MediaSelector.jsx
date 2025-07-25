import React, { useState } from 'react';
import { useMedia } from '../../Services/MediaContext';
import FileUploadSection from './FileUploadSection';

const MediaSelector = ({ onSelect, selectedMedia = null, multiple = false }) => {
  const { mediaItems, loading, addMedia } = useMedia();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('library'); // 'library' or 'upload'
  const [selectedItems, setSelectedItems] = useState(
    selectedMedia ? (Array.isArray(selectedMedia) ? selectedMedia : [selectedMedia]) : []
  );
  
  const handleSelect = (item) => {
    const itemId = item._id || item.id;
    if (multiple) {
      // For multiple selection
      const isSelected = selectedItems.some(selected => (selected._id || selected.id) === itemId);
      if (isSelected) {
        setSelectedItems(selectedItems.filter(selected => (selected._id || selected.id) !== itemId));
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    } else {
      // For single selection
      setSelectedItems([item]);
      onSelect(item);
    }
  };
  
  const handleConfirm = () => {
    if (multiple) {
      onSelect(selectedItems);
    }
  };

  const handleFileUpload = (uploadedFiles) => {
    // Add uploaded files to media context
    addMedia(uploadedFiles);
    
    // Switch back to library tab to show uploaded files
    setActiveTab('library');
    
    // Auto-select uploaded files if in selection mode
    if (multiple) {
      setSelectedItems(prev => [...prev, ...uploadedFiles]);
    } else if (uploadedFiles.length > 0) {
      onSelect(uploadedFiles[0]);
    }
  };
  
  const filteredMedia = mediaItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const isSelected = (item) => {
    const itemId = item._id || item.id;
    return selectedItems.some(selected => (selected._id || selected.id) === itemId);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-4">
          <button
            onClick={() => setActiveTab('library')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'library'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Media Library</span>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs">
                {mediaItems.length}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'upload'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>Upload Files</span>
            </div>
          </button>
        </nav>
      </div>

      <div className="p-4">
        {activeTab === 'library' ? (
          <>
            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search media..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            
            {/* Media Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
                  <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-80 overflow-y-auto p-1">
                  {filteredMedia.length > 0 ? (
                    filteredMedia.map(item => (
                      <div 
                        key={`media-${item._id || item.id}`}
                        onClick={() => handleSelect(item)}
                        className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 hover:shadow-lg ${
                          isSelected(item) 
                            ? 'border-blue-500 shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20' 
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="h-24 bg-gray-100 dark:bg-gray-700">
                          {item.mimetype?.startsWith('image/') ? (
                            <img 
                              src={item.url || item.path} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : item.mimetype?.startsWith('video/') ? (
                            <div className="w-full h-full flex items-center justify-center bg-purple-100 dark:bg-purple-900/30">
                              <svg className="h-8 w-8 text-purple-500 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                              <svg className="h-8 w-8 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          {/* Fallback for broken images */}
                          <div className="w-full h-full items-center justify-center bg-gray-200 dark:bg-gray-600 hidden">
                            <svg className="h-8 w-8 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* File Name */}
                        <div className="p-2 bg-white dark:bg-gray-800">
                          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate" title={item.name}>
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {item.size ? `${Math.round(item.size / 1024)} KB` : 'Unknown size'}
                          </p>
                        </div>
                        
                        {/* Selected Indicator */}
                        {isSelected(item) && (
                          <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1 shadow-lg">
                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No media found</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        {searchTerm ? 'Try a different search term' : 'Upload some files to get started'}
                      </p>
                      {!searchTerm && (
                        <button
                          onClick={() => setActiveTab('upload')}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          Upload Files
                        </button>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Confirm Button (for multiple selection) */}
                {multiple && selectedItems.length > 0 && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleConfirm}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                      Select {selectedItems.length} file{selectedItems.length !== 1 ? 's' : ''}
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          /* Upload Tab */
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Upload New Files</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Drag and drop files here or click to browse
              </p>
            </div>
            <FileUploadSection onFileUpload={handleFileUpload} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaSelector;