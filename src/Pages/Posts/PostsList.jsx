import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Services/AuthContext';
import { useTheme } from '../../Context/ThemeContext';
import ModernPostsHeader from './components/ModernPostsHeader';
import ModernPostsFilters from './components/ModernPostsFilters';
import ModernPostsGrid from './components/ModernPostsGrid';
import ModernPagination from './components/ModernPagination';
import PostsStats from './components/PostsStats';
import { usePosts } from './hooks/usePosts';
import { usePostsFilter } from './hooks/usePostsFilter';
import SearchBar from '../../Components/Search/SearchBar';
import { postsService } from '../../Services/postsService';

const PostsList = ({ showMyPosts = false }) => {
  const navigate = useNavigate();
  const { posts, loading, deletePost, refetch } = usePosts();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState('grid');
  
  // Filter posts for current user if showMyPosts is true
  const getFilteredPostsByUser = (allPosts) => {
    if (!showMyPosts || !user) return allPosts;
    
    return allPosts.filter(post => {
      const postAuthorId = post.authorId;
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

  const handleSearchPosts = async (query) => {
    if (query) {
      try {
        const response = await postsService.searchPosts(query);
        return response;
      } catch (error) {
        console.error('Search failed:', error);
      }
    }
    return Promise.resolve();
  };

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
    <div className="min-h-screen" style={{
      background: `linear-gradient(135deg, var(--color-base-100) 0%, var(--color-base-200) 100%)`
    }}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20" style={{
          background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
        }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20" style={{
          background: `linear-gradient(135deg, var(--color-secondary) 0%, var(--color-accent) 100%)`,
          animationDelay: '2s'
        }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20" style={{
          background: `linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)`,
          animationDelay: '4s'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
            onDuplicatePost={refetch}
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