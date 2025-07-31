import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { postsService } from '../../../Services/postsService';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await postsService.searchPosts(query);
      setSearchResults(response.data || []);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Debounce search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  const handleResultClick = (post) => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchFocused(false);
    navigate(`/dashboard/posts/edit/${post._id}`);
  };

  return (
    <div className="flex-1 max-w-lg mx-4 hidden sm:block">
      <form onSubmit={handleSearch} className="relative group">
        <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors duration-200`} 
             style={{color: isSearchFocused ? 'var(--color-primary)' : 'var(--color-base-content)'}}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          placeholder="Search posts, users, or content..."
          className={`w-full py-3 pl-12 pr-12 rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm border ${
            isSearchFocused ? 'shadow-lg scale-105' : 'hover:shadow-md'
          }`}
          style={{
            backgroundColor: 'var(--color-base-200)',
            borderColor: isSearchFocused ? 'var(--color-primary)' : 'var(--color-base-300)',
            color: 'var(--color-base-content)',
            boxShadow: isSearchFocused ? '0 0 0 3px rgba(var(--color-primary), 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-4 transition-colors duration-200"
            style={{color: 'var(--color-base-content)'}}
            onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--color-base-content)'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {isSearchFocused && searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-xl backdrop-blur-sm z-50 border max-h-96 overflow-y-auto" style={{
            backgroundColor: 'var(--color-base-200)', 
            borderColor: 'var(--color-base-300)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
          }}>
            {isSearching ? (
              <div className="p-4 text-sm flex items-center gap-2" style={{color: 'var(--color-base-content)'}}>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2" style={{borderColor: 'var(--color-primary)'}}></div>
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="py-2">
                {searchResults.slice(0, 5).map((post) => (
                  <button
                    key={post._id}
                    onClick={() => handleResultClick(post)}
                    className="w-full text-left px-4 py-3 hover:bg-opacity-50 transition-colors duration-200 border-b last:border-b-0"
                    style={{
                      borderColor: 'var(--color-base-300)',
                      ':hover': { backgroundColor: 'var(--color-base-300)' }
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-base-300)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <div className="font-medium text-sm" style={{color: 'var(--color-base-content)'}}>
                      {post.title}
                    </div>
                    <div className="text-xs mt-1" style={{color: 'var(--color-base-content)', opacity: 0.7}}>
                      {post.status} • {post.author?.name}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-sm" style={{color: 'var(--color-base-content)', opacity: 0.7}}>
                No posts found for "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;