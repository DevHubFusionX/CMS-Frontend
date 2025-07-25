import { useState } from 'react';

export const useMediaSelection = () => {
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [multipleSelectedMedia, setMultipleSelectedMedia] = useState([]);

  const handleShowModal = () => {
    setShowMediaModal(true);
  };

  const handleCloseModal = () => {
    setShowMediaModal(false);
    setSelectedMedia(null);
    setMultipleSelectedMedia([]);
  };

  const handleSelectMedia = (media) => {
    if (Array.isArray(media)) {
      setMultipleSelectedMedia(media);
    } else {
      setSelectedMedia(media);
    }
    setShowMediaModal(false);
  };

  return {
    showMediaModal,
    selectedMedia,
    multipleSelectedMedia,
    setSelectedMedia,
    setMultipleSelectedMedia,
    handleShowModal,
    handleCloseModal,
    handleSelectMedia
  };
};