import React from 'react';

const ModalHeader = ({ currentStep, steps, onClose }) => {
  return (
    <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b" style={{borderColor: 'var(--color-base-300)'}}>
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'}}>
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold truncate" style={{color: 'var(--color-base-content)'}}>Create New Post</h2>
          <p className="text-xs sm:text-sm truncate" style={{color: 'var(--color-base-content)', opacity: 0.7}}>Step {currentStep} of {steps.length}: {steps[currentStep - 1].description}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-1.5 sm:p-2 rounded-lg transition-all duration-200 flex-shrink-0 hover:opacity-70"
        style={{color: 'var(--color-base-content)', backgroundColor: 'transparent'}}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-base-300)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default ModalHeader;