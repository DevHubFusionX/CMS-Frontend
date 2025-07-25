import React, { createContext, useContext, useState, useEffect } from 'react';
import { usersService, authService } from './api';

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserLoading, setCurrentUserLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await usersService.getAllUsers();
      // Map backend data to frontend format
      const mappedUsers = response.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt
      }));
      setUsers(mappedUsers);
      setError(null);
    } catch (err) {
      // If it's a permission error or 403 Forbidden, just set empty users array
      if (err.message?.includes('not authorized') || err.response?.status === 403) {
        setUsers([]);
        setError(null);
        console.log('Note: Only admin users can access the full users list');
      } else {
        setError('Failed to fetch users');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  // Get user by ID
  const getUserById = async (id) => {
    try {
      setLoading(true);
      const response = await usersService.getUserById(id);
      // Map backend data to frontend format
      const user = {
        id: response._id,
        name: response.name,
        email: response.email,
        role: response.role,
        avatar: response.avatar,
        createdAt: response.createdAt
      };
      setLoading(false);
      return user;
    } catch (err) {
      setError('Failed to get user');
      console.error(err);
      setLoading(false);
      throw err;
    }
  };

  // Add user
  const addUser = async (userData) => {
    try {
      setLoading(true);
      const response = await usersService.createUser(userData);
      // Map backend data to frontend format
      const newUser = {
        id: response._id,
        name: response.name,
        email: response.email,
        role: response.role,
        avatar: response.avatar,
        createdAt: response.createdAt
      };
      setUsers([...users, newUser]);
      setLoading(false);
      return newUser;
    } catch (err) {
      setError('Failed to add user');
      console.error(err);
      setLoading(false);
      throw err;
    }
  };

  // Update user
  const updateUser = async (id, userData) => {
    try {
      setLoading(true);
      const response = await usersService.updateUser(id, userData);
      // Map backend data to frontend format
      const updatedUser = {
        id: response._id,
        name: response.name,
        email: response.email,
        role: response.role,
        avatar: response.avatar,
        createdAt: response.createdAt
      };
      
      setUsers(users.map(user => user.id === id ? updatedUser : user));
      
      // Update current user if it's the same user
      if (currentUser && currentUser.id === id) {
        setCurrentUser(updatedUser);
      }
      
      setLoading(false);
      return updatedUser;
    } catch (err) {
      setError('Failed to update user');
      console.error(err);
      setLoading(false);
      throw err;
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await usersService.deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
      setLoading(false);
      throw err;
    }
  };

  // Fetch current user profile
  const fetchCurrentUser = async () => {
    try {
      setCurrentUserLoading(true);
      const userData = await authService.getCurrentUser();
      
      if (!userData) {
        console.warn('No user data returned from API');
        return null;
      }
      
      // Map backend data to frontend format
      const user = {
        id: userData._id,
        name: userData.name, // Fixed typo: was 'namep'
        email: userData.email,
        role: userData.role,
        avatar: userData.avatar,
        bio: userData.bio,
        createdAt: userData.createdAt
      };
      setCurrentUser(user);
      return user;
    } catch (err) {
      console.error('Failed to fetch current user:', err);
      // Try to get user from localStorage as fallback
      try {
        const localUser = JSON.parse(localStorage.getItem('user'));
        if (localUser) {
          const user = {
            id: localUser.id,
            name: localUser.name,
            email: localUser.email,
            role: localUser.role,
            avatar: localUser.avatar,
            createdAt: new Date().toISOString()
          };
          setCurrentUser(user);
          return user;
        }
      } catch (e) {
        console.error('Error parsing local user data:', e);
      }
      return null;
    } finally {
      setCurrentUserLoading(false);
    }
  };

  // Remove automatic data fetching on mount to prevent rate limiting
  // Data will be fetched when needed

  return (
    <UsersContext.Provider value={{
      users,
      currentUser,
      setCurrentUser,
      loading,
      currentUserLoading,
      error,
      fetchUsers,
      fetchCurrentUser,
      getUserById,
      addUser,
      updateUser,
      deleteUser
    }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);