import React from 'react';
import { Link } from 'react-router-dom';
import { postsService } from '../../../Services/postsService';

const ModernPostsGrid = ({ loading, posts, onDeletePost, viewMode, onDuplicatePost }) => {
  
  const handleDuplicate = async (postId) => {
    try {
      await postsService.duplicatePost(postId);
      if (onDuplicatePost) onDuplicatePost();
    } catch (error) {
      console.error('Failed to duplicate post:', error);
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return {
          bg: 'var(--color-success)',
          text: 'white'
        };
      case 'draft':
        return {
          bg: 'var(--color-warning)',
          text: 'white'
        };
      case 'scheduled':
        return {
          bg: 'var(--color-secondary)',
          text: 'white'
        };
      default:
        return {
          bg: 'var(--color-base-300)',
          text: 'var(--color-base-content)'
        };
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 rounded-full animate-spin" style={{
            borderColor: 'var(--color-base-300)',
            borderTopColor: 'var(--color-primary)'
          }}></div>
        </div>
        <p className="font-medium" style={{color: 'var(--color-base-content)'}}>Loading your posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="mx-auto w-20 h-20 rounded-xl flex items-center justify-center mb-6" style={{
          backgroundColor: 'var(--color-base-200)',
          border: '2px dashed var(--color-base-300)'
        }}>
          <svg className="w-10 h-10" style={{color: 'var(--color-base-content)', opacity: 0.5}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-base-content)'}}>No articles published yet</h3>
        <p className="mb-8 text-sm" style={{color: 'var(--color-base-content)', opacity: 0.7}}>Start creating content to build your library</p>
        <Link 
          to="/dashboard/posts/create"
          className="inline-flex items-center px-5 py-2.5 font-medium rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 border"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-content)',
            borderColor: 'var(--color-primary)'
          }}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Article
        </Link>
      </div>
    );
  }

  if (viewMode === 'table') {
    return (
      <div className="backdrop-blur-sm rounded-2xl border shadow-lg overflow-hidden" style={{
        backgroundColor: 'var(--color-base-200)',
        borderColor: 'var(--color-base-300)',
        background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
      }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{backgroundColor: 'var(--color-base-300)'}}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{color: 'var(--color-base-content)'}}>Article</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{color: 'var(--color-base-content)'}}>Author</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{color: 'var(--color-base-content)'}}>Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{color: 'var(--color-base-content)'}}>Published</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider" style={{color: 'var(--color-base-content)'}}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{divideColor: 'var(--color-base-300)'}}>
              {posts.map((post, index) => (
                <tr key={post.id || index} className="transition-colors duration-200" 
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-base-300)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium truncate max-w-xs" style={{color: 'var(--color-base-content)'}}>
                      {post.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{color: 'var(--color-base-content)'}}>
                    {post.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border" style={{
                      backgroundColor: getStatusColor(post.status).bg,
                      color: getStatusColor(post.status).text,
                      borderColor: getStatusColor(post.status).bg
                    }}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{color: 'var(--color-base-content)'}}>
                    {post.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link 
                        to={`/dashboard/posts/edit/${post.id}`}
                        className="p-2 rounded-md transition-all duration-200 hover:bg-blue-50"
                        style={{color: 'var(--color-primary)'}}
                        title="Edit article"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </Link>
                      <button 
                        onClick={() => handleDuplicate(post.id)}
                        className="p-2 rounded-md transition-all duration-200 hover:bg-green-50"
                        style={{color: 'var(--color-success)'}}
                        title="Duplicate article"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => onDeletePost(post.id)}
                        className="p-2 rounded-md transition-all duration-200 hover:bg-red-50"
                        style={{color: 'var(--color-error)'}}
                        title="Delete article"
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
      {posts.map((post, index) => (
        <div
          key={post.id || index}
          className="group backdrop-blur-sm rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          style={{
            backgroundColor: 'var(--color-base-200)',
            borderColor: 'var(--color-base-300)',
            background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
          }}
        >
          <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border" style={{
                backgroundColor: getStatusColor(post.status).bg,
                color: getStatusColor(post.status).text,
                borderColor: getStatusColor(post.status).bg
              }}>
                {post.status}
              </span>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Link 
                  to={`/dashboard/posts/edit/${post.id}`}
                  className="p-1.5 rounded-md transition-all duration-200 hover:bg-blue-50"
                  style={{color: 'var(--color-primary)'}}
                  title="Edit article"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </Link>
                <button 
                  onClick={() => handleDuplicate(post.id)}
                  className="p-1.5 rounded-md transition-all duration-200 hover:bg-green-50"
                  style={{color: 'var(--color-success)'}}
                  title="Duplicate article"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button 
                  onClick={() => onDeletePost(post.id)}
                  className="p-1.5 rounded-md transition-all duration-200 hover:bg-red-50"
                  style={{color: 'var(--color-error)'}}
                  title="Delete article"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <h3 className="font-semibold text-base mb-3 line-clamp-2 leading-tight" style={{color: 'var(--color-base-content)'}}>
              {post.title}
            </h3>
            
            <div className="flex items-center justify-between text-xs" style={{color: 'var(--color-base-content)', opacity: 0.7}}>
              <span className="font-medium">{post.author}</span>
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModernPostsGrid;