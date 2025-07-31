import React from 'react';
import { useTheme } from '../../../Context/ThemeContext';
import { useAuth } from '../../../Services/AuthContext';
import { 
  MdArticle, MdCheckCircle, MdPerson, MdImage, MdEdit, MdDone, 
  MdSchedule, MdTrendingUp, MdCode, MdFolder, MdSecurity, 
  MdVisibility, MdForum, MdTimer, MdComment, MdSearch, MdHourglassEmpty 
} from 'react-icons/md';

const ModernStatsGrid = ({ stats, selectedMetric }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const userRole = user?.legacyRole || user?.role?.name || user?.role;
  const isAdminOrEditor = ['admin', 'super_admin', 'editor'].includes(userRole);
  const isAuthorOrContributor = ['author', 'contributor'].includes(userRole);

  const getStatsForMetric = () => {
    const adminStats = [
      {
        label: 'Total Posts',
        value: stats.totalPosts || 0,
        icon: MdArticle,
        color: 'var(--color-primary)',
        bgColor: 'var(--color-primary-50)',
        change: '+12%',
        changeType: 'positive'
      },
      {
        label: 'Published Posts',
        value: stats.publishedPosts || 0,
        icon: MdCheckCircle,
        color: 'var(--color-success)',
        bgColor: 'var(--color-success-50)',
        change: '+8%',
        changeType: 'positive'
      },
      {
        label: 'Total Users',
        value: stats.totalUsers || 0,
        icon: MdPerson,
        color: 'var(--color-secondary)',
        bgColor: 'var(--color-secondary-50)',
        change: '+5%',
        changeType: 'positive'
      },
      {
        label: 'Media Files',
        value: stats.totalMedia || 0,
        icon: MdImage,
        color: 'var(--color-accent)',
        bgColor: 'var(--color-accent-50)',
        change: '+15%',
        changeType: 'positive'
      }
    ];

    const authorStats = [
      {
        label: 'My Posts',
        value: stats.myPosts || 0,
        icon: MdEdit,
        color: 'var(--color-primary)',
        bgColor: 'var(--color-primary-50)',
        change: '+3%',
        changeType: 'positive'
      },
      {
        label: 'My Published',
        value: stats.myPublished || 0,
        icon: MdDone,
        color: 'var(--color-success)',
        bgColor: 'var(--color-success-50)',
        change: '+2%',
        changeType: 'positive'
      },
      {
        label: 'My Drafts',
        value: stats.myDrafts || 0,
        icon: MdSchedule,
        color: 'var(--color-warning)',
        bgColor: 'var(--color-warning-50)',
        change: '+1%',
        changeType: 'positive'
      },
      {
        label: 'Post Views',
        value: stats.myViews || 0,
        icon: MdTrendingUp,
        color: 'var(--color-secondary)',
        bgColor: 'var(--color-secondary-50)',
        change: '+12%',
        changeType: 'positive',
        format: 'number'
      }
    ];

    const baseStats = isAdminOrEditor ? adminStats : authorStats;

    if (isAuthorOrContributor) {
      switch (selectedMetric) {
        case 'content':
          return [
            baseStats[0], // My Posts
            baseStats[1], // My Published
            baseStats[2], // My Drafts
            {
              label: 'Pending Review',
              value: stats.myPendingReview || 0,
              icon: MdSearch,
              color: 'var(--color-warning)',
              bgColor: 'var(--color-warning-50)',
              change: '0%',
              changeType: 'neutral'
            }
          ];
        default:
          return baseStats;
      }
    }

    // Admin/Editor metrics
    switch (selectedMetric) {
      case 'content':
        return [
          baseStats[0], // Total Posts
          baseStats[1], // Published Posts
          {
            label: 'Drafts',
            value: stats.draftPosts || 0,
            icon: MdEdit,
            color: 'var(--color-warning)',
            bgColor: 'var(--color-warning-50)',
            change: '+3%',
            changeType: 'positive'
          },
          {
            label: 'Pending Review',
            value: stats.pendingReview || 0,
            icon: MdHourglassEmpty,
            color: 'var(--color-accent)',
            bgColor: 'var(--color-accent-50)',
            change: '+1%',
            changeType: 'positive'
          }
        ];
      case 'users':
        return [
          baseStats[2], // Total Users
          {
            label: 'Authors Count',
            value: stats.authorsCount || 0,
            icon: MdCode,
            color: 'var(--color-primary)',
            bgColor: 'var(--color-primary-50)',
            change: '+2%',
            changeType: 'positive'
          },
          {
            label: 'Categories',
            value: stats.categoriesCount || 0,
            icon: MdFolder,
            color: 'var(--color-secondary)',
            bgColor: 'var(--color-secondary-50)',
            change: '+1%',
            changeType: 'positive'
          },
          {
            label: 'Role Distribution',
            value: '5 Roles',
            icon: MdSecurity,
            color: 'var(--color-success)',
            bgColor: 'var(--color-success-50)',
            change: '0%',
            changeType: 'neutral'
          }
        ];
      case 'engagement':
        return [
          {
            label: 'Total Views',
            value: stats.totalViews || 0,
            icon: MdVisibility,
            color: 'var(--color-primary)',
            bgColor: 'var(--color-primary-50)',
            change: '+24%',
            changeType: 'positive',
            format: 'number'
          },
          {
            label: 'Engagement Rate',
            value: stats.avgEngagement || 0,
            icon: MdForum,
            color: 'var(--color-secondary)',
            bgColor: 'var(--color-secondary-50)',
            change: '+5%',
            changeType: 'positive',
            format: 'percentage'
          },
          {
            label: 'Avg. Read Time',
            value: 3.2,
            icon: MdTimer,
            color: 'var(--color-warning)',
            bgColor: 'var(--color-warning-50)',
            change: '+8%',
            changeType: 'positive',
            format: 'time'
          },
          {
            label: 'Comments',
            value: stats.totalComments || 0,
            icon: MdComment,
            color: 'var(--color-accent)',
            bgColor: 'var(--color-accent-50)',
            change: '+12%',
            changeType: 'positive'
          }
        ];
      default:
        return baseStats;
    }
  };

  const formatValue = (value, format) => {
    switch (format) {
      case 'percentage':
        return `${value}%`;
      case 'time':
        return `${value}m`;
      case 'number':
        return value.toLocaleString();
      default:
        return value.toLocaleString();
    }
  };

  const statsToShow = getStatsForMetric();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statsToShow.map((stat, index) => (
        <div
          key={index}
          className="backdrop-blur-sm p-4 sm:p-6 border hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          style={{
            backgroundColor: 'var(--color-base-100)',
            borderColor: 'var(--color-base-300)',
            borderRadius: 'var(--radius-box)',
            border: 'var(--border) solid var(--color-base-300)'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-xl sm:text-2xl shadow-lg" style={{
              backgroundColor: stat.color,
              color: 'white',
              borderRadius: 'var(--radius-box)'
            }}>
              <stat.icon />
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors duration-300" style={{
              backgroundColor: stat.changeType === 'positive' ? 'var(--color-success)' : 'var(--color-error)',
              color: 'white'
            }}>
              <svg className={`w-3 h-3 ${stat.changeType === 'positive' ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'white'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              {stat.change}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-medium uppercase tracking-wide transition-colors duration-300" style={{
              color: 'var(--color-base-content)'
            }}>
              {stat.label}
            </p>
            <p className="text-2xl sm:text-3xl font-bold transition-colors duration-300" style={{
              color: 'var(--color-base-content)'
            }}>
              {formatValue(stat.value, stat.format)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModernStatsGrid;