import React, { useState } from 'react';

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
      bg: 'var(--color-success)', 
      color: 'text-white', 
      path: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
      label: 'Created'
    },
    update: { 
      bg: 'var(--color-primary)', 
      color: 'text-white', 
      path: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      label: 'Updated'
    },
    delete: { 
      bg: 'var(--color-error)', 
      color: 'text-white', 
      path: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
      label: 'Deleted'
    },
    comment: { 
      bg: 'var(--color-secondary)', 
      color: 'text-white', 
      path: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
      label: 'Commented'
    },
    publish: { 
      bg: 'var(--color-success)', 
      color: 'text-white', 
      path: 'M5 3l14 9-14 9V3z',
      label: 'Published'
    },
    login: { 
      bg: 'var(--color-accent)', 
      color: 'text-white', 
      path: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1',
      label: 'Logged in'
    },
    default: { 
      bg: 'var(--color-base-300)', 
      color: 'var(--color-base-content)', 
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
    high: 'border-l-4',
    medium: 'border-l-4',
    normal: ''
  };

  const priorityColors = {
    high: 'var(--color-error)',
    medium: 'var(--color-warning)',
    normal: 'transparent'
  };

  return (
    <div 
      className={`
        group relative py-3 sm:py-4 px-3 sm:px-4 rounded-xl transition-all duration-300 
        ${priorityClasses[priority]}
        ${isHovered ? 'shadow-lg scale-105' : 'hover:shadow-md'}
      `}
      style={{
        backgroundColor: isHovered ? 'var(--color-base-300)' : 'transparent',
        borderLeftColor: priorityColors[priority]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        <div className="rounded-xl p-2 sm:p-2.5 shadow-lg transition-all duration-300 flex-shrink-0 border" style={{
          backgroundColor: config.bg,
          borderColor: config.bg,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)'
        }}>
          <svg className={`h-4 w-4 sm:h-5 sm:w-5 ${config.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.path} />
          </svg>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-semibold transition-colors duration-200 truncate" style={{
                color: isHovered ? 'var(--color-primary)' : 'var(--color-base-content)'
              }}>
                {title}
              </p>
              <p className="text-xs sm:text-sm mt-1 line-clamp-2" style={{color: 'var(--color-base-content)'}}>
                {description}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-3 space-y-1 sm:space-y-0 sm:space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs font-medium shadow-lg flex-shrink-0 border" style={{
                    background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
                    borderColor: 'var(--color-primary)'
                  }}>
                    {user.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium truncate" style={{color: 'var(--color-base-content)'}}>
                    {typeof user === 'string' ? user : (user?.displayName || user?.name || user?._id || 'Unknown User')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between sm:justify-start sm:space-x-3">
                  <div className="flex items-center space-x-1 sm:space-x-2 text-xs" style={{color: 'var(--color-base-content)'}}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatTimeAgo(time)}</span>
                  </div>
                  
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border" style={{
                    backgroundColor: config.bg,
                    color: 'white',
                    borderColor: config.bg
                  }}>
                    {config.label}
                  </span>
                </div>
              </div>
            </div>
            
            {actionable && (
              <div className={`
                ml-2 sm:ml-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0
                ${isHovered ? 'opacity-100' : ''}
              `}>
                <button
                  onClick={onAction}
                  className="p-1.5 rounded-lg transition-all duration-200 border"
                  style={{
                    color: 'var(--color-base-content)',
                    backgroundColor: 'var(--color-base-200)',
                    borderColor: 'var(--color-base-300)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--color-primary)';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--color-base-200)';
                    e.target.style.color = 'var(--color-base-content)';
                  }}
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

export default ActivityItem;