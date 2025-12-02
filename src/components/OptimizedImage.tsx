import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { 
  getOptimizedImageUrl, 
  getImageSrcSet, 
  IMAGE_SIZES,
} from '@/lib/sanity';

type ImageSizePreset = keyof typeof IMAGE_SIZES;

interface OptimizedImageProps {
  /** Sanity image object */
  image: any;
  /** Alt text for accessibility */
  alt: string;
  /** CSS class names */
  className?: string;
  /** Size preset for quick sizing */
  preset?: keyof typeof IMAGE_SIZES;
  /** Custom width (overrides preset) */
  width?: number;
  /** Custom height (overrides preset) */
  height?: number;
  /** Image quality 1-100 (default: 80) */
  quality?: number;
  /** Responsive sizes attribute */
  sizes?: string;
  /** Custom widths for srcset */
  srcsetWidths?: number[];
  /** Loading strategy */
  loading?: 'lazy' | 'eager';
  /** Priority hint for LCP images */
  priority?: boolean;
  /** Placeholder while loading */
  placeholder?: 'blur' | 'empty';
  /** Fallback image URL if image fails to load */
  fallback?: string;
  /** Callback when image loads */
  onLoad?: () => void;
  /** Callback when image fails to load */
  onError?: () => void;
  /** Object fit style */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Aspect ratio (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string;
}

/**
 * OptimizedImage Component
 * 
 * Renders optimized images from Sanity with:
 * - WebP format for ~60% size reduction
 * - Responsive srcset for different screen sizes
 * - Lazy loading by default
 * - Blur placeholder option
 * - Error handling with fallback
 * 
 * Usage:
 * ```tsx
 * <OptimizedImage 
 *   image={sanityImage} 
 *   alt="Description" 
 *   preset="card"
 *   sizes="(max-width: 768px) 100vw, 50vw"
 * />
 * ```
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  image,
  alt,
  className,
  preset = 'medium',
  width,
  height,
  quality = 80,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  srcsetWidths = [400, 800, 1200, 1600],
  loading = 'lazy',
  priority = false,
  placeholder = 'empty',
  fallback,
  onLoad,
  onError,
  objectFit = 'cover',
  aspectRatio,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Get dimensions from preset or custom values
  const dimensions = IMAGE_SIZES[preset];
  const finalWidth = width || dimensions?.width || 800;
  const finalHeight = height || dimensions?.height;

  // Generate optimized URLs
  const src = getOptimizedImageUrl(image, {
    width: finalWidth,
    height: finalHeight,
    quality,
    format: 'webp',
  });

  const srcSet = getImageSrcSet(image, srcsetWidths, { quality });

  // Generate blur placeholder URL (tiny version)
  const blurUrl = placeholder === 'blur' 
    ? getOptimizedImageUrl(image, { width: 20, quality: 30, format: 'webp' })
    : null;

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // If no image or error with no fallback, return null
  if (!image && !fallback) return null;
  if (hasError && !fallback) return null;

  const imageSrc = hasError && fallback ? fallback : src;

  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        aspectRatio && `aspect-[${aspectRatio}]`,
        className
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && blurUrl && !isLoaded && (
        <img
          src={blurUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
        />
      )}

      {/* Main image */}
      <img
        src={imageSrc || ''}
        srcSet={!hasError ? srcSet : undefined}
        sizes={!hasError ? sizes : undefined}
        alt={alt}
        loading={priority ? 'eager' : loading}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          `object-${objectFit}`,
          isLoaded ? 'opacity-100' : 'opacity-0',
          !aspectRatio && 'w-full h-full'
        )}
        style={{
          objectFit,
        }}
      />

      {/* Loading skeleton */}
      {!isLoaded && placeholder === 'empty' && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default OptimizedImage;

// Re-export types for convenience
export type { OptimizedImageProps };
export type ImageSizePreset = keyof typeof IMAGE_SIZES;
