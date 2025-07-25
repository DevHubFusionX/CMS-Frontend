import React from 'react';

const StatCard = ({ title, value, icon, color, trend, description, isHighlighted }) => {
  return (
    <div className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
      isHighlighted 
        ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl' 
        : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent transform rotate-12 scale-150"></div>
      </div>
      
      {/* Glow Effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${color} blur-xl`}></div>
      
      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className={`p-4 rounded-2xl ${isHighlighted ? 'bg-white/20' : color} shadow-lg`}>
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
              trend.direction === 'up' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                : trend.direction === 'down'
                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}>
              <svg className={`w-4 h-4 ${trend.direction === 'up' ? 'rotate-0' : trend.direction === 'down' ? 'rotate-180' : 'rotate-90'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
              {trend.value}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="space-y-3">
          <h3 className={`text-sm font-semibold tracking-wide uppercase ${
            isHighlighted ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
          }`}>
            {title}
          </h3>
          
          <div className="flex items-baseline gap-2">
            <p className={`text-4xl font-bold tracking-tight ${
              isHighlighted ? 'text-white' : 'text-gray-900 dark:text-white'
            }`}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {description && (
              <span className={`text-sm font-medium ${
                isHighlighted ? 'text-white/70' : 'text-gray-600 dark:text-gray-400'
              }`}>
                {description}
              </span>
            )}
          </div>
        </div>
        
        {/* Progress Bar (if trend exists) */}
        {trend && (
          <div className="mt-6">
            <div className={`h-2 rounded-full overflow-hidden ${
              isHighlighted ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'
            }`}>
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  trend.direction === 'up' 
                    ? 'bg-green-500' 
                    : trend.direction === 'down'
                    ? 'bg-red-500'
                    : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min(Math.abs(parseFloat(trend.value)), 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatsCards = ({ stats, selectedMetric = 'overview' }) => {
  // Ensure stats has default values to prevent errors
  const safeStats = {
    totalPosts: stats?.totalPosts || 0,
    totalUsers: stats?.totalUsers || 0,
    publishedPosts: stats?.publishedPosts || 0,
    draftPosts: stats?.draftPosts || 0,
    totalMedia: stats?.totalMedia || 0,
    totalViews: stats?.totalViews || 0,
    avgEngagement: stats?.avgEngagement || 0,
    conversionRate: stats?.conversionRate || 0
  };
  
  // Define different stat sets based on selected metric
  const getStatItems = () => {
    const baseStats = [
      {
        title: 'Total Content',
        value: safeStats.totalPosts,
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        color: 'bg-gradient-to-br from-blue-500 to-blue-600',
        trend: { direction: 'up', value: '+12%' },
        description: 'posts'
      },
      {
        title: 'Active Users',
        value: safeStats.totalUsers,
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ),
        color: 'bg-gradient-to-br from-purple-500 to-purple-600',
        trend: { direction: 'up', value: '+8%' },
        description: 'users'
      },
      {
        title: 'Published',
        value: safeStats.publishedPosts,
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        color: 'bg-gradient-to-br from-green-500 to-green-600',
        trend: { direction: 'up', value: '+15%' },
        description: 'live'
      },
      {
        title: 'In Progress',
        value: safeStats.draftPosts,
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        ),
        color: 'bg-gradient-to-br from-yellow-500 to-orange-500',
        trend: { direction: 'down', value: '-3%' },
        description: 'drafts'
      }
    ];

    const contentStats = [
      ...baseStats,
      {
        title: 'Media Assets',
        value: safeStats.totalMedia,
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
        color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
        trend: { direction: 'up', value: '+22%' },
        description: 'files'
      }
    ];

    const engagementStats = [
      {
        title: 'Total Views',
        value: safeStats.totalViews,
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ),
        color: 'bg-gradient-to-br from-cyan-500 to-blue-600',
        trend: { direction: 'up', value: '+34%' },
        description: 'views',
        isHighlighted: true
      },
      {
        title: 'Avg Engagement',
        value: safeStats.avgEngagement,
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        ),
        color: 'bg-gradient-to-br from-pink-500 to-rose-600',
        trend: { direction: 'up', value: '+18%' },
        description: '/5.0'
      },
      {
        title: 'Conversion Rate',
        value: `${safeStats.conversionRate}%`,
        icon: (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        ),
        color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
        trend: { direction: 'up', value: '+5%' },
        description: 'rate'
      }
    ];

    switch (selectedMetric) {
      case 'content':
        return contentStats;
      case 'users':
        return baseStats.filter(stat => stat.title.includes('Users') || stat.title.includes('Active'));
      case 'engagement':
        return engagementStats;
      default:
        return baseStats;
    }
  };

  const statItems = getStatItems();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {statItems.map((stat, index) => (
        <StatCard
          key={`${selectedMetric}-${index}`}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          trend={stat.trend}
          description={stat.description}
          isHighlighted={stat.isHighlighted}
        />
      ))}
    </div>
  );
};

export default StatsCards;