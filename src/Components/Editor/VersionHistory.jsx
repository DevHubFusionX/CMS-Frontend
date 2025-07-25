import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

/**
 * VersionHistory component displays and manages content revisions
 * Works with TinyMCE autosave feature to show version history
 */
const VersionHistory = ({ contentId, onRestoreVersion }) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState(null);

  useEffect(() => {
    // Fetch version history from local storage or API
    const fetchVersions = () => {
      setLoading(true);
      
      // For demo: Get versions from localStorage (TinyMCE autosave)
      // In production: Replace with API call to fetch versions from server
      const allKeys = Object.keys(localStorage);
      const versionKeys = allKeys.filter(key => 
        key.includes(`tinymce-autosave-`) && key.includes(`-${contentId}-`)
      );
      
      const versionData = versionKeys.map(key => {
        const savedData = JSON.parse(localStorage.getItem(key) || '{}');
        const timestamp = key.split('-').pop();
        return {
          id: key,
          timestamp: parseInt(timestamp, 10),
          date: new Date(parseInt(timestamp, 10)),
          content: savedData.content || '',
        };
      });
      
      // Sort by date (newest first)
      versionData.sort((a, b) => b.timestamp - a.timestamp);
      
      setVersions(versionData);
      setLoading(false);
    };
    
    if (contentId) {
      fetchVersions();
    }
  }, [contentId]);

  const handleRestore = (version) => {
    if (onRestoreVersion && version) {
      onRestoreVersion(version.content);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading version history...</div>;
  }

  if (versions.length === 0) {
    return <div className="p-4 text-center">No previous versions found</div>;
  }

  return (
    <div className="version-history bg-gray-800 text-white rounded-md p-4">
      <h3 className="text-lg font-medium mb-4">Version History</h3>
      
      <div className="versions-list space-y-2 max-h-80 overflow-y-auto">
        {versions.map((version, index) => (
          <div 
            key={version.id}
            className={`version-item p-2 rounded cursor-pointer hover:bg-gray-700 flex justify-between items-center ${
              selectedVersion === version.id ? 'bg-blue-900' : ''
            }`}
            onClick={() => setSelectedVersion(version.id)}
          >
            <div>
              <div className="text-sm font-medium">
                {index === 0 ? 'Current Version' : `Version ${versions.length - index}`}
              </div>
              <div className="text-xs text-gray-400">
                {format(version.date, 'MMM d, yyyy h:mm a')}
              </div>
            </div>
            
            <button
              className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
              onClick={(e) => {
                e.stopPropagation();
                handleRestore(version);
              }}
            >
              Restore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VersionHistory;