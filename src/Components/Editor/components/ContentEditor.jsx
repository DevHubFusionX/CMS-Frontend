import React from 'react';
import AdvancedEditor from '../AdvancedEditor';

const ContentEditor = ({ value, onChange, error }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Content
      </label>
      <AdvancedEditor
        value={value}
        onChange={onChange}
      />
      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default ContentEditor;