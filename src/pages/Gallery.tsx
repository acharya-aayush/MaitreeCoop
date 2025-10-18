import { useEffect, useState } from 'react';
import { X, ZoomIn, ArrowLeft, ArrowRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactBar from "../components/ContactBar";
import { client as sanityClient, queries } from "../lib/sanity";

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

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const data = await sanityClient.fetch(queries.galleryItems);
        
        // Process the data to set cover images (first image from mediaItems)
        const processedData = (data || []).map((item: GalleryItem) => {
          const firstImage = item.mediaItems?.find((media: MediaItem) => 
            media.mediaType === 'image' && media.image?.asset?.url
          );
          
          return {
            ...item,
            coverImage: firstImage
          };
        });
        
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
      all: 'All Photos',
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
      const imageCount = selectedItem.mediaItems.filter(media => media.mediaType === 'image').length;
      setCurrentIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
    }
  };

  const goToNext = () => {
    if (selectedItem?.mediaItems) {
      const imageCount = selectedItem.mediaItems.filter(media => media.mediaType === 'image').length;
      setCurrentIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
    }
  };

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
        <ContactBar />
        <Navbar />
        <div className="text-center pt-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <ContactBar />
        <Navbar />
        
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
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="text-sm"
                  >
                    {getCategoryDisplayName(category)}
                  </TabsTrigger>
                ))}
              </TabsList>

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
                            {item.coverImage?.image?.asset?.url ? (
                              <>
                                <img
                                  src={item.coverImage.image.asset.url}
                                  alt={item.title}
                                  className="w-full h-64 object-cover"
                                  loading="lazy"
                                />
                                {/* Show image count if there are multiple images */}
                                {item.mediaItems?.filter(media => media.mediaType === 'image').length > 1 && (
                                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded-full">
                                    +{item.mediaItems.filter(media => media.mediaType === 'image').length - 1}
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
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {(() => {
              const images = selectedItem.mediaItems?.filter(media => media.mediaType === 'image' && media.image?.asset?.url) || [];
              
              return (
                <>
                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevious}
                        className="absolute left-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
                      >
                        <ArrowLeft className="w-8 h-8" />
                      </button>
                      <button
                        onClick={goToNext}
                        className="absolute right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
                      >
                        <ArrowRight className="w-8 h-8" />
                      </button>
                    </>
                  )}

                  {/* Image */}
                  <div className="max-w-7xl max-h-full flex items-center justify-center">
                    {images[currentIndex]?.image?.asset?.url ? (
                      <img
                        src={images[currentIndex].image.asset.url}
                        alt={selectedItem.title}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="bg-gray-200 rounded-lg p-8 flex items-center justify-center">
                        <span className="text-gray-500">Image not available</span>
                      </div>
                    )}
                  </div>

                  {/* Image Info */}
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
                      {currentIndex + 1} of {images.length}
                    </p>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Gallery;