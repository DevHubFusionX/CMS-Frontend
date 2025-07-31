import React from 'react';
import { useTheme } from '../../../Context/ThemeContext';

const ModernActivityTable = ({ activities }) => {
  const { theme } = useTheme();

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return {
          backgroundColor: 'var(--color-success)',
          color: 'white'
        };
      case 'draft':
        return {
          backgroundColor: 'var(--color-warning)',
          color: 'white'
        };
      case 'scheduled':
        return {
          backgroundColor: 'var(--color-primary)',
          color: 'white'
        };
      default:
        return {
          backgroundColor: 'var(--color-base-300)',
          color: 'var(--color-base-content)'
        };
    }
  };

  const getEngagementColor = (engagement) => {
    if (engagement >= 4.5) return 'var(--color-success)';
    if (engagement >= 3.5) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="backdrop-blur-sm p-8 border shadow-lg text-center transition-all duration-300" style={{
        backgroundColor: 'var(--color-base-100)',
        borderColor: 'var(--color-base-300)',
        borderRadius: 'var(--radius-box)',
        border: 'var(--border) solid var(--color-base-300)'
      }}>
        <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-colors duration-300" style={{
          backgroundColor: 'var(--color-base-200)',
          borderRadius: 'var(--radius-box)'
        }}>
          <svg className="w-8 h-8 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{
            color: 'var(--color-base-content)',
            opacity: '0.5'
          }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2 transition-colors duration-300" style={{
          color: 'var(--color-base-content)'
        }}>No Recent Activity</h3>
        <p className="transition-colors duration-300" style={{
          color: 'var(--color-base-content)',
          opacity: '0.7'
        }}>Start creating content to see activity here</p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-sm border shadow-lg overflow-hidden transition-all duration-300" style={{
      backgroundColor: 'var(--color-base-100)',
      borderColor: 'var(--color-base-300)',
      borderRadius: 'var(--radius-box)',
      border: 'var(--border) solid var(--color-base-300)'
    }}>
      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="divide-y transition-colors duration-300" style={{
          borderColor: 'var(--color-base-300)'
        }}>
          {activities.map((activity, index) => (
            <div key={activity.id || index} className="p-4 transition-colors duration-200 hover:bg-base-200" style={{
              backgroundColor: 'transparent'
            }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-base-200)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm line-clamp-2 transition-colors duration-300" style={{
                  color: 'var(--color-base-content)'
                }}>
                  {activity.title}
                </h4>
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium transition-colors duration-300" style={{...getStatusColor(activity.status), borderRadius: 'var(--radius-selector)'}}>
                  {activity.status}
                </span>
              </div>
              <div className="space-y-1 text-xs transition-colors duration-300" style={{
                color: 'var(--color-base-content)',
                opacity: '0.7'
              }}>
                <p>By {activity.author}</p>
                <p>{new Date(activity.date).toLocaleDateString()}</p>
                {activity.views > 0 && (
                  <div className="flex items-center gap-4">
                    <span>{activity.views.toLocaleString()} views</span>
                    {activity.engagement > 0 && (
                      <span style={{ color: getEngagementColor(activity.engagement) }}>
                        {activity.engagement.toFixed(1)}★
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="transition-colors duration-300" style={{
            backgroundColor: 'var(--color-base-200)'
          }}>
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300" style={{
                color: 'var(--color-base-content)',
                opacity: '0.7'
              }}>
                Content
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300" style={{
                color: 'var(--color-base-content)',
                opacity: '0.7'
              }}>
                Author
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300" style={{
                color: 'var(--color-base-content)',
                opacity: '0.7'
              }}>
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300" style={{
                color: 'var(--color-base-content)',
                opacity: '0.7'
              }}>
                Views
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300" style={{
                color: 'var(--color-base-content)',
                opacity: '0.7'
              }}>
                Engagement
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300" style={{
                color: 'var(--color-base-content)',
                opacity: '0.7'
              }}>
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y transition-colors duration-300" style={{
            borderColor: 'var(--color-base-300)'
          }}>
            {activities.map((activity, index) => (
              <tr key={activity.id || index} className="transition-colors duration-200" style={{
                backgroundColor: 'transparent'
              }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-base-200)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium max-w-xs truncate transition-colors duration-300" style={{
                    color: 'var(--color-base-content)'
                  }}>
                    {activity.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3" style={{
                      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
                    }}>
                      {activity.author.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm transition-colors duration-300" style={{
                      color: 'var(--color-base-content)'
                    }}>{activity.author}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-300" style={getStatusColor(activity.status)}>
                    {activity.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm transition-colors duration-300" style={{
                  color: 'var(--color-base-content)',
                  opacity: '0.7'
                }}>
                  {activity.views > 0 ? activity.views.toLocaleString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {activity.engagement > 0 ? (
                    <div className="flex items-center">
                      <span className="text-sm font-medium transition-colors duration-300" style={{
                        color: getEngagementColor(activity.engagement)
                      }}>
                        {activity.engagement.toFixed(1)}
                      </span>
                      <svg className="w-4 h-4 ml-1 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20" style={{
                        color: getEngagementColor(activity.engagement)
                      }}>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  ) : (
                    <span className="text-sm transition-colors duration-300" style={{
                      color: 'var(--color-base-content)',
                      opacity: '0.5'
                    }}>-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm transition-colors duration-300" style={{
                  color: 'var(--color-base-content)',
                  opacity: '0.7'
                }}>
                  {new Date(activity.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModernActivityTable;