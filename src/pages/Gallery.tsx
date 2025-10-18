import { useEffect, useState } from 'react';
import { X, ZoomIn, ArrowLeft, ArrowRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactBar from "../components/ContactBar";
import { client as sanityClient, queries } from "../lib/sanity";

interface GalleryItem {
  _id: string;
  title: string;
  titleNepali?: string;
  description?: string;
  descriptionNepali?: string;
  image: {
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
}

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const data = await sanityClient.fetch(queries.galleryItems);
        setGalleryItems(data || []);
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  // Filter items by category
  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  // Get unique categories for tabs
  const categories = ['all', ...Array.from(new Set(galleryItems.map(item => item.category)))];

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    setCurrentIndex(filteredItems.findIndex(i => i._id === item._id));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    let newIndex = currentIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    }
    
    setCurrentIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'all': return 'All Photos';
      case 'events': return 'Events';
      case 'facilities': return 'Facilities';
      case 'training': return 'Training';
      case 'community': return 'Community';
      case 'achievements': return 'Achievements';
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <ContactBar />
        <Navbar />
        
        <div className="pt-20">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-green-700 to-green-800 text-white py-16">
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
                            {item.image?.asset?.url ? (
                              <img
                                src={item.image.asset.url}
                                alt={item.title}
                                className="w-full h-64 object-cover"
                                loading="lazy"
                              />
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
                              <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 text-xs rounded-full">
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
                        No photos available
                      </h3>
                      <p className="text-gray-500">
                        {selectedCategory === 'all' 
                          ? 'No photos have been uploaded yet.' 
                          : `No photos available in the ${getCategoryDisplayName(selectedCategory)} category.`}
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        <Footer />
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation buttons */}
            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 z-10 text-white hover:text-gray-300 transition-colors"
                >
                  <ArrowLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 z-10 text-white hover:text-gray-300 transition-colors"
                >
                  <ArrowRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="max-w-7xl max-h-full flex items-center justify-center">
              {selectedImage.image?.asset?.url ? (
                <img
                  src={selectedImage.image.asset.url}
                  alt={selectedImage.title}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="bg-gray-200 rounded-lg p-8 flex items-center justify-center">
                  <span className="text-gray-500">Image not available</span>
                </div>
              )}
            </div>

            {/* Image info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-1">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-sm text-gray-200 mb-2">{selectedImage.description}</p>
              )}
              <div className="flex items-center justify-between text-sm text-gray-300">
                <div className="flex items-center space-x-4">
                  <span className="capitalize">{selectedImage.category}</span>
                  {selectedImage.eventDate && <span>{formatDate(selectedImage.eventDate)}</span>}
                  {selectedImage.location && (
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {selectedImage.location}
                    </span>
                  )}
                </div>
                {selectedImage.photographer && (
                  <span>Photo by: {selectedImage.photographer}</span>
                )}
              </div>
              {selectedImage.tags && selectedImage.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedImage.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              {filteredItems.length > 1 && (
                <div className="mt-2 text-xs text-gray-400">
                  {currentIndex + 1} of {filteredItems.length}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;