import React from 'react';
import { formatDate } from '../../../Utils/formatters';

const ModernCategoriesGrid = ({ loading, categories, onEdit, onDelete, viewMode = 'grid' }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 rounded-full animate-spin" style={{
            borderColor: 'var(--color-base-300)'
          }}></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent rounded-full animate-spin" style={{
            borderTopColor: 'var(--color-primary)'
          }}></div>
        </div>
        <p className="font-medium transition-colors duration-300" style={{
          color: 'var(--color-base-content)',
          opacity: '0.7'
        }}>Loading categories...</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 rounded-2xl flex items-center justify-center mb-6" style={{
          backgroundColor: 'var(--color-base-200)'
        }}>
          <svg className="w-12 h-12 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{
            color: 'var(--color-base-content)',
            opacity: '0.5'
          }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2 transition-colors duration-300" style={{
          color: 'var(--color-base-content)'
        }}>No categories found</h3>
        <p className="mb-6 transition-colors duration-300" style={{
          color: 'var(--color-base-content)',
          opacity: '0.7'
        }}>Create your first category to organize your content</p>
      </div>
    );
  }

  if (viewMode === 'table') {
    return (
      <div className="backdrop-blur-sm rounded-2xl border shadow-lg overflow-hidden transition-all duration-300" style={{
        backgroundColor: 'var(--color-base-100)',
        borderColor: 'var(--color-base-300)'
      }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: 'var(--color-base-200)' }}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300" style={{
                  color: 'var(--color-base-content)',
                  opacity: '0.7'
                }}>Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300" style={{
                  color: 'var(--color-base-content)',
                  opacity: '0.7'
                }}>Slug</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300" style={{
                  color: 'var(--color-base-content)',
                  opacity: '0.7'
                }}>Description</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-300" style={{
                  color: 'var(--color-base-content)',
                  opacity: '0.7'
                }}>Created</th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider transition-colors duration-300" style={{
                  color: 'var(--color-base-content)',
                  opacity: '0.7'
                }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--color-base-300)' }}>
              {categories.map((category, index) => (
                <tr key={category.id || category._id || index} className="hover:bg-opacity-50 transition-colors duration-200" 
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-base-200)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3 shadow-sm"
                        style={{ backgroundColor: category.color || 'var(--color-primary)' }}
                      />
                      <div className="text-sm font-medium transition-colors duration-300" style={{
                        color: 'var(--color-base-content)'
                      }}>
                        {category.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm transition-colors duration-300" style={{
                    color: 'var(--color-base-content)',
                    opacity: '0.7'
                  }}>
                    {category.slug}
                  </td>
                  <td className="px-6 py-4 text-sm max-w-xs truncate transition-colors duration-300" style={{
                    color: 'var(--color-base-content)',
                    opacity: '0.7'
                  }}>
                    {category.description || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm transition-colors duration-300" style={{
                    color: 'var(--color-base-content)',
                    opacity: '0.7'
                  }}>
                    {formatDate(category.createdAt, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => onEdit(category)}
                        className="p-2 rounded-lg transition-all duration-200"
                        style={{ color: 'var(--color-base-content)', opacity: '0.5' }}
                        onMouseEnter={(e) => {
                          e.target.style.color = 'var(--color-primary)';
                          e.target.style.backgroundColor = 'var(--color-primary-50, var(--color-base-200))';
                          e.target.style.opacity = '1';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = 'var(--color-base-content)';
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.opacity = '0.5';
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => onDelete(category.id || category._id)}
                        className="p-2 rounded-lg transition-all duration-200"
                        style={{ color: 'var(--color-base-content)', opacity: '0.5' }}
                        onMouseEnter={(e) => {
                          e.target.style.color = 'var(--color-error)';
                          e.target.style.backgroundColor = 'var(--color-error-50, var(--color-base-200))';
                          e.target.style.opacity = '1';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = 'var(--color-base-content)';
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.opacity = '0.5';
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {categories.map((category, index) => (
        <div
          key={category.id || category._id || index}
          className="group backdrop-blur-sm rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          style={{
            backgroundColor: 'var(--color-base-100)',
            borderColor: 'var(--color-base-300)'
          }}
        >
          {/* Color Header */}
          <div 
            className="h-2"
            style={{ backgroundColor: category.color || 'var(--color-primary)' }}
          />
          
          <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: category.color || 'var(--color-primary)' }}
                />
                <h3 className="font-semibold text-lg truncate transition-colors duration-300" style={{
                  color: 'var(--color-base-content)'
                }}>
                  {category.name}
                </h3>
              </div>
              
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                  onClick={() => onEdit(category)}
                  className="p-1.5 rounded-lg transition-all duration-200"
                  style={{ color: 'var(--color-base-content)', opacity: '0.5' }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--color-primary)';
                    e.target.style.backgroundColor = 'var(--color-primary-50, var(--color-base-200))';
                    e.target.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'var(--color-base-content)';
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.opacity = '0.5';
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  onClick={() => onDelete(category.id || category._id)}
                  className="p-1.5 rounded-lg transition-all duration-200"
                  style={{ color: 'var(--color-base-content)', opacity: '0.5' }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--color-error)';
                    e.target.style.backgroundColor = 'var(--color-error-50, var(--color-base-200))';
                    e.target.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'var(--color-base-content)';
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.opacity = '0.5';
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-mono transition-colors duration-300" style={{
                color: 'var(--color-base-content)',
                opacity: '0.7'
              }}>
                /{category.slug}
              </p>
              
              {category.description && (
                <p className="text-sm line-clamp-2 transition-colors duration-300" style={{
                  color: 'var(--color-base-content)',
                  opacity: '0.8'
                }}>
                  {category.description}
                </p>
              )}
              
              <div className="flex items-center justify-between text-xs pt-2 border-t transition-colors duration-300" style={{
                color: 'var(--color-base-content)',
                opacity: '0.6',
                borderColor: 'var(--color-base-300)'
              }}>
                <span>Created</span>
                <span>{formatDate(category.createdAt, { month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModernCategoriesGrid;