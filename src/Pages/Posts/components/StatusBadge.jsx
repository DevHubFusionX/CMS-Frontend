import React from 'react';

const StatusBadge = ({ status, size = 'sm' }) => {
  const statusConfig = {
    published: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-800 dark:text-green-300',
      border: 'border-green-200 dark:border-green-800',
      icon: '✅',
      label: 'Published',
      pulse: false
    },
    draft: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-800 dark:text-yellow-300',
      border: 'border-yellow-200 dark:border-yellow-800',
      icon: '✏️',
      label: 'Draft',
      pulse: false
    },
    scheduled: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-800 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-800',
      icon: '⏰',
      label: 'Scheduled',
      pulse: true
    },
    archived: {
      bg: 'bg-gray-100 dark:bg-gray-700',
      text: 'text-gray-800 dark:text-gray-300',
      border: 'border-gray-200 dark:border-gray-600',
      icon: '📦',
      label: 'Archived',
      pulse: false
    },
    pending: {
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      text: 'text-orange-800 dark:text-orange-300',
      border: 'border-orange-200 dark:border-orange-800',
      icon: '⏳',
      label: 'Pending Review',
      pulse: true
    }
  };

  const config = statusConfig[status] || statusConfig.draft;
  
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2 text-base'
  };

  return (
    <span 
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border transition-all duration-200 ${
        config.bg
      } ${config.text} ${config.border} ${sizeClasses[size]} ${
        config.pulse ? 'animate-pulse' : ''
      }`}
    >
      <span className="text-sm">{config.icon}</span>
      <span>{config.label}</span>
      {config.pulse && (
        <div className="w-1.5 h-1.5 bg-current rounded-full animate-ping"></div>
      )}
    </span>
  );
};

export default StatusBadge;