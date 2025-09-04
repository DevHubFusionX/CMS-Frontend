import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const PricingPlans = ({ currentPlan = 'free', siteId, onPlanChange }) => {
  const [plans, setPlans] = useState({});
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/subscriptions/plans');
      const data = await response.json();
      
      if (data.success) {
        setPlans(data.data);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planName, interval = 'monthly') => {
    if (!siteId) {
      toast.error('Site ID is required');
      return;
    }

    setUpgrading(planName);
    try {
      const token = localStorage.getItem('token');
      const csrfResponse = await fetch('/api/csrf-token');
      const { csrfToken } = await csrfResponse.json();

      const response = await fetch('/api/subscriptions/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify({
          siteId,
          plan: planName,
          interval
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        onPlanChange?.(planName);
      } else {
        toast.error(data.message || 'Failed to upgrade plan');
      }
    } catch (error) {
      console.error('Error upgrading plan:', error);
      toast.error('Failed to upgrade plan');
    } finally {
      setUpgrading(null);
    }
  };

  const PlanCard = ({ planKey, plan, isCurrentPlan }) => (
    <div className={`relative bg-white rounded-lg shadow-lg p-6 ${
      isCurrentPlan ? 'ring-2 ring-blue-500' : ''
    } ${planKey === 'pro' ? 'transform scale-105' : ''}`}>
      {planKey === 'pro' && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      {isCurrentPlan && (
        <div className="absolute -top-3 right-4">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Current Plan
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
          <span className="text-gray-600">/month</span>
        </div>
        {planKey !== 'free' && (
          <div className="text-sm text-gray-500 mt-1">
            ${(plan.price * 10).toFixed(2)}/year (2 months free)
          </div>
        )}
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-700">{plan.features.aiCredits} AI Credits/month</span>
        </div>
        
        <div className="flex items-center">
          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-700">{plan.features.maxStorage}MB Storage</span>
        </div>

        <div className="flex items-center">
          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-700">Up to {plan.features.maxUsers} Users</span>
        </div>

        <div className="flex items-center">
          {plan.features.customDomain ? (
            <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
          <span className={plan.features.customDomain ? 'text-gray-700' : 'text-gray-400'}>
            Custom Domain
          </span>
        </div>

        <div className="flex items-center">
          {plan.features.analytics ? (
            <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
          <span className={plan.features.analytics ? 'text-gray-700' : 'text-gray-400'}>
            Advanced Analytics
          </span>
        </div>

        <div className="flex items-center">
          {plan.features.backups ? (
            <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
          <span className={plan.features.backups ? 'text-gray-700' : 'text-gray-400'}>
            Automatic Backups
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {!isCurrentPlan && planKey !== 'free' && (
          <>
            <button
              onClick={() => handleUpgrade(planKey, 'monthly')}
              disabled={upgrading === planKey}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {upgrading === planKey ? 'Upgrading...' : `Upgrade to ${plan.name}`}
            </button>
            {planKey !== 'free' && (
              <button
                onClick={() => handleUpgrade(planKey, 'yearly')}
                disabled={upgrading === planKey}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {upgrading === planKey ? 'Upgrading...' : 'Upgrade Yearly (Save 17%)'}
              </button>
            )}
          </>
        )}
        
        {isCurrentPlan && (
          <button
            disabled
            className="w-full bg-gray-100 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed"
          >
            Current Plan
          </button>
        )}
        
        {planKey === 'free' && !isCurrentPlan && (
          <button
            disabled
            className="w-full bg-gray-100 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed"
          >
            Free Plan
          </button>
        )}
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
    <div className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
        <p className="text-gray-600 mt-2">Upgrade your site with powerful features</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {Object.entries(plans).map(([planKey, plan]) => (
          <PlanCard
            key={planKey}
            planKey={planKey}
            plan={plan}
            isCurrentPlan={currentPlan === planKey}
          />
        ))}
      </div>

      <div className="text-center mt-8 text-sm text-gray-500">
        <p>All plans include SSL certificate, 99.9% uptime guarantee, and email support.</p>
        <p className="mt-1">Cancel anytime. No hidden fees.</p>
      </div>
    </div>
  );
};

export default PricingPlans;