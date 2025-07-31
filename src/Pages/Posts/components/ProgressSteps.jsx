import React from 'react';

const ProgressSteps = ({ steps, currentStep }) => {
  return (
    <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4" style={{backgroundColor: 'var(--color-base-100)'}}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center gap-1 sm:gap-2 md:gap-3 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
              <div 
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 shadow-lg"
                style={{
                  backgroundColor: currentStep >= step.id ? 'var(--color-primary)' : 'var(--color-base-300)',
                  color: currentStep >= step.id ? 'var(--color-primary-content)' : 'var(--color-base-content)'
                }}
              >
                {currentStep > step.id ? (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm sm:text-base md:text-lg">{step.icon}</span>
                )}
              </div>
              <div className="hidden md:block">
                <div 
                  className="text-xs sm:text-sm font-medium"
                  style={{
                    color: currentStep >= step.id ? 'var(--color-primary)' : 'var(--color-base-content)',
                    opacity: currentStep >= step.id ? 1 : 0.7
                  }}
                >
                  {step.title}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div 
                className="flex-1 h-0.5 mx-1 sm:mx-2 md:mx-4 transition-all duration-300"
                style={{
                  backgroundColor: currentStep > step.id ? 'var(--color-primary)' : 'var(--color-base-300)'
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;