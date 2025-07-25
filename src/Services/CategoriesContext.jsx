import React, { createContext, useContext, useState, useEffect } from 'react';
import { categoriesService } from './api';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoriesService.getAllCategories();
      setCategories(response.data);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error(err);
      setLoading(false);
    }
  };

  // Add category
  const addCategory = async (categoryData) => {
    try {
      setLoading(true);
      const response = await categoriesService.createCategory(categoryData);
      const newCategory = response.data;
      setCategories([...categories, newCategory]);
      setLoading(false);
      return newCategory;
    } catch (err) {
      setError('Failed to add category');
      console.error(err);
      setLoading(false);
      throw err;
    }
  };

  // Update category
  const updateCategory = async (id, categoryData) => {
    try {
      setLoading(true);
      const response = await categoriesService.updateCategory(id, categoryData);
      const updatedCategory = response.data;
      setCategories(categories.map(category => 
        category._id === id ? updatedCategory : category
      ));
      setLoading(false);
      return updatedCategory;
    } catch (err) {
      setError('Failed to update category');
      console.error(err);
      setLoading(false);
      throw err;
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      await categoriesService.deleteCategory(id);
      setCategories(categories.filter(category => category._id !== id));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError('Failed to delete category');
      console.error(err);
      setLoading(false);
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{
      categories,
      loading,
      error,
      fetchCategories,
      addCategory,
      updateCategory,
      deleteCategory
    }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);