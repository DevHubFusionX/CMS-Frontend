import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../Context/ThemeContext';

const ExternalLinks = ({ collapsed, isMobile, onMobileClose }) => {
  const { theme } = useTheme();

  const externalLinks = [
    {
      name: 'View Blog',
      path: '/blog',
      description: 'Visit your public blog',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      external: true
    }
  ];

  return (
    <div className="border-t pt-4" style={{ borderColor: 'var(--color-base-300)' }}>
      {(!collapsed || isMobile) && (
        <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
          External
        </h3>
      )}

      <ul className="space-y-1">
        {externalLinks.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              onClick={isMobile ? onMobileClose : undefined}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="group flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-base-content)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-base-300)';
                e.currentTarget.style.color = 'var(--color-base-content)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-base-content)';
              }}
              title={collapsed && !isMobile ? item.name : item.description}
            >
              <span className="flex-shrink-0">
                {item.icon}
              </span>
              {(!collapsed || isMobile) && (
                <>
                  <span className="ml-3 flex-1">{item.name}</span>
                  {item.external && (
                    <svg className="w-3 h-3 ml-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExternalLinks;