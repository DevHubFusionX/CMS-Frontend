import React from 'react';
import { useAnalytics } from '../../Services/AnalyticsContext';
import { Link } from 'react-router-dom';

/**
 * Enhanced Statistics Card Component
 * 
 * A modern, interactive card displaying key metrics with:
 * - Theme-aware styling for light/dark modes
 * - Hover animations and transitions
 * - Progress indicators and trend arrows
 * - Click-through navigation to detailed views
 */
const StatCard = ({ title, value, icon, color, trend, trendValue, description, linkTo, loading }) => {
  const gradientClasses = {
    'bg-blue-600': 'from-blue-500 to-blue-700',
    'bg-green-600': 'from-green-500 to-green-700',
    'bg-yellow-600': 'from-yellow-500 to-yellow-700',
    'bg-purple-600': 'from-purple-500 to-purple-700',
    'bg-indigo-600': 'from-indigo-500 to-indigo-700',
    'bg-red-600': 'from-red-500 to-red-700'
  };

  const CardContent = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md dark:hover:shadow-gray-900/20 transition-all duration-200 group cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              {title}
            </h3>
            {trend && (
              <div className={`flex items-center text-xs font-medium ${
                trend === 'up' 
                  ? 'text-green-600 dark:text-green-400' 
                  : trend === 'down' 
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-500 dark:text-gray-400'
              }`}>
                {trend === 'up' && (
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                )}
                {trend === 'down' && (
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
                  </svg>
                )}
                {trendValue}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`rounded-xl p-3 bg-gradient-to-br ${gradientClasses[color]} shadow-lg group-hover:shadow-xl transition-shadow duration-200`}>
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
            </div>
            
            <div className="flex-1">
              <p className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {loading ? (
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-16 rounded"></div>
                ) : (
                  value
                )}
              </p>
              {description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {linkTo && (
          <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  return linkTo ? (
    <Link to={linkTo}>
      <CardContent />
    </Link>
  ) : (
    <CardContent />
  );
};

/**
 * Overview Cards Container Component
 * 
 * Displays a grid of key performance indicators with:
 * - Real-time data from analytics context
 * - Loading states and error handling
 * - Responsive grid layout
 * - Interactive navigation to detailed views
 */
const OverviewCards = () => {
  const { analyticsData, loading, fetchAnalyticsData, error } = useAnalytics();
  
  // Fetch analytics data on component mount
  React.useEffect(() => {
    if (!loading && (!analyticsData.stats || Object.keys(analyticsData.stats).length === 0)) {
      fetchAnalyticsData();
    }
  }, [analyticsData.stats, loading, fetchAnalyticsData]);
  
  // Calculate trend values (mock data for demonstration)
  const getTrendValue = (current, previous) => {
    if (!previous || previous === 0) return null;
    const change = ((current - previous) / previous) * 100;
    return {
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
      value: `${Math.abs(change).toFixed(1)}%`
    };
  };

  const stats = [
    {
      title: 'Total Posts',
      value: loading ? '...' : String(analyticsData?.stats?.totalPosts || 0),
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      color: 'bg-blue-600',
      trend: 'up',
      trendValue: '+12%',
      description: 'Published content',
      linkTo: '/dashboard/posts'
    },
    {
      title: 'Active Users',
      value: loading ? '...' : String(analyticsData?.stats?.totalUsers || 0),
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      color: 'bg-green-600',
      trend: 'up',
      trendValue: '+5%',
      description: 'Registered members',
      linkTo: '/dashboard/users'
    },
    {
      title: 'Draft Posts',
      value: loading ? '...' : String(analyticsData?.stats?.draftPosts || 0),
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      color: 'bg-yellow-600',
      trend: 'neutral',
      trendValue: '0%',
      description: 'Pending publication',
      linkTo: '/dashboard/posts?status=draft'
    },
    {
      title: 'Media Files',
      value: loading ? '...' : String(analyticsData?.stats?.totalMedia || 0),
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: 'bg-purple-600',
      trend: 'up',
      trendValue: '+8%',
      description: 'Images & documents',
      linkTo: '/dashboard/media'
    }
  ];

  // Show error state if data fetching failed
  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-center h-24">
              <div className="text-center">
                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-500 dark:text-gray-400">Failed to load</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard 
          key={index} 
          {...stat} 
          loading={loading}
        />
      ))}
    </div>
  );
};

export default OverviewCards;