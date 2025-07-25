import React from 'react';
import DateRangeFilter from '../../../Components/Analytics/DateRangeFilter';

const ModernAnalyticsHeader = ({ dateRange, onDateRangeChange, onRefresh, selectedMetric, onMetricChange }) => {
  const metricTabs = [
    { id: 'overview', label: 'Overview', icon: '📊', color: 'from-blue-500 to-cyan-500' },
    { id: 'content', label: 'Content', icon: '📝', color: 'from-green-500 to-emerald-500' },
    { id: 'users', label: 'Users', icon: '👥', color: 'from-purple-500 to-pink-500' },
    { id: 'engagement', label: 'Engagement', icon: '💬', color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Comprehensive insights into your content performance, audience engagement, and growth metrics
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
        <DateRangeFilter value={dateRange} onChange={onDateRangeChange} />
        <button
          onClick={onRefresh}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>

      {/* Metric Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        {metricTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onMetricChange(tab.id)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              selectedMetric === tab.id
                ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md border border-gray-200/50 dark:border-gray-700/50'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-sm sm:text-base">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModernAnalyticsHeader;