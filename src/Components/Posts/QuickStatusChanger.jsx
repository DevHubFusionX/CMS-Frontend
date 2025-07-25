import React, { useState } from 'react';
import { postsService } from '../../Services/api';

const QuickStatusChanger = ({ post, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(post.status);

  const statusOptions = [
    { value: 'draft', label: 'Draft', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
    { value: 'published', label: 'Published', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
    { value: 'scheduled', label: 'Scheduled', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' }
  ];

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus) return;

    setLoading(true);
    try {
      // Update post status via API
      await postsService.updatePost(post._id || post.id, {
        ...post,
        status: newStatus
      });

      setCurrentStatus(newStatus);
      onStatusChange && onStatusChange(post._id || post.id, newStatus);
      
      // Show success message
      const statusLabel = statusOptions.find(opt => opt.value === newStatus)?.label;
      alert(`Post status changed to ${statusLabel} successfully!`);
    } catch (error) {
      console.error('Error updating post status:', error);
      alert('Failed to update post status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStatusColor = () => {
    return statusOptions.find(opt => opt.value === currentStatus)?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="relative inline-block">
      <select
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={loading}
        className={`appearance-none px-3 py-1.5 pr-8 rounded-full text-xs font-medium border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all duration-200 ${getCurrentStatusColor()} ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {statusOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Custom dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        {loading ? (
          <svg className="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ) : (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default QuickStatusChanger;