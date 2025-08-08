// Navigation configuration for different user roles
export const sidebarItems = {
  super_admin: [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "All Posts", path: "/dashboard/posts" },
    { label: "Add Post", path: "/dashboard/posts/create" },
    { label: "Pages", path: "/dashboard/pages" },
    { label: "Preview", path: "/dashboard/preview" },
    { label: "Media", path: "/dashboard/media" },
    { label: "Comments", path: "/dashboard/comments" },
    { label: "Users", path: "/dashboard/users" },
    { label: "Analytics", path: "/dashboard/analytics" },
    { label: "Settings", path: "/dashboard/settings" },
    { label: "Profile", path: "/profile" },
  ],
  admin: [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "All Posts", path: "/dashboard/posts" },
    { label: "Add Post", path: "/dashboard/posts/create" },
    { label: "Pages", path: "/dashboard/pages" },
    { label: "Preview", path: "/dashboard/preview" },
    { label: "Media", path: "/dashboard/media" },
    { label: "Comments", path: "/dashboard/comments" },
    { label: "Users", path: "/dashboard/users" },
    { label: "Analytics", path: "/dashboard/analytics" },
    { label: "Settings", path: "/dashboard/settings" },
    { label: "Profile", path: "/profile" },
  ],
  editor: [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "All Posts", path: "/dashboard/posts" },
    { label: "Add Post", path: "/dashboard/posts" },
    { label: "Pages", path: "/dashboard/pages" },
    { label: "Preview", path: "/dashboard/preview" },
    { label: "Media", path: "/dashboard/media" },
    { label: "Comments", path: "/dashboard/comments" },
    { label: "Analytics", path: "/dashboard/analytics" },
    { label: "Profile", path: "/profile" },
  ],
  author: [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Posts", path: "/dashboard/posts/my" },
    { label: "Media", path: "/dashboard/media" },
    { label: "Profile", path: "/profile" },
  ],
  contributor: [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Drafts", path: "/dashboard/posts/my" },
    { label: "Add Draft", path: "/dashboard/posts" },
    { label: "Profile", path: "/profile" },
  ],
  subscriber: [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Blog", path: "/blog" },
    { label: "Profile", path: "/profile" },
  ],
};

export const getNavigationItems = (userRole) => {
  const role = userRole?.toLowerCase() || 'subscriber';
  return sidebarItems[role] || sidebarItems.subscriber;
};