import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { postsService, useAuth } from '../Services';

const BlogPost = () => {
  const { slug } = useParams();
  
  const { data: post, isLoading: loading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => postsService.getPostBySlug(slug),
    select: (data) => data.data,
    enabled: !!slug
  });

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

  const formatContent = (content) => {
    if (!content) return '';
    
    // If content already has HTML tags, return as is
    if (content.includes('<p>') || content.includes('<h1>') || content.includes('<h2>') || content.includes('<div>')) {
      return content;
    }
    
    // Handle multi-line code blocks first
    let processedContent = content;
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const codeBlocks = [];
    let match;
    
    // Extract code blocks and replace with placeholders
    while ((match = codeBlockRegex.exec(content)) !== null) {
      const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
      codeBlocks.push(match[1].trim());
      processedContent = processedContent.replace(match[0], placeholder);
    }
    
    // Convert plain text to HTML with better formatting
    let result = processedContent
      .split('\n')
      .map(line => {
        const trimmed = line.trim();
        if (trimmed === '') return '<br>';
        
        // Check for code block placeholders
        if (trimmed.includes('__CODE_BLOCK_')) {
          const blockIndex = parseInt(trimmed.match(/__CODE_BLOCK_(\d+)__/)[1]);
          return `<pre><code>${codeBlocks[blockIndex]}</code></pre>`;
        }
        
        // Handle different heading levels
        if (trimmed.match(/^#{3}\s+/)) {
          return `<h3>${trimmed.replace(/^#{3}\s+/, '')}</h3>`;
        }
        if (trimmed.match(/^#{2}\s+/)) {
          return `<h2>${trimmed.replace(/^#{2}\s+/, '')}</h2>`;
        }
        if (trimmed.match(/^#{1}\s+/)) {
          return `<h1>${trimmed.replace(/^#{1}\s+/, '')}</h1>`;
        }
        
        // Handle bullet points
        if (trimmed.match(/^[-*+]\s+/)) {
          return `<li>${trimmed.replace(/^[-*+]\s+/, '')}</li>`;
        }
        
        // Handle numbered lists
        if (trimmed.match(/^\d+\.\s+/)) {
          return `<li>${trimmed.replace(/^\d+\.\s+/, '')}</li>`;
        }
        
        // Handle blockquotes
        if (trimmed.startsWith('>')) {
          return `<blockquote>${trimmed.replace(/^>\s*/, '')}</blockquote>`;
        }
        
        // Skip code block handling here as it's handled above
        
        // Handle images
        if (trimmed.match(/!\[.*?\]\(.*?\)/)) {
          const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
          return `<img src="${match[2]}" alt="${match[1]}" />`;
        }
        
        // Handle links
        if (trimmed.match(/\[.*?\]\(.*?\)/)) {
          return trimmed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
        }
        
        // Handle horizontal rules
        if (trimmed.match(/^---+$/) || trimmed.match(/^\*\*\*+$/)) {
          return '<hr>';
        }
        
        // Handle bold and italic text
        let formatted = trimmed
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/__(.*?)__/g, '<strong>$1</strong>')
          .replace(/_(.*?)_/g, '<em>$1</em>');
        
        // Regular paragraphs
        return `<p>${formatted}</p>`;
      })
      .join('');
    
    // Post-process to fix lists and clean up
    return result
      .replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>') // Wrap consecutive li elements in ul
      .replace(/<\/ul>\s*<ul>/g, '') // Remove duplicate ul tags
      .replace(/<br><br>/g, '<br>'); // Clean up extra breaks
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-base-100)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse">
            <div className="h-8 mb-4" style={{ backgroundColor: 'var(--color-base-300)', borderRadius: 'var(--radius-box)' }}></div>
            <div className="h-64 mb-8" style={{ backgroundColor: 'var(--color-base-300)', borderRadius: 'var(--radius-box)' }}></div>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-4" style={{ backgroundColor: 'var(--color-base-300)', borderRadius: 'var(--radius-box)' }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-base-100)' }}>
        <div className="text-center">
          <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--color-base-200)', borderRadius: 'var(--radius-box)' }}>
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-base-content)', opacity: '0.5' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-base-content)' }}>Post Not Found</h1>
          <p className="mb-6" style={{ color: 'var(--color-base-content)', opacity: '0.7' }}>The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="px-6 py-3 transition-colors" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-content)', borderRadius: 'var(--radius-box)' }}>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-base-100)' }}>
      {/* Header */}
      <header className="backdrop-blur-md border-b sticky top-0 z-50" style={{ backgroundColor: 'var(--color-base-100)', borderColor: 'var(--color-base-300)', opacity: '0.95' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/blog" className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center font-bold" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-content)', borderRadius: 'var(--radius-box)' }}>
                F
              </div>
              <span className="text-xl font-bold" style={{ color: 'var(--color-base-content)' }}>FusionX Blog</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="transition-colors" style={{ color: 'var(--color-base-content)', opacity: '0.7' }}>Home</Link>
              <Link to="/blog" className="transition-colors" style={{ color: 'var(--color-base-content)', opacity: '0.7' }}>Blog</Link>
              {useAuth().user ? (
                <Link to="/dashboard" className="px-4 py-2 transition-colors" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-content)', borderRadius: 'var(--radius-box)' }}>
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="transition-colors" style={{ color: 'var(--color-base-content)', opacity: '0.7' }}>Sign In</Link>
                  <Link to="/register" className="px-4 py-2 transition-colors" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-content)', borderRadius: 'var(--radius-box)' }}>
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm" style={{ color: 'var(--color-base-content)', opacity: '0.6' }}>
            <Link to="/blog" className="transition-colors hover:opacity-100" style={{ color: 'var(--color-base-content)', opacity: '0.7' }}>Blog</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span style={{ color: 'var(--color-base-content)' }}>{post.title}</span>
          </div>
        </nav>

        <article className="max-w-none">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-12 -mx-6">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
                style={{border: '1px solid var(--color-base-300)'}}
              />
            </div>
          )}
          
          {/* Article Header */}
          <header className="mb-10">
            {/* Category */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-content)' }}>
                {post.categories?.[0]?.name || 'Article'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold mb-6 leading-tight" style={{ color: 'var(--color-base-content)' }}>
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 p-6 rounded-xl border-l-4" style={{ 
              backgroundColor: 'var(--color-base-200)', 
              borderColor: 'var(--color-accent)'
            }}>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 flex items-center justify-center font-medium rounded-full" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-content)' }}>
                  {post.author?.name?.charAt(0) || 'A'}
                </div>
                <div>
                  <div className="font-semibold" style={{ color: 'var(--color-base-content)' }}>{post.author?.name || 'Anonymous'}</div>
                  <div className="text-sm" style={{ color: 'var(--color-base-content)', opacity: '0.6' }}>Author</div>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm" style={{ color: 'var(--color-base-content)', opacity: '0.7' }}>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(post.createdAt)}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {getReadingTime(post.content)} min read
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-xl max-w-none leading-relaxed" style={{
            color: 'var(--color-base-content)',
            '--tw-prose-headings': 'var(--color-base-content)',
            '--tw-prose-body': 'var(--color-base-content)',
            '--tw-prose-links': 'var(--color-primary)',
            '--tw-prose-code': 'var(--color-base-content)',
            '--tw-prose-pre-code': 'var(--color-base-content)',
            '--tw-prose-pre-bg': 'var(--color-base-200)',
            '--tw-prose-quotes': 'var(--color-base-content)',
            '--tw-prose-quote-borders': 'var(--color-accent)',
            lineHeight: '1.8'
          }}>
            <div dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
          </div>

          {/* Tags & Categories */}
          {((post.categories && post.categories.length > 0) || (post.tags && post.tags.length > 0)) && (
            <footer className="mt-16 pt-8">
              <div className="p-6 rounded-2xl" style={{
                backgroundColor: 'var(--color-base-200)',
                border: '1px solid var(--color-base-300)'
              }}>
                <div className="grid md:grid-cols-2 gap-6">
                  {post.categories && post.categories.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center" style={{color: 'var(--color-base-content)'}}>
                        <span className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: 'var(--color-secondary)'}}></span>
                        Categories
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {post.categories.map((category, index) => (
                          <span 
                            key={index} 
                            className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                            style={{
                              backgroundColor: 'var(--color-secondary)',
                              color: 'var(--color-secondary-content)',
                              boxShadow: '0 2px 4px rgb(0 0 0 / 0.1)'
                            }}
                          >
                            {category.name || category}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {post.tags && post.tags.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center" style={{color: 'var(--color-base-content)'}}>
                        <span className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: 'var(--color-accent)'}}></span>
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {post.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                            style={{
                              backgroundColor: 'var(--color-accent)',
                              color: 'var(--color-accent-content)',
                              boxShadow: '0 2px 4px rgb(0 0 0 / 0.1)'
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </footer>
          )}
        </article>

        {/* Share & Navigation */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--color-base-300)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-base-content)' }}>Share this article</h3>
              <div className="flex space-x-3">
                <button className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110 rounded-full" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-content)' }}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110 rounded-full" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-secondary-content)' }}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110 rounded-full" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-content)' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <Link 
              to="/blog"
              className="inline-flex items-center px-6 py-3 font-medium transition-all duration-200 hover:scale-105 rounded-xl"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-content)', boxShadow: '0 4px 6px rgb(0 0 0 / 0.1)' }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;