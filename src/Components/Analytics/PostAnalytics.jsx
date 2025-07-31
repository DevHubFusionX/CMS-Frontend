import React from 'react';
import { FiEye, FiTrendingUp, FiCalendar } from 'react-icons/fi';

const PostAnalytics = ({ post, className = "" }) => {
  if (!post) return null;

  const totalViews = post.views || 0;
  const readingTime = Math.ceil((post.content?.replace(/<[^>]*>/g, '').split(' ').length || 0) / 200);
  const publishedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Not published';

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Post Analytics</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FiEye className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Views</p>
            <p className="text-xl font-semibold text-gray-900">{totalViews}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <FiTrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Reading Time</p>
            <p className="text-xl font-semibold text-gray-900">{readingTime} min</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <FiCalendar className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Published</p>
            <p className="text-sm font-medium text-gray-900">{publishedDate}</p>
          </div>
        </div>
      </div>

      {post.viewHistory && post.viewHistory.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Views (Last 7 days)</h4>
          <div className="flex items-end space-x-1 h-16">
            {post.viewHistory.slice(-7).map((day, index) => (
              <div
                key={index}
                className="bg-blue-200 rounded-t flex-1 min-w-0"
                style={{ height: `${Math.max((day.count / Math.max(...post.viewHistory.slice(-7).map(d => d.count))) * 100, 10)}%` }}
                title={`${day.count} views on ${new Date(day.date).toLocaleDateString()}`}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostAnalytics;