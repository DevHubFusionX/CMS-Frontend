import { useState, useMemo } from 'react';

export const useMediaFilters = (mediaItems) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const getFileType = (item) => {
    if (item.type) return item.type;
    if (item.mimetype) {
      if (item.mimetype.startsWith('image/')) return 'image';
      if (item.mimetype.startsWith('video/')) return 'video';
      if (item.mimetype.includes('pdf')) return 'pdf';
      if (item.mimetype.includes('document') || item.mimetype.includes('word') || 
          item.mimetype.includes('sheet') || item.mimetype.includes('presentation')) return 'document';
    }
    return 'file';
  };

  const filteredAndSortedMedia = useMemo(() => {
    let filtered = [...mediaItems];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(item => {
        const itemType = getFileType(item);
        return itemType === filterType;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'size':
          aValue = a.size || 0;
          bValue = b.size || 0;
          break;
        case 'type':
          aValue = getFileType(a);
          bValue = getFileType(b);
          break;
        case 'createdAt':
        default:
          aValue = new Date(a.createdAt || a.dateUploaded || 0);
          bValue = new Date(b.createdAt || b.dateUploaded || 0);
          break;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [mediaItems, searchTerm, filterType, sortBy, sortDirection]);

  return {
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    filteredAndSortedMedia
  };
};