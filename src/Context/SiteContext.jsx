import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '../Services';

const SiteContext = createContext();

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};

export const SiteProvider = ({ children }) => {
  const { user } = useAuth();
  const [sites, setSites] = useState([]);
  const [currentSite, setCurrentSite] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSites = useCallback(async () => {
    if (!user) {
      setSites([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/sites', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch sites');
      }
      
      const data = await response.json();
      
      if (data.success) {
        const allSites = [...data.data.owned, ...data.data.member.map(m => ({ ...m.site, role: m.role }))];
        setSites(allSites);
        
        // Set first site as current if none selected
        if (allSites.length > 0 && !currentSite) {
          setCurrentSite(allSites[0]);
        }
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching sites:', err);
    } finally {
      setLoading(false);
    }
  }, [user, currentSite]);

  const createSite = useCallback(async (siteData) => {
    try {
      const token = localStorage.getItem('token');
      const csrfResponse = await fetch('/api/csrf-token');
      const { csrfToken } = await csrfResponse.json();

      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(siteData)
      });

      const data = await response.json();

      if (data.success) {
        setSites(prev => [data.data, ...prev]);
        setCurrentSite(data.data);
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to create site');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateSite = useCallback(async (siteId, updates) => {
    try {
      const token = localStorage.getItem('token');
      const csrfResponse = await fetch('/api/csrf-token');
      const { csrfToken } = await csrfResponse.json();

      const response = await fetch(`/api/sites/${siteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(updates)
      });

      const data = await response.json();

      if (data.success) {
        setSites(prev => prev.map(site => 
          site._id === siteId ? { ...site, ...data.data } : site
        ));
        
        if (currentSite?._id === siteId) {
          setCurrentSite(prev => ({ ...prev, ...data.data }));
        }
        
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to update site');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [currentSite]);

  const deleteSite = useCallback(async (siteId) => {
    try {
      const token = localStorage.getItem('token');
      const csrfResponse = await fetch('/api/csrf-token');
      const { csrfToken } = await csrfResponse.json();

      const response = await fetch(`/api/sites/${siteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-CSRF-Token': csrfToken
        }
      });

      const data = await response.json();

      if (data.success) {
        setSites(prev => prev.filter(site => site._id !== siteId));
        
        if (currentSite?._id === siteId) {
          const remainingSites = sites.filter(site => site._id !== siteId);
          setCurrentSite(remainingSites.length > 0 ? remainingSites[0] : null);
        }
      } else {
        throw new Error(data.message || 'Failed to delete site');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [sites, currentSite]);

  const switchSite = useCallback((site) => {
    setCurrentSite(site);
  }, []);

  useEffect(() => {
    if (user) {
      fetchSites();
    } else {
      setSites([]);
      setCurrentSite(null);
    }
  }, [user, fetchSites]);

  const value = {
    sites,
    currentSite,
    loading,
    error,
    fetchSites,
    createSite,
    updateSite,
    deleteSite,
    switchSite,
    setCurrentSite
  };

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
};

export default SiteProvider;