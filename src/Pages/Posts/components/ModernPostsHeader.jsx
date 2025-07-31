import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../Context/ThemeContext';
import ModernEnhancedEditor from './ModernEnhancedEditor';


const ModernPostsHeader = ({ onCreatePost, stats, title = 'Content Library' }) => {
  const { theme } = useTheme();
  const [showEnhancedEditor, setShowEnhancedEditor] = useState(false);
  
  return (
    <div className="space-y-8">
      {/* Title Section */}
      <div className="text-left space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl" style={{
            background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
            color: 'var(--color-primary-content)'
          }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{color: 'var(--color-base-content)'}}>
              {title}
            </h1>
            <p className="text-sm sm:text-base mt-1" style={{color: 'var(--color-base-content)', opacity: 0.7}}>
              Manage and organize your published content
            </p>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium" style={{color: 'var(--color-base-content)', opacity: 0.8}}>
            {stats?.total || 0} articles total
          </span>
        </div>
        <button
          onClick={() => setShowEnhancedEditor(true)}
          className="px-5 py-2.5 font-medium rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 border"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-content)',
            borderColor: 'var(--color-primary)'
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Article
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