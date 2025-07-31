import React, { useState } from 'react';
import { useAnalytics } from '../../Services/AnalyticsContext';
import { useTheme } from '../../Context/ThemeContext';

// Components
import ActivityHeader from './components/ActivityHeader';
import ActivityList from './components/ActivityList';
import ActivityFooter from './components/ActivityFooter';
import ErrorState from './components/ErrorState';

const RecentActivity = () => {
  const { analyticsData, loading, error } = useAnalytics() || {};
  const { theme } = useTheme();
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  // Process real data from analytics
  const activities = analyticsData?.recentActivity?.map(item => ({
    id: item.id || item._id || Math.random().toString(36),
    title: item.status === 'published' ? 'Post Published' : 'Draft Created',
    description: item.title || 'No description available',
    time: item.date || item.createdAt || new Date().toISOString(),
    user: item.author?.name || item.author || 'Unknown User',
    type: item.status === 'published' ? 'publish' : 'update',
    priority: 'normal',
    actionable: true
  })) || [];

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
  };

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="rounded-lg sm:rounded-xl shadow-lg border backdrop-blur-sm" style={{
      backgroundColor: 'var(--color-base-200)', 
      borderColor: 'var(--color-base-300)',
      background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
    }}>
      <ActivityHeader filter={filter} setFilter={setFilter} filterOptions={filterOptions} />
      
      <div className="px-4 sm:px-6 py-2">
        <ActivityList 
          activities={displayedActivities} 
          loading={loading} 
          onActivityAction={handleActivityAction} 
        />
      </div>
      
      <ActivityFooter 
        filteredActivities={filteredActivities} 
        showAll={showAll} 
        setShowAll={setShowAll} 
      />
    </div>
  );
};

export default RecentActivity;