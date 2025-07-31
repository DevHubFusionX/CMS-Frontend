import React from 'react';
import ModernEnhancedForm from './components/ModernEnhancedForm';

const EnhancedFormWrapper = ({ 
  initialData = {}, 
  onSaveDraft, 
  onPublish, 
  loading, 
  isEditing = false 
}) => {
  return (
    <ModernEnhancedForm
      initialData={initialData}
      onSubmit={onSaveDraft}
      loading={loading}
      submitButtonText={isEditing ? "Update Post" : "Create Post"}
      isEditing={isEditing}
    />
  );
};

export default EnhancedFormWrapper;