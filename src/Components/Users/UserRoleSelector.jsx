import React from 'react';

const UserRoleSelector = ({ selectedRole, onChange }) => {
  const roles = [
    { value: 'super_admin', label: 'Super Admin', color: 'red', description: 'System-wide access for multi-tenant management' },
    { value: 'admin', label: 'Administrator', color: 'purple', description: 'Full access to all features and settings' },
    { value: 'editor', label: 'Editor', color: 'blue', description: 'Can create, edit, and publish content' },
    { value: 'author', label: 'Author', color: 'emerald', description: 'Can create and edit their own content' },
    { value: 'contributor', label: 'Contributor', color: 'yellow', description: 'Can create drafts and submit for review' },
    { value: 'subscriber', label: 'Subscriber', color: 'gray', description: 'Can access dashboard, browse blog, and manage profile' }
  ];

  const getRoleIcon = (role) => {
    const iconProps = { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" };
    
    switch (role) {
      case 'super_admin':
        return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
      case 'admin':
        return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
      case 'editor':
        return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
      case 'author':
        return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
      case 'contributor':
        return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
      default:
        return <svg {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium" style={{color: 'var(--color-base-content)'}}>
        Role & Permissions
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {roles.map((role) => (
          <label
            key={role.value}
            className={`relative flex items-start p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedRole === role.value ? 'opacity-100' : 'opacity-80 hover:opacity-90'
            }`}
            style={{
              backgroundColor: selectedRole === role.value ? 'var(--color-primary-content)' : 'var(--color-base-100)',
              borderColor: selectedRole === role.value ? 'var(--color-primary)' : 'var(--color-base-300)'
            }}
          >
            <input
              type="radio"
              name="role"
              value={role.value}
              checked={selectedRole === role.value}
              onChange={onChange}
              className="sr-only"
            />
            <div className="flex items-center space-x-2 flex-1">
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: selectedRole === role.value ? 'var(--color-primary)' : 'var(--color-base-300)',
                  color: selectedRole === role.value ? 'var(--color-primary-content)' : 'var(--color-base-content)'
                }}
              >
                {getRoleIcon(role.value)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium truncate" style={{color: 'var(--color-base-content)'}}>
                    {role.label}
                  </span>
                  {selectedRole === role.value && (
                    <svg className="w-4 h-4 flex-shrink-0" style={{color: 'var(--color-primary)'}} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-xs mt-1 line-clamp-2" style={{color: 'var(--color-base-content)', opacity: 0.7}}>
                  {role.description}
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default UserRoleSelector;