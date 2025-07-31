import React, { useState } from 'react';
import { useTheme } from '../../../Context/ThemeContext';

const PreferencesTab = () => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false
  });

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    if (selectedTheme !== theme) {
      toggleTheme();
    }
  };

  const notificationItems = [
    { 
      key: 'email',
      label: 'Email notifications', 
      desc: 'Receive updates via email', 
      checked: notifications.email 
    },
    { 
      key: 'push',
      label: 'Push notifications', 
      desc: 'Get notified in your browser', 
      checked: notifications.push 
    },
    { 
      key: 'marketing',
      label: 'Marketing emails', 
      desc: 'Receive promotional content', 
      checked: notifications.marketing 
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold" style={{color: 'var(--color-base-content)'}}>Preferences</h3>
        <p className="mt-1" style={{color: 'var(--color-base-content)'}}>Customize your experience</p>
      </div>
      
      <div className="space-y-6">
        <div className="rounded-2xl p-6 border backdrop-blur-sm" style={{
          backgroundColor: 'var(--color-base-300)',
          borderColor: 'var(--color-base-300)'
        }}>
          <h4 className="font-semibold mb-4" style={{color: 'var(--color-base-content)'}}>Notifications</h4>
          <div className="space-y-4">
            {notificationItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium" style={{color: 'var(--color-base-content)'}}>{item.label}</p>
                  <p className="text-sm" style={{color: 'var(--color-base-content)'}}>{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={item.checked}
                    onChange={() => handleNotificationChange(item.key)}
                  />
                  <div 
                    className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all transition-colors duration-300" 
                    style={{
                      backgroundColor: item.checked ? 'var(--color-primary)' : 'var(--color-base-300)',
                      borderColor: item.checked ? 'var(--color-primary)' : 'var(--color-base-300)'
                    }}
                  ></div>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rounded-2xl p-6 border backdrop-blur-sm" style={{
          backgroundColor: 'var(--color-base-300)',
          borderColor: 'var(--color-base-300)'
        }}>
          <h4 className="font-semibold mb-4" style={{color: 'var(--color-base-content)'}}>Display</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium" style={{color: 'var(--color-base-content)'}}>Theme</p>
                <p className="text-sm" style={{color: 'var(--color-base-content)'}}>Choose your preferred theme</p>
              </div>
              <select 
                value={theme}
                onChange={handleThemeChange}
                className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-offset-2 transition-all duration-300" 
                style={{
                  backgroundColor: 'var(--color-base-200)',
                  borderColor: 'var(--color-base-300)',
                  color: 'var(--color-base-content)',
                  focusRingColor: 'var(--color-primary)'
                }}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesTab;