import React, { useState } from 'react';
import { changePostStatus } from '../../Utils/postStatusHelper';

const BulkStatusChanger = ({ selectedPosts, onStatusChanged }) => {
  const [loading, setLoading] = useState(false);
  const [newStatus, setNewStatus] = useState('published');

  const handleBulkStatusChange = async () => {
    if (selectedPosts.length === 0) {
      alert('Please select posts to update');
      return;
    }

    setLoading(true);
    let successCount = 0;
    let failCount = 0;

    try {
      // Update each selected post
      for (const postId of selectedPosts) {
        const result = await changePostStatus(postId, newStatus);
        if (result.success) {
          successCount++;
        } else {
          failCount++;
        }
      }

      // Show results
      if (successCount > 0) {
        alert(`Successfully updated ${successCount} post(s) to ${newStatus}`);
        onStatusChanged && onStatusChanged();
      }
      
      if (failCount > 0) {
        alert(`Failed to update ${failCount} post(s)`);
      }
    } catch (error) {
      console.error('Bulk status change error:', error);
      alert('An error occurred during bulk update');
    } finally {
      setLoading(false);
    }
  };

  if (selectedPosts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {selectedPosts.length} post(s) selected
        </span>
        
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="draft">Change to Draft</option>
          <option value="published">Change to Published</option>
          <option value="scheduled">Change to Scheduled</option>
        </select>
        
        <button
          onClick={handleBulkStatusChange}
          disabled={loading}
          className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Updating...</span>
            </div>
          ) : (
            'Update Status'
          )}
        </button>
      </div>
    </div>
  );
};

export default BulkStatusChanger;