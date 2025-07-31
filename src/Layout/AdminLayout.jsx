import React, { useState } from 'react';
import Sidebar from '../Components/Dashboard/Sidebar';
import Topbar from '../Components/Dashboard/Topbar';

const AdminLayout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen" style={{backgroundColor: 'var(--color-base-100)'}}>
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        onMobileClose={() => setIsMobileSidebarOpen(false)} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onMobileSidebarToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6" style={{backgroundColor: 'var(--color-base-100)'}}>
          <div className="max-w-7xl mx-auto text-base-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;