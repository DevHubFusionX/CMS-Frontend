import React, { useState } from 'react';
import MediaModal from './MediaModal';

const MediaField = ({ label, value, onChange, multiple = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(value || (multiple ? [] : null));
  
  const handleSelect = (media) => {
    setSelectedMedia(media);
    onChange(media);
  };
  
  const handleRemove = (id) => {
    if (multiple) {
      const newSelection = selectedMedia.filter(item => item.id !== id);
      setSelectedMedia(newSelection);
      onChange(newSelection);
    } else {
      setSelectedMedia(null);
      onChange(null);
    }
  };
  
  const renderPreview = () => {
    if (multiple) {
      if (!selectedMedia || selectedMedia.length === 0) {
        return (
          <div className="text-gray-500 text-sm">
            No media selected
          </div>
        );
      }
      
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {selectedMedia.map(item => (
            <div key={item.id} className="relative group">
              <div className="h-24 bg-gray-100 rounded-lg overflow-hidden">
                {item.type === 'image' ? (
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                ) : item.type === 'video' ? (
                  <div className="w-full h-full flex items-center justify-center bg-purple-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-red-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                className="absolute top-1 right-1 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      );
    } else {
      if (!selectedMedia) {
        return (
          <div className="text-gray-500 text-sm">
            No media selected
          </div>
        );
      }
      
      return (
        <div className="relative group inline-block">
          <div className="h-32 w-32 bg-gray-100 rounded-lg overflow-hidden">
            {selectedMedia.type === 'image' ? (
              <img src={selectedMedia.url} alt={selectedMedia.name} className="w-full h-full object-cover" />
            ) : selectedMedia.type === 'video' ? (
              <div className="w-full h-full flex items-center justify-center bg-purple-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-red-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => handleRemove(selectedMedia.id)}
            className="absolute top-1 right-1 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      );
    }
  };
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <div className="mt-1">
        {renderPreview()}
      </div>
      
      <div className="mt-2">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {multiple ? 'Select Media Files' : 'Select Media File'}
        </button>
      </div>
      
      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelect}
        selectedMedia={selectedMedia}
        multiple={multiple}
      />
    </div>
  );
};

export default MediaField;