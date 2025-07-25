import React, { useState } from 'react';
import FileUploadSection from '../../Components/Media/FileUploadSection';
import MediaModal from '../../Components/Media/MediaModal';
import { useMedia } from '../../Services';
import ModernMediaHeader from './components/ModernMediaHeader';
import ModernMediaFilters from './components/ModernMediaFilters';
import ModernMediaGrid from './components/ModernMediaGrid';
import MediaStats from './components/MediaStats';
import { useMediaFilters } from './hooks/useMediaFilters';
import { useMediaSelection } from './hooks/useMediaSelection';

const MediaPage = () => {
  const { mediaItems, loading, addMedia, deleteMedia, canUploadMedia, canDeleteMedia } = useMedia();
  const [viewMode, setViewMode] = useState('grid');
  
  const {
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    filteredAndSortedMedia
  } = useMediaFilters(mediaItems);
  
  const {
    showMediaModal,
    selectedMedia,
    multipleSelectedMedia,
    setSelectedMedia,
    setMultipleSelectedMedia,
    handleShowModal,
    handleCloseModal,
    handleSelectMedia
  } = useMediaSelection();
  
  const handleFileUpload = (newFiles) => {
    addMedia(newFiles);
  };
  
  const mediaStats = {
    total: mediaItems.length,
    images: mediaItems.filter(item => item.type === 'image').length,
    videos: mediaItems.filter(item => item.type === 'video').length,
    documents: mediaItems.filter(item => item.type === 'document').length
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          <ModernMediaHeader 
            onFileUpload={canUploadMedia() ? handleFileUpload : null}
            stats={mediaStats}
            canUpload={canUploadMedia()}
          />
          
          <MediaStats stats={mediaStats} />
          
          <ModernMediaFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterType={filterType}
            onFilterChange={setFilterType}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortDirection={sortDirection}
            onSortDirectionChange={setSortDirection}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalItems={filteredAndSortedMedia.length}
          />
          
          <ModernMediaGrid 
            loading={loading}
            mediaItems={filteredAndSortedMedia}
            onDelete={deleteMedia}
            canDeleteMedia={canDeleteMedia}
            viewMode={viewMode}
          />
        </div>
      </div>
      
      {showMediaModal && (
        <MediaModal
          onClose={handleCloseModal}
          onSelect={handleSelectMedia}
          multiple={multipleSelectedMedia.length > 0}
          selectedMedia={multipleSelectedMedia.length > 0 ? multipleSelectedMedia : selectedMedia ? [selectedMedia] : []}
        />
      )}
    </div>
  );
};

export default MediaPage;