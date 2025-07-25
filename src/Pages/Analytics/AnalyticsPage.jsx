import React, { useState, useEffect } from 'react';
import ModernAnalyticsHeader from './components/ModernAnalyticsHeader';
import ModernStatsGrid from './components/ModernStatsGrid';
import ModernChartsSection from './components/ModernChartsSection';
import ModernActivityTable from './components/ModernActivityTable';
import { useAnalytics } from '../../Services/AnalyticsContext';

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const { analyticsData, loading, error, fetchAnalyticsData } = useAnalytics();
  
  useEffect(() => {
    fetchAnalyticsData(dateRange === 'week' ? '7' : dateRange === 'month' ? '30' : '365');
  }, [dateRange]);
  
  useEffect(() => {
    if (!analyticsData.stats.totalPosts && !loading) {
      fetchAnalyticsData('30');
    }
  }, []);
  
  // Enhanced fallback data with more realistic metrics
  const fallbackData = {
    stats: {
      totalPosts: 124,
      totalUsers: 38,
      publishedPosts: 98,
      draftPosts: 26,
      totalMedia: 156,
      totalViews: 12847,
      avgEngagement: 4.2,
      conversionRate: 3.8
    },
    charts: {
      postGrowth: [
        { date: '2023-01', count: 12, views: 1200, engagement: 3.2 },
        { date: '2023-02', count: 19, views: 1890, engagement: 3.5 },
        { date: '2023-03', count: 25, views: 2450, engagement: 3.8 },
        { date: '2023-04', count: 32, views: 3200, engagement: 4.1 },
        { date: '2023-05', count: 45, views: 4500, engagement: 4.3 },
        { date: '2023-06', count: 56, views: 5600, engagement: 4.5 },
        { date: '2023-07', count: 68, views: 6800, engagement: 4.2 },
        { date: '2023-08', count: 78, views: 7800, engagement: 4.4 },
        { date: '2023-09', count: 89, views: 8900, engagement: 4.6 },
        { date: '2023-10', count: 98, views: 9800, engagement: 4.3 },
        { date: '2023-11', count: 110, views: 11000, engagement: 4.7 },
        { date: '2023-12', count: 124, views: 12400, engagement: 4.8 }
      ],
      postsByCategory: [
        { category: 'Technology', count: 45, percentage: 36.3 },
        { category: 'Design', count: 32, percentage: 25.8 },
        { category: 'Business', count: 28, percentage: 22.6 },
        { category: 'Marketing', count: 19, percentage: 15.3 }
      ],
      postsByUser: [
        { user: 'John Doe', count: 28, engagement: 4.5 },
        { user: 'Jane Smith', count: 24, engagement: 4.2 },
        { user: 'Mike Johnson', count: 19, engagement: 4.7 },
        { user: 'Sarah Williams', count: 15, engagement: 4.1 },
        { user: 'Other Users', count: 38, engagement: 4.0 }
      ]
    },
    recentActivity: [
      { id: 1, title: 'Getting Started with React', author: 'John Doe', status: 'published', date: '2023-12-15', views: 1247, engagement: 4.8 },
      { id: 2, title: 'Advanced JavaScript Techniques', author: 'Jane Smith', status: 'draft', date: '2023-12-10', views: 0, engagement: 0 },
      { id: 3, title: 'CSS Grid Layout Tutorial', author: 'Mike Johnson', status: 'published', date: '2023-12-05', views: 892, engagement: 4.3 },
      { id: 4, title: 'Introduction to TypeScript', author: 'Sarah Williams', status: 'draft', date: '2023-12-01', views: 0, engagement: 0 },
      { id: 5, title: 'Building RESTful APIs', author: 'John Doe', status: 'published', date: '2023-11-28', views: 1156, engagement: 4.6 }
    ]
  };
  
  const getFilteredData = () => {
    return loading || error ? fallbackData : analyticsData;
  };
  
  const filteredData = getFilteredData();
  
  // Moved metricTabs to ModernAnalyticsHeader component
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          <ModernAnalyticsHeader 
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onRefresh={() => fetchAnalyticsData(dateRange === 'week' ? '7' : dateRange === 'month' ? '30' : '365')}
            selectedMetric={selectedMetric}
            onMetricChange={setSelectedMetric}
          />
          
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Loading analytics data...</p>
            </div>
          )}
          
          {error && !loading && (
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-red-200/50 dark:border-red-700/50 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Unable to Load Analytics</h3>
                  <p className="text-gray-600 dark:text-gray-400">{error}</p>
                </div>
                <button 
                  onClick={() => fetchAnalyticsData('30')}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
          
          {!loading && !error && (
            <>
              <ModernStatsGrid 
                stats={filteredData.stats} 
                selectedMetric={selectedMetric} 
              />
              
              <ModernChartsSection 
                postGrowth={filteredData.postsByDate || filteredData.charts?.postGrowth || []} 
                postsByCategory={filteredData.postsByCategory || filteredData.charts?.postsByCategory || []}
                postsByUser={filteredData.postsByUser || filteredData.charts?.postsByUser || []}
                selectedMetric={selectedMetric}
              />
              
              <ModernActivityTable 
                activities={filteredData.recentActivity || []} 
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;