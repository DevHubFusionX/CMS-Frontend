import React, { useState } from 'react';
import CommentItem from '../../Components/Comments/CommentItem';
import { useComments } from '../../Services/CommentsContext';

const CommentsPage = () => {
  const { comments, loading, error, updateCommentStatus, deleteComment, addComment } = useComments();
  const [filter, setFilter] = useState('all');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  // Handle comment approval
  const handleApprove = (id) => {
    updateCommentStatus(id, 'approved');
  };

  // Handle comment rejection
  const handleReject = (id) => {
    updateCommentStatus(id, 'rejected');
  };

  // Handle comment deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(id);
    }
  };

  // Handle reply to comment
  const handleReply = (id) => {
    setReplyingTo(id);
  };

  // Submit reply
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

  // Filter comments
  const filteredComments = comments.filter(comment => {
    if (filter === 'all') return true;
    return comment.status === filter;
  });

  // No need for useEffect to fetch comments, it's handled by the context

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Comments</h1>
      
      {/* Filter tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setFilter('all')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              filter === 'all'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              filter === 'pending'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              filter === 'approved'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              filter === 'rejected'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Rejected
          </button>
        </nav>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Comments list */}
          {filteredComments.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No comments found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === 'all' 
                  ? 'There are no comments yet.' 
                  : `There are no ${filter} comments.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredComments.map(comment => (
                <div key={comment.id}>
                  <CommentItem
                    comment={comment}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onDelete={handleDelete}
                    onReply={handleReply}
                  />
                  
                  {/* Reply form */}
                  {replyingTo === comment.id && (
                    <div className="ml-12 mt-2 bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Reply to {comment.author.name}</h4>
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        rows={3}
                        placeholder="Write your reply..."
                      ></textarea>
                      <div className="mt-2 flex justify-end space-x-2">
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={submitReply}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
  );
};

export default CommentsPage;