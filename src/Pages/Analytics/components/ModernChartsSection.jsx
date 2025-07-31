import React from 'react';
import { useTheme } from '../../../Context/ThemeContext';

const ModernChartsSection = ({ postGrowth, postsByCategory, postsByUser, selectedMetric }) => {
  const { theme } = useTheme();

  const renderLineChart = (data, title, color) => (
    <div className="backdrop-blur-sm p-6 border shadow-lg transition-all duration-300" style={{
      backgroundColor: 'var(--color-base-100)',
      borderColor: 'var(--color-base-300)',
      borderRadius: 'var(--radius-box)',
      border: 'var(--border) solid var(--color-base-300)'
    }}>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-300" style={{
        color: 'var(--color-base-content)'
      }}>
        <div className="w-3 h-3" style={{
          backgroundColor: color,
          borderRadius: 'var(--radius-selector)'
        }}></div>
        {title}
      </h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {data.slice(-8).map((item, index) => {
          const maxValue = Math.max(...data.map(d => d.count || d.views || 0));
          const height = ((item.count || item.views || 0) / maxValue) * 200;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full rounded-t-lg transition-all duration-500 hover:scale-105"
                style={{
                  height: `${height}px`,
                  backgroundColor: color
                }}
              ></div>
              <span className="text-xs mt-2 truncate transition-colors duration-300" style={{
                color: 'var(--color-base-content)',
                opacity: '0.7'
              }}>
                {item.date?.split('-')[1] || item.category || item.user}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderPieChart = (data, title, colors) => (
    <div className="backdrop-blur-sm p-6 border shadow-lg transition-all duration-300" style={{
      backgroundColor: 'var(--color-base-100)',
      borderColor: 'var(--color-base-300)',
      borderRadius: 'var(--radius-box)',
      border: 'var(--border) solid var(--color-base-300)'
    }}>
      <h3 className="text-lg font-semibold mb-4 transition-colors duration-300" style={{
        color: 'var(--color-base-content)'
      }}>{title}</h3>
      <div className="space-y-3">
        {data.slice(0, 5).map((item, index) => {
          const percentage = item.percentage || ((item.count / data.reduce((sum, d) => sum + d.count, 0)) * 100);
          return (
            <div key={index} className="flex items-center gap-3">
              <div className="w-4 h-4" style={{
                backgroundColor: colors[index % colors.length],
                borderRadius: 'var(--radius-selector)'
              }}></div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium transition-colors duration-300" style={{
                    color: 'var(--color-base-content)'
                  }}>
                    {item.category || item.user}
                  </span>
                  <span className="text-sm transition-colors duration-300" style={{
                    color: 'var(--color-base-content)',
                    opacity: '0.7'
                  }}>
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full rounded-full h-2 transition-colors duration-300" style={{
                  backgroundColor: 'var(--color-base-300)'
                }}>
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      background: `linear-gradient(135deg, ${colors[index % colors.length]} 0%, ${colors[index % colors.length]}dd 100%)`
                    }}
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
    'var(--color-primary)',
    'var(--color-success)',
    'var(--color-secondary)',
    'var(--color-warning)',
    'var(--color-accent)'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {selectedMetric === 'overview' && (
        <>
          {renderLineChart(postGrowth, 'Content Growth Over Time', 'var(--color-primary)')}
          {renderPieChart(postsByCategory, 'Posts by Category', colors)}
        </>
      )}

      {selectedMetric === 'content' && (
        <>
          {renderLineChart(postGrowth, 'Publishing Trends', 'var(--color-success)')}
          {renderPieChart(postsByCategory, 'Content Distribution', colors)}
        </>
      )}

      {selectedMetric === 'users' && (
        <>
          {renderPieChart(postsByUser, 'Top Contributors', colors)}
          {renderLineChart(postGrowth.map(item => ({ ...item, count: item.views || item.count })), 'User Activity', 'var(--color-secondary)')}
        </>
      )}

      {selectedMetric === 'engagement' && (
        <>
          {renderLineChart(postGrowth.map(item => ({ ...item, count: item.engagement * 1000 || item.count })), 'Engagement Trends', 'var(--color-warning)')}
          {renderPieChart(postsByUser.map(item => ({ ...item, count: item.engagement * 100 || item.count })), 'Engagement by Author', colors)}
        </>
      )}
    </div>
  );
};

export default ModernChartsSection;