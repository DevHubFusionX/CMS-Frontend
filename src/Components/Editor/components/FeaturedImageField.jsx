import React from 'react';

const FeaturedImageField = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-300 mb-2">
        Featured Image URL
      </label>
      <input
        type="text"
        id="featuredImage"
        name="featuredImage"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
        placeholder="Enter image URL (optional)"
      />
      {value && (
        <div className="mt-2 relative w-32 h-32 rounded overflow-hidden">
          <img 
            src={value} 
            alt="Featured" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FeaturedImageField;