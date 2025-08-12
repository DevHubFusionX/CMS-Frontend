import React from 'react';
import { FiFolder, FiFileText, FiTrendingUp, FiStar } from 'react-icons/fi';

const CategoriesStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Categories',
      value: stats.total,
      icon: FiFolder,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Categories',
      value: stats.active,
      icon: FiTrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Total Posts',
      value: stats.postsCount,
      icon: FiFileText,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      change: '+23%',
      changeType: 'positive'
    },
    {
      title: 'Most Popular',
      value: stats.mostPopular,
      icon: FiStar,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      isText: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`relative overflow-hidden bg-gradient-to-br ${stat.bgColor} rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className={`text-2xl font-bold ${stat.isText ? 'text-lg' : ''} text-gray-900 truncate`}>
                  {stat.value}
                </p>
                {stat.change && (
                  <div className="flex items-center mt-2">
                    <span className={`text-xs font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">vs last month</span>
                  </div>
                )}
              </div>
              <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}></div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesStats;