import React from 'react';

const UsersHeader = ({ onAddUser, totalUsers }) => {
  return (
    <div className="rounded-2xl border p-6" style={{
      backgroundColor: 'var(--color-base-200)',
      borderColor: 'var(--color-base-300)',
      background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
    }}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border border-white/20" style={{
            background: `linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)`
          }}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">Users Management</h1>
            <p className="text-white/80 drop-shadow-sm">Manage user accounts and permissions</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="px-3 py-2 rounded-lg backdrop-blur-sm border border-white/20" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}>
            <span className="text-sm font-medium text-white">
              {totalUsers} users
            </span>
          </div>
          <button
            onClick={onAddUser}
            className="inline-flex items-center px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 border border-white/20"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersHeader;