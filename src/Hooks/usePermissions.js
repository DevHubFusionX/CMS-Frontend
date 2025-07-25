import { useAuth } from '../Services';

export const usePermissions = () => {
  const { user } = useAuth();

  const hasPermission = (permission) => {
    if (!user) return false;
    if (!user.role || !user.role.permissions) {
      // Fallback for legacy roles
      const legacyRole = user.legacyRole || user.role;
      if (legacyRole === 'admin') return true;
      if (legacyRole === 'editor' && ['create_posts', 'edit_all_posts', 'access_dashboard'].includes(permission)) return true;
      if (legacyRole === 'author' && ['create_posts', 'edit_own_posts', 'access_dashboard'].includes(permission)) return true;
      return false;
    }
    return user.role.permissions.includes(permission);
  };

  const hasAnyPermission = (permissions) => {
    if (!user) return false;
    if (!user.role || !user.role.permissions) {
      // Fallback for legacy roles
      return permissions.some(permission => hasPermission(permission));
    }
    return permissions.some(permission => user.role.permissions.includes(permission));
  };

  const hasMinimumRole = (minimumLevel) => {
    if (!user) return false;
    if (!user.role || typeof user.role.level === 'undefined') {
      // Fallback for legacy roles
      const legacyRole = user.legacyRole || user.role;
      const roleLevels = { subscriber: 1, contributor: 2, author: 3, editor: 4, admin: 5, super_admin: 6 };
      return (roleLevels[legacyRole] || 1) >= minimumLevel;
    }
    return user.role.level >= minimumLevel;
  };

  const canCreatePosts = () => hasPermission('create_posts');
  const canEditAllPosts = () => hasPermission('edit_all_posts');
  const canDeleteAllPosts = () => hasPermission('delete_all_posts');
  const canManageUsers = () => hasPermission('create_users');
  const canAccessDashboard = () => hasPermission('access_dashboard');
  const canViewAnalytics = () => hasPermission('view_analytics');

  return {
    hasPermission,
    hasAnyPermission,
    hasMinimumRole,
    canCreatePosts,
    canEditAllPosts,
    canDeleteAllPosts,
    canManageUsers,
    canAccessDashboard,
    canViewAnalytics,
    userRole: user?.role?.name || 'subscriber',
    roleLevel: user?.role?.level || 1
  };
};

export default usePermissions;