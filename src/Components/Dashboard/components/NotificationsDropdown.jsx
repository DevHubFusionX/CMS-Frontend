import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../../Services/AuthContext';
import { io } from 'socket.io-client';

const NotificationsDropdown = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationsRef = useRef(null);
  const socketRef = useRef(null);
  const { user } = useContext(AuthContext);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Check various possible role properties
    const userRole = user?.role?.name || user?.legacyRole || user?.role || user?.name;
    if (!user || !['editor', 'admin', 'super_admin'].includes(userRole)) {
      console.log('🚫 User not eligible for notifications:', userRole);
      console.log('👤 Full user object:', user);
      console.log('🎭 Role check - role.name:', user?.role?.name, 'legacyRole:', user?.legacyRole, 'role:', user?.role);
      return;
    }

    console.log('🔌 Initializing Socket.IO for user:', userRole, user._id);

    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Initialize Socket.IO connection
    const serverUrl = import.meta.env.VITE_API_URL || 'https://cms-2prb.onrender.com';
    console.log('🌐 Connecting to:', serverUrl);
    socketRef.current = io(serverUrl);
    
    socketRef.current.on('connect', () => {
      console.log('✅ Socket.IO connected:', socketRef.current.id);
      
      // Join role-based room
      const userRole = user.role?.name || user.legacyRole || user.role || user.name;
      const userId = user._id || user.id;
      
      console.log('👤 User object:', user);
      console.log('🎭 Extracted role:', userRole);
      console.log('🆔 Extracted userId:', userId);
      
      socketRef.current.emit('join_role', {
        role: userRole,
        userId: userId
      });
      console.log('🏠 Joined room:', userRole);
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('❌ Socket.IO connection error:', error);
    });

    // Listen for new post notifications
    socketRef.current.on('new_post_created', (data) => {
      console.log('🔔 Notification received:', data);
      
      const newNotification = {
        id: Date.now(),
        message: data.message,
        time: 'Just now',
        read: false,
        type: 'new_post',
        avatar: '📝',
        postId: data.id,
        author: data.author
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      
      // Show browser notification if permission granted
      if (Notification.permission === 'granted') {
        new Notification('New Post Created', {
          body: data.message,
          icon: '/favicon.ico'
        });
      }
    });

    return () => {
      if (socketRef.current) {
        console.log('🔌 Disconnecting Socket.IO');
        socketRef.current.disconnect();
      }
    };
  }, [user]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <div className="relative" ref={notificationsRef}>
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2.5 rounded-xl transition-all duration-300 hover:shadow-lg border backdrop-blur-sm"
        style={{
          backgroundColor: 'var(--color-base-200)',
          borderColor: 'var(--color-base-300)',
          color: 'var(--color-base-content)'
        }}
        title="Notifications"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          {/* Notification bell icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white" 
                style={{backgroundColor: 'var(--color-error)'}}>
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl backdrop-blur-sm z-50 border" 
             style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
          <div className="p-4 border-b" style={{borderColor: 'var(--color-base-300)'}}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold" style={{color: 'var(--color-base-content)'}}>Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-sm" style={{color: 'var(--color-primary)'}}>
                  Mark all as read
                </button>
              )}
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center" style={{color: 'var(--color-base-content)', opacity: '0.6'}}>
                <p className="text-sm">No notifications yet</p>
                <p className="text-xs mt-1">You'll see notifications when authors create posts</p>
                <button 
                  onClick={() => {
                    const testNotification = {
                      id: Date.now(),
                      message: 'Test notification - Socket.IO working!',
                      time: 'Just now',
                      read: false,
                      type: 'test',
                      avatar: '🧪',
                      postId: 'test-123'
                    };
                    setNotifications(prev => [testNotification, ...prev]);
                    console.log('🧪 Test notification added');
                  }}
                  className="mt-2 px-3 py-1 text-xs rounded" 
                  style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
                >
                  Add Test Notification
                </button>
              </div>
            ) : (
              notifications.map((notification) => (
                <div key={notification.id} className={`p-4 border-b hover:bg-opacity-50 transition-colors ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`} 
                     style={{borderColor: 'var(--color-base-300)'}}>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{notification.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm" style={{color: 'var(--color-base-content)'}}>{notification.message}</p>
                      <p className="text-xs mt-1" style={{color: 'var(--color-base-content)', opacity: '0.6'}}>{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full" style={{backgroundColor: 'var(--color-primary)'}}></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;