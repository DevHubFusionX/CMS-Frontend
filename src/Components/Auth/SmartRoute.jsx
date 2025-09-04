import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Services';

const SmartRoute = ({ children, requireAuth = false, redirectTo = '/' }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If route requires auth but user is not logged in
  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in and trying to access auth pages, redirect to dashboard
  if (user && ['/login', '/register'].includes(location.pathname)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default SmartRoute;