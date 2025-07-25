import React, { useState } from 'react';
import ProfileSettings from '../../Components/Settings/ProfileSettings';
import AppearanceSettings from '../../Components/Settings/AppearanceSettings';
import BrandingSettings from '../../Components/Settings/BrandingSettings';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null
  });
  
  // Mock branding data
  const [brandingData, setBrandingData] = useState({
    cmsName: 'FusionX',
    logo: null,
    primaryColor: '#3B82F6' // Default blue color
  });
  
  const handleProfileUpdate = (updatedData) => {
    setUserData({
      ...userData,
      ...updatedData
    });
    // In a real app, you would save this to the server
    console.log('Profile updated:', updatedData);
  };
  
  const handleAppearanceUpdate = (isDark) => {
    setIsDarkMode(isDark);
    // In a real app, you would save this preference and apply it globally
    console.log('Dark mode:', isDark);
  };
  
  const handleBrandingUpdate = (updatedData) => {
    setBrandingData({
      ...brandingData,
      ...updatedData
    });
    // In a real app, you would save this to the server
    console.log('Branding updated:', updatedData);
  };
  
  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'branding', label: 'Branding' }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeTab === 'profile' && (
          <ProfileSettings userData={userData} onUpdate={handleProfileUpdate} />
        )}
        
        {activeTab === 'appearance' && (
          <AppearanceSettings isDarkMode={isDarkMode} onUpdate={handleAppearanceUpdate} />
        )}
        
        {activeTab === 'branding' && (
          <BrandingSettings brandingData={brandingData} onUpdate={handleBrandingUpdate} />
        )}
      </div>
    </div>
  );
};

export default SettingsPage;