import React, { useState } from 'react';
import MediaPreview from './MediaPreview';

const ModernMediaGrid = ({ loading, mediaItems, onDelete, canDeleteMedia, viewMode }) => {
  const [previewItem, setPreviewItem] = useState(null);

  const handlePreview = (item) => {
    setPreviewItem(item);
  };

  const closePreview = () => {
    setPreviewItem(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-base-300 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="text-base-content opacity-70 font-medium">Loading your media files...</p>
      </div>
    );
  }

  if (mediaItems.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-base-300 rounded-2xl flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-base-content opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-base-content mb-2">No media files found</h3>
        <p className="text-base-content opacity-70 mb-6">Upload some files to get started with your media library</p>
        <button className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-content font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Upload Files
        </button>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-base-200 rounded-2xl border border-base-300 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-base-300">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-base-content opacity-70 uppercase tracking-wider">File</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-base-content opacity-70 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-base-content opacity-70 uppercase tracking-wider">Size</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-base-content opacity-70 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-base-content opacity-70 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-300">
              {mediaItems.map((item, index) => (
                <tr key={`${item._id || item.id || 'item'}-${index}`} className="hover:bg-base-300/50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MediaPreview media={item} size="w-12 h-12" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-base-content truncate max-w-xs">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content opacity-70">
                    {item.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content opacity-70">
                    {new Date(item.dateUploaded || item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handlePreview(item)}
                        className="p-2 text-base-content opacity-50 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {(canDeleteMedia ? canDeleteMedia(item) : true) && (
                        <button
                          onClick={() => onDelete(item._id || item.id)}
                          className="p-2 text-base-content opacity-50 hover:text-error hover:bg-error/10 rounded-lg transition-all duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
        {mediaItems.map((item, index) => (
          <div
            key={`${item._id || item.id || 'item'}-${index}`}
            className="group bg-base-200 rounded-2xl border border-base-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div className="aspect-square relative overflow-hidden">
              <MediaPreview media={item} size="w-full h-full" />

              {/* Mobile-friendly action buttons - always visible on small screens, hover on desktop */}
              <div className="absolute top-2 right-2 flex space-x-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handlePreview(item)}
                  className="p-1.5 bg-base-100/90 hover:bg-base-100 text-base-content rounded-lg shadow-lg backdrop-blur-sm transition-all duration-200"
                  title="Preview"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                {(canDeleteMedia ? canDeleteMedia(item) : true) && (
                  <button
                    onClick={() => onDelete(item._id || item.id)}
                    className="p-1.5 bg-error/90 hover:bg-error text-error-content rounded-lg shadow-lg backdrop-blur-sm transition-all duration-200"
                    title="Delete"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Desktop center overlay - hidden on mobile */}
              <div className="hidden sm:flex absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePreview(item)}
                    className="p-2 bg-base-100/90 hover:bg-base-100 text-base-content rounded-lg shadow-lg transform scale-90 hover:scale-100 transition-all duration-200"
                    title="Preview"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  {(canDeleteMedia ? canDeleteMedia(item) : true) && (
                    <button
                      onClick={() => onDelete(item._id || item.id)}
                      className="p-2 bg-error/90 hover:bg-error text-error-content rounded-lg shadow-lg transform scale-90 hover:scale-100 transition-all duration-200"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* File Info */}
            <div className="p-3 sm:p-4">
              <h3 className="font-medium text-base-content text-sm truncate mb-1">
                {item.name}
              </h3>
              <div className="flex items-center justify-between text-xs text-base-content opacity-70">
                <span className="capitalize">{item.type}</span>
                <span>{item.size}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={closePreview}>
          <div className="relative max-w-4xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closePreview}
              className="absolute -top-2 -right-2 z-10 bg-base-100 rounded-full p-2 shadow-lg hover:bg-base-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {previewItem.type === 'image' ? (
              <img
                src={previewItem.url}
                alt={previewItem.name}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            ) : previewItem.type === 'video' ? (
              <video
                src={previewItem.url}
                controls
                className="max-w-full max-h-full rounded-lg shadow-2xl"
              />
            ) : (
              <div className="bg-base-100 rounded-lg p-8 shadow-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-base-300 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-base-content opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-base-content mb-2">{previewItem.name}</h3>
                  <p className="text-base-content opacity-70 mb-4">File type: {previewItem.type}</p>
                  <a
                    href={previewItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ModernMediaGrid;