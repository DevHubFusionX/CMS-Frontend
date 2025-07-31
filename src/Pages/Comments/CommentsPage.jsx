import React, { useState } from 'react';
import CommentItem from '../../Components/Comments/CommentItem';
import { useComments } from '../../Services/CommentsContext';

const CommentsPage = () => {
  const { comments, loading, error, updateCommentStatus, deleteComment, addComment } = useComments();
  const [filter, setFilter] = useState('all');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const handleApprove = (id) => {
    updateCommentStatus(id, 'approved');
  };

  const handleReject = (id) => {
    updateCommentStatus(id, 'rejected');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(id);
    }
  };

  const handleReply = (id) => {
    setReplyingTo(id);
  };

  const submitReply = () => {
    if (!replyContent.trim()) return;
    
    const comment = comments.find(c => c.id === replyingTo);
    addComment({
      content: replyContent,
      postId: comment.postId,
      parentId: replyingTo,
      status: 'approved',
      author: {
        name: 'Admin User',
        email: 'admin@example.com'
      },
      postTitle: comment.postTitle
    }).then(() => {
      setReplyingTo(null);
      setReplyContent('');
    });
  };

  const filteredComments = comments.filter(comment => {
    if (filter === 'all') return true;
    return comment.status === filter;
  });

  const filterTabs = [
    { key: 'all', label: 'All Comments', color: 'primary' },
    { key: 'pending', label: 'Pending', color: 'warning' },
    { key: 'approved', label: 'Approved', color: 'success' },
    { key: 'rejected', label: 'Rejected', color: 'error' }
  ];

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--color-base-100)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="rounded-2xl border p-6" style={{
            backgroundColor: 'var(--color-base-200)',
            borderColor: 'var(--color-base-300)',
            background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
          }}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border border-white/20" style={{
                background: `linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)`
              }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow-lg">Comments Management</h1>
                <p className="text-white/80 drop-shadow-sm">Moderate and manage user comments</p>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="rounded-2xl border p-6" style={{
            backgroundColor: 'var(--color-base-200)',
            borderColor: 'var(--color-base-300)'
          }}>
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: filter === tab.key ? `var(--color-${tab.color})` : 'var(--color-base-100)',
                    color: filter === tab.key ? `var(--color-${tab.color}-content)` : 'var(--color-base-content)',
                    border: `2px solid ${filter === tab.key ? `var(--color-${tab.color})` : 'var(--color-base-300)'}`,
                    boxShadow: filter === tab.key ? `0 4px 12px rgba(var(--color-${tab.color}-rgb), 0.3)` : 'none'
                  }}
                >
                  {tab.label}
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs" style={{
                    backgroundColor: filter === tab.key ? 'rgba(255,255,255,0.2)' : 'var(--color-base-300)',
                    color: filter === tab.key ? 'inherit' : 'var(--color-base-content)'
                  }}>
                    {tab.key === 'all' ? comments.length : comments.filter(c => c.status === tab.key).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-2xl border p-4" style={{
              backgroundColor: 'var(--color-error)',
              borderColor: 'var(--color-error)',
              color: 'var(--color-error-content)'
            }}>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-64 rounded-2xl border" style={{
              backgroundColor: 'var(--color-base-200)',
              borderColor: 'var(--color-base-300)'
            }}>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" style={{
                  borderColor: 'var(--color-primary)',
                  borderTopColor: 'transparent'
                }}></div>
                <p className="text-sm font-medium" style={{color: 'var(--color-base-content)'}}>Loading comments...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Comments List */}
              {filteredComments.length === 0 ? (
                <div className="text-center py-12 rounded-2xl border" style={{
                  backgroundColor: 'var(--color-base-200)',
                  borderColor: 'var(--color-base-300)'
                }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{
                    backgroundColor: 'var(--color-base-300)'
                  }}>
                    <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'var(--color-base-content)'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--color-base-content)'}}>No comments found</h3>
                  <p className="opacity-70" style={{color: 'var(--color-base-content)'}}>
                    {filter === 'all' 
                      ? 'There are no comments yet.' 
                      : `There are no ${filter} comments.`}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredComments.map(comment => (
                    <div key={comment.id} className="rounded-2xl border" style={{
                      backgroundColor: 'var(--color-base-200)',
                      borderColor: 'var(--color-base-300)'
                    }}>
                      <CommentItem
                        comment={comment}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onDelete={handleDelete}
                        onReply={handleReply}
                      />
                      
                      {/* Reply Form */}
                      {replyingTo === comment.id && (
                        <div className="mx-6 mb-6 p-4 rounded-xl border" style={{
                          backgroundColor: 'var(--color-base-100)',
                          borderColor: 'var(--color-base-300)'
                        }}>
                          <h4 className="text-sm font-semibold mb-3" style={{color: 'var(--color-base-content)'}}>
                            Reply to {comment.author.name}
                          </h4>
                          <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2 transition-all duration-200"
                            style={{
                              backgroundColor: 'var(--color-base-200)',
                              borderColor: 'var(--color-base-300)',
                              color: 'var(--color-base-content)'
                            }}
                            onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px var(--color-primary)'}
                            onBlur={(e) => e.target.style.boxShadow = 'none'}
                            rows={3}
                            placeholder="Write your reply..."
                          />
                          <div className="mt-3 flex justify-end space-x-2">
                            <button
                              onClick={() => setReplyingTo(null)}
                              className="px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                              style={{
                                backgroundColor: 'var(--color-base-100)',
                                borderColor: 'var(--color-base-300)',
                                color: 'var(--color-base-content)'
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-base-200)'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-base-100)'}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={submitReply}
                              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                              style={{
                                backgroundColor: 'var(--color-primary)',
                                color: 'var(--color-primary-content)'
                              }}
                            >
                              Submit Reply
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsPage;