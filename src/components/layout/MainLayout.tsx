// src/components/layout/MainLayout.tsx

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ActivityFeed } from './ActivityFeed';

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content + Activity Feed Container */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-6">
              <Outlet />
            </div>
          </main>

          {/* Activity Feed */}
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};