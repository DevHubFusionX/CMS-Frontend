import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Services/AuthContext';
import { io } from 'socket.io-client';

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    // Load notifications from localStorage
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
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
      
      setNotifications(prev => {
        const updated = [newNotification, ...prev];
        localStorage.setItem('notifications', JSON.stringify(updated));
        return updated;
      });
      
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

  const handleNotificationClick = () => {
    navigate('/dashboard/notifications');
  };

  return (
    <div className="relative">
      <button
        onClick={handleNotificationClick}
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


    </div>
  );
};

export default NotificationsDropdown;