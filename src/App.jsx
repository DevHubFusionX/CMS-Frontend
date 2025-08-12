import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SpeedInsights } from '@vercel/speed-insights/react';

import HubFusionXLoader from "./Components/Common/HubFusionXLoader";
import PreloadCritical from "./Components/Common/PreloadCritical";

// Lazy load heavy components
const Home = React.lazy(() => import("./Pages/Home"));
const Blog = React.lazy(() => import("./Pages/Blog"));
const BlogPost = React.lazy(() => import("./Pages/BlogPost"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const ProfilePage = React.lazy(() => import("./Pages/Profile").then(module => ({ default: module.ProfilePage })));
const PreviewPost = React.lazy(() => import("./Pages/Posts").then(module => ({ default: module.PreviewPost })));
const SubscriberHome = React.lazy(() => import("./Pages/SubscriberHome"));
const SubscriberDashboard = React.lazy(() => import("./Pages/SubscriberDashboard"));

// Lazy load all remaining pages
const Login = React.lazy(() => import("./Pages/Login"));
const Register = React.lazy(() => import("./Pages/Register"));
const VerifyOTP = React.lazy(() => import("./Pages/VerifyOTP"));
const ForgotPassword = React.lazy(() => import("./Pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./Pages/ResetPassword"));


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
import { SocketProvider } from "./Context/SocketContext";
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
      <ErrorBoundary>
        <ThemeProvider>
          <NotificationProvider>
            <AuthProvider>
              <SocketProvider>
                <BrowserRouter>
                  <Suspense fallback={<HubFusionXLoader />}>
                    <Routes>
                    {/* Visitor routes */}
                    <Route path="/" element={
                      <RoleBasedRoute allowedRoles={['visitor', 'subscriber', 'contributor', 'author', 'editor', 'admin', 'super_admin']}>
                        <Home />
                      </RoleBasedRoute>
                    } />
                    <Route path="/blog" element={
                      <RoleBasedRoute allowedRoles={['visitor', 'subscriber', 'contributor', 'author', 'editor', 'admin', 'super_admin']}>
                        <CategoriesProvider>
                          <Blog />
                        </CategoriesProvider>
                      </RoleBasedRoute>
                    } />
                    <Route path="/blog/:slug" element={
                      <RoleBasedRoute allowedRoles={['visitor', 'subscriber', 'contributor', 'author', 'editor', 'admin', 'super_admin']}>
                        <BlogPost />
                      </RoleBasedRoute>
                    } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-otp" element={<VerifyOTP />} />
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
                        <PostsProvider>
                          <CategoriesProvider>
                            <SubscriberHome />
                          </CategoriesProvider>
                        </PostsProvider>
                      </RoleBasedRoute>
                    } />
                    <Route path="/subscriber-dashboard" element={
                      <RoleBasedRoute allowedRoles={['subscriber']}>
                        <PostsProvider>
                          <CategoriesProvider>
                            <SubscriberDashboard />
                          </CategoriesProvider>
                        </PostsProvider>
                      </RoleBasedRoute>
                    } />

                    {/* Subscriber and above routes */}
                    <Route path="/profile" element={
                      <RoleBasedRoute allowedRoles={['subscriber', 'contributor', 'author', 'editor', 'admin', 'super_admin']}>
                        <UsersProvider>
                          <ProfilePage />
                        </UsersProvider>
                      </RoleBasedRoute>
                    } />

                    {/* Dashboard routes - Contributor and above */}
                    <Route path="/dashboard/*" element={
                      <RoleBasedRoute allowedRoles={['contributor', 'author', 'editor', 'admin', 'super_admin']}>
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
                  </Suspense>
                </BrowserRouter>
                <NotificationContainer />
              </SocketProvider>
            </AuthProvider>
          </NotificationProvider>
        </ThemeProvider>
      </ErrorBoundary>
      <SpeedInsights />
      <PreloadCritical />
    </QueryClientProvider>
  );
};

export default App;