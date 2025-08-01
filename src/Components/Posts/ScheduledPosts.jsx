import React, { useState, useEffect } from 'react';
import { usePosts } from '../../Services/PostsContext';

const ScheduledPosts = () => {
  const { posts } = usePosts();
  const [scheduledPosts, setScheduledPosts] = useState([]);

  useEffect(() => {
    const scheduled = posts.filter(post => post.status === 'scheduled');
    setScheduledPosts(scheduled);
  }, [posts]);

  const formatScheduledDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getTimeUntilPublish = (dateString) => {
    const scheduledDate = new Date(dateString);
    const now = new Date();
    const diff = scheduledDate - now;
    
    if (diff <= 0) return 'Publishing soon...';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  if (scheduledPosts.length === 0) {
    return (
      <div className="rounded-xl p-6 border text-center" style={{
        backgroundColor: 'var(--color-base-200)',
        borderColor: 'var(--color-base-300)'
      }}>
        <div className="text-4xl mb-2">📅</div>
        <h3 className="text-lg font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
          No Scheduled Posts
        </h3>
        <p className="text-sm opacity-70" style={{color: 'var(--color-base-content)'}}>
          Posts scheduled for future publication will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-6 border" style={{
      backgroundColor: 'var(--color-base-200)',
      borderColor: 'var(--color-base-300)'
    }}>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{color: 'var(--color-base-content)'}}>
        <span>📅</span>
        Scheduled Posts ({scheduledPosts.length})
      </h3>
      
      <div className="space-y-3">
        {scheduledPosts.map(post => (
          <div key={post._id} className="flex items-center justify-between p-3 rounded-lg border" style={{
            backgroundColor: 'var(--color-base-100)',
            borderColor: 'var(--color-base-300)'
          }}>
            <div className="flex-1">
              <h4 className="font-medium text-sm" style={{color: 'var(--color-base-content)'}}>
                {post.title}
              </h4>
              <p className="text-xs opacity-70 mt-1" style={{color: 'var(--color-base-content)'}}>
                Scheduled: {formatScheduledDate(post.scheduledDate)}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium px-2 py-1 rounded" style={{
                backgroundColor: 'var(--color-warning)',
                color: 'var(--color-warning-content)'
              }}>
                {getTimeUntilPublish(post.scheduledDate)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduledPosts;