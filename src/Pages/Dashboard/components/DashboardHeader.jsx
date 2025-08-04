import React from 'react';
import { useAuth } from '../../../Services/AuthContext';
import { HiRefresh } from 'react-icons/hi';

const DashboardHeader = () => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getUserDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.email) return user.email.split('@')[0];
    return 'there';
  };

  return (
    <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 border backdrop-blur-xl" style={{
      background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
      borderColor: 'var(--color-base-300)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3 sm:mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-2xl border border-white/20" style={{
              background: `linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)`
            }}>
              {getUserDisplayName().charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-medium text-white/90 drop-shadow-sm">
                {getGreeting()}, {getUserDisplayName()}!
              </h2>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                Dashboard
              </h1>
            </div>
          </div>
          <p className="text-sm sm:text-base hidden sm:block text-white/80 drop-shadow-sm">
            Welcome back to your HubFusionx content management system.
          </p>
        </div>
        
        <div className="sm:ml-6 flex items-center space-x-3">
          <button
            onClick={() => window.location.reload()}
            className="p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg border backdrop-blur-sm hover:bg-white/20 transition-all duration-200 group"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }}
            title="Reload Dashboard"
          >
            <HiRefresh className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:rotate-180 transition-transform duration-300" />
          </button>
          
          <div className="rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg border backdrop-blur-sm" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            borderColor: 'rgba(255, 255, 255, 0.2)'
          }}>
            <div className="text-xs sm:text-sm font-medium text-white drop-shadow-sm">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
            <div className="text-xs mt-1 text-white/80">
              {new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;