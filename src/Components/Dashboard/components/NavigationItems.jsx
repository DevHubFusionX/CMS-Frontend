import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationItems = ({ navigationItems, collapsed, isMobile, onMobileClose, hoveredItem, setHoveredItem, getIcon }) => {
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    const exactOnlyPaths = ['/dashboard/posts'];
    if (exactOnlyPaths.includes(path)) {
      return location.pathname === path;
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const isDropdownActive = (dropdown) => {
    return dropdown.some(item => isActive(item.path));
  };

  const toggleDropdown = (label) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
      <div className="px-3">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.label}>
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="group flex items-center w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      backgroundColor: isDropdownActive(item.dropdown) ? 'var(--color-primary)' : 'transparent',
                      color: isDropdownActive(item.dropdown) ? 'var(--color-primary-content)' : 'var(--color-base-content)',
                      borderLeft: isDropdownActive(item.dropdown) ? '4px solid var(--color-primary)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isDropdownActive(item.dropdown)) {
                        e.target.style.backgroundColor = 'var(--color-base-300)';
                      }
                      setHoveredItem(item.label);
                    }}
                    onMouseLeave={(e) => {
                      if (!isDropdownActive(item.dropdown)) {
                        e.target.style.backgroundColor = 'transparent';
                      }
                      setHoveredItem(null);
                    }}
                  >
                    <span className={`
                      flex-shrink-0 transition-transform duration-200
                      ${isDropdownActive(item.dropdown) ? 'text-blue-600 dark:text-blue-400' : ''}
                      ${hoveredItem === item.label ? 'scale-110' : ''}
                    `}>
                      {getIcon(item.label)}
                    </span>

                    {(!collapsed || isMobile) && (
                      <>
                        <span className="ml-3 flex-1">{item.label}</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${openDropdowns[item.label] ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>
                  
                  {(!collapsed || isMobile) && openDropdowns[item.label] && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <li key={subItem.label}>
                          <Link
                            to={subItem.path}
                            onClick={isMobile ? onMobileClose : undefined}
                            className="group flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200"
                            style={{
                              backgroundColor: isActive(subItem.path) ? 'var(--color-primary)' : 'transparent',
                              color: isActive(subItem.path) ? 'var(--color-primary-content)' : 'var(--color-base-content)',
                              opacity: isActive(subItem.path) ? 1 : 0.8
                            }}
                            onMouseEnter={(e) => {
                              if (!isActive(subItem.path)) {
                                e.target.style.backgroundColor = 'var(--color-base-300)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isActive(subItem.path)) {
                                e.target.style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            <span className="text-xs">•</span>
                            <span className="ml-2">{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  onClick={isMobile ? onMobileClose : undefined}
                  className="group flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: isActive(item.path) ? 'var(--color-primary)' : 'transparent',
                    color: isActive(item.path) ? 'var(--color-primary-content)' : 'var(--color-base-content)',
                    borderLeft: isActive(item.path) ? '4px solid var(--color-primary)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.backgroundColor = 'var(--color-base-300)';
                    }
                    setHoveredItem(item.label);
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                    setHoveredItem(null);
                  }}
                  title={collapsed && !isMobile ? item.label : item.label}
                >
                  <span className={`
                    flex-shrink-0 transition-transform duration-200
                    ${isActive(item.path) ? 'text-blue-600 dark:text-blue-400' : ''}
                    ${hoveredItem === item.label ? 'scale-110' : ''}
                  `}>
                    {getIcon(item.label)}
                  </span>

                  {(!collapsed || isMobile) && (
                    <span className="ml-3 flex-1">{item.label}</span>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationItems;