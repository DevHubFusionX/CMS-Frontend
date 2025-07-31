import React, { useState } from 'react';

const SecurityTab = () => {
  const [loading, setLoading] = useState({});

  const handlePasswordChange = async () => {
    setLoading(prev => ({ ...prev, password: true }));
    try {
      alert('Password change functionality will be implemented');
    } catch (error) {
      console.error('Password change error:', error);
    } finally {
      setLoading(prev => ({ ...prev, password: false }));
    }
  };

  const handleEnable2FA = async () => {
    setLoading(prev => ({ ...prev, twofa: true }));
    try {
      alert('2FA setup functionality will be implemented');
    } catch (error) {
      console.error('2FA setup error:', error);
    } finally {
      setLoading(prev => ({ ...prev, twofa: false }));
    }
  };

  const handleViewSessions = async () => {
    setLoading(prev => ({ ...prev, sessions: true }));
    try {
      alert('Session management functionality will be implemented');
    } catch (error) {
      console.error('Session view error:', error);
    } finally {
      setLoading(prev => ({ ...prev, sessions: false }));
    }
  };
  const securityItems = [
    {
      title: 'Password',
      description: 'Last changed 30 days ago',
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      buttonText: 'Change Password',
      gradient: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
      borderColor: 'var(--color-primary)'
    },
    {
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      buttonText: 'Enable 2FA',
      gradient: 'linear-gradient(135deg, var(--color-success) 0%, var(--color-accent) 100%)',
      borderColor: 'var(--color-success)'
    },
    {
      title: 'Login Sessions',
      description: 'Manage your active sessions',
      icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z',
      buttonText: 'View Sessions',
      gradient: 'linear-gradient(135deg, var(--color-warning) 0%, var(--color-secondary) 100%)',
      borderColor: 'var(--color-warning)'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold" style={{color: 'var(--color-base-content)'}}>Security Settings</h3>
        <p className="mt-1" style={{color: 'var(--color-base-content)'}}>Manage your account security and privacy</p>
      </div>
      
      <div className="space-y-4">
        {securityItems.map((item, index) => (
          <div key={index} className="rounded-2xl p-6 border backdrop-blur-sm" style={{
            background: item.gradient,
            borderColor: item.borderColor
          }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center border" style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(255, 255, 255, 0.3)'
                }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-white/80">{item.description}</p>
                </div>
              </div>
              <button 
                onClick={index === 0 ? handlePasswordChange : index === 1 ? handleEnable2FA : handleViewSessions}
                disabled={loading[index === 0 ? 'password' : index === 1 ? 'twofa' : 'sessions']}
                className="px-6 py-3 rounded-2xl transition-all duration-300 font-medium shadow-lg border disabled:opacity-50 disabled:cursor-not-allowed" 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)'
                }}
                onMouseEnter={(e) => {
                  const loadingKey = index === 0 ? 'password' : index === 1 ? 'twofa' : 'sessions';
                  if (!loading[loadingKey]) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1)';
                }}>
                {loading[index === 0 ? 'password' : index === 1 ? 'twofa' : 'sessions'] ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                  </>
                ) : (
                  item.buttonText
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityTab;