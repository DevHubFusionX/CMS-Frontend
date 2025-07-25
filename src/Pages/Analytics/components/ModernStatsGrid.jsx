import React from 'react';

const ModernStatsGrid = ({ stats, selectedMetric }) => {
  const getStatsForMetric = () => {
    const baseStats = [
      {
        label: 'Total Posts',
        value: stats.totalPosts || 0,
        icon: '📄',
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        change: '+12%',
        changeType: 'positive'
      },
      {
        label: 'Published',
        value: stats.publishedPosts || 0,
        icon: '✅',
        color: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        change: '+8%',
        changeType: 'positive'
      },
      {
        label: 'Total Views',
        value: stats.totalViews || 0,
        icon: '👁️',
        color: 'from-purple-500 to-pink-500',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        change: '+24%',
        changeType: 'positive',
        format: 'number'
      },
      {
        label: 'Engagement Rate',
        value: stats.avgEngagement || 0,
        icon: '💬',
        color: 'from-orange-500 to-red-500',
        bgColor: 'bg-orange-50 dark:bg-orange-900/20',
        change: '+5%',
        changeType: 'positive',
        format: 'percentage'
      }
    ];

    switch (selectedMetric) {
      case 'content':
        return [
          baseStats[0], // Total Posts
          baseStats[1], // Published
          {
            label: 'Draft Posts',
            value: stats.draftPosts || 0,
            icon: '✏️',
            color: 'from-yellow-500 to-orange-500',
            bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
            change: '+3%',
            changeType: 'positive'
          },
          {
            label: 'Media Files',
            value: stats.totalMedia || 0,
            icon: '🖼️',
            color: 'from-indigo-500 to-purple-500',
            bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
            change: '+15%',
            changeType: 'positive'
          }
        ];
      case 'users':
        return [
          {
            label: 'Total Users',
            value: stats.totalUsers || 0,
            icon: '👥',
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            change: '+7%',
            changeType: 'positive'
          },
          {
            label: 'Active Users',
            value: Math.floor((stats.totalUsers || 0) * 0.8),
            icon: '🟢',
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            change: '+12%',
            changeType: 'positive'
          },
          {
            label: 'New Users',
            value: Math.floor((stats.totalUsers || 0) * 0.2),
            icon: '🆕',
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            change: '+18%',
            changeType: 'positive'
          },
          {
            label: 'User Retention',
            value: 85,
            icon: '🔄',
            color: 'from-orange-500 to-red-500',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
            change: '+2%',
            changeType: 'positive',
            format: 'percentage'
          }
        ];
      case 'engagement':
        return [
          baseStats[2], // Total Views
          baseStats[3], // Engagement Rate
          {
            label: 'Avg. Read Time',
            value: 3.2,
            icon: '⏱️',
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            change: '+8%',
            changeType: 'positive',
            format: 'time'
          },
          {
            label: 'Conversion Rate',
            value: stats.conversionRate || 0,
            icon: '🎯',
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            change: '+15%',
            changeType: 'positive',
            format: 'percentage'
          }
        ];
      default:
        return baseStats;
    }
  };

  const formatValue = (value, format) => {
    switch (format) {
      case 'percentage':
        return `${value}%`;
      case 'time':
        return `${value}m`;
      case 'number':
        return value.toLocaleString();
      default:
        return value.toLocaleString();
    }
  };

  const statsToShow = getStatsForMetric();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statsToShow.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl sm:text-2xl shadow-lg`}>
              {stat.icon}
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              stat.changeType === 'positive' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            }`}>
              <svg className={`w-3 h-3 ${stat.changeType === 'positive' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              {stat.change}
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              {stat.label}
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {formatValue(stat.value, stat.format)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModernStatsGrid;