/**
 * Check if the current user is an admin
 * @returns {boolean} True if the user is an admin, false otherwise
 */
export const isAdmin = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.role === 'admin';
  } catch (error) {
    return false;
  }
};

/**
 * Check if the current user is an editor or admin
 * @returns {boolean} True if the user is an editor or admin, false otherwise
 */
export const isEditorOrAdmin = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && (user.role === 'admin' || user.role === 'editor');
  } catch (error) {
    return false;
  }
};

/**
 * Get the current user's ID
 * @returns {string|null} The user's ID or null if not logged in
 */
export const getCurrentUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.id : null;
  } catch (error) {
    return null;
  }
};