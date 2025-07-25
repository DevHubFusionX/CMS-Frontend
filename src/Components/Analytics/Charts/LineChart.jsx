import React, { useState, useEffect } from 'react';

const LineChart = ({ data, metric = 'count', color = 'rgb(59, 130, 246)', label = 'Posts' }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 100);
    return () => clearTimeout(timer);
  }, [data]);
  
  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">No data available</p>
      </div>
    );
  }
  
  // Check if data has the expected structure
  const hasValidData = data.every(item => 
    item && typeof item === 'object' && 
    (item.count !== undefined || item.value !== undefined || item.displayValue !== undefined) && 
    item.date !== undefined
  );
  
  if (!hasValidData) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-red-500 dark:text-red-400 font-medium">Invalid data format</p>
      </div>
    );
  }
  
  // Use displayValue, count, or value property based on what's available
  const getValue = (item) => {
    if (item.displayValue !== undefined) return item.displayValue;
    if (item[metric] !== undefined) return item[metric];
    return item.count !== undefined ? item.count : item.value;
  };
  
  const maxValue = Math.max(...data.map(item => getValue(item)));
  const minValue = Math.min(...data.map(item => getValue(item)));
  const range = maxValue - minValue || 1; // Avoid division by zero
  
  const chartHeight = 280;
  const chartWidth = 800;
  const padding = { top: 20, right: 40, bottom: 60, left: 60 };
  
  const getX = (index) => {
    return (index / (data.length - 1)) * (chartWidth - padding.left - padding.right) + padding.left;
  };
  
  const getY = (value) => {
    return chartHeight - ((value - minValue) / range) * (chartHeight - padding.top - padding.bottom) - padding.bottom;
  };
  
  // Generate path data for the line with animation
  const pathData = data.map((item, index) => {
    const x = getX(index);
    const y = getY(getValue(item));
    const animatedIndex = index * animationProgress;
    const shouldShow = index <= animatedIndex;
    return shouldShow ? `${index === 0 ? 'M' : 'L'} ${x} ${y}` : '';
  }).join(' ');
  
  // Generate gradient area path
  const areaPath = data.map((item, index) => {
    const x = getX(index);
    const y = getY(getValue(item));
    const animatedIndex = index * animationProgress;
    const shouldShow = index <= animatedIndex;
    if (!shouldShow) return '';
    if (index === 0) return `M ${x} ${chartHeight - padding.bottom} L ${x} ${y}`;
    return `L ${x} ${y}`;
  }).join(' ') + ` L ${getX(Math.floor(data.length * animationProgress - 1))} ${chartHeight - padding.bottom} Z`;
  
  const formatDate = (dateString) => {
    if (typeof dateString === 'string' && dateString.includes('-')) {
      const [year, month] = dateString.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return monthNames[parseInt(month) - 1] || month;
    }
    return String(dateString).substring(0, 6);
  };
  
  const formatValue = (value) => {
    if (metric === 'engagement') return value.toFixed(1);
    return value.toLocaleString();
  };
  
  return (
    <div className="w-full h-full relative">
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
        preserveAspectRatio="xMidYMid meet"
        className="overflow-visible"
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id={`gradient-${metric}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = getY(minValue + range * ratio);
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
        
        {/* Vertical Grid Lines */}
        {data.map((_, index) => {
          if (index % Math.ceil(data.length / 6) === 0) {
            return (
              <line
                key={index}
                x1={getX(index)}
                y1={padding.top}
                x2={getX(index)}
                y2={chartHeight - padding.bottom}
                stroke="#f3f4f6"
                strokeWidth="1"
                strokeDasharray="2,2"
                className="dark:stroke-gray-700"
              />
            );
          }
          return null;
        })}
        
        {/* Area Fill */}
        <path 
          d={areaPath} 
          fill={`url(#gradient-${metric})`}
          className="transition-all duration-1000"
        />
        
        {/* Main Line */}
        <path 
          d={pathData} 
          fill="none" 
          stroke={color} 
          strokeWidth="3" 
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          className="transition-all duration-1000"
        />
        
        {/* Data Points */}
        {data.map((item, index) => {
          const animatedIndex = index * animationProgress;
          const shouldShow = index <= animatedIndex;
          if (!shouldShow) return null;
          
          return (
            <circle
              key={index}
              cx={getX(index)}
              cy={getY(getValue(item))}
              r={hoveredPoint === index ? "8" : "6"}
              fill={color}
              stroke="white"
              strokeWidth="3"
              className="cursor-pointer transition-all duration-200 hover:r-8 filter drop-shadow-lg"
              onMouseEnter={() => setHoveredPoint(index)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          );
        })}
        
        {/* X-axis labels */}
        {data.map((item, index) => {
          const shouldShowLabel = index % Math.ceil(data.length / 8) === 0 || data.length <= 8;
          if (!shouldShowLabel) return null;
          
          return (
            <text
              key={index}
              x={getX(index)}
              y={chartHeight - padding.bottom + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
              className="dark:fill-gray-400 font-medium"
            >
              {formatDate(item.date)}
            </text>
          );
        })}
        
        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const value = minValue + range * ratio;
          return (
            <text
              key={index}
              x={padding.left - 15}
              y={getY(value)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="12"
              fill="#6b7280"
              className="dark:fill-gray-400 font-medium"
            >
              {formatValue(value)}
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
          className="dark:fill-gray-300 font-semibold"
        >
          Time Period
        </text>
        
        <text
          x={20}
          y={chartHeight / 2}
          textAnchor="middle"
          fontSize="14"
          fill="#374151"
          className="dark:fill-gray-300 font-semibold"
          transform={`rotate(-90, 20, ${chartHeight / 2})`}
        >
          {label}
        </text>
      </svg>
      
      {/* Tooltip */}
      {hoveredPoint !== null && (
        <div 
          className="absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-4 pointer-events-none z-10 transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(getX(hoveredPoint) / chartWidth) * 100}%`,
            top: `${(getY(getValue(data[hoveredPoint])) / chartHeight) * 100}%`,
            marginTop: '-10px'
          }}
        >
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {formatDate(data[hoveredPoint].date)}
          </div>
          <div className="text-lg font-bold" style={{ color }}>
            {formatValue(getValue(data[hoveredPoint]))} {label.toLowerCase()}
          </div>
          {data[hoveredPoint].engagement && metric !== 'engagement' && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Engagement: {data[hoveredPoint].engagement.toFixed(1)}/5.0
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LineChart;