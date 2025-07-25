import React, { useState, useEffect } from 'react';

const PieChart = ({ data }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hoveredSlice, setHoveredSlice] = useState(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 200);
    return () => clearTimeout(timer);
  }, [data]);
  
  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">No data available</p>
      </div>
    );
  }
  
  // Map data to expected format if needed
  const formattedData = data.map(item => ({
    category: item.category || item.name || 'Unknown',
    count: item.count || item.value || 0,
    percentage: item.percentage || 0
  }));
  
  const total = formattedData.reduce((sum, item) => sum + item.count, 0);
  
  // Modern color palette with gradients
  const colors = [
    { primary: '#3b82f6', secondary: '#1d4ed8', gradient: 'from-blue-500 to-blue-600' },
    { primary: '#8b5cf6', secondary: '#7c3aed', gradient: 'from-purple-500 to-purple-600' },
    { primary: '#ec4899', secondary: '#db2777', gradient: 'from-pink-500 to-pink-600' },
    { primary: '#f59e0b', secondary: '#d97706', gradient: 'from-amber-500 to-amber-600' },
    { primary: '#10b981', secondary: '#059669', gradient: 'from-emerald-500 to-emerald-600' },
    { primary: '#6b7280', secondary: '#4b5563', gradient: 'from-gray-500 to-gray-600' }
  ];
  
  let startAngle = -Math.PI / 2; // Start from top
  const chartSize = 240;
  const centerX = chartSize / 2;
  const centerY = chartSize / 2;
  const radius = Math.min(centerX, centerY) * 0.75;
  const hoverRadius = radius + 8;
  
  // Generate pie slices with animation
  const slices = formattedData.map((item, index) => {
    const percentage = item.count / total;
    const animatedPercentage = percentage * animationProgress;
    const endAngle = startAngle + animatedPercentage * 2 * Math.PI;
    
    const isHovered = hoveredSlice === index;
    const currentRadius = isHovered ? hoverRadius : radius;
    
    // Calculate SVG arc path
    const x1 = centerX + currentRadius * Math.cos(startAngle);
    const y1 = centerY + currentRadius * Math.sin(startAngle);
    const x2 = centerX + currentRadius * Math.cos(endAngle);
    const y2 = centerY + currentRadius * Math.sin(endAngle);
    
    // Determine if the arc should be drawn as a large arc (more than 180 degrees)
    const largeArcFlag = animatedPercentage > 0.5 ? 1 : 0;
    
    // Create SVG path for the slice
    const pathData = animatedPercentage > 0 ? `
      M ${centerX} ${centerY}
      L ${x1} ${y1}
      A ${currentRadius} ${currentRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
      Z
    ` : '';
    
    // Calculate position for the percentage label
    const labelAngle = startAngle + (endAngle - startAngle) / 2;
    const labelRadius = currentRadius * 0.7;
    const labelX = centerX + labelRadius * Math.cos(labelAngle);
    const labelY = centerY + labelRadius * Math.sin(labelAngle);
    
    const slice = {
      path: pathData,
      color: colors[index % colors.length],
      percentage: percentage,
      animatedPercentage: animatedPercentage,
      label: {
        x: labelX,
        y: labelY,
        text: `${Math.round(percentage * 100)}%`,
        visible: percentage > 0.08 // Only show label if slice is big enough
      },
      item: item,
      index: index
    };
    
    startAngle = endAngle;
    return slice;
  });
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <svg 
          width={chartSize} 
          height={chartSize} 
          viewBox={`0 0 ${chartSize} ${chartSize}`} 
          className="drop-shadow-lg"
        >
          {/* Gradient Definitions */}
          <defs>
            {colors.map((color, index) => (
              <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color.primary} />
                <stop offset="100%" stopColor={color.secondary} />
              </linearGradient>
            ))}
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.1)"/>
            </filter>
          </defs>
          
          {/* Background Circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 2}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="2"
            className="dark:stroke-gray-700"
          />
          
          {/* Pie slices */}
          {slices.map((slice, index) => (
            <path
              key={index}
              d={slice.path}
              fill={`url(#gradient-${index})`}
              stroke="#fff"
              strokeWidth="2"
              filter="url(#shadow)"
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredSlice(index)}
              onMouseLeave={() => setHoveredSlice(null)}
            />
          ))}
          
          {/* Slice labels */}
          {slices.map((slice, index) => (
            slice.label.visible && slice.animatedPercentage > 0.05 && (
              <text
                key={index}
                x={slice.label.x}
                y={slice.label.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fill="#fff"
                fontWeight="bold"
                className="pointer-events-none drop-shadow-sm"
              >
                {slice.label.text}
              </text>
            )
          ))}
          
          {/* Center Circle with Total */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.4}
            fill="white"
            stroke="#e5e7eb"
            strokeWidth="2"
            filter="url(#shadow)"
            className="dark:fill-gray-800 dark:stroke-gray-600"
          />
          
          <text
            x={centerX}
            y={centerY - 8}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fill="#6b7280"
            fontWeight="semibold"
            className="dark:fill-gray-400"
          >
            Total
          </text>
          
          <text
            x={centerX}
            y={centerY + 8}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="18"
            fill="#1f2937"
            fontWeight="bold"
            className="dark:fill-white"
          >
            {total.toLocaleString()}
          </text>
        </svg>
        
        {/* Tooltip */}
        {hoveredSlice !== null && (
          <div className="absolute top-0 left-full ml-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-4 pointer-events-none z-10 min-w-48">
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: slices[hoveredSlice].color.primary }}
              ></div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {slices[hoveredSlice].item.category}
              </span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Count:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {slices[hoveredSlice].item.count.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Percentage:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {Math.round(slices[hoveredSlice].percentage * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Legend */}
      <div className="ml-8 space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
          Distribution
        </h4>
        <div className="space-y-2">
          {formattedData.map((item, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                hoveredSlice === index 
                  ? 'bg-gray-100 dark:bg-gray-700 transform scale-105' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
              onMouseEnter={() => setHoveredSlice(index)}
              onMouseLeave={() => setHoveredSlice(null)}
            >
              <div 
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: colors[index % colors.length].primary }}
              ></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {item.category}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {item.count.toLocaleString()} items ({Math.round((item.count / total) * 100)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart;