import React from 'react';

const MediaStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Files',
      value: stats?.total || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Images',
      value: stats?.images || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Videos',
      value: stats?.videos || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Documents',
      value: stats?.documents || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
      textColor: 'text-orange-600 dark:text-orange-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statCards.map((stat, index) => (
        <div
          key={stat.title}
          className={`relative overflow-hidden bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6`}
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 opacity-10">
            <div className={`w-full h-full bg-gradient-to-br ${stat.color} rounded-full`}></div>
          </div>

          {/* Content */}
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 ${stat.textColor}`}>
                {stat.icon}
              </div>
              <div className={`text-right ${stat.textColor}`}>
                <div className="text-2xl sm:text-3xl font-bold">
                  {stat.value}
                </div>
              </div>
            </div>

            <div>
              <h3 className={`text-sm font-medium ${stat.textColor} opacity-80`}>
                {stat.title}
              </h3>
              <div className="flex items-center mt-2">
                <div className={`w-full bg-white/30 dark:bg-gray-800/30 rounded-full h-1.5`}>
                  <div
                    className={`h-1.5 bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{
                      width: `${Math.min(100, (stat.value / Math.max(1, stats?.total || 1)) * 100)}%`
                    }}
                  ></div>
                </div>
                <span className={`ml-2 text-xs ${stat.textColor} opacity-70`}>
                  {stats?.total > 0 ? Math.round((stat.value / stats.total) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaStats;