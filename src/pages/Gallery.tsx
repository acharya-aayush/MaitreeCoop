import { useEffect, useState, useCallback, useRef } from 'react';
import { X, ZoomIn, ArrowLeft, ArrowRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { client as sanityClient, queries, getFileUrl } from "../lib/sanity";

interface MediaItem {
  mediaType: 'image' | 'video';
  image?: {
    asset: {
      _id: string;
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
  video?: {
    asset: {
      _id: string;
      url: string;
      originalFilename: string;
      size: number;
    };
  };
  videoThumbnail?: {
    asset: {
      _id: string;
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
}

interface GalleryItem {
  _id: string;
  title: string;
  titleNepali?: string;
  description?: string;
  descriptionNepali?: string;
  mediaItems: MediaItem[];
  category: string;
  eventDate?: string;
  location?: string;
  locationNepali?: string;
  photographer?: string;
  tags?: string[];
  isPublished: boolean;
  isFeatured?: boolean;
  sortOrder?: number;
  relatedLink?: string;
  coverImage?: MediaItem; // Will be set to first image in mediaItems
}

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Touch/swipe gesture state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const data = await sanityClient.fetch(queries.galleryItems);
        console.log('Raw gallery data from Sanity:', data);
        
        // Process the data to set cover images (first media item - image or video)
        const processedData = (data || []).map((item: GalleryItem) => {
          // First try to get an image as cover
          let coverMedia = item.mediaItems?.find((media: MediaItem) => 
            media.mediaType === 'image' && media.image?.asset?.url
          );
          
          // If no image, use video thumbnail or first video as cover
          if (!coverMedia) {
            coverMedia = item.mediaItems?.find((media: MediaItem) => 
              media.mediaType === 'video' && (media.videoThumbnail?.asset?.url || media.video?.asset?.url)
            );
          }
          
          return {
            ...item,
            coverImage: coverMedia
          };
        });
        
        console.log('Processed gallery data:', processedData);
        setGalleryItems(processedData);
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  const categories = ['all', ...new Set(galleryItems.map(item => item.category))];
  
  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const getCategoryDisplayName = (category: string) => {
    const displayNames: { [key: string]: string } = {
      all: 'All Media',
      events: 'Events',
      facilities: 'Facilities',
      training: 'Training',
      achievements: 'Achievements',
      meetings: 'Meetings',
      community: 'Community'
    };
    return displayNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    setCurrentIndex(0);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedItem(null);
  };

  const goToPrevious = () => {
    if (selectedItem?.mediaItems) {
      const mediaCount = selectedItem.mediaItems.length;
      setCurrentIndex((prev) => (prev === 0 ? mediaCount - 1 : prev - 1));
    }
  };

  const goToNext = () => {
    if (selectedItem?.mediaItems) {
      const mediaCount = selectedItem.mediaItems.length;
      setCurrentIndex((prev) => (prev === mediaCount - 1 ? 0 : prev + 1));
    }
  };

  // Touch handlers for swipe gestures
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
    
    // Reset
    touchStartX.current = null;
    touchEndX.current = null;
  }, [selectedItem?.mediaItems?.length]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center pt-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-28"> {/* Increased padding to account for fixed navbar and contact bar */}
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-green-700 to-green-800 text-white py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo Gallery</h1>
              <p className="text-lg md:text-xl max-w-2xl">
                Explore our journey through images - from community events to facilities, 
                training programs, and achievements that showcase our cooperative's impact.
              </p>
            </div>
          </div>

          {/* Gallery Content */}
          <div className="container mx-auto px-4 py-12">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              {/* Mobile: horizontal scroll, Desktop: grid */}
              <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 mb-8">
                <TabsList className="inline-flex w-max md:grid md:w-full md:grid-cols-6 gap-1 p-1">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="min-h-[44px] min-w-[44px] px-4 text-sm whitespace-nowrap"
                    >
                      {getCategoryDisplayName(category)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredItems.map((item) => (
                        <div
                          key={item._id}
                          className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          onClick={() => openLightbox(item)}
                        >
                          <div className="aspect-w-16 aspect-h-12 relative">
                            {item.coverImage ? (
                              <>
                                {item.coverImage.mediaType === 'image' && item.coverImage.image?.asset?.url ? (
                                  <img
                                    src={item.coverImage.image.asset.url}
                                    alt={item.title}
                                    className="w-full h-64 object-cover"
                                    loading="lazy"
                                  />
                                ) : item.coverImage.mediaType === 'video' ? (
                                  <div className="relative">
                                    {item.coverImage.videoThumbnail?.asset?.url ? (
                                      <img
                                        src={item.coverImage.videoThumbnail.asset.url}
                                        alt={item.title}
                                        className="w-full h-64 object-cover"
                                        loading="lazy"
                                      />
                                    ) : (
                                      <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                                        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.68L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
                                        </svg>
                                      </div>
                                    )}
                                    {/* Video play indicator */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="bg-black bg-opacity-50 rounded-full p-3">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.68L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                ) : null}
                                
                                {/* Show media count if there are multiple items */}
                                {item.mediaItems && item.mediaItems.length > 1 && (
                                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded-full">
                                    +{item.mediaItems.length - 1}
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                              <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                            </div>
                            {item.isFeatured && (
                              <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-xs rounded-full">
                                Featured
                              </div>
                            )}
                          </div>
                          
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
                              {item.title}
                            </h3>
                            {item.description && (
                              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                {item.description}
                              </p>
                            )}
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span className="capitalize bg-gray-100 px-2 py-1 rounded">
                                {item.category}
                              </span>
                              {item.eventDate && (
                                <span>{formatDate(item.eventDate)}</span>
                              )}
                            </div>
                            {item.location && (
                              <div className="mt-2 text-xs text-gray-500 flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {item.location}
                              </div>
                            )}
                            {item.tags && item.tags.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {item.tags.slice(0, 3).map((tag, index) => (
                                  <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    #{tag}
                                  </span>
                                ))}
                                {item.tags.length > 3 && (
                                  <span className="text-xs text-gray-500">+{item.tags.length - 3} more</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-500 mb-4">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        No images found
                      </h3>
                      <p className="text-gray-500">
                        There are no images in this category yet.
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        {/* Lightbox */}
        {lightboxOpen && selectedItem && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {(() => {
              const mediaItems = selectedItem.mediaItems || [];
              const currentMedia = mediaItems[currentIndex];
              
              return (
                <>
                  {/* Navigation Arrows */}
                  {mediaItems.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevious}
                        className="absolute left-4 text-white hover:text-gray-300 transition-colors duration-200 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Previous image"
                      >
                        <ArrowLeft className="w-8 h-8" />
                      </button>
                      <button
                        onClick={goToNext}
                        className="absolute right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Next image"
                      >
                        <ArrowRight className="w-8 h-8" />
                      </button>
                      {/* Swipe hint for mobile */}
                      <div className="absolute bottom-20 left-0 right-0 text-center text-white/50 text-xs md:hidden">
                        Swipe to navigate
                      </div>
                    </>
                  )}

                  {/* Media Content */}
                  <div className="max-w-7xl max-h-full flex items-center justify-center">
                    {currentMedia ? (
                      currentMedia.mediaType === 'image' && currentMedia.image?.asset?.url ? (
                        <img
                          src={currentMedia.image.asset.url}
                          alt={selectedItem.title}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : currentMedia.mediaType === 'video' && currentMedia.video?.asset ? (
                        (() => {
                          // Try direct URL first, then fallback to constructed URL
                          const directUrl = currentMedia.video.asset.url;
                          const fallbackUrl = getFileUrl(currentMedia.video.asset);
                          const videoUrl = directUrl || fallbackUrl;
                          
                          console.log('Video asset:', currentMedia.video.asset);
                          console.log('Direct URL:', directUrl);
                          console.log('Fallback URL:', fallbackUrl);
                          console.log('Using video URL:', videoUrl);
                          
                          return videoUrl ? (
                            <video
                              controls
                              className="max-w-full max-h-full object-contain"
                              preload="metadata"
                              playsInline // Important for mobile playback
                              onError={(e) => {
                                console.error('Video playback error:', e);
                                console.error('Error target:', e.target);
                                console.error('Video URL:', videoUrl);
                                console.error('Video asset:', currentMedia.video.asset);
                              }}
                              onLoadStart={() => {
                                console.log('Video loading started:', videoUrl);
                              }}
                              onCanPlay={() => {
                                console.log('Video can play:', videoUrl);
                              }}
                              onLoadedMetadata={() => {
                                console.log('Video metadata loaded:', videoUrl);
                              }}
                            >
                              <source src={videoUrl} type="video/mp4" />
                              <source src={videoUrl} type="video/webm" />
                              <source src={videoUrl} type="video/quicktime" />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <div className="bg-gray-200 rounded-lg p-8 flex items-center justify-center">
                              <span className="text-gray-500">Video URL not available</span>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="bg-gray-200 rounded-lg p-8 flex items-center justify-center">
                          <span className="text-gray-500">Media not available</span>
                        </div>
                      )
                    ) : (
                      <div className="bg-gray-200 rounded-lg p-8 flex items-center justify-center">
                        <span className="text-gray-500">No media available</span>
                      </div>
                    )}
                  </div>

                  {/* Media Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                    <h3 className="text-lg font-semibold mb-1">
                      {selectedItem.title}
                    </h3>
                    {selectedItem.description && (
                      <p className="text-sm opacity-80 max-w-2xl mx-auto">
                        {selectedItem.description}
                      </p>
                    )}
                    <p className="text-xs opacity-60 mt-2">
                      {currentIndex + 1} of {mediaItems.length}
                      {currentMedia && (
                        <span className="ml-2">
                          ({currentMedia.mediaType === 'video' ? 'Video' : 'Image'})
                        </span>
                      )}
                    </p>
                  </div>
                </>
              );
            })()}
          </div>
        )}
    </div>
  );
};

export default Gallery;