import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { validateImageUrl, validateFileUrl } from './security'

// Create the Sanity client for read operations
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'w4d9v3bc',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: import.meta.env.PROD, // Use CDN in production, false in development
  apiVersion: '2024-01-01',
  token: undefined, // No token for read operations - NEVER expose write tokens in frontend
})

// Set up image URL builder
const builder = imageUrlBuilder(client)

// Helper function to generate image URLs
export const urlFor = (source: any) => {
  return builder.image(source)
}

// ============================================
// OPTIMIZED IMAGE UTILITIES (~60% size reduction)
// ============================================

// Image size presets for different use cases
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 400, height: 300 },
  medium: { width: 800, height: 600 },
  large: { width: 1200, height: 900 },
  hero: { width: 1920, height: 1080 },
  avatar: { width: 80, height: 80 },
  card: { width: 600, height: 400 },
} as const;

type ImageSizePreset = keyof typeof IMAGE_SIZES;

interface OptimizedImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png' | 'auto';
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
}

/**
 * Generate optimized image URL with WebP format and custom dimensions
 * Reduces image size by ~60% compared to unoptimized images
 */
export const getOptimizedImageUrl = (
  photoObject: any,
  options: OptimizedImageOptions = {}
): string | null => {
  if (!photoObject) return null;

  const {
    width = 800,
    height,
    quality = 80,
    format = 'webp',
    fit = 'max'
  } = options;

  try {
    let imageBuilder = urlFor(photoObject);
    
    // Apply transformations
    imageBuilder = imageBuilder.width(width);
    if (height) imageBuilder = imageBuilder.height(height);
    imageBuilder = imageBuilder.quality(quality);
    imageBuilder = imageBuilder.format(format);
    imageBuilder = imageBuilder.fit(fit);
    // Enable automatic format selection for browsers that support it
    imageBuilder = imageBuilder.auto('format');

    const url = imageBuilder.url();
    return validateImageUrl(url);
  } catch (error) {
    console.warn('Error generating optimized image URL:', error);
    return getImageUrl(photoObject); // Fallback to basic URL
  }
};

/**
 * Get optimized image URL using size presets
 */
export const getOptimizedImageByPreset = (
  photoObject: any,
  preset: ImageSizePreset,
  options: Omit<OptimizedImageOptions, 'width' | 'height'> = {}
): string | null => {
  const size = IMAGE_SIZES[preset];
  return getOptimizedImageUrl(photoObject, {
    width: size.width,
    height: size.height,
    ...options
  });
};

/**
 * Generate srcset for responsive images
 * Returns srcset string for use in <img> or <source> elements
 */
export const getImageSrcSet = (
  photoObject: any,
  widths: number[] = [400, 800, 1200, 1600],
  options: Omit<OptimizedImageOptions, 'width'> = {}
): string => {
  if (!photoObject) return '';

  try {
    const srcsetParts = widths.map(width => {
      const url = getOptimizedImageUrl(photoObject, { ...options, width });
      return url ? `${url} ${width}w` : null;
    }).filter(Boolean);

    return srcsetParts.join(', ');
  } catch (error) {
    console.warn('Error generating srcset:', error);
    return '';
  }
};

/**
 * Get complete responsive image props for use with <img> element
 */
export const getResponsiveImageProps = (
  photoObject: any,
  alt: string,
  options: {
    sizes?: string;
    widths?: number[];
    defaultWidth?: number;
    quality?: number;
    className?: string;
  } = {}
): {
  src: string;
  srcSet: string;
  sizes: string;
  alt: string;
  loading: 'lazy' | 'eager';
  decoding: 'async' | 'auto';
  className?: string;
} | null => {
  if (!photoObject) return null;

  const {
    sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    widths = [400, 800, 1200],
    defaultWidth = 800,
    quality = 80,
    className
  } = options;

  const src = getOptimizedImageUrl(photoObject, { width: defaultWidth, quality }) || '';
  const srcSet = getImageSrcSet(photoObject, widths, { quality });

  return {
    src,
    srcSet,
    sizes,
    alt,
    loading: 'lazy',
    decoding: 'async',
    ...(className && { className })
  };
};

// Helper function to get file URL from Sanity asset reference
export const getFileUrl = (asset: any) => {
  if (!asset || !asset._ref) return null

  // Sanity file URLs follow this pattern:
  // https://cdn.sanity.io/files/{projectId}/{dataset}/{assetId}-{originalFilename}
  const assetId = asset._ref
  const [fileId, extension] = assetId.replace('file-', '').split('-')
  const url = `https://cdn.sanity.io/files/w4d9v3bc/production/${assetId.replace('file-', '')}`

  // Validate URL before returning
  return validateFileUrl(url)
}

