import React from 'react';
import { FiFolder, FiFileText, FiTrendingUp, FiStar } from 'react-icons/fi';

const CategoriesStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Categories',
      value: stats.total,
      icon: FiFolder,
      colorVar: '--color-primary',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Categories',
      value: stats.active,
      icon: FiTrendingUp,
      colorVar: '--color-success',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Total Posts',
      value: stats.postsCount,
      icon: FiFileText,
      colorVar: '--color-secondary',
      change: '+23%',
      changeType: 'positive'
    },
    {
      title: 'Most Popular',
      value: stats.mostPopular,
      icon: FiStar,
      colorVar: '--color-accent',
      isText: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          style={{ 
            backgroundColor: 'var(--color-base-200)',
            border: `1px solid var(--color-base-300)`
          }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p 
                  className="text-sm font-medium mb-1 opacity-70"
                  style={{ color: 'var(--color-base-content)' }}
                >
                  {stat.title}
                </p>
                <p 
                  className={`text-2xl font-bold ${stat.isText ? 'text-lg' : ''} truncate`}
                  style={{ color: 'var(--color-base-content)' }}
                >
                  {stat.value}
                </p>
                {stat.change && (
                  <div className="flex items-center mt-2">
                    <span 
                      className="text-xs font-medium"
                      style={{ 
                        color: stat.changeType === 'positive' ? 'var(--color-success)' : 'var(--color-error)' 
                      }}
                    >
                      {stat.change}
                    </span>
                    <span 
                      className="text-xs ml-1 opacity-60"
                      style={{ color: 'var(--color-base-content)' }}
                    >
                      vs last month
                    </span>
                  </div>
                )}
              </div>
              <div 
                className="p-3 rounded-lg shadow-lg"
                style={{ backgroundColor: `var(${stat.colorVar})` }}
              >
                <stat.icon 
                  className="h-6 w-6" 
                  style={{ color: `var(${stat.colorVar}-content)` }}
                />
              </div>
            </div>
          </div>
          <div 
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ backgroundColor: `var(${stat.colorVar})` }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesStats;