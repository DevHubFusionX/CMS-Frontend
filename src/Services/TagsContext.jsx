import React, { createContext, useContext, useState, useEffect } from 'react';
import { tagsService } from './api';

const TagsContext = createContext();

export const TagsProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tags
  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await tagsService.getAllTags();
      setTags(response.data);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tags');
      console.error(err);
      setLoading(false);
    }
  };

  // Add tag
  const addTag = async (tagData) => {
    try {
      setLoading(true);
      const response = await tagsService.createTag(tagData);
      const newTag = response.data;
      setTags([...tags, newTag]);
      setLoading(false);
      return newTag;
    } catch (err) {
      setError('Failed to add tag');
      console.error(err);
      setLoading(false);
      throw err;
    }
  };

  // Update tag
  const updateTag = async (id, tagData) => {
    try {
      setLoading(true);
      const response = await tagsService.updateTag(id, tagData);
      const updatedTag = response.data;
      setTags(tags.map(tag => tag._id === id ? updatedTag : tag));
      setLoading(false);
      return updatedTag;
    } catch (err) {
      setError('Failed to update tag');
      console.error(err);
      setLoading(false);
      throw err;
    }
  };

  // Delete tag
  const deleteTag = async (id) => {
    try {
      setLoading(true);
      await tagsService.deleteTag(id);
      setTags(tags.filter(tag => tag._id !== id));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError('Failed to delete tag');
      console.error(err);
      setLoading(false);
      throw err;
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <TagsContext.Provider value={{
      tags,
      loading,
      error,
      fetchTags,
      addTag,
      updateTag,
      deleteTag
    }}>
      {children}
    </TagsContext.Provider>
  );
};

export const useTags = () => useContext(TagsContext);