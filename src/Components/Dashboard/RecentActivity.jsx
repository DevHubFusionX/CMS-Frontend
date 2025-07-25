import React, { useState } from 'react';
import { useAnalytics } from '../../Services/AnalyticsContext';
import { Link } from 'react-router-dom';

/**
 * Enhanced Activity Item Component
 * 
 * A modern activity item with:
 * - Theme-aware styling for light/dark modes
 * - Rich visual indicators for different activity types
 * - Hover effects and interactive elements
 * - Time formatting and user avatars
 * - Action buttons for quick interactions
 */
const ActivityItem = ({ 
  title, 
  description, 
  time, 
  user, 
  type, 
  priority = 'normal',
  actionable = false,
  onAction 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const iconConfig = {
    create: { 
      bg: 'bg-green-100 dark:bg-green-900/30', 
      color: 'text-green-600 dark:text-green-400', 
      path: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
      label: 'Created'
    },
    update: { 
      bg: 'bg-blue-100 dark:bg-blue-900/30', 
      color: 'text-blue-600 dark:text-blue-400', 
      path: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      label: 'Updated'
    },
    delete: { 
      bg: 'bg-red-100 dark:bg-red-900/30', 
      color: 'text-red-600 dark:text-red-400', 
      path: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
      label: 'Deleted'
    },
    comment: { 
      bg: 'bg-purple-100 dark:bg-purple-900/30', 
      color: 'text-purple-600 dark:text-purple-400', 
      path: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
      label: 'Commented'
    },
    publish: { 
      bg: 'bg-emerald-100 dark:bg-emerald-900/30', 
      color: 'text-emerald-600 dark:text-emerald-400', 
      path: 'M5 3l14 9-14 9V3z',
      label: 'Published'
    },
    login: { 
      bg: 'bg-indigo-100 dark:bg-indigo-900/30', 
      color: 'text-indigo-600 dark:text-indigo-400', 
      path: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1',
      label: 'Logged in'
    },
    default: { 
      bg: 'bg-gray-100 dark:bg-gray-700', 
      color: 'text-gray-600 dark:text-gray-400', 
      path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      label: 'Activity'
    }
  };
  
  const config = iconConfig[type] || iconConfig.default;

  const formatTimeAgo = (timeString) => {
    const now = new Date();
    const activityTime = new Date(timeString);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const priorityClasses = {
    high: 'border-l-4 border-red-500 bg-red-50 dark:bg-red-900/10',
    medium: 'border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10',
    normal: ''
  };

  return (
    <div 
      className={`
        group relative py-4 px-4 rounded-lg transition-all duration-200 
        hover:bg-gray-50 dark:hover:bg-gray-700/50 
        ${priorityClasses[priority]}
        ${isHovered ? 'shadow-sm' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start space-x-4">
        {/* Activity Icon */}
        <div className={`${config.bg} rounded-xl p-2.5 shadow-sm group-hover:shadow-md transition-shadow duration-200`}>
          <svg className={`h-5 w-5 ${config.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.path} />
          </svg>
        </div>
        
        {/* Activity Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {title}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                {description}
              </p>
              
              {/* User and Time Info */}
              <div className="flex items-center mt-3 space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-medium shadow-sm">
                    {user.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {typeof user === 'string' ? user : (user?.displayName || user?.name || user?._id || 'Unknown User')}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formatTimeAgo(time)}</span>
                </div>
                
                {/* Activity Type Badge */}
                <span className={`
                  inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                  ${config.bg} ${config.color}
                `}>
                  {config.label}
                </span>
              </div>
            </div>
            
            {/* Action Button */}
            {actionable && (
              <div className={`
                ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                ${isHovered ? 'opacity-100' : ''}
              `}>
                <button
                  onClick={onAction}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  title="View details"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Enhanced Recent Activity Component
 * 
 * A comprehensive activity feed with:
 * - Real-time activity updates
 * - Filtering and sorting options
 * - Loading states and error handling
 * - Interactive activity items
 * - Theme-aware styling
 */
const RecentActivity = () => {
  const { analyticsData, loading, error } = useAnalytics() || {};
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  // Debug: Log analyticsData and recentActivity structure
  console.log('analyticsData:', analyticsData);
  if (analyticsData && analyticsData.recentActivity) {
    console.log('recentActivity:', analyticsData.recentActivity);
    if (analyticsData.recentActivity.length > 0) {
      console.log('recentActivity[0]:', analyticsData.recentActivity[0]);
    }
  }

  // Mock recent activities for demonstration
  const mockActivities = [
    {
      id: 1,
      title: 'New blog post published',
      description: 'Getting Started with React Hooks - A comprehensive guide for beginners',
      time: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      user: 'John Doe',
      type: 'publish',
      priority: 'normal',
      actionable: true
    },
    {
      id: 2,
      title: 'User comment received',
      description: 'Great article! This really helped me understand the concept better.',
      time: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      user: 'Jane Smith',
      type: 'comment',
      priority: 'normal',
      actionable: true
    },
    {
      id: 3,
      title: 'Draft post updated',
      description: 'Advanced JavaScript Patterns - Added new section on closures',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      user: 'Mike Johnson',
      type: 'update',
      priority: 'normal',
      actionable: true
    },
    {
      id: 4,
      title: 'New user registered',
      description: 'Sarah Wilson joined the platform',
      time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      user: 'System',
      type: 'create',
      priority: 'normal',
      actionable: false
    },
    {
      id: 5,
      title: 'Media file uploaded',
      description: 'hero-image-2024.jpg uploaded to media library',
      time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      user: 'Alex Brown',
      type: 'create',
      priority: 'normal',
      actionable: true
    }
  ];

  // Use real data if available, otherwise use mock data
  let activities;
  if (
    loading ||
    !analyticsData ||
    typeof analyticsData !== 'object' ||
    !Array.isArray(analyticsData.recentActivity) ||
    analyticsData.recentActivity.length === 0
  ) {
    activities = mockActivities;
  } else {
    activities = analyticsData.recentActivity.map(item => ({
      id: typeof item.id === 'string' || typeof item.id === 'number' ? item.id : (item._id || JSON.stringify(item.id)),
      title: typeof item.status === 'string' ? (item.status === 'published' ? 'Post Published' : 'Draft Created') : 'Activity',
      description: typeof item.title === 'string' ? item.title : (item.title?.name || item.title?.displayName || item.title?.description || JSON.stringify(item.title)),
      time: typeof item.date === 'string' ? item.date : (item.createdAt || item.time || ''),
      user: typeof item.author === 'string' ? item.author : (item.author?.displayName || item.author?.name || item.author?._id || JSON.stringify(item.author)),
      type: typeof item.status === 'string' ? (item.status === 'published' ? 'publish' : 'update') : 'activity',
      priority: 'normal',
      actionable: true
    }));
  }

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  const displayedActivities = showAll 
    ? filteredActivities 
    : filteredActivities.slice(0, 5);

  const filterOptions = [
    { value: 'all', label: 'All Activity', count: activities.length },
    { value: 'publish', label: 'Published', count: activities.filter(a => a.type === 'publish').length },
    { value: 'comment', label: 'Comments', count: activities.filter(a => a.type === 'comment').length },
    { value: 'update', label: 'Updates', count: activities.filter(a => a.type === 'update').length },
    { value: 'create', label: 'Created', count: activities.filter(a => a.type === 'create').length }
  ];

  const handleActivityAction = (activityId) => {
    console.log('View activity details:', activityId);
    // Implement navigation to activity details
  };

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-8">
          <svg className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Failed to load activity</h3>
          <p className="text-gray-500 dark:text-gray-400">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Latest updates and interactions
            </p>
          </div>
          
          {/* Refresh Button */}
          <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-1 mt-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`
                flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors duration-200
                ${filter === option.value
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }
              `}
            >
              {option.label}
              {option.count > 0 && (
                <span className={`
                  ml-1 px-1.5 py-0.5 rounded-full text-xs
                  ${filter === option.value
                    ? 'bg-gray-100 dark:bg-gray-500 text-gray-600 dark:text-gray-300'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                  }
                `}>
                  {option.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Activity List */}
      <div className="px-6 py-2">
        {loading ? (
          <div className="space-y-4 py-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="animate-pulse flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : displayedActivities.length > 0 ? (
          <div className="space-y-2">
            {displayedActivities.map((activity) => (
              <ActivityItem
                key={activity.id}
                title={activity.title}
                description={activity.description}
                time={activity.time}
                user={activity.user}
                type={activity.type}
                priority={activity.priority}
                actionable={activity.actionable}
                onAction={() => handleActivityAction(activity.id)}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <svg className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No activity yet</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {filter === 'all' 
                ? 'Start creating content to see activity here'
                : `No ${filter} activity found`
              }
            </p>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <div className="flex items-center justify-between">
          {filteredActivities.length > 5 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Show all {filteredActivities.length} activities
            </button>
          )}
          
          <Link 
            to="/dashboard/analytics" 
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 flex items-center"
          >
            View detailed analytics
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;