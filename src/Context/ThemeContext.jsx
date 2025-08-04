import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('HubFusionx-theme');
    return saved || 'light';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'HubFusionx-dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'HubFusionx-light');
    }
    
    localStorage.setItem('HubFusionx-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 150);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Switching theme...
              </span>
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Provider>
  );
};