import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RecentActivity } from '../Components/Dashboard';
import { PostsList, CreatePost, EditPost, ViewPost } from './Posts/index.js';
import PreviewDrafts from './Posts/PreviewDrafts';
import { SettingsPage } from './Settings';
import { AnalyticsPage } from './Analytics';
import { MediaPage } from './Media';
import { CategoriesPage } from './Categories';
import { TagsPage } from './Tags';
import { UsersPage } from './Users';
import { CommentsPage } from './Comments';
import Notifications from './Notifications';
import AdminLayout from '../Layout/AdminLayout';
import DashboardHeader from './Dashboard/components/DashboardHeader';
import StatsCards from './Dashboard/components/StatsCards';
import QuickActionsPanel from './Dashboard/components/QuickActionsPanel';
import SidebarPanels from './Dashboard/components/SidebarPanels';



const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <RecentActivity />
        </div>
        
        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
          <QuickActionsPanel />
          <SidebarPanels />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="posts" element={<PostsList />} />
        <Route path="posts/my" element={<PostsList showMyPosts={true} />} />
        <Route path="posts/create" element={<CreatePost />} />

        <Route path="posts/edit/:id" element={<EditPost />} />
        <Route path="posts/view/:id" element={<ViewPost />} />
        <Route path="preview" element={<PreviewDrafts />} />
        <Route path="media" element={<MediaPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="tags" element={<TagsPage />} />
        <Route path="comments" element={<CommentsPage />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<SettingsPage />} />

      </Routes>
    </AdminLayout>
  );
};

export default Dashboard;