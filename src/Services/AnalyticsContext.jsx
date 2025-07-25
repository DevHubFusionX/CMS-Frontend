import React, { createContext, useContext, useState, useEffect } from 'react';
import { analyticsService } from './analyticsService';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const [analyticsData, setAnalyticsData] = useState({
    stats: {
      totalPosts: 0,
      publishedPosts: 0,
      draftPosts: 0,
      totalUsers: 0,
      totalMedia: 0
    },
    postsByDate: [],
    postsByCategory: [],
    postsByUser: [],
    recentActivity: [],
    charts: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics data
  const fetchAnalyticsData = async (dateRange = '30') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await analyticsService.getAnalytics(dateRange);
      
      setAnalyticsData({
        stats: response.data.stats,
        postsByDate: response.data.postsByDate,
        postsByCategory: response.data.postsByCategory,
        postsByUser: response.data.postsByUser,
        recentActivity: response.data.recentActivity,
        charts: {
          postGrowth: response.data.postsByDate,
          postsByCategory: response.data.postsByCategory,
          postsByUser: response.data.postsByUser
        }
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch analytics data');
      console.error('Analytics fetch error:', err);
      
      // Use fallback data on error
      setAnalyticsData({
        stats: {
          totalPosts: 0,
          publishedPosts: 0,
          draftPosts: 0,
          totalUsers: 0,
          totalComments: 0
        },
        postsByDate: [],
        postsByCategory: [],
        postsByUser: [],
        recentActivity: [],
        charts: {}
      });
    } finally {
      setLoading(false);
    }
  };
  


  // Fetch analytics data on mount
  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  return (
    <AnalyticsContext.Provider value={{
      analyticsData,
      loading,
      error,
      fetchAnalyticsData
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};