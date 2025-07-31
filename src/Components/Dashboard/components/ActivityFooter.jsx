import React from 'react';
import { Link } from 'react-router-dom';

const ActivityFooter = ({ filteredActivities, showAll, setShowAll }) => {
  return (
    <div className="px-4 sm:px-6 py-3 sm:py-4 border-t backdrop-blur-sm" style={{
      borderColor: 'var(--color-base-300)', 
      background: `linear-gradient(135deg, var(--color-base-300) 0%, var(--color-base-200) 100%)`
    }}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        {filteredActivities.length > 5 && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="text-xs sm:text-sm font-medium transition-colors duration-200 text-left"
            style={{color: 'var(--color-primary)'}}
          >
            Show all {filteredActivities.length} activities
          </button>
        )}
        
        <Link 
          to="/dashboard/analytics" 
          className="text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center"
          style={{color: 'var(--color-primary)'}}
        >
          <span className="hidden sm:inline">View detailed analytics</span>
          <span className="sm:hidden">Analytics</span>
          <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ActivityFooter;