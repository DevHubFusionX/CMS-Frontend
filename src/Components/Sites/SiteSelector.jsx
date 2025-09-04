import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SiteSelector = ({ onSiteSelect }) => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserSites();
  }, []);

  const fetchUserSites = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/sites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setSites([...data.data.owned, ...data.data.member.map(m => m.site)]);
      }
    } catch (error) {
      console.error('Error fetching sites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSiteSelect = (site) => {
    onSiteSelect?.(site);
    navigate(`/sites/${site._id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (sites.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Sites Found</h3>
        <p className="text-gray-600 mb-4">Create your first site to get started.</p>
        <button
          onClick={() => navigate('/sites')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Site
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Select a Site</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sites.map((site) => (
          <div
            key={site._id}
            onClick={() => handleSiteSelect(site)}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md cursor-pointer transition-all"
          >
            <h4 className="font-medium text-gray-900">{site.name}</h4>
            <p className="text-sm text-gray-600">{site.subdomain}.devhubfusionx.com</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-500 capitalize">{site.type}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                site.subscription?.plan === 'free' 
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {site.subscription?.plan || 'free'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteSelector;