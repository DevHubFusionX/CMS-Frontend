import React from 'react';

const ModernPagination = ({ 
  currentPage, 
  totalPages, 
  indexOfFirstPost, 
  indexOfLastPost, 
  totalPosts, 
  onPageChange 
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 border shadow-lg" style={{
      backgroundColor: 'var(--color-base-200)',
      borderColor: 'var(--color-base-300)',
      background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
    }}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Results Info */}
        <div className="text-sm text-center sm:text-left" style={{color: 'var(--color-base-content)'}}>
          Showing <span className="font-medium" style={{color: 'var(--color-primary)'}}>{indexOfFirstPost + 1}</span> to{' '}
          <span className="font-medium" style={{color: 'var(--color-primary)'}}>{Math.min(indexOfLastPost, totalPosts)}</span> of{' '}
          <span className="font-medium" style={{color: 'var(--color-primary)'}}>{totalPosts.toLocaleString()}</span> posts
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-1">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 border"
            style={{
              backgroundColor: currentPage === 1 ? 'var(--color-base-300)' : 'var(--color-base-200)',
              color: currentPage === 1 ? 'var(--color-base-content)' : 'var(--color-base-content)',
              borderColor: 'var(--color-base-300)',
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 1) {
                e.target.style.backgroundColor = 'var(--color-base-300)';
                e.target.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 1) {
                e.target.style.backgroundColor = 'var(--color-base-200)';
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getVisiblePages().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2" style={{color: 'var(--color-base-content)'}}>...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(page)}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 border"
                    style={{
                      backgroundColor: currentPage === page ? 'var(--color-primary)' : 'var(--color-base-200)',
                      color: currentPage === page ? 'var(--color-primary-content)' : 'var(--color-base-content)',
                      borderColor: currentPage === page ? 'var(--color-primary)' : 'var(--color-base-300)',
                      boxShadow: currentPage === page ? '0 10px 25px rgba(0, 0, 0, 0.15)' : 'none',
                      transform: currentPage === page ? 'scale(1.05)' : 'scale(1)'
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== page) {
                        e.target.style.backgroundColor = 'var(--color-base-300)';
                        e.target.style.transform = 'scale(1.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== page) {
                        e.target.style.backgroundColor = 'var(--color-base-200)';
                        e.target.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 border"
            style={{
              backgroundColor: currentPage === totalPages ? 'var(--color-base-300)' : 'var(--color-base-200)',
              color: currentPage === totalPages ? 'var(--color-base-content)' : 'var(--color-base-content)',
              borderColor: 'var(--color-base-300)',
              opacity: currentPage === totalPages ? 0.5 : 1,
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.backgroundColor = 'var(--color-base-300)';
                e.target.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== totalPages) {
                e.target.style.backgroundColor = 'var(--color-base-200)';
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            <span className="hidden sm:inline">Next</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernPagination;