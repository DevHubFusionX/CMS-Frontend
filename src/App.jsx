import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import BlogPost from "./Pages/BlogPost";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import { ProfilePage } from "./Pages/Profile";
import { PreviewPost } from "./Pages/Posts";
import SubscriberHome from "./Pages/SubscriberHome";
import SubscriberDashboard from "./Pages/SubscriberDashboard";

import { 
  AuthProvider, 
  MediaProvider, 
  PostsProvider, 
  UsersProvider, 
  CategoriesProvider, 
  TagsProvider, 
  CommentsProvider, 
  AnalyticsProvider 
} from "./Services";
import { ThemeProvider } from "./Context/ThemeContext";
import { NotificationProvider } from "./Context/NotificationContext";
import { RoleBasedRoute } from "./Components/Auth";
import ErrorBoundary from "./Components/Common/ErrorBoundary";
import NotificationContainer from "./Components/Common/NotificationContainer";


// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <NotificationProvider>
          <AuthProvider>
        <BrowserRouter>
        <Routes>
          {/* Visitor routes */}
          <Route path="/" element={
            <RoleBasedRoute allowedRoles={['visitor', 'subscriber', 'contributor', 'author', 'editor', 'admin', 'super_admin']}>
              <Home />
            </RoleBasedRoute>
          } />
          <Route path="/blog" element={
            <RoleBasedRoute allowedRoles={['visitor', 'subscriber', 'contributor', 'author', 'editor', 'admin', 'super_admin']}>
              <Blog />
            </RoleBasedRoute>
          } />
          <Route path="/blog/:slug" element={
            <RoleBasedRoute allowedRoles={['visitor', 'subscriber', 'contributor', 'author', 'editor', 'admin', 'super_admin']}>
              <BlogPost />
            </RoleBasedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          

          
          <Route path="/preview/post" element={
            <PostsProvider>
              <MediaProvider>
                <CategoriesProvider>
                  <TagsProvider>
                    <PreviewPost />
                  </TagsProvider>
                </CategoriesProvider>
              </MediaProvider>
            </PostsProvider>
          } />
          {/* <Route path="/editor-demo" element={
            <RoleBasedRoute allowedRoles={['admin', 'editor', 'author']}>
              <EditorDemo />
            </RoleBasedRoute>
          } /> */}

          {/* Subscriber routes */}
          <Route path="/subscriber-home" element={
            <RoleBasedRoute allowedRoles={['subscriber']}>
              <SubscriberHome />
            </RoleBasedRoute>
          } />
          <Route path="/subscriber-dashboard" element={
            <RoleBasedRoute allowedRoles={['subscriber']}>
              <SubscriberDashboard />
            </RoleBasedRoute>
          } />
          
          {/* Subscriber and above routes */}
          <Route path="/profile" element={
            <RoleBasedRoute allowedRoles={['subscriber', 'contributor', 'author', 'editor', 'super_admin']}>
              <UsersProvider>
                <ProfilePage />
              </UsersProvider>
            </RoleBasedRoute>
          } />
          
          {/* Dashboard routes - Contributor and above */}
          <Route path="/dashboard/*" element={
            <RoleBasedRoute allowedRoles={['contributor', 'author', 'editor', ]}>
              <MediaProvider>
                <PostsProvider>
                  <CategoriesProvider>
                    <TagsProvider>
                      <UsersProvider>
                        <CommentsProvider>
                          <AnalyticsProvider>
                            <Dashboard />
                          </AnalyticsProvider>
                        </CommentsProvider>
                      </UsersProvider>
                    </TagsProvider>
                  </CategoriesProvider>
                </PostsProvider>
              </MediaProvider>
            </RoleBasedRoute>
          } />
          
          {/* Super Admin routes */}
          <Route path="/super-dashboard/*" element={
            <RoleBasedRoute allowedRoles={['super_admin']}>
              <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Super Admin Dashboard</h1>
                <p>System-wide management interface</p>
              </div>
            </RoleBasedRoute>
          } />
        </Routes>
        </BrowserRouter>
        <NotificationContainer />
        </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;