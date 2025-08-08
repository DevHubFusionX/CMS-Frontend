import React, { useState } from 'react';
import { sanitizeHTML } from '../../Utils/contentSanitizer';
import api from '../../Services/api';

const AIAssistant = ({ onContentGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const response = await api.post('/ai/generate-content', { 
        prompt: prompt + ' (Please format the response with proper HTML tags for headings, paragraphs, lists, and code blocks)'
      });
      const aiContent = response.data.content;
      
      const title = extractTitle(prompt);
      const htmlContent = convertToHTML(aiContent);
      const generatedContent = {
        title,
        content: sanitizeHTML(htmlContent),
        excerpt: generateExcerpt(htmlContent),
        slug: generateSlug(title),
        focusKeyword: extractKeyword(prompt),
        metaDescription: generateMetaDescription(title, htmlContent),
        tags: generateTags(prompt, title)
      };
      
      onContentGenerated(generatedContent);
      setPrompt('');
    } catch (error) {
      console.error('AI generation failed:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };



  const extractTitle = (prompt) => {
    const patterns = [
      /write about (.+?)(?:\.|$)/i,
      /create (.+?)(?:\.|$)/i,
      /blog post about (.+?)(?:\.|$)/i,
      /article about (.+?)(?:\.|$)/i,
      /post about (.+?)(?:\.|$)/i,
      /guide (?:on|to|about) (.+?)(?:\.|$)/i,
      /tutorial (?:on|for|about) (.+?)(?:\.|$)/i,
      /(.+?)(?:\s+guide|\s+tutorial|\s+tips|\s+strategies)?(?:\.|$)/i
    ];
    
    for (const pattern of patterns) {
      const match = prompt.match(pattern);
      if (match && match[1].trim()) {
        return match[1].trim().charAt(0).toUpperCase() + match[1].trim().slice(1);
      }
    }
    
    // Fallback: use first few words of prompt
    const words = prompt.trim().split(' ').slice(0, 5);
    return words.length > 0 ? 
      words.join(' ').charAt(0).toUpperCase() + words.join(' ').slice(1) :
      'New Blog Post';
  };



  const generateExcerpt = (content) => {
    const firstParagraph = content.match(/<p>(.*?)<\/p>/)?.[1];
    return firstParagraph ? firstParagraph.substring(0, 150) + '...' : '';
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const extractKeyword = (prompt) => {
    const keywords = prompt.toLowerCase()
      .replace(/write about|create|blog post about|article about|guide|tutorial/gi, '')
      .trim()
      .split(' ')
      .slice(0, 2)
      .join(' ');
    return keywords || 'blog';
  };

  const generateMetaDescription = (title, content) => {
    const plainText = content.replace(/<[^>]*>/g, '');
    const firstSentence = plainText.split('.')[0];
    return firstSentence.length > 160 ? 
      firstSentence.substring(0, 157) + '...' : 
      firstSentence + '.';
  };

  const generateTags = (prompt, title) => {
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'about', 'write', 'create', 'blog', 'post', 'article', 'guide', 'tutorial'];
    const words = (prompt + ' ' + title).toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(' ')
      .filter(word => word.length > 2 && !commonWords.includes(word))
      .slice(0, 5);
    return [...new Set(words)];
  };

  const convertToHTML = (content) => {
    if (!content) return '';
    
    // If already HTML, return as is
    if (content.includes('<p>') || content.includes('<h1>') || content.includes('<h2>')) {
      return content;
    }
    
    let html = '';
    const sections = content.split('\n\n');
    
    for (let section of sections) {
      const trimmed = section.trim();
      if (!trimmed) continue;
      
      // Skip code blocks and programming examples
      if (trimmed.includes('def ') || trimmed.includes('function ') || 
          trimmed.includes('class ') || trimmed.includes('import ') ||
          trimmed.includes('print(') || trimmed.includes('console.log') ||
          trimmed.includes('return ') || trimmed.includes('// ') ||
          trimmed.includes('# ') || trimmed.includes('```') ||
          /^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*=/.test(trimmed) ||
          trimmed.includes('Example of') && (trimmed.includes('script') || trimmed.includes('code'))) {
        continue;
      }
      
      // Handle headings (lines ending with colon or standalone titles)
      if ((trimmed.endsWith(':') || trimmed.match(/^[A-Z][^.!?]*$/)) && trimmed.length < 100 && !trimmed.includes('\n')) {
        html += `<h2>${trimmed.replace(':', '')}</h2>`;
        continue;
      }
      
      // Handle blockquotes
      if (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.includes('-')) {
        html += `<blockquote><p>${trimmed}</p></blockquote>`;
        continue;
      }
      
      // Handle lists (multiple lines with colons)
      if (trimmed.includes('\n') && trimmed.split('\n').filter(line => line.includes(':')).length > 1) {
        const lines = trimmed.split('\n').filter(line => line.trim());
        html += '<ul>';
        for (let line of lines) {
          if (line.includes(':')) {
            const [key, ...value] = line.split(':');
            html += `<li><strong>${key.trim()}:</strong> ${value.join(':').trim()}</li>`;
          }
        }
        html += '</ul>';
        continue;
      }
      
      // Regular paragraphs
      html += `<p>${trimmed}</p>`;
    }
    
    return html;
  };

  return (
    <div className="ai-assistant border rounded-lg p-4 mb-6" style={{
      backgroundColor: 'var(--color-base-200)',
      borderColor: 'var(--color-base-300)'
    }}>
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{
          background: 'var(--color-primary)'
        }}>
          <span className="text-white text-sm">✨</span>
        </div>
        <h3 className="font-semibold" style={{color: 'var(--color-base-content)'}}>
          AI Writing Assistant
        </h3>
      </div>
      
      <div className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to write about... (e.g., 'Write about digital marketing strategies')"
          className="w-full p-3 border rounded-lg resize-none"
          style={{
            backgroundColor: 'var(--color-base-100)',
            borderColor: 'var(--color-base-300)',
            color: 'var(--color-base-content)'
          }}
          rows={3}
          disabled={isGenerating}
        />
        
        <div className="flex gap-2">
          <button
            onClick={generateContent}
            disabled={!prompt.trim() || isGenerating}
            className="px-4 py-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-content)'
            }}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <span>✨</span>
                Generate Content
              </>
            )}
          </button>
          
          <button
            onClick={() => setPrompt('')}
            className="px-4 py-2 border rounded-lg"
            style={{
              borderColor: 'var(--color-base-300)',
              color: 'var(--color-base-content)',
              backgroundColor: 'var(--color-base-100)'
            }}
          >
            Clear
          </button>
        </div>
      </div>
      
      <div className="mt-3 text-sm opacity-70" style={{color: 'var(--color-base-content)'}}>
        💡 Try prompts like: "Write about sustainable business practices", "Create a guide on remote work productivity"
      </div>
    </div>
  );
};

export default AIAssistant;