import React from 'react';
import ActivityItem from './ActivityItem';

const ActivityList = ({ activities, loading, onActivityAction }) => {
  if (loading) {
    return (
      <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
        {[1, 2, 3].map((index) => (
          <div key={index} className="animate-pulse flex items-start space-x-3 sm:space-x-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex-shrink-0" style={{backgroundColor: 'var(--color-base-300)'}}></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 sm:h-4 rounded w-3/4" style={{backgroundColor: 'var(--color-base-300)'}}></div>
              <div className="h-2 sm:h-3 rounded w-1/2" style={{backgroundColor: 'var(--color-base-300)'}}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="py-8 sm:py-12 text-center">
        <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4" style={{color: 'var(--color-base-content)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="text-base sm:text-lg font-medium mb-2" style={{color: 'var(--color-base-content)'}}>No activity yet</h3>
        <p className="text-sm" style={{color: 'var(--color-base-content)'}}>
          Start creating content to see activity here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1 sm:space-y-2">
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          title={activity.title}
          description={activity.description}
          time={activity.time}
          user={activity.user}
          type={activity.type}
          priority={activity.priority}
          actionable={activity.actionable}
          onAction={() => onActivityAction(activity.id)}
        />
      ))}
    </div>
  );
};

export default ActivityList;