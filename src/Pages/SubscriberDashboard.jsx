import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Services';
import { usePosts } from '../Services/PostsContext';
import { useCategories } from '../Services/CategoriesContext';
import SubscriberNavigation from '../Components/Dashboard/SubscriberNavigation';
import WelcomeSection from '../Components/Dashboard/WelcomeSection';
import SearchAndFilters from '../Components/Dashboard/SearchAndFilters';
import ArticlesList from '../Components/Dashboard/ArticlesList';
import { HiBookmark, HiClock, HiBell, HiUser } from 'react-icons/hi';

const SubscriberDashboard = () => {
  const { user, logout } = useAuth();
  const postsContext = usePosts();
  const categoriesContext = useCategories();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');


  const posts = postsContext?.posts || [];
  const loading = postsContext?.loading || false;
  const categories = categoriesContext?.categories || [];

  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [readingHistory, setReadingHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('recent');

  useEffect(() => {
    // Load user preferences from localStorage
    const savedBookmarks = localStorage.getItem(`bookmarks_${user?.id}`);
    const savedHistory = localStorage.getItem(`history_${user?.id}`);
    
    if (savedBookmarks) {
      setBookmarkedPosts(new Set(JSON.parse(savedBookmarks)));
    }
    if (savedHistory) {
      setReadingHistory(JSON.parse(savedHistory));
    }
  }, [user?.id]);

  const toggleBookmark = (postId) => {
    const newBookmarks = new Set(bookmarkedPosts);
    if (newBookmarks.has(postId)) {
      newBookmarks.delete(postId);
    } else {
      newBookmarks.add(postId);
    }
    setBookmarkedPosts(newBookmarks);
    localStorage.setItem(`bookmarks_${user?.id}`, JSON.stringify([...newBookmarks]));
  };

  const addToHistory = (post) => {
    const newHistory = [post, ...readingHistory.filter(p => p._id !== post._id)].slice(0, 10);
    setReadingHistory(newHistory);
    localStorage.setItem(`history_${user?.id}`, JSON.stringify(newHistory));
  };

  const publishedPosts = posts.filter(post => post?.status === 'published');
  const recentPosts = publishedPosts.slice(0, 6);
  const bookmarkedPostsList = publishedPosts.filter(post => bookmarkedPosts.has(post._id));
  const recentlyRead = readingHistory.slice(0, 3);

  const filteredPosts = publishedPosts.filter(post => {
    const matchesSearch = post?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post?.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                           post?.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-base-100)', color: 'var(--color-base-content)' }}
    >
      <SubscriberNavigation user={user} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <WelcomeSection user={user} />

            <SearchAndFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6">
              {[
                { id: 'recent', label: 'Recent Posts', icon: HiClock },
                { id: 'bookmarks', label: 'My Bookmarks', icon: HiBookmark },
                { id: 'history', label: 'Reading History', icon: HiBell }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id ? 'shadow-md' : 'hover:shadow-sm'
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-base-200)',
                    color: activeTab === tab.id ? 'var(--color-primary-content)' : 'var(--color-base-content)'
                  }}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content based on active tab */}
            {activeTab === 'recent' && (
              <ArticlesList 
                posts={searchTerm || selectedCategory !== 'All' ? filteredPosts : recentPosts}
                loading={loading}
                title="Recent Articles"
                onPostClick={addToHistory}
                bookmarkedPosts={bookmarkedPosts}
                onToggleBookmark={toggleBookmark}
              />
            )}
            
            {activeTab === 'bookmarks' && (
              <ArticlesList 
                posts={bookmarkedPostsList}
                loading={false}
                title="My Bookmarked Posts"
                onPostClick={addToHistory}
                bookmarkedPosts={bookmarkedPosts}
                onToggleBookmark={toggleBookmark}
                emptyMessage="No bookmarked posts yet. Start bookmarking posts you want to read later!"
              />
            )}
            
            {activeTab === 'history' && (
              <ArticlesList 
                posts={readingHistory}
                loading={false}
                title="Reading History"
                onPostClick={addToHistory}
                bookmarkedPosts={bookmarkedPosts}
                onToggleBookmark={toggleBookmark}
                emptyMessage="No reading history yet. Start reading some posts!"
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div 
              className="p-4 rounded-xl shadow-lg"
              style={{ 
                backgroundColor: 'var(--color-base-200)',
                background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
              }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-content)'
                }}>
                  <HiUser className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--color-base-content)' }}>
                    {user?.name || 'Subscriber'}
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--color-base-content)', opacity: 0.7 }}>
                    {user?.role?.name || 'subscriber'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: 'var(--color-base-100)' }}>
                  <div className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>
                    {bookmarkedPosts.size}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--color-base-content)', opacity: 0.7 }}>
                    Bookmarks
                  </div>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: 'var(--color-base-100)' }}>
                  <div className="text-lg font-bold" style={{ color: 'var(--color-secondary)' }}>
                    {readingHistory.length}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--color-base-content)', opacity: 0.7 }}>
                    Read Posts
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div 
              className="p-4 rounded-xl shadow-lg"
              style={{ 
                backgroundColor: 'var(--color-base-200)',
                background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
              }}
            >
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--color-base-content)' }}
              >
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full p-3 rounded-lg text-left transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: 'var(--color-base-100)' }}
                >
                  <div className="flex items-center space-x-3">
                    <HiUser className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--color-base-content)' }}>
                      Edit Profile
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('bookmarks')}
                  className="w-full p-3 rounded-lg text-left transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: 'var(--color-base-100)' }}
                >
                  <div className="flex items-center space-x-3">
                    <HiBookmark className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--color-base-content)' }}>
                      View Bookmarks ({bookmarkedPosts.size})
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriberDashboard;