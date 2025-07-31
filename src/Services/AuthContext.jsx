import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on component mount
    const storedUser = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      // Clear any inconsistent state
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    }
    setLoading(false);
  }, []);
  
  // Refresh user data from server
  const refreshUserData = async () => {
    try {
      const userData = await authService.getCurrentUser();
      if (userData) {
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  const login = (userData, token) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
    if (token) {
      sessionStorage.setItem('token', token);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  };
  
  // Update current user data
  const updateCurrentUser = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading,
      updateCurrentUser,
      refreshUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };