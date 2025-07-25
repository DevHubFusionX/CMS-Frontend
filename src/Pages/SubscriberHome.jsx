import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Services';

const SubscriberHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">CMS</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/blog')}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Blog
              </button>
              <button
                onClick={() => navigate('/subscriber-dashboard')}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </button>
              <div className="text-gray-300 text-sm">
                Welcome, {user?.name || user?.username}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Your Content Hub
          </h1>
          <p className="text-xl text-gray-300">
            Discover amazing content and manage your reading experience
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div 
            onClick={() => navigate('/blog')}
            className="bg-gray-800 rounded-lg p-8 cursor-pointer hover:bg-gray-700 transition-colors border border-gray-700"
          >
            <div className="flex items-center mb-4">
              <svg className="h-8 w-8 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 className="text-xl font-semibold text-white">Browse Blog</h3>
            </div>
            <p className="text-gray-300">
              Explore the latest articles, stories, and insights from our content creators
            </p>
          </div>

          <div 
            onClick={() => navigate('/subscriber-dashboard')}
            className="bg-gray-800 rounded-lg p-8 cursor-pointer hover:bg-gray-700 transition-colors border border-gray-700"
          >
            <div className="flex items-center mb-4">
              <svg className="h-8 w-8 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h3 className="text-xl font-semibold text-white">My Dashboard</h3>
            </div>
            <p className="text-gray-300">
              Manage your profile, view your comments, and customize your experience
            </p>
          </div>
        </div>

        {/* Features for Subscribers */}
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Your Subscriber Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <svg className="h-12 w-12 text-blue-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-lg font-semibold text-white mb-2">Comment & Engage</h3>
              <p className="text-gray-300 text-sm">Share your thoughts and engage with the community</p>
            </div>
            <div className="text-center">
              <svg className="h-12 w-12 text-green-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-white mb-2">Personal Profile</h3>
              <p className="text-gray-300 text-sm">Customize your profile and manage your account</p>
            </div>
            <div className="text-center">
              <svg className="h-12 w-12 text-purple-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h5v-5H4v5zM13 3H4v5h9V3zM4 17V9h5v8H4z" />
              </svg>
              <h3 className="text-lg font-semibold text-white mb-2">Reading History</h3>
              <p className="text-gray-300 text-sm">Track your reading activity and preferences</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriberHome;