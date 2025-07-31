import React from 'react';
import { useTheme } from '../../../Context/ThemeContext';
import { MdArticle, MdOutlineSchedule, MdEditNote } from 'react-icons/md';
import { FaRegCheckCircle } from 'react-icons/fa';
const PostsStats = ({ stats }) => {
  const { theme } = useTheme();


  const statItems = [
    {
      label: 'Total Posts',
      value: stats.total,
      icon: <MdArticle />,
      color: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
      iconBg: 'var(--color-primary)'
    },
    {
      label: 'Published',
      value: stats.published,
      icon: <FaRegCheckCircle />,
      color: `linear-gradient(135deg, var(--color-success) 0%, var(--color-accent) 100%)`,
      iconBg: 'var(--color-success)'
    },
    {
      label: 'Drafts',
      value: stats.drafts,
      icon: <MdEditNote />,
      color: `linear-gradient(135deg, var(--color-warning) 0%, var(--color-secondary) 100%)`,
      iconBg: 'var(--color-warning)'
    },
    {
      label: 'Scheduled',
      value: stats.scheduled,
      icon: <MdOutlineSchedule />,
      color: `linear-gradient(135deg, var(--color-secondary) 0%, var(--color-accent) 100%)`,
      iconBg: 'var(--color-secondary)'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 border hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          style={{
            backgroundColor: 'var(--color-base-200)',
            borderColor: 'var(--color-base-300)',
            background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
          }}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium uppercase tracking-wide" style={{color: 'var(--color-base-content)'}}>
                {item.label}
              </p>
              <p className="text-2xl sm:text-3xl font-bold" style={{color: 'var(--color-base-content)'}}>
                {item.value.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg border" style={{
              background: item.color,
              borderColor: item.iconBg
            }}>
              <span className="text-white drop-shadow-lg">{item.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsStats;