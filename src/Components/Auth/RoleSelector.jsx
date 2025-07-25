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
      <label className="block text-sm font-medium text-gray-700">
        Account Type
      </label>
      <div className="space-y-2">
        {roles.map((role) => (
          <label
            key={role.value}
            className={`relative flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
              selectedRole === role.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                <div className="font-medium text-gray-900">{role.label}</div>
                <div className="text-sm text-gray-500">{role.description}</div>
              </div>
            </div>
            {selectedRole === role.value && (
              <div className="text-blue-500">
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