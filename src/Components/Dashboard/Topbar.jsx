import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Services/AuthContext';
import { authService } from '../../Services/api';
import MobileSidebarToggle from './components/MobileSidebarToggle';
import SearchBar from './components/SearchBar';
import QuickActions from './components/QuickActions';
import ThemeToggle from './components/ThemeToggle';
import NotificationsDropdown from './components/NotificationsDropdown';
import UserMenu from './components/UserMenu';

const Topbar = ({ onMobileSidebarToggle }) => {
  const { logout: contextLogout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    authService.logout();
    contextLogout();
    navigate('/login');
  };
  
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl shadow-2xl transition-all duration-300" style={{
      background: `linear-gradient(135deg, var(--color-base-100) 0%, var(--color-base-200) 100%)`,
      borderBottom: `1px solid var(--color-base-300)`,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <MobileSidebarToggle onToggle={onMobileSidebarToggle} />
        
        <SearchBar />
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          <QuickActions />
          <ThemeToggle />
          <NotificationsDropdown />
          <UserMenu onLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
 