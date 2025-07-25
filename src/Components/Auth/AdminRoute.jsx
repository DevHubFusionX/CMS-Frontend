import React from 'react';
import RoleBasedRoute from './RoleBasedRoute';

/**
 * Component for admin-only routes
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render if access is granted
 * @param {string} props.redirectTo - Path to redirect to if access is denied (defaults to /dashboard)
 */
const AdminRoute = ({ children, redirectTo = '/dashboard' }) => {
  return (
    <RoleBasedRoute allowedRoles={['admin']} redirectTo={redirectTo}>
      {children}
    </RoleBasedRoute>
  );
};

export default AdminRoute;