import React from 'react';

const ModalFooter = ({ 
  currentStep, 
  steps, 
  isSubmitting, 
  onPrevious, 
  onNext, 
  onSubmit 
}) => {
  return (
    <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-t" style={{borderColor: 'var(--color-base-300)'}}>
      <button
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: 'var(--color-base-300)',
          color: 'var(--color-base-content)'
        }}
      >
        Previous
      </button>

      <div className="flex gap-2">
        {currentStep === steps.length ? (
          <>
            <button
              onClick={() => onSubmit('draft')}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
              style={{
                backgroundColor: 'var(--color-base-300)',
                color: 'var(--color-base-content)'
              }}
            >
              {isSubmitting ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              onClick={() => onSubmit('published')}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-content)'
              }}
            >
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </button>
          </>
        ) : (
          <button
            onClick={onNext}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-content)'
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalFooter;