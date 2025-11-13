import DOMPurify from 'isomorphic-dompurify';

/**
 * Security utilities for sanitizing user-generated content from Sanity CMS
 * Prevents XSS attacks by sanitizing HTML and validating URLs
 */

// Configure DOMPurify with safe settings
const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'blockquote', 'code', 'pre', 'span'
  ],
  ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'class'],
  ALLOW_DATA_ATTR: false,
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
};

/**
 * Sanitize HTML content to prevent XSS attacks
 * Use this for any user-generated HTML content from Sanity
 */
export const sanitizeHTML = (dirty: string): string => {
  if (!dirty) return '';
  return DOMPurify.sanitize(dirty, PURIFY_CONFIG);
};

/**
 * Sanitize plain text - escapes HTML entities
 * Use this for rendering plain text that might contain malicious content
 */
export const sanitizeText = (text: string): string => {
  if (!text) return '';
  
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Validate and sanitize image URLs from Sanity
 * Ensures URLs are from trusted Sanity CDN or your domain
 */
export const validateImageUrl = (url: string | null): string | null => {
  if (!url) return null;
  
  try {
    const parsedUrl = new URL(url);
    
    // Only allow Sanity CDN and your domain
    const allowedHosts = [
      'cdn.sanity.io',
      'maitreecooperative.com',
      'www.maitreecooperative.com',
      'localhost'
    ];
    
    if (allowedHosts.some(host => parsedUrl.hostname.includes(host))) {
      return url;
    }
    
    console.warn('Blocked untrusted image URL:', url);
    return null;
  } catch (error) {
    console.error('Invalid URL:', url, error);
    return null;
  }
};

/**
 * Validate and sanitize PDF/file URLs from Sanity
 * Ensures URLs are from trusted Sanity CDN
 */
export const validateFileUrl = (url: string | null): string | null => {
  if (!url) return null;
  
  try {
    const parsedUrl = new URL(url);
    
    // Only allow Sanity CDN for file downloads
    if (parsedUrl.hostname === 'cdn.sanity.io') {
      return url;
    }
    
    console.warn('Blocked untrusted file URL:', url);
    return null;
  } catch (error) {
    console.error('Invalid file URL:', url, error);
    return null;
  }
};

/**
 * Sanitize link URLs to prevent javascript: and data: attacks
 */
export const sanitizeLinkUrl = (url: string): string => {
  if (!url) return '#';
  
  // Remove dangerous protocols
  const dangerous = /^(?:javascript|data|vbscript|file):/i;
  if (dangerous.test(url)) {
    console.warn('Blocked dangerous link URL:', url);
    return '#';
  }
  
  return DOMPurify.sanitize(url);
};

/**
 * Rate limiting helper for API endpoints (client-side tracking)
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const timestamps = this.attempts.get(key) || [];
    
    // Remove old timestamps outside the window
    const validTimestamps = timestamps.filter(
      timestamp => now - timestamp < this.windowMs
    );
    
    if (validTimestamps.length >= this.maxAttempts) {
      return false;
    }
    
    validTimestamps.push(now);
    this.attempts.set(key, validTimestamps);
    return true;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

export default {
  sanitizeHTML,
  sanitizeText,
  validateImageUrl,
  validateFileUrl,
  sanitizeLinkUrl,
  RateLimiter
};
