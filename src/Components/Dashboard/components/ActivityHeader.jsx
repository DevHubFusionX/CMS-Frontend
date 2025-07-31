import React from 'react';

const ActivityHeader = ({ filter, setFilter, filterOptions }) => {
  return (
    <div className="px-4 sm:px-6 py-3 sm:py-4 border-b backdrop-blur-sm" style={{
      borderColor: 'var(--color-base-300)',
      background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
    }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-white drop-shadow-lg">Recent Activity</h2>
          <p className="text-xs sm:text-sm mt-1 hidden sm:block text-white/80">
            Latest updates and interactions
          </p>
        </div>
        
        <button className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 backdrop-blur-sm border border-white/20">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      <div className="flex space-x-1 mt-3 sm:mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-1 overflow-x-auto scrollbar-hide border border-white/20">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`
              flex-shrink-0 px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-medium rounded-md transition-all duration-200
              ${filter === option.value
                ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                : 'text-white/70 hover:text-white hover:bg-white/10'
              }
            `}
          >
            <span className="hidden sm:inline">{option.label}</span>
            <span className="sm:hidden">{option.label.split(' ')[0]}</span>
            {option.count > 0 && (
              <span className={`
                ml-1 px-1.5 py-0.5 rounded-full text-xs
                ${filter === option.value
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white/70'
                }
              `}>
                {option.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivityHeader;