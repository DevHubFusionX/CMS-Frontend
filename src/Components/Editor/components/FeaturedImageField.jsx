import React from 'react';

const FeaturedImageField = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="featuredImage" className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
        Featured Image URL
      </label>
      <input
        type="text"
        id="featuredImage"
        name="featuredImage"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
        style={{
          backgroundColor: 'var(--color-base-100)',
          borderColor: 'var(--color-base-300)',
          color: 'var(--color-base-content)'
        }}
        placeholder="Enter image URL (optional)"
      />
      {value && (
        <div className="mt-2 relative w-32 h-32 rounded overflow-hidden border" style={{borderColor: 'var(--color-base-300)'}}>
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