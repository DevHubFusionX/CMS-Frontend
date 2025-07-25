import React from 'react';

const PostsStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Posts',
      value: stats.total,
      icon: '📄',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Published',
      value: stats.published,
      icon: '✅',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      label: 'Drafts',
      value: stats.drafts,
      icon: '✏️',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      label: 'Scheduled',
      value: stats.scheduled,
      icon: '⏰',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statItems.map((item, index) => (
        <div
          key={index}
          className={`${item.bgColor} backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                {item.label}
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {item.value.toLocaleString()}
              </p>
            </div>
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl sm:text-2xl shadow-lg`}>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsStats;