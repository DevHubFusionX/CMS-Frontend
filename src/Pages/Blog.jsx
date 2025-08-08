import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { postsService } from '../Services';
import {
  BlogHeader,
  BlogHero,
  CategoryFilter,
  PostCard,
  LoadingSkeleton,
  EmptyState,
  Newsletter,
  BlogFooter
} from '../Components/Blog';

const Blog = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const refreshPosts = () => {
    queryClient.invalidateQueries(['posts']);
  };

  const { data: postsData, isLoading: loading, error } = useQuery({
    queryKey: ['posts', currentPage, selectedCategory, searchTerm],
    queryFn: () => postsService.getAllPosts(),
    select: (data) => {
      console.log('Posts API response:', data);
      return data.data || [];
    }
  });

  const posts = postsData || [];
  console.log('Rendered posts:', posts);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const truncateContent = (content, maxLength = 150) => {
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...'
      : textContent;
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--color-base-100)'}}>
      <BlogHeader />
      <BlogHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory}
          refreshPosts={refreshPosts} 
        />

        {loading ? (
          <LoadingSkeleton />
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard 
                key={post._id} 
                post={post} 
                formatDate={formatDate} 
                getReadingTime={getReadingTime} 
                truncateContent={truncateContent} 
              />
            ))}
          </div>
        ) : (
          <EmptyState setSearchTerm={setSearchTerm} setSelectedCategory={setSelectedCategory} />
        )}

        <Newsletter />
      </main>

      <BlogFooter />
    </div>

  );
};

export default Blog;