// Helper function to get image URL from Sanity asset reference (legacy - use getOptimizedImageUrl for new code)
export const getImageUrl = (photoObject: any) => {
  if (!photoObject) return null

  try {
    let url: string | null = null;

    // Handle expanded asset object (from asset-> query)  
    if (photoObject.asset && photoObject.asset.url) {
      url = photoObject.asset.url;
    }
    // Handle image object with asset reference (most common case)
    // Only call urlFor if we have a valid asset reference
    else if (photoObject.asset && photoObject.asset._ref) {
      url = urlFor(photoObject).url();
    }
    // Handle direct asset reference
    // Only call urlFor if we have a valid reference
    else if (photoObject._ref) {
      url = urlFor(photoObject).url();
    }
    // Handle direct URL
    else if (photoObject.url) {
      url = photoObject.url;
    }
    // If it's just a malformed image object without asset, return null
    else if (photoObject._type === 'image' && !photoObject.asset && !photoObject._ref) {
      console.warn('Malformed image object without asset reference:', photoObject);
      return null;
    }

    // Validate URL before returning to prevent malicious URLs
    return validateImageUrl(url);
  } catch (error) {
    console.warn('Error generating image URL for object:', photoObject, 'Error:', error);
    return null;
  }
}

// Query functions for fetching data
export const queries = {
  // Get all active board members ordered by position (Chairman first, Vice Chairman second, then by display order)
  boardMembers: `*[_type == "boardMember" && isActive == true] | order(isChairman desc, isViceChairman desc, displayOrder asc) {
    _id,
    name,
    nameNepali,
    photo,
    "photoUrl": photo.asset->url,
    post,
    postNepali,
    customPost,
    customPostNepali,
    displayOrder,
    isChairman,
    isViceChairman,
    phone,
    email,
    notes
  }`,

  // Get all active staff members ordered by position (CEO first, then by display order)
  staffMembers: `*[_type == "staffMember" && isActive == true] | order(isCEO desc, displayOrder asc) {
    _id,
    name,
    nameNepali,
    photo {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    post,
    postNepali,
    customPost,
    customPostNepali,
    location,
    locationNepali,
    customLocation,
    customLocationNepali,
    phone,
    email,
    displayOrder,
    isCEO,
    department
  }`,

  // Get all published news articles
  news: `*[_type == "news" && isPublished == true] | order(publishedAt desc) {
    _id,
    title,
    titleNepali,
    slug,
    excerpt,
    excerptNepali,
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    category,
    publishedAt,
    author,
    isPinned
  }`,

  // Get a single news article by slug
  newsArticle: (slug: string) => `*[_type == "news" && slug.current == "${slug}"][0] {
    _id,
    title,
    titleNepali,
    slug,
    excerpt,
    excerptNepali,
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    content,
    contentNepali,
    category,
    tags,
    publishedAt,
    author
  }`,

  // Get pinned news articles
  pinnedNews: `*[_type == "news" && isPublished == true && isPinned == true] | order(publishedAt desc) {
    _id,
    title,
    titleNepali,
    slug,
    excerpt,
    excerptNepali,
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    category,
    publishedAt
  }`,

  // Get single news article by slug
  singleNewsArticle: (slug: string) => `*[_type == "news" && slug.current == "${slug}" && isPublished == true][0] {
    _id,
    title,
    titleNepali,
    slug,
    excerpt,
    excerptNepali,
    content,
    contentNepali,
    featuredImage,
    category,
    tags,
    publishedAt,
    author,
    isPinned
  }`,

  // Get all published galleries
  galleries: `*[_type == "gallery" && isPublished == true] | order(isFeatured desc, viewOrder asc, publishedAt desc) {
    _id,
    title,
    titleNepali,
    slug,
    description,
    descriptionNepali,
    category,
    coverImage,
    images,
    date,
    location,
    locationNepali,
    photographer,
    tags,
    isFeatured,
    publishedAt
  }`,

  // Get featured galleries
  featuredGalleries: `*[_type == "gallery" && isPublished == true && isFeatured == true] | order(viewOrder asc, publishedAt desc) {
    _id,
    title,
    titleNepali,
    slug,
    description,
    descriptionNepali,
    category,
    coverImage,
    date,
    location,
    locationNepali
  }`,

  // Get single gallery by slug
  gallery: (slug: string) => `*[_type == "gallery" && slug.current == "${slug}"][0] {
    _id,
    title,
    titleNepali,
    slug,
    description,
    descriptionNepali,
    category,
    coverImage,
    images,
    date,
    location,
    locationNepali,
    photographer,
    tags,
    publishedAt
  }`,

  // Get all active services
  services: `*[_type == "service" && isActive == true] | order(isPopular desc, displayOrder asc, title asc) {
    _id,
    title,
    titleNepali,
    slug,
    shortDescription,
    shortDescriptionNepali,
    icon,
    category,
    features,
    interestRate,
    processingFee,
    contactPerson,
    contactPhone,
    contactEmail,
    isPopular,
    lastUpdated
  }`,

  // Get popular services
  popularServices: `*[_type == "service" && isActive == true && isPopular == true] | order(displayOrder asc, title asc) {
    _id,
    title,
    titleNepali,
    slug,
    shortDescription,
    shortDescriptionNepali,
    icon,
    category,
    interestRate,
    processingFee
  }`,

  // Get single service by slug
  service: (slug: string) => `*[_type == "service" && slug.current == "${slug}"][0] {
    _id,
    title,
    titleNepali,
    slug,
    shortDescription,
    shortDescriptionNepali,
    fullDescription,
    fullDescriptionNepali,
    icon,
    category,
    features,
    requirements,
    interestRate,
    processingFee,
    contactPerson,
    contactPhone,
    contactEmail,
    lastUpdated
  }`,

  // Get all published financial documents
  financialDocuments: `*[_type == "financialDocument" && isPublished == true] | order(isPinned desc, displayOrder asc, publishedDate desc) {
    _id,
    title,
    titleNepali,
    slug,
    description,
    descriptionNepali,
    category,
    documentFile {
      asset-> {
        _id,
        url,
        originalFilename,
        size,
        mimeType
      }
    },
    coverImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    fiscalYear,
    reportPeriod,
    fileSize,
    pageCount,
    language,
    isConfidential,
    requiresLogin,
    downloadCount,
    publishedDate,
    expiryDate,
    approvedBy,
    keywords,
    isPinned,
    lastUpdated
  }`,

  // Get financial documents by category
  financialDocumentsByCategory: (category: string) => `*[_type == "financialDocument" && isPublished == true && category == "${category}"] | order(isPinned desc, displayOrder asc, publishedDate desc) {
    _id,
    title,
    titleNepali,
    slug,
    description,
    descriptionNepali,
    category,
    documentFile {
      asset-> {
        _id,
        url,
        originalFilename,
        size,
        mimeType
      }
    },
    coverImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    fiscalYear,
    reportPeriod,
    fileSize,
    pageCount,
    language,
    publishedDate,
    isPinned
  }`,

  // Get financial documents by fiscal year
  financialDocumentsByYear: (year: string) => `*[_type == "financialDocument" && isPublished == true && fiscalYear == "${year}"] | order(isPinned desc, displayOrder asc, publishedDate desc) {
    _id,
    title,
    titleNepali,
    slug,
    description,
    descriptionNepali,
    category,
    documentFile {
      asset-> {
        _id,
        url,
        originalFilename,
        size,
        mimeType
      }
    },
    coverImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    fiscalYear,
    reportPeriod,
    fileSize,
    pageCount,
    language,
    publishedDate,
    isPinned
  }`,

  // Get pinned financial documents
  pinnedFinancialDocuments: `*[_type == "financialDocument" && isPublished == true && isPinned == true] | order(displayOrder asc, publishedDate desc) {
    _id,
    title,
    titleNepali,
    slug,
    description,
    descriptionNepali,
    category,
    documentFile {
      asset-> {
        _id,
        url,
        originalFilename,
        size,
        mimeType
      }
    },
    coverImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    fiscalYear,
    reportPeriod,
    fileSize,
    pageCount,
    language,
    publishedDate
  }`,

  // Homepage Settings (singleton)
  homepageSettings: `*[_type == "homepageSettings"][0] {
    _id,
    logo {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    heroImages[] {
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      caption,
      isActive,
      displayOrder
    },
    lastUpdated
  }`,

  // Introduction Section (singleton)
  introductionSection: `*[_type == "introductionSection"][0] {
    _id,
    heading,
    headingNepali,
    sectionImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    content,
    contentNepali,
    highlights[] {
      title,
      titleNepali,
      value,
      description,
      descriptionNepali,
      displayOrder
    },
    foundingVision {
      quote,
      quoteNepali,
      author,
      authorNepali
    },
    lastUpdated
  }`,

  // Gallery Items
  galleryItems: `*[_type == "galleryItem" && isPublished == true] | order(isFeatured desc, displayOrder asc, _createdAt desc) {
    _id,
    title,
    titleNepali,
    description,
    descriptionNepali,
    mediaItems[] {
      mediaType,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      video {
        asset-> {
          _id,
          url,
          originalFilename,
          size
        }
      },
      videoThumbnail {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      videoUrl,
      caption,
      order
    },
    category,
    tags,
    dateTaken,
    location,
    locationNepali,
    isFeatured,
    relatedNews-> {
      _id,
      title,
      slug
    }
  }`,

  // Featured Gallery Items
  featuredGalleryItems: `*[_type == "galleryItem" && isPublished == true && isFeatured == true] | order(displayOrder asc, _createdAt desc) {
    _id,
    title,
    titleNepali,
    description,
    descriptionNepali,
    mediaItems[] {
      mediaType,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      videoThumbnail {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      caption,
      order
    },
    category,
    dateTaken,
    location,
    locationNepali
  }`,

  // Active Announcements
  activeAnnouncements: `*[_type == "announcement" && isActive == true && timing.startDate <= now() && (timing.endDate >= now() || !defined(timing.endDate))] | order(priority asc, displayOrder asc) {
    _id,
    title,
    titleNepali,
    type,
    priority,
    contentType,
    content,
    contentNepali,
    noticeImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    displaySettings,
    timing,
    targetAudience,
    relatedLink
  }`,

  // Events
  events: `*[_type == "event" && isPublished == true] | order(eventDate asc) {
    _id,
    title,
    titleNepali,
    description,
    descriptionNepali,
    eventType,
    eventDate,
    startTime,
    endTime,
    location,
    locationNepali,
    venue,
    expectedAttendees,
    actualAttendees,
    requiresRegistration,
    registrationSettings,
    attachments[] {
      title,
      titleNepali,
      description,
      file {
        asset-> {
          _id,
          url,
          originalFilename,
          size,
          mimeType
        }
      },
      fileType
    },
    eventStatus,
    priority,
    isFeatured,
    contactPerson,
    contactPhone,
    contactEmail,
    organizer
  }`,

  // Upcoming Events
  upcomingEvents: `*[_type == "event" && isPublished == true && eventDate >= now() && eventStatus in ["scheduled", "ongoing"]] | order(eventDate asc) [0...5] {
    _id,
    title,
    titleNepali,
    description,
    descriptionNepali,
    eventType,
    eventDate,
    startTime,
    endTime,
    location,
    locationNepali,
    expectedAttendees,
    requiresRegistration,
    registrationSettings,
    eventStatus,
    priority,
    isFeatured
  }`,

  // Featured Events
  featuredEvents: `*[_type == "event" && isPublished == true && isFeatured == true] | order(eventDate asc) {
    _id,
    title,
    titleNepali,
    description,
    descriptionNepali,
    eventType,
    eventDate,
    startTime,
    endTime,
    location,
    locationNepali,
    expectedAttendees,
    requiresRegistration,
    registrationSettings,
    eventStatus,
    priority
  }`,

  // Success Stories
  successStories: `*[_type == "successStory" && isPublished == true] | order(storyDate desc) {
    _id,
    title,
    titleNepali,
    storyType,
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    excerpt,
    excerptNepali,
    protagonist {
      name,
      nameNepali,
      role,
      roleNepali,
      location,
      photo {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      memberSince
    },
    impact {
      beneficiaries,
      financialImpact,
      timeframe,
      keyMetrics[] {
        metric,
        metricNepali,
        value,
        description
      }
    },
    testimonial {
      quote,
      quoteNepali,
      author
    },
    storyDate,
    publishedDate,
    categories,
    isFeatured
  }`,

  // Featured Success Stories
  featuredSuccessStories: `*[_type == "successStory" && isPublished == true && isFeatured == true] | order(storyDate desc) [0...3] {
    _id,
    title,
    titleNepali,
    storyType,
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    excerpt,
    excerptNepali,
    protagonist {
      name,
      nameNepali,
      role,
      roleNepali,
      location
    },
    storyDate,
    isFeatured
  }`,

  // Contact Messages
  contactMessages: `*[_type == "contactMessage"] | order(submittedAt desc) {
    _id,
    name,
    email,
    phone,
    subject,
    message,
    submittedAt,
    status,
    isRead,
    priority,
    adminNotes
  }`
}