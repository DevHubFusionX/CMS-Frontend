import React, { useState, useEffect } from 'react';
import { useUsers } from '../../Services/UsersContext';
import { useNotification } from '../../Context/NotificationContext';
import UserForm from '../../Components/Users/UserForm';
import UsersHeader from './components/UsersHeader';
import UsersFilters from './components/UsersFilters';
import UsersGrid from './components/UsersGrid';
import UsersTable from './components/UsersTable';

const UsersPage = () => {
  const { users, loading, addUser, updateUser, deleteUser, fetchUsers } = useUsers();
  const { success, error, warning } = useNotification();
  const [editingUser, setEditingUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = (userData) => {
    if (userData.confirmPassword) {
      delete userData.confirmPassword;
    }
    addUser(userData).then(() => {
      setIsFormOpen(false);
    });
  };

  const handleUpdateUser = (userData) => {
    if (userData.confirmPassword) {
      delete userData.confirmPassword;
    }
    updateUser(editingUser.id, userData).then(() => {
      setEditingUser(null);
      setIsFormOpen(false);
    });
  };

  const handleDeleteUser = async (user) => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.id === currentUser.id || user.id === currentUser._id) {
      warning('You cannot delete your own account.');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await deleteUser(user.id);
        success(`${user.name} has been deleted successfully.`);
      } catch (err) {
        error(`Failed to delete user: ${err.message}`);
      }
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const getRoleBadgeClass = (role) => {
    let roleName = 'subscriber';
    if (typeof role === 'string') {
      roleName = role;
    } else if (role && typeof role === 'object') {
      roleName = role.name || role.displayName || 'subscriber';
    }

    switch (roleName.toLowerCase()) {
      case 'admin':
      case 'super_admin':
        return {
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-primary-content)',
          borderColor: 'var(--color-primary)'
        };
      case 'editor':
        return {
          backgroundColor: 'var(--color-secondary)',
          color: 'var(--color-secondary-content)',
          borderColor: 'var(--color-secondary)'
        };
      case 'instructor':
        return {
          backgroundColor: 'var(--color-info)',
          color: 'var(--color-info-content)',
          borderColor: 'var(--color-info)'
        };
      case 'author':
      case 'contributor':
        return {
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-accent-content)',
          borderColor: 'var(--color-accent)'
        };
      case 'student':
        return {
          backgroundColor: 'var(--color-success)',
          color: 'var(--color-success-content)',
          borderColor: 'var(--color-success)'
        };
      default:
        return {
          backgroundColor: 'var(--color-base-300)',
          color: 'var(--color-base-content)',
          borderColor: 'var(--color-base-300)'
        };
    }
  };

  const getRoleLabel = (role) => {
    let roleName = 'subscriber';
    if (typeof role === 'string') {
      roleName = role;
    } else if (role && typeof role === 'object') {
      roleName = role.name || role.displayName || 'subscriber';
    }

    switch (roleName.toLowerCase()) {
      case 'admin':
      case 'super_admin':
        return 'Administrator';
      case 'editor':
        return 'Editor';
      case 'instructor':
        return 'Instructor';
      case 'author':
        return 'Author';
      case 'contributor':
        return 'Contributor';
      case 'student':
        return 'Student';
      case 'subscriber':
        return 'Subscriber';
      default:
        return roleName;
    }
  };

  const getRoleIcon = (role) => {
    let roleName = 'subscriber';
    if (typeof role === 'string') {
      roleName = role;
    } else if (role && typeof role === 'object') {
      roleName = role.name || role.displayName || 'subscriber';
    }

    switch (roleName.toLowerCase()) {
      case 'admin':
      case 'super_admin':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'editor':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case 'instructor':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        );
      case 'author':
      case 'contributor':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        );
      case 'student':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
    }
  };

  const getStatusIndicator = (user) => {
    const isOnline = Math.random() > 0.5;
    return isOnline ? (
      <div
        className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 shadow-sm"
        style={{
          backgroundColor: 'var(--color-success)',
          borderColor: 'var(--color-base-200)'
        }}
      >
        <div
          className="w-full h-full rounded-full animate-pulse"
          style={{ backgroundColor: 'var(--color-success)' }}
        ></div>
      </div>
    ) : (
      <div
        className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 shadow-sm"
        style={{
          backgroundColor: 'var(--color-base-300)',
          borderColor: 'var(--color-base-200)'
        }}
      ></div>
    );
  };

  const sortUsers = (users) => {
    return [...users].sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'role':
          aValue = (typeof a.role === 'string' ? a.role : a.role?.name || a.role?.displayName || '').toLowerCase();
          bValue = (typeof b.role === 'string' ? b.role : b.role?.name || b.role?.displayName || '').toLowerCase();
          break;
        case 'created':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filteredUsers = sortUsers(
    users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const roleStr = typeof user.role === 'string' ? user.role : user.role?.name || user.role?.displayName || 'subscriber';
      const matchesRole = selectedRole === 'all' || roleStr.toLowerCase() === selectedRole;
      return matchesSearch && matchesRole;
    })
  );

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--color-base-100)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6">
      <UsersHeader 
        onAddUser={() => setIsFormOpen(true)} 
        totalUsers={users.length} 
      />
      
      <UsersFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />
      
      {viewMode === 'grid' ? (
        <UsersGrid
          users={filteredUsers}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDeleteUser}
          getRoleBadgeClass={getRoleBadgeClass}
          getRoleLabel={getRoleLabel}
          getRoleIcon={getRoleIcon}
          getStatusIndicator={getStatusIndicator}
        />
      ) : (
        <UsersTable
          users={filteredUsers}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDeleteUser}
          getRoleBadgeClass={getRoleBadgeClass}
          getRoleLabel={getRoleLabel}
          getRoleIcon={getRoleIcon}
          getStatusIndicator={getStatusIndicator}
        />
      )}
      
      {isFormOpen && (
        <UserForm
          user={editingUser}
          onSubmit={editingUser ? handleUpdateUser : handleAddUser}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingUser(null);
          }}
        />
      )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;