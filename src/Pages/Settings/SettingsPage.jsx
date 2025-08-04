import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Services/AuthContext';
import { useTheme } from '../../Context/ThemeContext';
import { settingsService } from '../../Services/settingsService';
import { usersService } from '../../Services/api';
import ProfileSettings from '../../Components/Settings/ProfileSettings';
import AppearanceSettings from '../../Components/Settings/AppearanceSettings';
import BrandingSettings from '../../Components/Settings/BrandingSettings';

const SettingsPage = () => {
  const { user, updateCurrentUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || null
  });
  
  const [brandingData, setBrandingData] = useState({
    cmsName: 'HubFusionx',
    logo: null,
    primaryColor: '#3B82F6'
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || null
      });
    }
    loadSettings();
  }, [user]);

  const loadSettings = async () => {
    try {
      const settings = await settingsService.getSettingsByGroup('branding');
      if (settings.data) {
        setBrandingData(prev => ({ ...prev, ...settings.data }));
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };
  
  const handleProfileUpdate = async (updatedData) => {
    setLoading(true);
    try {
      const userId = user._id || user.id;
      const updatedUser = await usersService.updateUser(userId, updatedData);
      setUserData(updatedData);
      updateCurrentUser(updatedUser);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };
  
  const handleAppearanceUpdate = (isDark) => {
    if ((isDark && theme === 'light') || (!isDark && theme === 'dark')) {
      toggleTheme();
    }
    setMessage({ type: 'success', text: 'Theme updated successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 2000);
  };
  
  const handleBrandingUpdate = async (updatedData) => {
    setLoading(true);
    try {
      await settingsService.updateSettings(updatedData, 'branding');
      setBrandingData(prev => ({ ...prev, ...updatedData }));
      setMessage({ type: 'success', text: 'Branding settings updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to update branding settings' });
    } finally {
      setLoading(false);
    }
  };
  
  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'branding', label: 'Branding' }
  ];
  
  return (
    <div className="rounded-2xl shadow-xl p-6 backdrop-blur-sm border" style={{
      backgroundColor: 'var(--color-base-200)',
      borderColor: 'var(--color-base-300)',
      background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
    }}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold" style={{color: 'var(--color-base-content)'}}>Settings</h1>
        {loading && (
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-5 w-5" style={{color: 'var(--color-primary)'}} fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-sm" style={{color: 'var(--color-base-content)'}}>Saving...</span>
          </div>
        )}
      </div>
      
      {message.text && (
        <div className={`mb-6 p-4 rounded-xl border ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}
      
      <div className="mb-6" style={{borderBottom: '1px solid var(--color-base-300)'}}>
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'border-current'
                  : 'border-transparent hover:border-current'
              }`}
              style={{
                color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-base-content)',
                borderColor: activeTab === tab.id ? 'var(--color-primary)' : 'transparent'
              }}
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
          <AppearanceSettings isDarkMode={theme === 'dark'} onUpdate={handleAppearanceUpdate} />
        )}
        
        {activeTab === 'branding' && (
          <BrandingSettings brandingData={brandingData} onUpdate={handleBrandingUpdate} />
        )}
      </div>
    </div>
  );
};

export default SettingsPage;