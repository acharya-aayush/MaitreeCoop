
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin, Calendar, FileText, Users, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAboutVisible(true);
          if (aboutSectionRef.current) observer.unobserve(aboutSectionRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current);
    }

    return () => {
      if (aboutSectionRef.current) observer.unobserve(aboutSectionRef.current);
    };
  }, []);

  // Mock data
  const notices = [
    {
      id: 1,
      title: 'Annual General Meeting Notice',
      date: 'June 15, 2023',
      type: 'Meeting',
      link: '/news/annual-general-meeting'
    },
    {
      id: 2,
      title: 'New Agricultural Loan Program Launched',
      date: 'May 28, 2023',
      type: 'Announcement',
      link: '/news/agricultural-loan-program'
    },
    {
      id: 3,
      title: 'Mobile Banking App Update Available',
      date: 'May 15, 2023',
      type: 'Update',
      link: '/news/mobile-banking-update'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <section 
        ref={aboutSectionRef}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div 
              className={cn(
                "relative rounded-2xl overflow-hidden transition-all duration-1000",
                aboutVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              )}
            >
              <div className="aspect-[4/3] bg-gradient-to-tr from-green-100 to-white rounded-2xl flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-green-800">Our Founding Vision</h3>
                  <p className="text-gray-600 italic">
                    "To improve members' living standards and foster social capital through cooperation."
                  </p>
                  <p className="text-sm text-gray-500">— Bom Bahadur Khadka, Founder</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-5 right-5 w-20 h-20 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-green-800">मैत्री</span>
              </div>
            </div>
            
            {/* Text Content */}
            <div 
              className={cn(
                "space-y-6 transition-all duration-1000 delay-300",
                aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
                About Us
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Strengthening Communities Through Cooperation
              </h2>
              
              <p className="text-gray-600">
                Established under cooperative principles, Maitree Multipurpose Cooperative 
                focuses on agricultural development, livestock business transformation, and 
                financial inclusion through accessible savings and loans.
              </p>
              
              <p className="text-gray-600">
                Our cooperative is guided by the vision of improving our members' living standards 
                and fostering social capital within our community.
              </p>
              
              <div className="pt-2">
                <Link 
                  to="/about" 
                  className="button-primary flex items-center"
                >
                  Learn Our Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              Our Services
            </span>
            
            <h2 className="mt-4 text-3xl md:text-4xl font-bold">
              Comprehensive Financial & Agricultural Services
            </h2>
            
            <p className="mt-4 text-lg text-gray-600">
              We offer a range of services designed to support our members' financial needs and agricultural endeavors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Savings"
              description="Secure your financial future with our flexible savings plans tailored to your goals and needs."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              linkTo="/services#savings"
              delay={100}
            />
            
            <ServiceCard
              title="Loans"
              description="Access affordable credit for personal, business, or agricultural needs with flexible repayment options."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              linkTo="/services#loans"
              delay={200}
            />
            
            <ServiceCard
              title="Remittance"
              description="Send and receive money quickly and securely with our trusted remittance services."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              }
              linkTo="/services#remittance"
              delay={300}
            />
            
            <ServiceCard
              title="Mobile Banking"
              description="Access your accounts, transfer funds, and manage finances conveniently from your mobile device."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              }
              linkTo="/services#mobile-banking"
              delay={400}
            />
            
            <ServiceCard
              title="Cooperative Store"
              description="Purchase quality agricultural inputs, tools, and daily necessities at fair prices at our cooperative store."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              }
              linkTo="/services#cooperative-store"
              delay={500}
            />
            
            <ServiceCard
              title="Agricultural Support"
              description="Get guidance and support for agricultural production, processing, and marketing to enhance productivity."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              }
              linkTo="/services#agricultural-support"
              delay={600}
            />
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/services" 
              className="button-primary inline-flex items-center"
            >
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* News & Notices Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
                Stay Updated
              </span>
              
              <h2 className="mt-4 text-3xl md:text-4xl font-bold">
                Latest News & Notices
              </h2>
            </div>
            
            <Link 
              to="/news" 
              className="mt-4 md:mt-0 text-green-600 font-medium hover:text-green-800 transition-colors flex items-center"
            >
              View All News
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {notices.map((notice, index) => (
              <div 
                key={notice.id}
                className="glass-card rounded-xl p-6 hover-card"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-block py-1 px-2 rounded bg-green-100 text-green-800 text-xs font-medium">
                    {notice.type}
                  </span>
                  <span className="text-sm text-gray-500">{notice.date}</span>
                </div>
                
                <h3 className="text-lg font-semibold mb-3">{notice.title}</h3>
                
                <Link 
                  to={notice.link} 
                  className="text-green-600 font-medium hover:text-green-800 transition-colors flex items-center text-sm"
                >
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Quick Links Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-12">
            Quick Links
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/members" className="glass-card py-8 px-4 rounded-xl hover-card flex flex-col items-center text-center">
              <Users className="h-8 w-8 text-green-600 mb-4" />
              <span className="text-sm font-medium">Membership</span>
            </Link>
            
            <Link to="/financial" className="glass-card py-8 px-4 rounded-xl hover-card flex flex-col items-center text-center">
              <FileText className="h-8 w-8 text-green-600 mb-4" />
              <span className="text-sm font-medium">Financial Reports</span>
            </Link>
            
            <Link to="/community" className="glass-card py-8 px-4 rounded-xl hover-card flex flex-col items-center text-center">
              <Calendar className="h-8 w-8 text-green-600 mb-4" />
              <span className="text-sm font-medium">Events Calendar</span>
            </Link>
            
            <Link to="/contact" className="glass-card py-8 px-4 rounded-xl hover-card flex flex-col items-center text-center">
              <MapPin className="h-8 w-8 text-green-600 mb-4" />
              <span className="text-sm font-medium">Find Us</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
                Contact Us
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                We're Here to Help
              </h2>
              
              <p className="text-gray-600">
                Have questions or need assistance? Reach out to us through any of the following channels.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start">
                  <MapPin className="text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-600">रेसुङ्गा नगरपालिका - ८ गुल्मी</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a 
                      href="mailto:maitreecooperative@gmail.com"
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      maitreecooperative@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-green-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <a 
                      href="tel:+9779876543210"
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      +977 9876543210
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <Link 
                  to="/contact" 
                  className="button-primary flex items-center"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden hover-card">
              <div className="aspect-video bg-green-50 relative">
                {/* Placeholder for map - In a real implementation, you would use Google Maps or similar */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="h-10 w-10 text-green-600 mx-auto mb-4" />
                    <h3 className="font-medium">Interactive Map</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      रेसुङ्गा नगरपालिका - ८ गुल्मी
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Join Maitree Multipurpose Cooperative Today
          </h2>
          
          <p className="text-green-100">
            Become a member and enjoy the benefits of financial services, agricultural support, and community development.
          </p>
          
          <div className="pt-4">
            <Link 
              to="/members" 
              className="bg-white text-green-700 px-6 py-3 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 font-medium inline-block"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
