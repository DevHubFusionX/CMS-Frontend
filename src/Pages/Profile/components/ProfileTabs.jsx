import React from 'react';

const ProfileTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="border-b" style={{borderColor: 'var(--color-base-300)'}}>
      <nav className="flex space-x-1 p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-300 border`}
            style={{
              backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
              color: activeTab === tab.id ? 'var(--color-primary-content)' : 'var(--color-base-content)',
              borderColor: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
              transform: activeTab === tab.id ? 'scale(1.05)' : 'scale(1)',
              boxShadow: activeTab === tab.id ? '0 10px 25px rgba(0, 0, 0, 0.15)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.backgroundColor = 'var(--color-base-300)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileTabs;