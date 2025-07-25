import React, { useState, useRef } from 'react';
import ModernEnhancedForm from './components/ModernEnhancedForm';

const EnhancedFormWrapper = ({ 
  initialData = {}, 
  onSaveDraft, 
  onPublish, 
  loading, 
  isEditing = false 
}) => {
  const [formData, setFormData] = useState(initialData);
  const formRef = useRef();

  const handleFormSubmit = (data) => {
    setFormData(data);
    // Default to draft if no specific action
    onSaveDraft && onSaveDraft(data);
  };

  const handleSaveDraft = () => {
    if (formRef.current) {
      formRef.current.getCurrentFormData((data) => {
        onSaveDraft && onSaveDraft(data);
      });
    } else {
      onSaveDraft && onSaveDraft(formData);
    }
  };

  const handlePublish = () => {
    if (formRef.current) {
      formRef.current.getCurrentFormData((data) => {
        onPublish && onPublish(data);
      });
    } else {
      onPublish && onPublish(formData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Content */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
        <ModernEnhancedForm
          ref={formRef}
          initialData={initialData}
          onSubmit={handleFormSubmit}
          loading={loading}
          submitButtonText="Save"
          isEditing={isEditing}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <button
          onClick={handleSaveDraft}
          disabled={loading}
          className={`px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center space-x-2 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              <span>Save Draft</span>
            </>
          )}
        </button>

        <button
          onClick={handlePublish}
          disabled={loading}
          className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Publishing...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>{isEditing ? 'Update & Publish' : 'Publish'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EnhancedFormWrapper;