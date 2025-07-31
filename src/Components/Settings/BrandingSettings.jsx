import React, { useState, useRef } from 'react';
import ColorPicker from './ColorPicker';

const BrandingSettings = ({ brandingData, onUpdate }) => {
  const [formData, setFormData] = useState({
    cmsName: brandingData.cmsName || '',
    logo: brandingData.logo || null,
    primaryColor: brandingData.primaryColor || '#3B82F6'
  });
  
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(
    formData.logo ? URL.createObjectURL(formData.logo) : null
  );
  
  const fileInputRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleColorChange = (color) => {
    setFormData(prevData => ({
      ...prevData,
      primaryColor: color
    }));
  };
  
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        logo: file
      }));
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleLogoButtonClick = () => {
    fileInputRef.current.click();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdate(formData);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <div className="col-span-1 md:col-span-2">
        <h2 className="text-lg font-medium mb-4" style={{color: 'var(--color-base-content)'}}>Branding Settings</h2>
        <p className="text-sm mb-6" style={{color: 'var(--color-base-content)'}}>Customize your CMS branding and appearance.</p>
      </div>
      
      <div className="rounded-xl border shadow-lg p-6 col-span-1 md:col-span-2 backdrop-blur-sm" style={{
        backgroundColor: 'var(--color-base-200)',
        borderColor: 'var(--color-base-300)',
        background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
      }}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="cmsName" className="block text-sm font-medium" style={{color: 'var(--color-base-content)'}}>
              CMS Name
            </label>
            <input
              type="text"
              id="cmsName"
              name="cmsName"
              value={formData.cmsName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border shadow-sm focus:ring-2 focus:ring-offset-2 transition-all duration-300 px-4 py-3"
              style={{
                backgroundColor: 'var(--color-base-200)',
                borderColor: 'var(--color-base-300)',
                color: 'var(--color-base-content)',
                focusRingColor: 'var(--color-primary)',
                focusBorderColor: 'var(--color-primary)'
              }}
              placeholder="Enter CMS name"
            />
            <p className="mt-1 text-xs" style={{color: 'var(--color-base-content)'}}>
              This name will appear in the browser title and throughout the application.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
              Logo
            </label>
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                {logoPreview ? (
                  <img 
                    src={logoPreview} 
                    alt="Logo preview" 
                    className="h-16 w-auto object-contain"
                  />
                ) : (
                  <div className="h-16 w-32 rounded flex items-center justify-center" style={{
                    backgroundColor: 'var(--color-base-300)',
                    color: 'var(--color-base-content)'
                  }}>
                    No logo
                  </div>
                )}
              </div>
              
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoChange}
                  accept="image/*"
                  className="hidden"
                />
                
                <button
                  type="button"
                  onClick={handleLogoButtonClick}
                  className="inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--color-base-200)',
                    borderColor: 'var(--color-base-300)',
                    color: 'var(--color-base-content)',
                    focusRingColor: 'var(--color-primary)'
                  }}
                >
                  {logoPreview ? 'Change Logo' : 'Upload Logo'}
                </button>
                
                {logoPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoPreview(null);
                      setFormData(prev => ({ ...prev, logo: null }));
                    }}
                    className="ml-2 text-sm transition-colors duration-200"
                    style={{color: 'var(--color-error)'}}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            <p className="mt-1 text-xs" style={{color: 'var(--color-base-content)'}}>
              Recommended size: 200x50 pixels. PNG or SVG with transparent background.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
              Primary Theme Color
            </label>
            <ColorPicker 
              color={formData.primaryColor} 
              onChange={handleColorChange} 
            />
            <p className="mt-1 text-xs" style={{color: 'var(--color-base-content)'}}>
              This color will be used for buttons, links, and other UI elements.
            </p>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              style={{ 
                backgroundColor: loading ? 'var(--color-primary)' : formData.primaryColor,
                color: 'white',
                focusRingColor: formData.primaryColor
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Branding Settings'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BrandingSettings;