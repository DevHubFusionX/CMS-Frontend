import React from 'react';

const ProfileForm = ({ formData, handleChange, handleSubmit, isEditing, setIsEditing, loading }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold" style={{color: 'var(--color-base-content)'}}>Profile Information</h3>
          <p className="mt-1" style={{color: 'var(--color-base-content)'}}>Update your personal details and bio</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-6 py-3 rounded-2xl font-medium transition-all duration-300 border shadow-lg hover:shadow-xl"
          style={{
            backgroundColor: isEditing ? 'var(--color-base-300)' : 'var(--color-primary)',
            color: isEditing ? 'var(--color-base-content)' : 'var(--color-primary-content)',
            borderColor: isEditing ? 'var(--color-base-300)' : 'var(--color-primary)'
          }}
          onMouseEnter={(e) => {
            if (!isEditing) {
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold" style={{color: 'var(--color-base-content)'}}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-4 border rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: isEditing ? 'var(--color-base-200)' : 'var(--color-base-300)',
                borderColor: isEditing ? 'var(--color-primary)' : 'var(--color-base-300)',
                color: 'var(--color-base-content)',
                focusRingColor: 'var(--color-primary)'
              }}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold" style={{color: 'var(--color-base-content)'}}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-4 border rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: isEditing ? 'var(--color-base-200)' : 'var(--color-base-300)',
                borderColor: isEditing ? 'var(--color-primary)' : 'var(--color-base-300)',
                color: 'var(--color-base-content)',
                focusRingColor: 'var(--color-primary)'
              }}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="bio" className="block text-sm font-semibold" style={{color: 'var(--color-base-content)'}}>
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            value={formData.bio}
            onChange={handleChange}
            disabled={!isEditing}
            maxLength={500}
            className="w-full px-4 py-4 border rounded-2xl transition-all duration-300 resize-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: isEditing ? 'var(--color-base-200)' : 'var(--color-base-300)',
              borderColor: isEditing ? 'var(--color-primary)' : 'var(--color-base-300)',
              color: 'var(--color-base-content)',
              focusRingColor: 'var(--color-primary)'
            }}
            placeholder="Tell us about yourself..."
          />
          <div className="flex justify-between items-center">
            <p className="text-sm" style={{color: 'var(--color-base-content)'}}>
              {formData.bio.length}/500 characters
            </p>
            {formData.bio.length > 450 && (
              <p className="text-sm" style={{color: 'var(--color-warning)'}}>Approaching character limit</p>
            )}
          </div>
        </div>
        
        {isEditing && (
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 border rounded-2xl transition-all duration-300"
              style={{
                borderColor: 'var(--color-base-300)',
                color: 'var(--color-base-content)',
                backgroundColor: 'var(--color-base-200)'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-base-300)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-base-200)'}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-8 py-3 border border-transparent text-sm font-medium rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl transform hover:scale-105"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-content)',
                focusRingColor: 'var(--color-primary)'
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;