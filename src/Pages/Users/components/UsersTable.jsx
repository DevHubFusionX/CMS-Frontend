import React from 'react';
import { formatDate } from '../../../Utils/formatters';

const UsersTable = ({ users, loading, onEdit, onDelete, getRoleBadgeClass, getRoleLabel, getRoleIcon, getStatusIndicator }) => {
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
    <div className="rounded-2xl border overflow-hidden shadow-lg" style={{
      backgroundColor: 'var(--color-base-200)',
      borderColor: 'var(--color-base-300)'
    }}>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead style={{backgroundColor: 'var(--color-base-300)'}}>
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{color: 'var(--color-base-content)'}}>
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{color: 'var(--color-base-content)'}}>
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{color: 'var(--color-base-content)'}}>
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{color: 'var(--color-base-content)'}}>
                Joined
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider" style={{color: 'var(--color-base-content)'}}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr 
                key={user.id} 
                className="transition-colors duration-200 border-t"
                style={{
                  borderColor: 'var(--color-base-300)',
                  backgroundColor: index % 2 === 0 ? 'var(--color-base-100)' : 'var(--color-base-200)'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-base-300)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = index % 2 === 0 ? 'var(--color-base-100)' : 'var(--color-base-200)'}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg border border-white/20" style={{
                        background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
                      }}>
                        {(user.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      {getStatusIndicator(user)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold" style={{color: 'var(--color-base-content)'}}>
                        {user.name || 'Unknown User'}
                      </div>
                      <div className="text-sm opacity-70" style={{color: 'var(--color-base-content)'}}>
                        {user.email || 'No email'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border shadow-sm" style={getRoleBadgeClass(user.role)}>
                    {getRoleIcon(user.role)}
                    <span className="ml-1">{getRoleLabel(user.role)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: 'var(--color-success)'}}></div>
                    <span className="text-sm" style={{color: 'var(--color-base-content)'}}>Online</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm" style={{color: 'var(--color-base-content)'}}>
                  {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
                      style={{
                        backgroundColor: 'var(--color-base-100)',
                        color: 'var(--color-primary)',
                        border: `1px solid var(--color-base-300)`
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'var(--color-primary)';
                        e.target.style.color = 'var(--color-primary-content)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'var(--color-base-100)';
                        e.target.style.color = 'var(--color-primary)';
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(user)}
                      className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
                      style={{
                        backgroundColor: 'var(--color-base-100)',
                        color: 'var(--color-error)',
                        border: `1px solid var(--color-base-300)`
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'var(--color-error)';
                        e.target.style.color = 'var(--color-error-content)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'var(--color-base-100)';
                        e.target.style.color = 'var(--color-error)';
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;