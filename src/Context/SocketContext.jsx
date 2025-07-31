import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../Services/AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Initialize socket connection
      const newSocket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000', {
        withCredentials: true
      });

      // Join role-based room
      const userRole = user.role?.name || user.legacyRole;
      if (userRole) {
        newSocket.emit('join_role', userRole);
      }

      // Listen for new post notifications
      newSocket.on('new_post_created', (data) => {
        const notification = {
          id: Date.now(),
          type: 'new_post',
          ...data,
          read: false,
          timestamp: new Date()
        };
        
        setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Keep last 10
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <SocketContext.Provider value={{
      socket,
      notifications,
      markAsRead,
      clearAll
    }}>
      {children}
    </SocketContext.Provider>
  );
};