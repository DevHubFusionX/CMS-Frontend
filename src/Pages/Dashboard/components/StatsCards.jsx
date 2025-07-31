import React from 'react';
import { useAuth } from '../../../Services/AuthContext';
import { useAnalytics } from '../../../Services/AnalyticsContext';

const StatsCards = () => {
  const { user } = useAuth();
  const { analyticsData, loading } = useAnalytics();
  
  const userRole = user?.legacyRole || user?.role?.name || user?.role;
  const isAuthorOrContributor = ['author', 'contributor'].includes(userRole);

  const statsConfig = [
    {
      title: isAuthorOrContributor ? 'My Posts' : 'Total Posts',
      value: isAuthorOrContributor ? analyticsData?.stats?.myPosts : analyticsData?.stats?.totalPosts,
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      color: 'var(--color-primary)',
      change: '+12% this week'
    },
    {
      title: isAuthorOrContributor ? 'My Published' : 'Published',
      value: isAuthorOrContributor ? analyticsData?.stats?.myPublished : analyticsData?.stats?.publishedPosts,
      icon: 'M5 3l14 9-14 9V3z',
      color: 'var(--color-success)',
      change: '+8% this week'
    },
    {
      title: isAuthorOrContributor ? 'My Drafts' : 'Media',
      value: isAuthorOrContributor ? analyticsData?.stats?.myDrafts : analyticsData?.stats?.totalMedia,
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: 'var(--color-accent)',
      change: '+5% this week'
    },
    {
      title: isAuthorOrContributor ? 'Post Views' : 'Users',
      value: isAuthorOrContributor ? analyticsData?.stats?.myViews : analyticsData?.stats?.totalUsers,
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      color: 'var(--color-secondary)',
      change: '+3% this week'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {statsConfig.map((stat, index) => (
        <div key={index} className="rounded-lg sm:rounded-xl shadow-lg border p-3 sm:p-4 lg:p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105" style={{
          backgroundColor: 'var(--color-base-200)', 
          borderColor: 'var(--color-base-300)',
          background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
        }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs sm:text-sm font-medium" style={{color: 'var(--color-base-content)'}}>{stat.title}</h3>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: stat.color}}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
              </svg>
            </div>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold mt-1 sm:mt-2" style={{color: 'var(--color-base-content)'}}>
            {loading ? '...' : stat.value || 0}
          </p>
          <p className="text-xs mt-1" style={{color: 'var(--color-success)'}}>{stat.change}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;