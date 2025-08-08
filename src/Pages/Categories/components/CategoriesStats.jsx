import React from 'react';

const CategoriesStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Categories',
      value: stats.total,
      icon: '📁',
      color: 'var(--color-primary)'
    },
    {
      label: 'Active Categories',
      value: stats.active,
      icon: '✅',
      color: 'var(--color-success)'
    },
    {
      label: 'Posts Categorized',
      value: stats.postsCount,
      icon: '📄',
      color: 'var(--color-secondary)'
    },
    {
      label: 'Most Popular',
      value: stats.mostPopular || 'N/A',
      icon: '🔥',
      color: 'var(--color-accent)',
      isText: true
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 border hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          style={{
            backgroundColor: 'var(--color-base-100)',
            borderColor: 'var(--color-base-300)',
            border: 'var(--border) solid var(--color-base-300)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium uppercase tracking-wide transition-colors duration-300" style={{
                color: 'var(--color-base-content)',
                opacity: '0.7'
              }}>
                {item.label}
              </p>
              <p className="text-2xl sm:text-3xl font-bold transition-colors duration-300" style={{
                color: 'var(--color-base-content)'
              }}>
                {item.isText ? item.value : item.value.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg" style={{
              backgroundColor: item.color,
              color: 'white'
            }}>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesStats;