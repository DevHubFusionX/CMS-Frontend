import React from 'react';
import { formatDate } from '../../Utils/formatters';

const CommentItem = ({ comment, onApprove, onReject, onDelete, onReply }) => {
  const { id, content, author, createdAt, status, postTitle } = comment;
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
            {author.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{author.name}</h3>
            <p className="text-xs text-gray-500">{author.email}</p>
          </div>
        </div>
        <div>
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(status)}`}>
            {status}
          </span>
        </div>
      </div>
      
      <div className="mt-2">
        <p className="text-sm text-gray-600">{content}</p>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        <p>On post: <span className="font-medium">{postTitle}</span></p>
        <p>Posted: {formatDate(createdAt)}</p>
      </div>
      
      <div className="mt-4 flex justify-end space-x-2">
        {status === 'pending' && (
          <>
            <button
              onClick={() => onApprove(id)}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Approve
            </button>
            <button
              onClick={() => onReject(id)}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Reject
            </button>
          </>
        )}
        <button
          onClick={() => onReply(id)}
          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Reply
        </button>
        <button
          onClick={() => onDelete(id)}
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CommentItem;