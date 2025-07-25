import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Services/AuthContext';
import { PermissionGate } from '../Auth';

/**
 * Enhanced Action Button Component
 * 
 * A modern, interactive action button with:
 * - Theme-aware styling for light/dark modes
 * - Hover animations and gradient backgrounds
 * - Keyboard accessibility
 * - Loading states and disabled states
 * - Badge indicators for notifications
 */
const ActionButton = ({ 
  icon, 
  title, 
  description, 
  to, 
  color, 
  badge = null, 
  disabled = false,
  external = false,
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    'bg-blue-600': 'from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800',
    'bg-indigo-600': 'from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800',
    'bg-green-600': 'from-green-500 to-green-700 hover:from-green-600 hover:to-green-800',
    'bg-purple-600': 'from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800',
    'bg-amber-600': 'from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800',
    'bg-red-600': 'from-red-500 to-red-700 hover:from-red-600 hover:to-red-800',
    'bg-emerald-600': 'from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800',
    'bg-cyan-600': 'from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800'
  };

  const ButtonContent = () => (
    <div 
      className={`
        relative group block p-4 rounded-xl transition-all duration-200 transform
        bg-gradient-to-br ${colorClasses[color]}
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:scale-105 hover:shadow-lg cursor-pointer'
        }
        ${isHovered ? 'shadow-xl' : 'shadow-md'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
          {badge}
        </div>
      )}

      <div className="flex items-center">
        {/* Icon */}
        <div className="flex-shrink-0 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3 group-hover:bg-opacity-30 transition-all duration-200">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
        
        {/* Content */}
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white group-hover:text-opacity-90 transition-all duration-200">
              {title}
            </h3>
            {external && (
              <svg className="w-4 h-4 text-white text-opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            )}
          </div>
          <p className="text-sm text-white text-opacity-90 mt-1 group-hover:text-opacity-80 transition-all duration-200">
            {description}
          </p>
        </div>
        
        {/* Arrow */}
        <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );

  if (disabled) {
    return <ButtonContent />;
  }

  return to ? (
    <Link 
      to={to} 
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <ButtonContent />
    </Link>
  ) : (
    <ButtonContent />
  );
};

/**
 * Enhanced Quick Actions Component
 * 
 * A comprehensive quick actions panel with:
 * - Role-based action visibility
 * - Categorized action groups
 * - Interactive hover effects
 * - Badge notifications
 * - Theme-aware styling
 */
const QuickActions = () => {
  const { user } = useAuth();
  const [expandedCategory, setExpandedCategory] = useState('primary');

  // Primary actions - always visible
  const primaryActions = [
    {
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      title: 'Create Post',
      description: 'Write a new blog post',
      to: '/dashboard/posts/create',
      color: 'bg-blue-600',
      badge: null
    },
    {
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      title: 'Upload Media',
      description: 'Add images and files',
      to: '/dashboard/media',
      color: 'bg-indigo-600',
      badge: null
    },
    {
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      title: 'Analytics',
      description: 'View site statistics',
      to: '/dashboard/analytics',
      color: 'bg-purple-600',
      badge: null
    }
  ];



  // External actions
  const externalActions = [
    {
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      title: 'View Blog',
      description: 'Visit your public blog',
      to: '/blog',
      color: 'bg-indigo-600',
      external: true,
      badge: null
    }
  ];

  const actionCategories = [
    { id: 'primary', title: 'Quick Actions', actions: primaryActions },
    { id: 'external', title: 'External Links', actions: externalActions }
  ];

  return (
    <div className="space-y-6">
      {actionCategories.map((category) => (
        <div key={category.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          {/* Category Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {category.actions.length} action{category.actions.length !== 1 ? 's' : ''} available
                </p>
              </div>
              
              {category.actions.length > 3 && (
                <button
                  onClick={() => setExpandedCategory(
                    expandedCategory === category.id ? null : category.id
                  )}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <svg 
                    className={`w-5 h-5 transition-transform duration-200 ${
                      expandedCategory === category.id ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Actions Grid */}
          <div className="p-6">
            <div className="space-y-3">
              {(expandedCategory === category.id || category.actions.length <= 3 
                ? category.actions 
                : category.actions.slice(0, 3)
              ).map((action, index) => (
                action.permission ? (
                  <PermissionGate key={index} permission={action.permission}>
                    <ActionButton {...action} />
                  </PermissionGate>
                ) : (
                  <ActionButton key={index} {...action} />
                )
              ))}
            </div>
            
            {category.actions.length > 3 && expandedCategory !== category.id && (
              <button
                onClick={() => setExpandedCategory(category.id)}
                className="w-full mt-3 py-2 px-4 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
              >
                Show {category.actions.length - 3} more actions
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;