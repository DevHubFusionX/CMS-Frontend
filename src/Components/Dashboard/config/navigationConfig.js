// Navigation configuration for different user roles
export const sidebarItems = {
  super_admin: [
    { label: "Platform", path: "/" },
    { label: "My Sites", path: "/sites" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "All Posts", path: "/dashboard/posts" },
    { label: "Add Post", path: "/dashboard/posts/create" },
    { label: "Categories", path: "/dashboard/categories" },
    { label: "Preview", path: "/dashboard/preview" },
    { label: "Media", path: "/dashboard/media" },
    { label: "Comments", path: "/dashboard/comments" },
    { label: "Users", path: "/dashboard/users" },
    { label: "Analytics", path: "/dashboard/analytics" },
    { label: "Settings", path: "/dashboard/settings" },
    { label: "Profile", path: "/profile" },
  ],
  admin: [
    { label: "Platform", path: "/" },
    { label: "My Sites", path: "/sites" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "All Posts", path: "/dashboard/posts" },
    { label: "Add Post", path: "/dashboard/posts/create" },
    { label: "Categories", path: "/dashboard/categories" },
    { label: "Preview", path: "/dashboard/preview" },
    { label: "Media", path: "/dashboard/media" },
    { label: "Comments", path: "/dashboard/comments" },
    { label: "Users", path: "/dashboard/users" },
    { label: "Analytics", path: "/dashboard/analytics" },
    { label: "Settings", path: "/dashboard/settings" },
    { label: "Profile", path: "/profile" },
  ],
  editor: [
    { label: "Platform", path: "/" },
    { label: "My Sites", path: "/sites" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "All Posts", path: "/dashboard/posts" },
    { label: "Add Post", path: "/dashboard/posts" },
    { label: "Categories", path: "/dashboard/categories" },
    { label: "Preview", path: "/dashboard/preview" },
    { label: "Media", path: "/dashboard/media" },
    { label: "Comments", path: "/dashboard/comments" },
    { label: "Analytics", path: "/dashboard/analytics" },
    { label: "Profile", path: "/profile" },
  ],
  author: [
    { label: "Platform", path: "/" },
    { label: "My Sites", path: "/sites" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Posts", path: "/dashboard/posts/my" },
    { label: "Media", path: "/dashboard/media" },
    { label: "Profile", path: "/profile" },
  ],
  contributor: [
    { label: "Platform", path: "/" },
    { label: "My Sites", path: "/sites" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Drafts", path: "/dashboard/posts/my" },
    { label: "Add Draft", path: "/dashboard/posts" },
    { label: "Profile", path: "/profile" },
  ],
  subscriber: [
    { label: "Platform", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Blog", path: "/blog" },
    { label: "Profile", path: "/profile" },
  ],
};

export const getNavigationItems = (userRole) => {
  const role = userRole?.toLowerCase() || 'subscriber';
  return sidebarItems[role] || sidebarItems.subscriber;
};