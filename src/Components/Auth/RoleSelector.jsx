import React from 'react';

const RoleSelector = ({ selectedRole, onRoleChange, disabled = false }) => {
  const roles = [
    {
      value: 'subscriber',
      label: 'Subscriber',
      description: 'Basic access to read content',
      icon: '👤'
    },
    {
      value: 'contributor',
      label: 'Contributor',
      description: 'Can submit content for review',
      icon: '✍️'
    },
    {
      value: 'author',
      label: 'Author',
      description: 'Can create and publish own content',
      icon: '📝'
    }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium" style={{ color: 'var(--color-base-content)' }}>
        Account Type
      </label>
      <div className="space-y-2">
        {roles.map((role) => (
          <label
            key={role.value}
            className={`relative flex items-center p-3 border rounded-lg cursor-pointer transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{
              borderColor: selectedRole === role.value ? 'var(--color-primary)' : 'var(--color-base-300)',
              backgroundColor: selectedRole === role.value ? 'var(--color-primary)' : 'var(--color-base-100)',
              opacity: selectedRole === role.value ? '0.1' : '1'
            }}
          >
            <input
              type="radio"
              name="role"
              value={role.value}
              checked={selectedRole === role.value}
              onChange={(e) => onRoleChange(e.target.value)}
              disabled={disabled}
              className="sr-only"
            />
            <div className="flex items-center space-x-3 flex-1">
              <span className="text-2xl">{role.icon}</span>
              <div>
                <div className="font-medium" style={{ color: 'var(--color-base-content)' }}>{role.label}</div>
                <div className="text-sm" style={{ color: 'var(--color-base-content)', opacity: '0.7' }}>{role.description}</div>
              </div>
            </div>
            {selectedRole === role.value && (
              <div style={{ color: 'var(--color-primary)' }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;