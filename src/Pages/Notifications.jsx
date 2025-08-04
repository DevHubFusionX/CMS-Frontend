import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Services/AuthContext';
import { io } from 'socket.io-client';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Load notifications from localStorage or API
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteNotification = (id) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-base-100)' }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--color-base-content)' }}>
                Notifications
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--color-base-content)', opacity: '0.7' }}>
                {unreadCount} unread notifications
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-content)'
                }}
              >
                Mark All Read
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex space-x-2">
            {['all', 'unread', 'read'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize"
                style={{
                  backgroundColor: filter === filterType ? 'var(--color-primary)' : 'var(--color-base-200)',
                  color: filter === filterType ? 'var(--color-primary-content)' : 'var(--color-base-content)'
                }}
              >
                {filterType}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{
                backgroundColor: 'var(--color-base-200)',
                border: '2px dashed var(--color-base-300)'
              }}>
                <svg className="w-10 h-10" style={{ color: 'var(--color-base-content)', opacity: '0.4' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-base-content)' }}>
                No notifications found
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-base-content)', opacity: '0.6' }}>
                {filter === 'all' ? 'You have no notifications yet' : `No ${filter} notifications`}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className="p-6 rounded-2xl border transition-all hover:shadow-lg"
                style={{
                  backgroundColor: !notification.read ? 'var(--color-primary)' : 'var(--color-base-200)',
                  borderColor: !notification.read ? 'var(--color-primary)' : 'var(--color-base-300)',
                  opacity: !notification.read ? '0.1' : '1'
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{
                      backgroundColor: !notification.read ? 'var(--color-primary)' : 'var(--color-accent)',
                      color: !notification.read ? 'var(--color-primary-content)' : 'var(--color-accent-content)'
                    }}>
                      {notification.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-2" style={{ color: 'var(--color-base-content)' }}>
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-4 text-sm" style={{ color: 'var(--color-base-content)', opacity: '0.7' }}>
                        <span>{notification.time}</span>
                        {notification.author && <span>by {notification.author}</span>}
                        <span className="px-2 py-1 rounded-lg text-xs" style={{
                          backgroundColor: 'var(--color-base-300)',
                          color: 'var(--color-base-content)'
                        }}>
                          {notification.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 rounded-lg transition-all hover:scale-105"
                        style={{
                          backgroundColor: 'var(--color-success)',
                          color: 'var(--color-success-content)'
                        }}
                        title="Mark as read"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 rounded-lg transition-all hover:scale-105"
                      style={{
                        backgroundColor: 'var(--color-error)',
                        color: 'var(--color-error-content)'
                      }}
                      title="Delete notification"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;