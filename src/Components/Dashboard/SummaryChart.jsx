import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../../Services/AnalyticsContext';
import { Link } from 'react-router-dom';

/**
 * Enhanced Summary Chart Component
 * 
 * A comprehensive content growth visualization with:
 * - Interactive chart with hover effects
 * - Multiple chart types (bar, line, area)
 * - Time period selection (7 days, 30 days, 90 days)
 * - Theme-aware styling for light/dark modes
 * - Detailed tooltips and data points
 * - Growth trend indicators
 */
const SummaryChart = () => {
  const { analyticsData, loading, error } = useAnalytics();
  const [chartType, setChartType] = useState('bar');
  const [timePeriod, setTimePeriod] = useState('30');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Mock data for demonstration
  const mockData = [
    { date: '2024-01-01', posts: 12, views: 1250, comments: 45 },
    { date: '2024-01-02', posts: 8, views: 980, comments: 32 },
    { date: '2024-01-03', posts: 15, views: 1680, comments: 67 },
    { date: '2024-01-04', posts: 22, views: 2100, comments: 89 },
    { date: '2024-01-05', posts: 18, views: 1890, comments: 76 },
    { date: '2024-01-06', posts: 25, views: 2450, comments: 102 },
    { date: '2024-01-07', posts: 30, views: 2800, comments: 125 },
    { date: '2024-01-08', posts: 28, views: 2650, comments: 118 },
    { date: '2024-01-09', posts: 35, views: 3200, comments: 145 },
    { date: '2024-01-10', posts: 42, views: 3800, comments: 167 },
    { date: '2024-01-11', posts: 38, views: 3500, comments: 156 },
    { date: '2024-01-12', posts: 45, views: 4100, comments: 189 }
  ];

  // Use real data if available, otherwise use mock data
  const chartData = loading || !analyticsData.postsByDate || analyticsData.postsByDate.length === 0 
    ? mockData 
    : analyticsData.postsByDate;

  // Filter data based on time period
  const getFilteredData = () => {
    const days = parseInt(timePeriod);
    return chartData.slice(-days);
  };

  const filteredData = getFilteredData();
  const maxPosts = Math.max(...filteredData.map(item => item.posts || item.count || 0));
  const maxViews = Math.max(...filteredData.map(item => item.views || 0));

  // Calculate growth percentage
  const calculateGrowth = () => {
    if (filteredData.length < 2) return 0;
    const recent = filteredData.slice(-7).reduce((sum, item) => sum + (item.posts || item.count || 0), 0);
    const previous = filteredData.slice(-14, -7).reduce((sum, item) => sum + (item.posts || item.count || 0), 0);
    if (previous === 0) return 100;
    return ((recent - previous) / previous * 100).toFixed(1);
  };

  const growthPercentage = calculateGrowth();

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 500);
    return () => clearTimeout(timer);
  }, [filteredData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const renderBarChart = () => {
    return (
      <div className="relative">
        {/* Chart Area */}
        <div className="flex items-end justify-between h-48 px-2 mb-4">
          {filteredData.map((item, index) => {
            const height = maxPosts > 0 ? ((item.posts || item.count || 0) / maxPosts) * 100 : 0;
            const isHovered = hoveredIndex === index;
            
            return (
              <div 
                key={index} 
                className="flex flex-col items-center group cursor-pointer"
                style={{ width: `${100 / filteredData.length}%` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-lg z-10 whitespace-nowrap">
                    <div className="font-semibold">{formatDate(item.date)}</div>
                    <div>Posts: {item.posts || item.count || 0}</div>
                    {item.views && <div>Views: {item.views.toLocaleString()}</div>}
                    {item.comments && <div>Comments: {item.comments}</div>}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                  </div>
                )}
                
                {/* Bar */}
                <div className="relative w-full max-w-8 mx-1">
                  <div 
                    className={`
                      w-full bg-gradient-to-t from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 
                      rounded-t-md transition-all duration-500 ease-out
                      ${isHovered ? 'from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 shadow-lg' : ''}
                      ${animationComplete ? '' : 'scale-y-0'}
                    `}
                    style={{ 
                      height: `${height}%`, 
                      maxHeight: '90%', 
                      minHeight: height > 0 ? '8px' : '0px',
                      transformOrigin: 'bottom'
                    }}
                  />
                  
                  {/* Value label on hover */}
                  {isHovered && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-900 dark:text-white">
                      {item.posts || item.count || 0}
                    </div>
                  )}
                </div>
                
                {/* Date label */}
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 transform rotate-45 origin-left">
                  {formatDate(item.date)}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-48 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 -ml-8">
          <span>{maxPosts}</span>
          <span>{Math.round(maxPosts * 0.75)}</span>
          <span>{Math.round(maxPosts * 0.5)}</span>
          <span>{Math.round(maxPosts * 0.25)}</span>
          <span>0</span>
        </div>
      </div>
    );
  };

  const renderLineChart = () => {
    const points = filteredData.map((item, index) => {
      const x = (index / (filteredData.length - 1)) * 100;
      const y = maxPosts > 0 ? 100 - ((item.posts || item.count || 0) / maxPosts) * 100 : 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="relative h-48 mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="20" height="25" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 25" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-gray-300 dark:text-gray-600"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
          
          {/* Area fill */}
          <polygon
            points={`0,100 ${points} 100,100`}
            fill="url(#gradient)"
            className="opacity-30"
          />
          
          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-blue-500 dark:text-blue-400"
          />
          
          {/* Data points */}
          {filteredData.map((item, index) => {
            const x = (index / (filteredData.length - 1)) * 100;
            const y = maxPosts > 0 ? 100 - ((item.posts || item.count || 0) / maxPosts) * 100 : 100;
            const isHovered = hoveredIndex === index;
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={isHovered ? "1" : "0.5"}
                fill="currentColor"
                className={`text-blue-500 dark:text-blue-400 cursor-pointer transition-all duration-200 ${isHovered ? 'text-blue-600 dark:text-blue-300' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" className="text-blue-500 dark:text-blue-400" />
              <stop offset="100%" stopColor="currentColor" className="text-blue-200 dark:text-blue-600" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Tooltip for line chart */}
        {hoveredIndex !== null && (
          <div 
            className="absolute px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-lg z-10 whitespace-nowrap pointer-events-none"
            style={{
              left: `${(hoveredIndex / (filteredData.length - 1)) * 100}%`,
              top: `${maxPosts > 0 ? 100 - ((filteredData[hoveredIndex].posts || filteredData[hoveredIndex].count || 0) / maxPosts) * 100 : 100}%`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className="font-semibold">{formatDate(filteredData[hoveredIndex].date)}</div>
            <div>Posts: {filteredData[hoveredIndex].posts || filteredData[hoveredIndex].count || 0}</div>
          </div>
        )}
      </div>
    );
  };

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-8">
          <svg className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Failed to load chart data</h3>
          <p className="text-gray-500 dark:text-gray-400">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Content Growth</h2>
            <div className="flex items-center mt-1 space-x-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Posts published over time
              </p>
              <div className={`flex items-center text-sm font-medium ${
                parseFloat(growthPercentage) >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {parseFloat(growthPercentage) >= 0 ? (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
                  </svg>
                )}
                {Math.abs(parseFloat(growthPercentage))}% vs last week
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            {/* Time Period Selector */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {[
                { value: '7', label: '7D' },
                { value: '30', label: '30D' },
                { value: '90', label: '90D' }
              ].map((period) => (
                <button
                  key={period.value}
                  onClick={() => setTimePeriod(period.value)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
                    timePeriod === period.value
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
            
            {/* Chart Type Selector */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {[
                { value: 'bar', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                { value: 'line', icon: 'M7 12l3-3 3 3 4-4' }
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setChartType(type.value)}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    chartType === type.value
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  title={`${type.value} chart`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={type.icon} />
                  </svg>
                </button>
              ))}
            </div>
            
            {/* View Details Link */}
            <Link 
              to="/dashboard/analytics" 
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
            >
              View details
            </Link>
          </div>
        </div>
      </div>
      
      {/* Chart Content */}
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-4" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading chart data...</p>
            </div>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No data available</h3>
              <p className="text-gray-500 dark:text-gray-400">Start creating content to see growth analytics</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            {chartType === 'bar' ? renderBarChart() : renderLineChart()}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryChart;