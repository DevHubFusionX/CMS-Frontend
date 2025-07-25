import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModernEnhancedEditor from './ModernEnhancedEditor';

const ModernPostsHeader = ({ onCreatePost, stats }) => {
  const [showEnhancedEditor, setShowEnhancedEditor] = useState(false);
  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Content Management
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Create, manage, and publish your content with powerful tools and insights
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center items-center">
        <button
          onClick={() => setShowEnhancedEditor(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
          </svg>
          Create New Post
        </button>
      </div>
      
      {/* Enhanced Editor Modal */}
      <ModernEnhancedEditor 
        isOpen={showEnhancedEditor}
        onClose={() => setShowEnhancedEditor(false)}
      />
    </div>
  );
};

export default ModernPostsHeader;