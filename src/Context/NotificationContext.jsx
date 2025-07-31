import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification,
    };

    setNotifications(prev => [...prev, newNotification]);

    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const success = useCallback((message, options = {}) => {
    return addNotification({ ...options, message, type: 'success' });
  }, [addNotification]);

  const error = useCallback((message, options = {}) => {
    return addNotification({ ...options, message, type: 'error', duration: 7000 });
  }, [addNotification]);

  const warning = useCallback((message, options = {}) => {
    return addNotification({ ...options, message, type: 'warning' });
  }, [addNotification]);

  const info = useCallback((message, options = {}) => {
    return addNotification({ ...options, message, type: 'info' });
  }, [addNotification]);

  const showNotification = useCallback((message, type = 'info', options = {}) => {
    return addNotification({ ...options, message, type });
  }, [addNotification]);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info,
    showNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};