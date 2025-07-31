import React from 'react';
import ToggleSwitch from './ToggleSwitch';

const AppearanceSettings = ({ isDarkMode, onUpdate }) => {
  return (
    <>
      <div className="col-span-1 md:col-span-2">
        <h2 className="text-lg font-medium mb-4" style={{color: 'var(--color-base-content)'}}>Appearance Settings</h2>
        <p className="text-sm mb-6" style={{color: 'var(--color-base-content)'}}>Customize the look and feel of your dashboard.</p>
      </div>
      
      <div className="rounded-xl border shadow-lg p-6 col-span-1 md:col-span-2 backdrop-blur-sm" style={{
        backgroundColor: 'var(--color-base-200)',
        borderColor: 'var(--color-base-300)',
        background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
      }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-md font-medium" style={{color: 'var(--color-base-content)'}}>Dark Mode</h3>
            <p className="text-sm mt-1" style={{color: 'var(--color-base-content)'}}>
              Switch between light and dark theme for your dashboard.
            </p>
          </div>
          <ToggleSwitch 
            enabled={isDarkMode} 
            onChange={onUpdate} 
          />
        </div>
        
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border" style={{
            backgroundColor: isDarkMode ? '#1f2937' : 'var(--color-base-100)',
            borderColor: isDarkMode ? '#374151' : 'var(--color-base-300)'
          }}>
            <div className="h-24 rounded-lg mb-2" style={{
              backgroundColor: isDarkMode ? '#374151' : 'var(--color-base-200)'
            }}></div>
            <div className="h-4 w-3/4 rounded-md mb-2" style={{
              backgroundColor: isDarkMode ? '#4b5563' : 'var(--color-base-300)'
            }}></div>
            <div className="h-4 w-1/2 rounded-md" style={{
              backgroundColor: isDarkMode ? '#4b5563' : 'var(--color-base-300)'
            }}></div>
            <p className="text-xs mt-2 text-center" style={{
              color: isDarkMode ? '#d1d5db' : 'var(--color-base-content)'
            }}>Light Theme</p>
          </div>
          <div className="p-4 rounded-xl border" style={{
            backgroundColor: !isDarkMode ? '#1f2937' : 'var(--color-base-100)',
            borderColor: !isDarkMode ? '#374151' : 'var(--color-base-300)'
          }}>
            <div className="h-24 rounded-lg mb-2" style={{
              backgroundColor: !isDarkMode ? '#374151' : 'var(--color-base-200)'
            }}></div>
            <div className="h-4 w-3/4 rounded-md mb-2" style={{
              backgroundColor: !isDarkMode ? '#4b5563' : 'var(--color-base-300)'
            }}></div>
            <div className="h-4 w-1/2 rounded-md" style={{
              backgroundColor: !isDarkMode ? '#4b5563' : 'var(--color-base-300)'
            }}></div>
            <p className="text-xs mt-2 text-center" style={{
              color: !isDarkMode ? '#d1d5db' : 'var(--color-base-content)'
            }}>Dark Theme</p>
          </div>
        </div>
        
        <p className="text-xs mt-4" style={{color: 'var(--color-base-content)'}}>
          {isDarkMode 
            ? 'Dark mode is currently enabled. This setting will apply to your entire dashboard.' 
            : 'Light mode is currently enabled. This setting will apply to your entire dashboard.'}
        </p>
      </div>
    </>
  );
};

export default AppearanceSettings;