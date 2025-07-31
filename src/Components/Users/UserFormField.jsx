import React from 'react';

const UserFormField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  onBlur, 
  placeholder, 
  error, 
  icon,
  showToggle,
  onToggle,
  showValue
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium" style={{color: 'var(--color-base-content)'}}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={showToggle ? (showValue ? 'text' : 'password') : type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`block w-full ${icon ? 'pl-10' : 'pl-3'} ${showToggle ? 'pr-12' : 'pr-3'} py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200`}
          style={{
            backgroundColor: 'var(--color-base-100)',
            color: 'var(--color-base-content)',
            borderColor: error ? 'var(--color-error)' : 'var(--color-base-300)'
          }}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors hover:opacity-70"
            style={{color: 'var(--color-base-content)'}}
          >
            {showValue ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center space-x-2" style={{color: 'var(--color-error)'}}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default UserFormField;