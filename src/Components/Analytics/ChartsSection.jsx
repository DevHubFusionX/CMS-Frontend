import React, { useState } from 'react';
import LineChart from './Charts/LineChart';
import PieChart from './Charts/PieChart';
import BarChart from './Charts/BarChart';

const ChartCard = ({ title, subtitle, children, actions, isFullWidth = false }) => {
  return (
    <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-xl transition-all duration-300 ${
      isFullWidth ? 'col-span-full' : ''
    }`}>
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

const MetricButton = ({ active, onClick, children, color = 'blue' }) => {
  const colorClasses = {
    blue: active ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50',
    purple: active ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50',
    green: active ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50'
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${colorClasses[color]}`}
    >
      {children}
    </button>
  );
};

const ChartsSection = ({ postGrowth, postsByCategory, postsByUser, selectedMetric }) => {
  const [distributionType, setDistributionType] = useState('category');
  const [growthMetric, setGrowthMetric] = useState('count');
  const [chartView, setChartView] = useState('combined');
  
  // Ensure data has the expected format
  const formattedPostGrowth = Array.isArray(postGrowth) ? postGrowth : [];
  const formattedPostsByCategory = Array.isArray(postsByCategory) ? postsByCategory : [];
  const formattedPostsByUser = Array.isArray(postsByUser) ? postsByUser : [];
  
  // Enhanced data processing
  const processGrowthData = () => {
    return formattedPostGrowth.map(item => ({
      ...item,
      displayValue: growthMetric === 'views' ? item.views : growthMetric === 'engagement' ? item.engagement : item.count
    }));
  };

  const getGrowthMetricLabel = () => {
    switch (growthMetric) {
      case 'views': return 'Views';
      case 'engagement': return 'Engagement Score';
      default: return 'Posts';
    }
  };

  const getGrowthMetricColor = () => {
    switch (growthMetric) {
      case 'views': return 'rgb(59, 130, 246)'; // blue
      case 'engagement': return 'rgb(168, 85, 247)'; // purple
      default: return 'rgb(34, 197, 94)'; // green
    }
  };

  return (
    <div className="space-y-8">
      {/* Growth Chart - Full Width */}
      <ChartCard
        title="Performance Trends Over Time"
        subtitle={`Tracking ${getGrowthMetricLabel().toLowerCase()} progression and growth patterns`}
        isFullWidth={true}
        actions={
          <div className="flex flex-wrap gap-2">
            <MetricButton
              active={growthMetric === 'count'}
              onClick={() => setGrowthMetric('count')}
              color="green"
            >
              📝 Posts
            </MetricButton>
            <MetricButton
              active={growthMetric === 'views'}
              onClick={() => setGrowthMetric('views')}
              color="blue"
            >
              👁️ Views
            </MetricButton>
            <MetricButton
              active={growthMetric === 'engagement'}
              onClick={() => setGrowthMetric('engagement')}
              color="purple"
            >
              💬 Engagement
            </MetricButton>
          </div>
        }
      >
        <div className="h-80">
          <LineChart 
            data={processGrowthData()} 
            metric={growthMetric}
            color={getGrowthMetricColor()}
            label={getGrowthMetricLabel()}
          />
        </div>
        
        {/* Growth Insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">Growth Rate</p>
                <p className="text-lg font-bold text-green-900 dark:text-green-100">+24.5%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Peak Month</p>
                <p className="text-lg font-bold text-blue-900 dark:text-blue-100">December</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Avg Rating</p>
                <p className="text-lg font-bold text-purple-900 dark:text-purple-100">4.8/5.0</p>
              </div>
            </div>
          </div>
        </div>
      </ChartCard>
      
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category/User Distribution */}
        <ChartCard
          title={`Content Distribution by ${distributionType === 'category' ? 'Category' : 'Author'}`}
          subtitle={`Breakdown of content ${distributionType === 'category' ? 'categories' : 'authorship'} and their performance`}
          actions={
            <div className="flex gap-2">
              <MetricButton
                active={distributionType === 'category'}
                onClick={() => setDistributionType('category')}
                color="blue"
              >
                🏷️ Category
              </MetricButton>
              <MetricButton
                active={distributionType === 'user'}
                onClick={() => setDistributionType('user')}
                color="purple"
              >
                👤 Author
              </MetricButton>
            </div>
          }
        >
          <div className="h-72 flex items-center justify-center">
            {distributionType === 'category' ? (
              <PieChart data={formattedPostsByCategory} />
            ) : (
              <BarChart data={formattedPostsByUser} />
            )}
          </div>
          
          {/* Distribution Legend */}
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Top Performers
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {(distributionType === 'category' ? formattedPostsByCategory : formattedPostsByUser)
                .slice(0, 3)
                .map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-purple-500' : 'bg-green-500'
                      }`}></div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {distributionType === 'category' ? item.category : item.user}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900 dark:text-white">{item.count}</span>
                      {item.percentage && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          ({item.percentage}%)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </ChartCard>
        
        {/* Performance Metrics */}
        <ChartCard
          title="Performance Metrics"
          subtitle="Key performance indicators and engagement statistics"
        >
          <div className="space-y-6">
            {/* Engagement Score */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Engagement</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">4.6/5.0</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            {/* Content Quality */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Content Quality</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">87%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            
            {/* User Satisfaction */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">User Satisfaction</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">94%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            
            {/* Performance Summary */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Performance Summary</h4>
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Your content is performing exceptionally well with high engagement rates and positive user feedback. 
                Continue focusing on quality content creation to maintain this momentum.
              </p>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default ChartsSection;