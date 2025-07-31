import React from 'react';

const UserModal = ({ children, title, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
      <div className="rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
        <div className="flex items-center justify-between p-6 border-b" style={{borderColor: 'var(--color-base-300)'}}>
          <h2 className="text-xl font-semibold" style={{color: 'var(--color-base-content)'}}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="transition-colors hover:opacity-70"
            style={{color: 'var(--color-base-content)'}}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserModal;