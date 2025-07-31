import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

/**
 * VersionHistory component displays and manages content revisions
 * Works with TinyMCE autosave feature with theme support
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
    return <div className="p-4 text-center" style={{color: 'var(--color-base-content)'}}>Loading version history...</div>;
  }

  if (versions.length === 0) {
    return <div className="p-4 text-center" style={{color: 'var(--color-base-content)'}}>No previous versions found</div>;
  }

  return (
    <div className="version-history rounded-md p-4 border" style={{
      backgroundColor: 'var(--color-base-200)',
      borderColor: 'var(--color-base-300)',
      color: 'var(--color-base-content)'
    }}>
      <h3 className="text-lg font-medium mb-4">Version History</h3>
      
      <div className="versions-list space-y-2 max-h-80 overflow-y-auto">
        {versions.map((version, index) => (
          <div 
            key={version.id}
            className="version-item p-2 rounded cursor-pointer flex justify-between items-center"
            style={{
              backgroundColor: selectedVersion === version.id ? 'var(--color-primary)' : 'var(--color-base-100)',
              color: selectedVersion === version.id ? 'var(--color-primary-content)' : 'var(--color-base-content)'
            }}
            onClick={() => setSelectedVersion(version.id)}
          >
            <div>
              <div className="text-sm font-medium">
                {index === 0 ? 'Current Version' : `Version ${versions.length - index}`}
              </div>
              <div className="text-xs opacity-70">
                {format(version.date, 'MMM d, yyyy h:mm a')}
              </div>
            </div>
            
            <button
              className="px-3 py-1 text-xs rounded"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-accent-content)'
              }}
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