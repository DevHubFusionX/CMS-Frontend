import React, { useState, useEffect } from 'react';

const BarChart = ({ data }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hoveredBar, setHoveredBar] = useState(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [data]);
  
  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">No data available</p>
      </div>
    );
  }
  
  // Map data to expected format if needed
  const formattedData = data.map(item => ({
    user: item.user || item.author || item.name || 'Unknown',
    count: item.count || item.value || 0,
    engagement: item.engagement || 0
  }));
  
  const maxValue = Math.max(...formattedData.map(item => item.count)) || 1;
  const chartHeight = 280;
  const chartWidth = 400;
  const padding = { top: 20, right: 20, bottom: 80, left: 60 };
  const barPadding = 0.3;
  const availableWidth = chartWidth - padding.left - padding.right;
  const availableHeight = chartHeight - padding.top - padding.bottom;
  const barWidth = (availableWidth / formattedData.length) * (1 - barPadding);
  
  // Modern gradient colors
  const colors = [
    { primary: '#3b82f6', secondary: '#1d4ed8', gradient: 'from-blue-500 to-blue-600' },
    { primary: '#8b5cf6', secondary: '#7c3aed', gradient: 'from-purple-500 to-purple-600' },
    { primary: '#ec4899', secondary: '#db2777', gradient: 'from-pink-500 to-pink-600' },
    { primary: '#f59e0b', secondary: '#d97706', gradient: 'from-amber-500 to-amber-600' },
    { primary: '#10b981', secondary: '#059669', gradient: 'from-emerald-500 to-emerald-600' },
    { primary: '#6b7280', secondary: '#4b5563', gradient: 'from-gray-500 to-gray-600' }
  ];
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
        preserveAspectRatio="xMidYMid meet"
        className="overflow-visible"
      >
        {/* Gradient Definitions */}
        <defs>
          {colors.map((color, index) => (
            <linearGradient key={index} id={`bar-gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color.primary} />
              <stop offset="100%" stopColor={color.secondary} />
            </linearGradient>
          ))}
          <filter id="bar-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.1)"/>
          </filter>
        </defs>
        
        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = padding.top + availableHeight * (1 - ratio);
          return (
            <line
              key={index}
              x1={padding.left}
              y1={y}
              x2={chartWidth - padding.right}
              y2={y}
              stroke="#f3f4f6"
              strokeWidth="1"
              strokeDasharray={index === 0 ? "none" : "2,2"}
              className="dark:stroke-gray-700"
            />
          );
        })}
        
        {/* Bars */}
        {formattedData.map((item, index) => {
          const barHeight = (availableHeight * item.count * animationProgress) / maxValue;
          const x = padding.left + (availableWidth / formattedData.length) * index + (barPadding * barWidth) / 2;
          const y = chartHeight - padding.bottom - barHeight;
          const isHovered = hoveredBar === index;
          const currentBarWidth = isHovered ? barWidth * 1.1 : barWidth;
          const adjustedX = isHovered ? x - (currentBarWidth - barWidth) / 2 : x;
          
          return (
            <g key={index}>
              {/* Bar */}
              <rect
                x={adjustedX}
                y={y}
                width={currentBarWidth}
                height={barHeight}
                fill={`url(#bar-gradient-${index % colors.length})`}
                rx="6"
                ry="6"
                filter="url(#bar-shadow)"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              />
              
              {/* Bar value label */}
              {barHeight > 20 && (
                <text
                  x={x + barWidth / 2}
                  y={y - 8}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#374151"
                  fontWeight="bold"
                  className="dark:fill-gray-300 pointer-events-none"
                >
                  {item.count}
                </text>
              )}
              
              {/* Engagement indicator */}
              {item.engagement > 0 && (
                <g>
                  <circle
                    cx={x + barWidth - 8}
                    cy={y + 12}
                    r="6"
                    fill="white"
                    stroke={colors[index % colors.length].primary}
                    strokeWidth="2"
                    className="pointer-events-none"
                  />
                  <text
                    x={x + barWidth - 8}
                    y={y + 16}
                    textAnchor="middle"
                    fontSize="8"
                    fill={colors[index % colors.length].primary}
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {item.engagement.toFixed(1)}
                  </text>
                </g>
              )}
            </g>
          );
        })}
        
        {/* X-axis labels */}
        {formattedData.map((item, index) => {
          const x = padding.left + (availableWidth / formattedData.length) * index + barWidth / 2;
          const userName = item.user.length > 12 ? item.user.substring(0, 12) + '...' : item.user;
          
          return (
            <g key={index}>
              <text
                x={x}
                y={chartHeight - padding.bottom + 20}
                textAnchor="middle"
                fontSize="11"
                fill="#6b7280"
                fontWeight="medium"
                className="dark:fill-gray-400"
              >
                {userName}
              </text>
              {/* Engagement rating below name */}
              {item.engagement > 0 && (
                <text
                  x={x}
                  y={chartHeight - padding.bottom + 35}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#9ca3af"
                  className="dark:fill-gray-500"
                >
                  ⭐ {item.engagement.toFixed(1)}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const value = maxValue * ratio;
          const y = padding.top + availableHeight * (1 - ratio);
          
          return (
            <text
              key={index}
              x={padding.left - 15}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="12"
              fill="#6b7280"
              fontWeight="medium"
              className="dark:fill-gray-400"
            >
              {Math.round(value)}
            </text>
          );
        })}
        
        {/* Axis Labels */}
        <text
          x={chartWidth / 2}
          y={chartHeight - 10}
          textAnchor="middle"
          fontSize="14"
          fill="#374151"
          fontWeight="semibold"
          className="dark:fill-gray-300"
        >
          Authors
        </text>
        
        <text
          x={20}
          y={chartHeight / 2}
          textAnchor="middle"
          fontSize="14"
          fill="#374151"
          fontWeight="semibold"
          className="dark:fill-gray-300"
          transform={`rotate(-90, 20, ${chartHeight / 2})`}
        >
          Posts
        </text>
      </svg>
      
      {/* Tooltip */}
      {hoveredBar !== null && (
        <div className="absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-4 pointer-events-none z-10 transform -translate-x-1/2 -translate-y-full ml-8">
          <div className="space-y-2">
            <div className="font-semibold text-gray-900 dark:text-white">
              {formattedData[hoveredBar].user}
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-600 dark:text-gray-400">Posts:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formattedData[hoveredBar].count}
                </span>
              </div>
              {formattedData[hoveredBar].engagement > 0 && (
                <div className="flex justify-between gap-4">
                  <span className="text-gray-600 dark:text-gray-400">Avg Rating:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formattedData[hoveredBar].engagement.toFixed(1)}/5.0
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarChart;