import React from 'react';
import ToggleSwitch from './ToggleSwitch';

const AppearanceSettings = ({ isDarkMode, onUpdate }) => {
  return (
    <>
      <div className="col-span-1 md:col-span-2">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Appearance Settings</h2>
        <p className="text-sm text-gray-500 mb-6">Customize the look and feel of your dashboard.</p>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 col-span-1 md:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-md font-medium text-gray-900">Dark Mode</h3>
            <p className="text-sm text-gray-500 mt-1">
              Switch between light and dark theme for your dashboard.
            </p>
          </div>
          <ToggleSwitch 
            enabled={isDarkMode} 
            onChange={onUpdate} 
          />
        </div>
        
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className={`h-24 rounded-md mb-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
            <div className={`h-4 w-3/4 rounded-md mb-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
            <div className={`h-4 w-1/2 rounded-md ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
          </div>
          <div className={`p-4 rounded-lg border ${!isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className={`h-24 rounded-md mb-2 ${!isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
            <div className={`h-4 w-3/4 rounded-md mb-2 ${!isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
            <div className={`h-4 w-1/2 rounded-md ${!isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          {isDarkMode 
            ? 'Dark mode is currently enabled. This setting will apply to your entire dashboard.' 
            : 'Light mode is currently enabled. This setting will apply to your entire dashboard.'}
        </p>
      </div>
    </>
  );
};

export default AppearanceSettings;