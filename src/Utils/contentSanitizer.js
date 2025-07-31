// Content sanitizer for AI-generated HTML
export const sanitizeHTML = (html) => {
  // Remove dangerous tags and attributes
  const dangerousTags = /<(script|iframe|embed|object|applet|form|input|button)[^>]*>.*?<\/\1>|<(script|iframe|embed|object|applet|form|input|button)[^>]*\/?>|<\/?(script|iframe|embed|object|applet|form|input|button)[^>]*>/gi;
  const dangerousAttributes = /\s(on\w+|style|javascript:|data:)\s*=\s*["'][^"']*["']/gi;
  
  let sanitized = html
    .replace(dangerousTags, '')
    .replace(dangerousAttributes, '');
  
  // Ensure proper structure
  sanitized = ensureProperStructure(sanitized);
  
  return sanitized;
};

const ensureProperStructure = (html) => {
  // Wrap standalone text in paragraphs
  let structured = html.replace(/^([^<\n]+)$/gm, '<p>$1</p>');
  
  // Ensure headings are properly formatted
  structured = structured.replace(/<h([1-6])([^>]*)>([^<]+)<\/h\1>/gi, '<h$1$2>$3</h$1>');
  
  // Ensure paragraphs are properly closed
  structured = structured.replace(/<p([^>]*)>([^<]*(?:<(?!\/p>)[^<]*)*)<\/p>/gi, '<p$1>$2</p>');
  
  return structured;
};

export const validateHTMLStructure = (html) => {
  const errors = [];
  
  // Check for proper heading hierarchy
  const headings = html.match(/<h([1-6])[^>]*>/gi);
  if (headings) {
    let lastLevel = 0;
    headings.forEach((heading, index) => {
      const level = parseInt(heading.match(/h([1-6])/i)[1]);
      if (index === 0 && level !== 1) {
        errors.push('Content should start with an h1 tag');
      }
      if (level > lastLevel + 1) {
        errors.push(`Heading hierarchy skip detected: h${lastLevel} to h${level}`);
      }
      lastLevel = level;
    });
  }
  
  // Check for unclosed tags
  const openTags = html.match(/<[^\/][^>]*>/g) || [];
  const closeTags = html.match(/<\/[^>]*>/g) || [];
  
  if (openTags.length !== closeTags.length) {
    errors.push('Mismatched HTML tags detected');
  }
  
  return errors;
};