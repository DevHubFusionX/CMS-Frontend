import React from 'react';
import AvatarUpload from '../../../Components/Settings/AvatarUpload';

const ProfileCard = ({ user, formData, isEditing, onAvatarChange, getInitials, getRoleColor }) => {
  return (
    <div className="lg:col-span-1">
      <div className="backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden sticky top-8 animate-fade-in-up border" style={{
        backgroundColor: 'var(--color-base-200)',
        borderColor: 'var(--color-base-300)',
        background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
      }}>
        {/* Cover Image */}
        <div className="h-32 relative" style={{
          background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
        }}>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6 -mt-16 relative">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-3xl p-1 shadow-2xl border" style={{
                backgroundColor: 'var(--color-base-100)',
                borderColor: 'var(--color-base-300)'
              }}>
                {formData.avatar ? (
                  <img 
                    src={formData.avatar} 
                    alt={formData.name}
                    className="w-full h-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-2xl flex items-center justify-center" style={{
                    background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
                  }}>
                    <span className="text-3xl font-bold text-white drop-shadow-lg">
                      {getInitials(formData.name)}
                    </span>
                  </div>
                )}
              </div>
              {isEditing && (
                <div className="absolute -bottom-2 -right-2">
                  <AvatarUpload 
                    currentAvatar={formData.avatar} 
                    onAvatarChange={onAvatarChange}
                  />
                </div>
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-center" style={{color: 'var(--color-base-content)'}}>
              {formData.name || 'Your Name'}
            </h2>
            <p className="mt-1 text-center" style={{color: 'var(--color-base-content)'}}>{formData.email}</p>
            
            <div className="flex flex-col items-center mt-4 space-y-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border" style={{
                backgroundColor: getRoleColor(user?.legacyRole || user?.role?.name || user?.role),
                borderColor: getRoleColor(user?.legacyRole || user?.role?.name || user?.role),
                color: 'white'
              }}>
                {user?.legacyRole || user?.role?.name || user?.role || 'User'}
              </span>
              
              <div className="flex items-center text-sm" style={{color: 'var(--color-base-content)'}}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 6v6m-4-6h8" />
                </svg>
                Member since {new Date(user?.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            {formData.bio && (
              <p className="text-center mt-4 text-sm leading-relaxed" style={{color: 'var(--color-base-content)'}}>
                {formData.bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;