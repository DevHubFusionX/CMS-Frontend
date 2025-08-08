import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Services/AuthContext';
import { authService } from '../../../Services/api';

export const useSidebar = () => {
  const navigate = useNavigate();
  const { user, logout: contextLogout } = useAuth();
  const [collapsed, setCollapsed] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const userRole = user?.legacyRole || user?.role?.name || user?.role;

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    authService.logout();
    contextLogout();
    navigate('/login');
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      if (hoverTimeout) clearTimeout(hoverTimeout);
      const timeout = setTimeout(() => setCollapsed(false), 150);
      setHoverTimeout(timeout);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      if (hoverTimeout) clearTimeout(hoverTimeout);
      const timeout = setTimeout(() => setCollapsed(true), 500);
      setHoverTimeout(timeout);
    }
  };

  return {
    userRole,
    collapsed,
    setCollapsed,
    hoveredItem,
    setHoveredItem,
    isMobile,
    handleLogout,
    handleMouseEnter,
    handleMouseLeave
  };
};