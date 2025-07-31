import React from 'react';
import { formatDate } from '../../../Utils/formatters';

const UserCard = ({ user, onEdit, onDelete, getRoleBadgeClass, getRoleLabel, getRoleIcon, getStatusIndicator }) => {
  const userName = user.name || 'Unknown User';
  const userEmail = user.email || 'No email provided';
  const joinDate = user.createdAt ? formatDate(user.createdAt, { month: 'short', year: '2-digit' }) : 'N/A';

  return (
    <div className="rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1" style={{
      backgroundColor: 'var(--color-base-200)',
      borderColor: 'var(--color-base-300)',
      background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
    }}>
      <div className="p-6">
        {/* Header with Avatar and Actions */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg border border-white/20" style={{
                background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
              }}>
                {userName.charAt(0).toUpperCase()}
              </div>
              {getStatusIndicator(user)}
            </div>
            <div>
              <h3 className="text-lg font-semibold" style={{color: 'var(--color-base-content)'}}>{userName}</h3>
              <p className="text-sm opacity-70" style={{color: 'var(--color-base-content)'}}>{userEmail}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
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
        </div>
        
        {/* Role Badge and Join Date */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border shadow-sm" style={getRoleBadgeClass(user.role)}>
            {getRoleIcon(user.role)}
            <span className="ml-2">{getRoleLabel(user.role)}</span>
          </div>
          <div className="text-xs px-2 py-1 rounded-lg" style={{
            backgroundColor: 'var(--color-base-300)',
            color: 'var(--color-base-content)'
          }}>
            Joined {joinDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;