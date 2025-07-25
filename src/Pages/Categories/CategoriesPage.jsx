import React, { useState, useMemo } from 'react';
import { useCategories } from '../../Services/CategoriesContext';
import ModernCategoriesHeader from './components/ModernCategoriesHeader';
import CategoriesStats from './components/CategoriesStats';
import CategoriesFilters from './components/CategoriesFilters';
import ModernCategoriesGrid from './components/ModernCategoriesGrid';
import ModernCategoryForm from './components/ModernCategoryForm';

const CategoriesPage = () => {
  const { categories, loading, addCategory, updateCategory, deleteCategory } = useCategories();
  const [editingCategory, setEditingCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Filter categories based on search term
  const filteredCategories = useMemo(() => {
    return categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [categories, searchTerm]);

  // Calculate stats
  const categoriesStats = {
    total: categories.length,
    active: categories.filter(cat => cat.status !== 'inactive').length,
    postsCount: categories.reduce((sum, cat) => sum + (cat.postCount || 0), 0),
    mostPopular: categories.length > 0 ? categories.reduce((prev, current) => 
      (prev.postCount || 0) > (current.postCount || 0) ? prev : current
    ).name : 'N/A'
  };

  const handleAddCategory = async (categoryData) => {
    try {
      await addCategory(categoryData);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleUpdateCategory = async (categoryData) => {
    try {
      await updateCategory(editingCategory.id || editingCategory._id, categoryData);
      setEditingCategory(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
    }
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          <ModernCategoriesHeader 
            onCreateCategory={handleCreateCategory}
            stats={categoriesStats}
          />
          
          <CategoriesStats stats={categoriesStats} />
          
          <CategoriesFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalItems={filteredCategories.length}
          />
          
          <ModernCategoriesGrid 
            loading={loading}
            categories={filteredCategories}
            onEdit={handleEditClick}
            onDelete={handleDeleteCategory}
            viewMode={viewMode}
          />
        </div>
      </div>
      
      {/* Category Form Modal */}
      <ModernCategoryForm 
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        initialValues={editingCategory || {}}
        onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}
        isEditing={!!editingCategory}
      />
    </div>
  );
};

export default CategoriesPage;