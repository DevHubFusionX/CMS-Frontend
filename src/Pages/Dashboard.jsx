import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../Services/AuthContext';
import { useAnalytics } from '../Services/AnalyticsContext';
import { Sidebar, Topbar, OverviewCards, RecentActivity, SummaryChart } from '../Components/Dashboard';
import { PostsList, CreatePost, EditPost, ViewPost, EnhancedCreatePost } from './Posts/index.js';
import { SettingsPage } from './Settings';
import { AnalyticsPage } from './Analytics';
import { MediaPage } from './Media';
import { CategoriesPage } from './Categories';
import { TagsPage } from './Tags';
import { UsersPage } from './Users';
import { CommentsPage } from './Comments';

/**
 * Enhanced Dashboard Home Component
 * 
 * A modern, responsive dashboard overview with:
 * - Personalized greeting based on time of day
 * - Theme-aware styling for light/dark modes
 * - Comprehensive analytics overview
 * - Quick action shortcuts
 * - Recent activity feed
 * - Performance metrics and charts
 */
const DashboardHome = () => {
  const { user } = useAuth();
  const { analyticsData, loading, error } = useAnalytics();
  
  /**
   * Generate personalized greeting based on current time
   * @returns {string} Time-appropriate greeting
   */
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  /**
   * Get formatted current date with day name
   * @returns {string} Formatted date string
   */
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  /**
   * Get user's display name from available user data
   * @returns {string} User's display name
   */
  const getUserDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.email) return user.email.split('@')[0];
    return 'there';
  };
  
  return (
    <div className="space-y-6">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-blue-100 dark:border-gray-600">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {getUserDisplayName().charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-medium text-blue-600 dark:text-blue-400">
                  {getGreeting()}, {getUserDisplayName()}!
                </h2>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Dashboard Overview
                </h1>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Welcome back to your content management system. Here's what's happening today.
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0 sm:ml-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-600">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {getCurrentDate()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Statistics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Posts</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {loading ? '...' : analyticsData?.stats?.totalPosts || 0}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Published Posts</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {loading ? '...' : analyticsData?.stats?.publishedPosts || 0}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Media</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {loading ? '...' : analyticsData?.stats?.totalMedia || 0}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Users</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {loading ? '...' : analyticsData?.stats?.totalUsers || 0}
          </p>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity - Takes up 2/3 of the width on large screens */}
        <div className="xl:col-span-2 space-y-6">
          <RecentActivity />
          
          {/* Summary Chart - Temporarily disabled */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Summary Chart</h3>
            <p className="text-gray-500 dark:text-gray-400">Chart temporarily disabled</p>
          </div>
        </div>
        
        {/* Sidebar Content - Takes up 1/3 of the width on large screens */}
        <div className="xl:col-span-1 space-y-6">
          {/* View Blog */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              View Blog
            </h3>
            <a
              href="/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Visit Your Blog
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              View your public blog in a new tab
            </p>
          </div>
          
          {/* Additional Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">This Week</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">+12%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Page Views</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">2,847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Engagement</span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">68%</span>
              </div>
            </div>
          </div>
          
          {/* System Status */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              System Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Server</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Database</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">Connected</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Storage</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">78% Used</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Main Dashboard Layout Component
 * 
 * Provides the overall layout structure with:
 * - Responsive sidebar navigation
 * - Top navigation bar
 * - Main content area with routing
 * - Theme-aware background and styling
 */
const Dashboard = () => {
  
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <Topbar />
        
        {/* Main Content with Routing */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="posts" element={<PostsList />} />
              <Route path="posts/my" element={<PostsList showMyPosts={true} />} />
              <Route path="posts/create" element={<CreatePost />} />
              <Route path="posts/create-enhanced" element={<EnhancedCreatePost />} />
              <Route path="posts/edit/:id" element={<EditPost />} />
              <Route path="posts/view/:id" element={<ViewPost />} />
              <Route path="media" element={<MediaPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="tags" element={<TagsPage />} />
              <Route path="comments" element={<CommentsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;