
import React, { useState } from 'react';
import { X, ZoomIn, ArrowLeft, ArrowRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';

// Sample data - In a real application, this would come from a CMS or database
const photos = [
  {
    id: 1,
    category: 'events',
    title: 'Annual General Meeting 2022',
    description: 'Members gathered for our Annual General Meeting',
    thumbnail: 'https://placehold.co/600x400?text=Annual+Meeting',
    fullImage: 'https://placehold.co/1200x800?text=Annual+Meeting',
    date: 'May 15, 2022'
  },
  {
    id: 2,
    category: 'events',
    title: 'Women Empowerment Workshop',
    description: 'Training session focused on financial literacy for women',
    thumbnail: 'https://placehold.co/600x400?text=Women+Workshop',
    fullImage: 'https://placehold.co/1200x800?text=Women+Workshop',
    date: 'June 20, 2022'
  },
  {
    id: 3,
    category: 'events',
    title: 'Agricultural Training Program',
    description: 'Farmers learning about modern farming techniques',
    thumbnail: 'https://placehold.co/600x400?text=Farming+Training',
    fullImage: 'https://placehold.co/1200x800?text=Farming+Training',
    date: 'July 5, 2022'
  },
  {
    id: 4,
    category: 'facilities',
    title: 'Main Office Building',
    description: 'Our headquarters in Tamghas, Gulmi',
    thumbnail: 'https://placehold.co/600x400?text=Main+Office',
    fullImage: 'https://placehold.co/1200x800?text=Main+Office',
    date: 'January 10, 2022'
  },
  {
    id: 5,
    category: 'facilities',
    title: 'Cooperative Store',
    description: 'Our fair price shop providing quality goods to members',
    thumbnail: 'https://placehold.co/600x400?text=Cooperative+Store',
    fullImage: 'https://placehold.co/1200x800?text=Cooperative+Store',
    date: 'February 15, 2022'
  },
  {
    id: 6,
    category: 'facilities',
    title: 'Computer Training Center',
    description: 'Modern facility for digital literacy training',
    thumbnail: 'https://placehold.co/600x400?text=Training+Center',
    fullImage: 'https://placehold.co/1200x800?text=Training+Center',
    date: 'March 20, 2022'
  },
  {
    id: 7,
    category: 'community',
    title: 'Community Tree Planting',
    description: 'Members participating in environmental conservation efforts',
    thumbnail: 'https://placehold.co/600x400?text=Tree+Planting',
    fullImage: 'https://placehold.co/1200x800?text=Tree+Planting',
    date: 'April 22, 2022'
  },
  {
    id: 8,
    category: 'community',
    title: 'Health Camp',
    description: 'Free health check-up camp organized for the local community',
    thumbnail: 'https://placehold.co/600x400?text=Health+Camp',
    fullImage: 'https://placehold.co/1200x800?text=Health+Camp',
    date: 'August 12, 2022'
  },
  {
    id: 9,
    category: 'community',
    title: 'School Support Program',
    description: 'Distributing educational materials to local schools',
    thumbnail: 'https://placehold.co/600x400?text=School+Support',
    fullImage: 'https://placehold.co/1200x800?text=School+Support',
    date: 'September 5, 2022'
  },
];

const videos = [
  {
    id: 1,
    title: 'Interview with the Chairperson',
    description: 'Learn about our cooperative\'s vision and future plans',
    thumbnail: 'https://placehold.co/600x400?text=Interview+Video',
    videoUrl: '#',
    duration: '10:25',
    date: 'October 15, 2022'
  },
  {
    id: 2,
    title: 'Agricultural Training Highlights',
    description: 'Footage from our recent farmer training program',
    thumbnail: 'https://placehold.co/600x400?text=Training+Video',
    videoUrl: '#',
    duration: '15:40',
    date: 'November 20, 2022'
  },
  {
    id: 3,
    title: 'Annual General Meeting 2022',
    description: 'Key moments from our AGM',
    thumbnail: 'https://placehold.co/600x400?text=AGM+Video',
    videoUrl: '#',
    duration: '25:10',
    date: 'December 5, 2022'
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (photo, index) => {
    setSelectedImage(photo);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedImage(photos[newIndex]);
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % photos.length;
    setSelectedImage(photos[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleKeyDown = (e) => {
    if (selectedImage) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage, currentIndex]);

  return (
    <div className="min-h-screen bg-white">
      <ContactBar />
      <Navbar />
      
      <div className="page-header text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">Gallery</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore photos and videos from our events, meetings, and community projects.
          </p>
        </div>
      </div>
      
      <section className="section-container">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="photos" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-green-50">
                <TabsTrigger value="photos">Photos</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="photos" className="mt-6">
              <div className="mb-8">
                <Tabs defaultValue="all" className="w-full">
                  <div className="flex justify-center mb-6">
                    <TabsList>
                      <TabsTrigger value="all">All Photos</TabsTrigger>
                      <TabsTrigger value="events">Events</TabsTrigger>
                      <TabsTrigger value="facilities">Facilities</TabsTrigger>
                      <TabsTrigger value="community">Community</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="all" className="animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {photos.map((photo, index) => (
                        <div 
                          key={photo.id}
                          className="glass-card overflow-hidden rounded-xl hover-card cursor-pointer"
                          onClick={() => openLightbox(photo, index)}
                        >
                          <div className="aspect-[4/3] relative overflow-hidden">
                            <img
                              src={photo.thumbnail}
                              alt={photo.title}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                              <ZoomIn className="text-white h-10 w-10" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-lg">{photo.title}</h3>
                            <p className="text-gray-500 text-sm mb-1">{photo.date}</p>
                            <p className="text-gray-600 text-sm">{photo.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="events" className="animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {photos.filter(photo => photo.category === 'events').map((photo, index) => (
                        <div 
                          key={photo.id}
                          className="glass-card overflow-hidden rounded-xl hover-card cursor-pointer"
                          onClick={() => openLightbox(photo, photos.findIndex(p => p.id === photo.id))}
                        >
                          <div className="aspect-[4/3] relative overflow-hidden">
                            <img
                              src={photo.thumbnail}
                              alt={photo.title}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                              <ZoomIn className="text-white h-10 w-10" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-lg">{photo.title}</h3>
                            <p className="text-gray-500 text-sm mb-1">{photo.date}</p>
                            <p className="text-gray-600 text-sm">{photo.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="facilities" className="animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {photos.filter(photo => photo.category === 'facilities').map((photo, index) => (
                        <div 
                          key={photo.id}
                          className="glass-card overflow-hidden rounded-xl hover-card cursor-pointer"
                          onClick={() => openLightbox(photo, photos.findIndex(p => p.id === photo.id))}
                        >
                          <div className="aspect-[4/3] relative overflow-hidden">
                            <img
                              src={photo.thumbnail}
                              alt={photo.title}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                              <ZoomIn className="text-white h-10 w-10" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-lg">{photo.title}</h3>
                            <p className="text-gray-500 text-sm mb-1">{photo.date}</p>
                            <p className="text-gray-600 text-sm">{photo.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="community" className="animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {photos.filter(photo => photo.category === 'community').map((photo, index) => (
                        <div 
                          key={photo.id}
                          className="glass-card overflow-hidden rounded-xl hover-card cursor-pointer"
                          onClick={() => openLightbox(photo, photos.findIndex(p => p.id === photo.id))}
                        >
                          <div className="aspect-[4/3] relative overflow-hidden">
                            <img
                              src={photo.thumbnail}
                              alt={photo.title}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                              <ZoomIn className="text-white h-10 w-10" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-lg">{photo.title}</h3>
                            <p className="text-gray-500 text-sm mb-1">{photo.date}</p>
                            <p className="text-gray-600 text-sm">{photo.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
            
            <TabsContent value="videos" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map(video => (
                  <div key={video.id} className="glass-card overflow-hidden rounded-xl hover-card">
                    <div className="aspect-video relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white bg-opacity-75 rounded-full p-4 hover:bg-opacity-90 transition-all transform hover:scale-110">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 text-xs rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{video.title}</h3>
                      <p className="text-gray-500 text-sm mb-1">{video.date}</p>
                      <p className="text-gray-600 text-sm">{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={closeLightbox}
          >
            <X className="h-8 w-8" />
          </button>
          
          <button 
            className="absolute left-4 text-white hover:text-gray-300 z-10"
            onClick={goToPrevious}
          >
            <ArrowLeft className="h-8 w-8" />
          </button>
          
          <button 
            className="absolute right-4 text-white hover:text-gray-300 z-10"
            onClick={goToNext}
          >
            <ArrowRight className="h-8 w-8" />
          </button>
          
          <div className="max-w-6xl max-h-full overflow-auto">
            <img 
              src={selectedImage.fullImage} 
              alt={selectedImage.title} 
              className="max-w-full max-h-[80vh] mx-auto"
            />
            <div className="text-white p-4 text-center">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              <p className="text-gray-300 mt-1">{selectedImage.description}</p>
              <p className="text-gray-400 text-sm mt-2">{selectedImage.date}</p>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Gallery;
