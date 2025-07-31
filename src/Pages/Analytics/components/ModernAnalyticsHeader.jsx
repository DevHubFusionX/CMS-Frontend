import React from 'react';
import DateRangeFilter from '../../../Components/Analytics/DateRangeFilter';
import { useTheme } from '../../../Context/ThemeContext';
import { MdOutlineAnalytics, MdOutlineArticle, MdPeopleOutline, MdOutlineForum } from 'react-icons/md';

const ModernAnalyticsHeader = ({ dateRange, onDateRangeChange, onRefresh, selectedMetric, onMetricChange }) => {
  const { theme } = useTheme();
  

  const metricTabs = [
    { id: 'overview', label: 'Overview', icon: MdOutlineAnalytics, color: 'var(--color-primary)' },
    { id: 'content', label: 'Content', icon: MdOutlineArticle, color: 'var(--color-success)' },
    { id: 'users', label: 'Users', icon: MdPeopleOutline, color: 'var(--color-secondary)' },
    { id: 'engagement', label: 'Engagement', icon: MdOutlineForum, color: 'var(--color-warning)' }
  ];

  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold transition-all duration-300" style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-accent) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Analytics Dashboard
        </h1>
        <p className="text-base sm:text-lg max-w-3xl mx-auto transition-colors duration-300" style={{
          color: 'var(--color-base-content)',
          opacity: '0.8'
        }}>
          Comprehensive insights into your content performance, audience engagement, and growth metrics
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
        <DateRangeFilter value={dateRange} onChange={onDateRangeChange} />
        <button
          onClick={onRefresh}
          className="px-6 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-content)',
            borderRadius: 'var(--radius-box)'
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>

      {/* Metric Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        {metricTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onMetricChange(tab.id)}
            className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all duration-300 flex items-center gap-2 ${
              selectedMetric === tab.id
                ? 'shadow-lg transform scale-105'
                : 'hover:shadow-md border transition-all duration-300'
            }`}
            style={{
              backgroundColor: selectedMetric === tab.id ? tab.color : 'var(--color-base-100)',
              color: selectedMetric === tab.id ? 'white' : 'var(--color-base-content)',
              borderColor: selectedMetric === tab.id ? 'transparent' : 'var(--color-base-300)',
              borderRadius: 'var(--radius-box)',
              border: selectedMetric === tab.id ? 'none' : 'var(--border) solid var(--color-base-300)'
            }}
          >
            <tab.icon className="text-lg" style={{color: selectedMetric === tab.id ? 'white' : 'var(--color-base-content)'}} />
            <span className="text-sm sm:text-base">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModernAnalyticsHeader;