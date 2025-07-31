import React, { useState, useEffect } from 'react';

/**
 * SEOPanel component provides SEO analysis and recommendations for content
 * Works alongside the TinyMCE editor with theme support
 */
const SEOPanel = ({ content, title, keyword }) => {
  const [seoScore, setSeoScore] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (!content || !keyword) return;
    
    // Debounce analysis to prevent excessive calculations
    const timer = setTimeout(() => {
      analyzeSEO(content, title, keyword);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [content, title, keyword]);

  const analyzeSEO = (content, title, keyword) => {
    setIsAnalyzing(true);
    
    // Basic SEO analysis logic
    const plainText = content.replace(/<[^>]*>/g, '');
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    const keywordCount = (plainText.match(new RegExp(keyword, 'gi')) || []).length;
    const keywordDensity = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;
    
    // Calculate score and generate recommendations
    let score = 0;
    const seoRecommendations = [];
    
    // Word count check
    if (wordCount < 300) {
      seoRecommendations.push({
        type: 'warning',
        message: 'Content is too short. Aim for at least 300 words.'
      });
    } else {
      score += 20;
    }
    
    // Keyword in title
    if (title && title.toLowerCase().includes(keyword.toLowerCase())) {
      score += 15;
    } else {
      seoRecommendations.push({
        type: 'warning',
        message: 'Add your focus keyword to the title.'
      });
    }
    
    // Keyword density check
    if (keywordDensity < 0.5) {
      seoRecommendations.push({
        type: 'warning',
        message: 'Keyword density is too low. Try to include your keyword more often.'
      });
    } else if (keywordDensity > 2.5) {
      seoRecommendations.push({
        type: 'warning',
        message: 'Keyword density is too high. This might be seen as keyword stuffing.'
      });
    } else {
      score += 25;
    }
    
    // Headings check
    const hasH1 = content.includes('<h1');
    const hasH2 = content.includes('<h2');
    
    if (!hasH1) {
      seoRecommendations.push({
        type: 'warning',
        message: 'No H1 heading found. Consider adding a main heading.'
      });
    } else {
      score += 15;
    }
    
    if (!hasH2) {
      seoRecommendations.push({
        type: 'warning',
        message: 'No H2 headings found. Consider adding subheadings to structure your content.'
      });
    } else {
      score += 15;
    }
    
    // Image alt text check
    const imgTags = content.match(/<img[^>]*>/g) || [];
    const imgWithAlt = content.match(/<img[^>]*alt="[^"]*"[^>]*>/g) || [];
    
    if (imgTags.length > 0 && imgWithAlt.length < imgTags.length) {
      seoRecommendations.push({
        type: 'warning',
        message: 'Some images are missing alt text. Add descriptive alt text to all images.'
      });
    } else if (imgTags.length > 0) {
      score += 10;
    }
    
    // Set final score and recommendations
    setSeoScore(score);
    setRecommendations(seoRecommendations);
    setIsAnalyzing(false);
  };

  return (
    <div className="seo-panel rounded-md p-4 border" style={{
      backgroundColor: 'var(--color-base-200)',
      borderColor: 'var(--color-base-300)',
      color: 'var(--color-base-content)'
    }}>
      <h3 className="text-lg font-medium mb-2">SEO Analysis</h3>
      
      {isAnalyzing ? (
        <div className="text-center py-4">Analyzing content...</div>
      ) : (
        <>
          <div className="seo-score mb-4">
            <div className="flex items-center justify-between">
              <span>SEO Score:</span>
              <span className="font-bold" style={{
                color: seoScore >= 70 ? 'var(--color-success)' : 
                       seoScore >= 40 ? 'var(--color-warning)' : 'var(--color-error)'
              }}>
                {seoScore}/100
              </span>
            </div>
            <div className="w-full rounded-full h-2 mt-1" style={{
              backgroundColor: 'var(--color-base-300)'
            }}>
              <div 
                className="h-2 rounded-full"
                style={{ 
                  width: `${seoScore}%`,
                  backgroundColor: seoScore >= 70 ? 'var(--color-success)' : 
                                 seoScore >= 40 ? 'var(--color-warning)' : 'var(--color-error)'
                }}
              ></div>
            </div>
          </div>
          
          <div className="recommendations">
            <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
            {recommendations.length === 0 ? (
              <p className="text-sm" style={{color: 'var(--color-success)'}}>Great job! Your content is well-optimized.</p>
            ) : (
              <ul className="space-y-2">
                {recommendations.map((rec, index) => (
                  <li key={index} className="text-sm flex items-start">
                    <span className="mr-2" style={{
                      color: rec.type === 'warning' ? 'var(--color-warning)' : 'var(--color-error)'
                    }}>
                      {rec.type === 'warning' ? '⚠️' : '❌'}
                    </span>
                    <span>{rec.message}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SEOPanel;