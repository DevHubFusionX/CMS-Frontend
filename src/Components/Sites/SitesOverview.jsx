import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteCreationWizard from './SiteCreationWizard';

const SitesOverview = () => {
  const [sites, setSites] = useState({ owned: [], member: [] });
  const [loading, setLoading] = useState(true);
  const [showCreateWizard, setShowCreateWizard] = useState(false);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/sites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setSites(data.data);
      }
    } catch (error) {
      console.error('Error fetching sites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSiteCreated = (newSite) => {
    setSites(prev => ({
      ...prev,
      owned: [newSite, ...prev.owned]
    }));
  };

  const SiteCard = ({ site, isOwned = true }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{site.name}</h3>
          <p className="text-sm text-gray-600">{site.settings?.title}</p>
          <p className="text-xs text-gray-500 mt-1">
            {site.subdomain}.devhubfusionx.com
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            site.subscription?.plan === 'free' 
              ? 'bg-gray-100 text-gray-800'
              : site.subscription?.plan === 'pro'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-purple-100 text-purple-800'
          }`}>
            {site.subscription?.plan || 'free'}
          </span>
          <span className={`w-2 h-2 rounded-full ${
            site.isActive ? 'bg-green-500' : 'bg-red-500'
          }`}></span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div className="text-center">
          <div className="font-semibold text-gray-900">{site.stats?.totalPosts || 0}</div>
          <div className="text-gray-600">Posts</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-900">{site.stats?.totalViews || 0}</div>
          <div className="text-gray-600">Views</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-900">{site.stats?.totalSubscribers || 0}</div>
          <div className="text-gray-600">Subscribers</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Created {new Date(site.createdAt).toLocaleDateString()}
        </div>
        <div className="flex space-x-2">
          <a
            href={`https://${site.subdomain}.devhubfusionx.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Visit
          </a>
          <Link
            to={`/dashboard/sites/${site._id}`}
            className="text-green-600 hover:text-green-800 text-sm"
          >
            Manage
          </Link>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Sites</h1>
          <p className="text-gray-600">Manage your websites and content</p>
        </div>
        <button
          onClick={() => setShowCreateWizard(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create New Site</span>
        </button>
      </div>

      {/* Owned Sites */}
      {sites.owned.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Sites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.owned.map((site) => (
              <SiteCard key={site._id} site={site} isOwned={true} />
            ))}
          </div>
        </div>
      )}

      {/* Member Sites */}
      {sites.member.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sites You're Part Of</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.member.map((siteUser) => (
              <div key={siteUser._id} className="relative">
                <SiteCard site={siteUser.site} isOwned={false} />
                <div className="absolute top-2 right-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    {siteUser.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {sites.owned.length === 0 && sites.member.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No sites yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first site.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateWizard(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Your First Site
            </button>
          </div>
        </div>
      )}

      {/* Create Site Wizard */}
      {showCreateWizard && (
        <SiteCreationWizard
          onClose={() => setShowCreateWizard(false)}
          onSiteCreated={handleSiteCreated}
        />
      )}
    </div>
  );
};

export default SitesOverview;