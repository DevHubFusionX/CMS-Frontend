import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ onSearch, placeholder = "Search posts...", className = "" }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        setIsSearching(true);
        onSearch(query.trim()).finally(() => setIsSearching(false));
      } else {
        onSearch('');
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
      {isSearching && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;