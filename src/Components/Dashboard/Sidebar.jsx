import React, { useEffect } from 'react';
import SidebarHeader from './components/SidebarHeader';
import NavigationItems from './components/NavigationItems';
import ExternalLinks from './components/ExternalLinks';
import SidebarFooter from './components/SidebarFooter';
import { getIcon } from './components/SidebarIcons';
import { getNavigationItems } from './config/navigationConfig';
import { useSidebar } from './hooks/useSidebar';

const Sidebar = ({ isMobileOpen = false, onMobileClose = () => { } }) => {
  const {
    userRole,
    collapsed,
    setCollapsed,
    hoveredItem,
    setHoveredItem,
    isMobile,
    handleLogout,
    handleMouseEnter,
    handleMouseLeave
  } = useSidebar();

  const navigationItems = getNavigationItems(userRole);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isMobileOpen && !event.target.closest('aside')) {
        onMobileClose();
      }
    };

    if (isMobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isMobileOpen, onMobileClose]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden backdrop-blur-sm" 
          style={{ backgroundColor: 'var(--color-neutral)', opacity: '0.5' }}
          onClick={onMobileClose} 
        />
      )}

      <aside 
        className={`
          h-screen flex flex-col
          transition-all duration-700 ease-out
          transform-gpu
          ${isMobile ? (
            `fixed left-0 top-0 z-50 w-64 sm:w-72 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`
          ) : (
            `hidden lg:flex relative ${collapsed ? 'w-16 xl:w-20' : 'w-64 xl:w-72'}`
          )}
        `} 
        style={{
          backgroundColor: 'var(--color-base-200)',
          borderRight: 'var(--border) solid var(--color-base-300)',
          background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`,
          borderRadius: `0 var(--radius-box) var(--radius-box) 0`,
          boxShadow: collapsed ? '0 4px 16px rgba(0, 0, 0, 0.05)' : '0 12px 40px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease-out',
          willChange: 'width, box-shadow'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SidebarHeader 
          collapsed={collapsed}
          isMobile={isMobile}
          onMobileClose={onMobileClose}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          showToggleButton={isMobile}
        />

        <NavigationItems 
          navigationItems={navigationItems}
          collapsed={collapsed}
          isMobile={isMobile}
          onMobileClose={onMobileClose}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          getIcon={getIcon}
        />
        
        <ExternalLinks 
          collapsed={collapsed}
          isMobile={isMobile}
          onMobileClose={onMobileClose}
        />
        
        <SidebarFooter 
          collapsed={collapsed}
          isMobile={isMobile}
          onLogout={handleLogout}
        />
      </aside>
    </>
  );
};

export default Sidebar;