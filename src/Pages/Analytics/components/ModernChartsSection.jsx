import React from 'react';

const ModernChartsSection = ({ postGrowth, postsByCategory, postsByUser, selectedMetric }) => {
  const renderLineChart = (data, title, color) => (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${color}`}></div>
        {title}
      </h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {data.slice(-8).map((item, index) => {
          const maxValue = Math.max(...data.map(d => d.count || d.views || 0));
          const height = ((item.count || item.views || 0) / maxValue) * 200;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className={`w-full bg-gradient-to-t ${color} rounded-t-lg transition-all duration-500 hover:scale-105`}
                style={{ height: `${height}px` }}
              ></div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate">
                {item.date?.split('-')[1] || item.category || item.user}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderPieChart = (data, title, colors) => (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="space-y-3">
        {data.slice(0, 5).map((item, index) => {
          const percentage = item.percentage || ((item.count / data.reduce((sum, d) => sum + d.count, 0)) * 100);
          return (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${colors[index % colors.length]}`}></div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.category || item.user}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 bg-gradient-to-r ${colors[index % colors.length]} rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const colors = [
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {selectedMetric === 'overview' && (
        <>
          {renderLineChart(postGrowth, 'Content Growth Over Time', 'from-blue-500 to-cyan-500')}
          {renderPieChart(postsByCategory, 'Posts by Category', colors)}
        </>
      )}
      
      {selectedMetric === 'content' && (
        <>
          {renderLineChart(postGrowth, 'Publishing Trends', 'from-green-500 to-emerald-500')}
          {renderPieChart(postsByCategory, 'Content Distribution', colors)}
        </>
      )}
      
      {selectedMetric === 'users' && (
        <>
          {renderPieChart(postsByUser, 'Top Contributors', colors)}
          {renderLineChart(postGrowth.map(item => ({ ...item, count: item.views || item.count })), 'User Activity', 'from-purple-500 to-pink-500')}
        </>
      )}
      
      {selectedMetric === 'engagement' && (
        <>
          {renderLineChart(postGrowth.map(item => ({ ...item, count: item.engagement * 1000 || item.count })), 'Engagement Trends', 'from-orange-500 to-red-500')}
          {renderPieChart(postsByUser.map(item => ({ ...item, count: item.engagement * 100 || item.count })), 'Engagement by Author', colors)}
        </>
      )}
    </div>
  );
};

export default ModernChartsSection;