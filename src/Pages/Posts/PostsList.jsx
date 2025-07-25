import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Services/AuthContext';
import ModernPostsHeader from './components/ModernPostsHeader';
import ModernPostsFilters from './components/ModernPostsFilters';
import ModernPostsGrid from './components/ModernPostsGrid';
import ModernPagination from './components/ModernPagination';
import PostsStats from './components/PostsStats';
import { usePosts } from './hooks/usePosts';
import { usePostsFilter } from './hooks/usePostsFilter';

const PostsList = ({ showMyPosts = false }) => {
  const navigate = useNavigate();
  const { posts, loading, deletePost } = usePosts();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState('grid');
  
  // Filter posts for current user if showMyPosts is true
  const getFilteredPostsByUser = (allPosts) => {
    if (!showMyPosts || !user) return allPosts;
    
    return allPosts.filter(post => {
      const postAuthorId = post.author?.id || post.author?._id || post.authorId;
      const currentUserId = user.id || user._id;
      return postAuthorId === currentUserId;
    });
  };
  
  const userFilteredPosts = getFilteredPostsByUser(posts);
  
  const {
    searchTerm,
    statusFilter,
    currentPage,
    filteredPosts,
    paginatedPosts,
    totalPages,
    indexOfFirstPost,
    indexOfLastPost,
    handleSearch,
    handleFilterChange,
    setCurrentPage
  } = usePostsFilter(userFilteredPosts);

  const handleCreatePost = () => {
    navigate('/dashboard/posts/create');
  };

  const postsStats = {
    total: userFilteredPosts.length,
    published: userFilteredPosts.filter(post => post.status === 'published').length,
    drafts: userFilteredPosts.filter(post => post.status === 'draft').length,
    scheduled: userFilteredPosts.filter(post => post.status === 'scheduled').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          <ModernPostsHeader 
            onCreatePost={handleCreatePost}
            stats={postsStats}
            title={showMyPosts ? 'My Posts' : 'All Posts'}
          />
          
          <PostsStats stats={postsStats} />
          
          <ModernPostsFilters 
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={handleFilterChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalItems={filteredPosts.length}
          />
          
          <ModernPostsGrid 
            loading={loading}
            posts={paginatedPosts}
            onDeletePost={deletePost}
            viewMode={viewMode}
          />
          
          <ModernPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            indexOfFirstPost={indexOfFirstPost}
            indexOfLastPost={indexOfLastPost}
            totalPosts={filteredPosts.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default PostsList;