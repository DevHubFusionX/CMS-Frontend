import React from 'react';
import { usePermissions } from '../../Hooks/usePermissions';

const PermissionGate = ({ 
  permission, 
  permissions, 
  minimumRole, 
  fallback = null, 
  children 
}) => {
  const { hasPermission, hasAnyPermission, hasMinimumRole } = usePermissions();

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(permission);
  } else if (permissions) {
    hasAccess = hasAnyPermission(permissions);
  } else if (minimumRole) {
    hasAccess = hasMinimumRole(minimumRole);
  }

  return hasAccess ? children : fallback;
};

export default PermissionGate;