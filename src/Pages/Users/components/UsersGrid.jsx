import React from 'react';
import UserCard from './UserCard';

const UsersGrid = ({ users, loading, onEdit, onDelete, getRoleBadgeClass, getRoleLabel, getRoleIcon, getStatusIndicator }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 rounded-2xl border" style={{
        backgroundColor: 'var(--color-base-200)',
        borderColor: 'var(--color-base-300)'
      }}>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{
            borderColor: 'var(--color-primary)',
            borderTopColor: 'transparent'
          }}></div>
          <p className="text-sm font-medium" style={{color: 'var(--color-base-content)'}}>Loading users...</p>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12 rounded-2xl border" style={{
        backgroundColor: 'var(--color-base-200)',
        borderColor: 'var(--color-base-300)'
      }}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{
          backgroundColor: 'var(--color-base-300)'
        }}>
          <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'var(--color-base-content)'}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-base-content)'}}>No users found</h3>
        <p className="opacity-70" style={{color: 'var(--color-base-content)'}}>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
          getRoleBadgeClass={getRoleBadgeClass}
          getRoleLabel={getRoleLabel}
          getRoleIcon={getRoleIcon}
          getStatusIndicator={getStatusIndicator}
        />
      ))}
    </div>
  );
};

export default UsersGrid;