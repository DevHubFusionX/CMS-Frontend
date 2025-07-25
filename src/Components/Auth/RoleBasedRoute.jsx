import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Services/AuthContext';
import { usePermissions } from '../../Hooks/usePermissions';

/**
 * Component for role-based access control
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render if access is granted
 * @param {string[]} props.allowedRoles - Array of roles that are allowed to access this route
 * @param {string} props.redirectTo - Path to redirect to if access is denied (defaults to /dashboard)
 */
const RoleBasedRoute = ({ 
  children, 
  allowedRoles = [], 
  permissions = [],
  minimumRole,
  redirectTo = '/login' 
}) => {
  const { user, loading } = useAuth();
  const { hasAnyPermission, hasMinimumRole } = usePermissions();
  
  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }
  
  // Handle visitor access
  if (!user) {
    if (allowedRoles.includes('visitor')) {
      return children;
    }
    return <Navigate to="/login" />;
  }
  
  let hasAccess = false;
  
  // Handle both new role system and legacy roles
  const userRole = user.role?.name || user.legacyRole || user.role || 'subscriber';
  
  // Super admin has access to everything
  if (userRole === 'super_admin') {
    hasAccess = true;
  }
  // Check permissions first
  else if (permissions.length > 0) {
    hasAccess = hasAnyPermission(permissions);
  }
  // Then check minimum role
  else if (minimumRole) {
    hasAccess = hasMinimumRole(minimumRole);
  }
  // Fallback to role check
  else if (allowedRoles.length === 0) {
    hasAccess = true;
  }
  else {
    hasAccess = allowedRoles.includes(userRole);
  }
  
  if (!hasAccess) {
    console.warn(`Access Denied: User role '${userRole}' not in allowed roles [${allowedRoles.join(', ')}]`);
    return <Navigate to={redirectTo} replace />;
  }
  
  return children;
};

export default RoleBasedRoute;