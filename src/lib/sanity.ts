import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Create the Sanity client
export const client = createClient({
  projectId: 'w4d9v3bc', // Your project ID from sanity.config.ts
  dataset: 'production',   // Dataset name
  useCdn: false,          // Disable CDN for development to avoid CORS issues
  apiVersion: '2024-01-01', // Use current date or latest API version
  token: undefined,       // No token needed for public read access
})

// Set up image URL builder
const builder = imageUrlBuilder(client)

// Helper function to generate image URLs
export const urlFor = (source: any) => {
  return builder.image(source)
}

// Helper function to get file URL from Sanity asset reference
export const getFileUrl = (asset: any) => {
  if (!asset || !asset._ref) return null
  
  // Sanity file URLs follow this pattern:
  // https://cdn.sanity.io/files/{projectId}/{dataset}/{assetId}-{originalFilename}
  const assetId = asset._ref
  const [fileId, extension] = assetId.replace('file-', '').split('-')
  return `https://cdn.sanity.io/files/w4d9v3bc/production/${assetId.replace('file-', '')}`
}

// Helper function to get image URL from Sanity asset reference
export const getImageUrl = (photoObject: any) => {
  if (!photoObject) return null
  
  // Handle image object with asset reference (most common case)
  if (photoObject.asset && photoObject.asset._ref) {
    return urlFor(photoObject).url();
  }
  
  // Handle expanded asset object (from asset-> query)  
  if (photoObject.asset && photoObject.asset.url) {
    return photoObject.asset.url;
  }
  
  // Handle direct asset reference
  if (photoObject._ref) {
    return urlFor(photoObject).url();
  }
  
  // Handle direct URL
  if (photoObject.url) {
    return photoObject.url;
  }
  return null;
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
    featuredImage,
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
    featuredImage,
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
    featuredImage,
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
    memberCount,
    memberCountSuffix,
    memberCountNepali,
    lastUpdated
  }`,

  // Hero Section (singleton)
  heroSection: `*[_type == "heroSection"][0] {
    _id,
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
  }`
}