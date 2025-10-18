
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';
import { Calendar, MapPin, Clock, Users, Award } from 'lucide-react';

const Community = () => {
  // Sample upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Agricultural Training Workshop",
      date: "Ashad 20, 2080",
      time: "10:00 AM - 3:00 PM",
      location: "Maitree Training Center, Tamghas",
      description: "Learn modern techniques for vegetable farming and organic pest control.",
      attendees: 45
    },
    {
      id: 2,
      title: "Financial Literacy Program",
      date: "Shrawan 5, 2080",
      time: "1:00 PM - 4:00 PM",
      location: "Resunga Municipality Hall",
      description: "Session on personal finance management, savings, and investment options.",
      attendees: 30
    },
    {
      id: 3,
      title: "Cooperative Member Meet",
      date: "Shrawan 15, 2080",
      time: "11:00 AM - 2:00 PM",
      location: "Maitree Headquarters",
      description: "Quarterly gathering to discuss cooperative development and member concerns.",
      attendees: 120
    }
  ];

  // Sample success stories
  const successStories = [
    {
      id: 1,
      name: "Kamala Sharma",
      business: "Organic Vegetable Farm",
      image: "/placeholder.svg",
      quote: "With the agriculture loan from Maitree Cooperative, I was able to expand my vegetable farm and install drip irrigation. My income has doubled in just two years.",
      achievements: "Now supplies vegetables to three local markets."
    },
    {
      id: 2,
      name: "Bishnu Thapa",
      business: "Dairy Production",
      image: "/placeholder.svg",
      quote: "The livestock development program helped me improve my cattle breeds and milk production techniques. The cooperative also connected me with reliable buyers.",
      achievements: "Increased milk production from 15 to 40 liters daily."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <ContactBar />
      <Navbar />
      
      <div className="page-header text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">Community & Events</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover upcoming events, community initiatives, and member success stories.
          </p>
        </div>
      </div>
      
      {/* Upcoming Events Section */}
      <section className="section-container bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              Calendar
            </span>
            <h2 className="mt-4 text-3xl font-bold">Upcoming Events</h2>
            <p className="mt-2 text-gray-600 max-w-xl mx-auto">
              Join us at these upcoming events to learn, connect, and grow with our cooperative community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="glass-card rounded-xl overflow-hidden hover-card">
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3">{event.title}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-green-600" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-green-600" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-green-600" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-green-600" />
                      <span>{event.attendees} Attendees</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <a href="#" className="text-green-600 hover:text-green-800 font-medium inline-flex items-center">
              View Full Event Calendar
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      {/* Success Stories Section */}
      <section className="section-container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              Testimonials
            </span>
            <h2 className="mt-4 text-3xl font-bold">Member Success Stories</h2>
            <p className="mt-2 text-gray-600 max-w-xl mx-auto">
              Inspiring journeys of our members who have transformed their lives through cooperative support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {successStories.map((story) => (
              <div key={story.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row hover-card">
                <div className="md:w-1/3 bg-green-50">
                  <div className="h-full w-full flex items-center justify-center p-4">
                    <img 
                      src={story.image} 
                      alt={story.name} 
                      className="h-32 w-32 rounded-full object-cover border-4 border-white shadow"
                    />
                  </div>
                </div>
                
                <div className="md:w-2/3 p-6">
                  <div className="flex items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl">{story.name}</h3>
                      <p className="text-green-600">{story.business}</p>
                    </div>
                    <div className="text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 italic mb-4">
                    "{story.quote}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium">{story.achievements}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a href="#" className="inline-block px-6 py-3 border border-green-600 text-green-600 font-medium rounded-md hover:bg-green-600 hover:text-white transition-colors">
              Read More Success Stories
            </a>
          </div>
        </div>
      </section>
      
      {/* Community Initiatives Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              Impact
            </span>
            <h2 className="mt-4 text-3xl font-bold">Community Initiatives</h2>
            <p className="mt-2 text-gray-600 max-w-xl mx-auto">
              Beyond financial services, we are committed to initiatives that build a stronger, healthier community.
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-bold text-lg">Education Support</h3>
                <p className="text-gray-600 text-sm">
                  Scholarships for underprivileged students and educational programs in local schools.
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-bold text-lg">Water Projects</h3>
                <p className="text-gray-600 text-sm">
                  Funding for drinking water supply projects in water-scarce areas of our district.
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-bold text-lg">Health Camps</h3>
                <p className="text-gray-600 text-sm">
                  Regular health check-up camps in partnership with local health institutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Community;
