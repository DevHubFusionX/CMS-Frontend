import React from 'react';
import { useAnalytics } from '../../Services/AnalyticsContext';
import { Link } from 'react-router-dom';

/**
 * Enhanced Statistics Card Component
 * 
 * A modern, interactive card displaying key metrics with:
 * - Theme-aware styling for light/dark modes
 * - Hover animations and transitions
 * - Progress indicators and trend arrows
 * - Click-through navigation to detailed views
 */
const StatCard = ({ title, value, icon, color, trend, trendValue, description, linkTo, loading }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const gradientClasses = {
    'primary': `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
    'secondary': `linear-gradient(135deg, var(--color-secondary) 0%, var(--color-accent) 100%)`,
    'accent': `linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)`,
    'success': `linear-gradient(135deg, var(--color-success) 0%, var(--color-accent) 100%)`,
    'warning': `linear-gradient(135deg, var(--color-warning) 0%, var(--color-secondary) 100%)`,
    'error': `linear-gradient(135deg, var(--color-error) 0%, var(--color-warning) 100%)`
  };

  const CardContent = () => (
    <div 
      className="rounded-xl shadow-lg border p-6 transition-all duration-300 group cursor-pointer backdrop-blur-sm"
      style={{
        backgroundColor: 'var(--color-base-200)',
        borderColor: 'var(--color-base-300)',
        background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered ? '0 25px 50px rgba(0, 0, 0, 0.25)' : '0 10px 25px rgba(0, 0, 0, 0.15)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium uppercase tracking-wide" style={{color: 'var(--color-base-content)'}}>
              {title}
            </h3>
            {trend && (
              <div className={`flex items-center text-xs font-medium`} style={{
                color: trend === 'up' 
                  ? 'var(--color-success)' 
                  : trend === 'down' 
                    ? 'var(--color-error)'
                    : 'var(--color-base-content)'
              }}>
                {trend === 'up' && (
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                )}
                {trend === 'down' && (
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
                  </svg>
                )}
                {trendValue}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="rounded-xl p-3 shadow-lg transition-all duration-300 border" style={{
              background: gradientClasses[color] || gradientClasses.primary,
              borderColor: 'var(--color-primary)',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}>
              <svg className="h-6 w-6 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
            </div>
            
            <div className="flex-1">
              <p className="text-3xl font-bold transition-colors duration-200" style={{
                color: isHovered ? 'var(--color-primary)' : 'var(--color-base-content)'
              }}>
                {loading ? (
                  <div className="animate-pulse h-8 w-16 rounded" style={{backgroundColor: 'var(--color-base-300)'}}></div>
                ) : (
                  value
                )}
              </p>
              {description && (
                <p className="text-xs mt-1" style={{color: 'var(--color-base-content)'}}>
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {linkTo && (
          <div className={`ml-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-1' : 'opacity-0 group-hover:opacity-100'}`}>
            <svg className="w-5 h-5" style={{color: 'var(--color-primary)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  return linkTo ? (
    <Link to={linkTo}>
      <CardContent />
    </Link>
  ) : (
    <CardContent />
  );
};

/**
 * Overview Cards Container Component
 * 
 * Displays a grid of key performance indicators with:
 * - Real-time data from analytics context
 * - Loading states and error handling
 * - Responsive grid layout
 * - Interactive navigation to detailed views
 */
const OverviewCards = () => {
  const { analyticsData, loading, fetchAnalyticsData, error } = useAnalytics();
  
  // Fetch analytics data on component mount
  React.useEffect(() => {
    if (!loading && (!analyticsData.stats || Object.keys(analyticsData.stats).length === 0)) {
      fetchAnalyticsData();
    }
  }, [analyticsData.stats, loading, fetchAnalyticsData]);
  
  // Calculate trend values (mock data for demonstration)
  const getTrendValue = (current, previous) => {
    if (!previous || previous === 0) return null;
    const change = ((current - previous) / previous) * 100;
    return {
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
      value: `${Math.abs(change).toFixed(1)}%`
    };
  };

  const stats = [
    {
      title: 'Total Posts',
      value: loading ? '...' : String(analyticsData?.stats?.totalPosts || 0),
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      color: 'primary',
      trend: 'up',
      trendValue: '+12%',
      description: 'Published content',
      linkTo: '/dashboard/posts'
    },
    {
      title: 'Active Users',
      value: loading ? '...' : String(analyticsData?.stats?.totalUsers || 0),
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      color: 'success',
      trend: 'up',
      trendValue: '+5%',
      description: 'Registered members',
      linkTo: '/dashboard/users'
    },
    {
      title: 'Draft Posts',
      value: loading ? '...' : String(analyticsData?.stats?.draftPosts || 0),
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      color: 'warning',
      trend: 'neutral',
      trendValue: '0%',
      description: 'Pending publication',
      linkTo: '/dashboard/posts?status=draft'
    },
    {
      title: 'Media Files',
      value: loading ? '...' : String(analyticsData?.stats?.totalMedia || 0),
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: 'accent',
      trend: 'up',
      trendValue: '+8%',
      description: 'Images & documents',
      linkTo: '/dashboard/media'
    }
  ];

  // Show error state if data fetching failed
  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="rounded-xl shadow-lg border p-6 backdrop-blur-sm" style={{
            backgroundColor: 'var(--color-base-200)',
            borderColor: 'var(--color-base-300)',
            background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
          }}>
            <div className="flex items-center justify-center h-24">
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2" style={{color: 'var(--color-error)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm" style={{color: 'var(--color-base-content)'}}>Failed to load</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard 
          key={index} 
          {...stat} 
          loading={loading}
        />
      ))}
    </div>
  );
};

export default OverviewCards;