
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-green-50 to-white pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNDI1MzkiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwWk0wIDMwaDZWMEgwdjMwWk0xMiAzMGg2VjBoLTZ2MzBaTTI0IDMwaDZWMGgtNnYzMFoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Hero Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={cn(
            "space-y-6 transition-all duration-1000 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase animate-fade-in">
              Empowering Communities
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight hero-text">
              Building <span>Prosperity</span> Through Cooperation
            </h1>
            
            <p className="text-lg text-gray-600 max-w-md">
              Maitree Multipurpose Cooperative is dedicated to improving members' living standards through sustainable financial services and community development.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                to="/services" 
                className="button-primary flex items-center"
              >
                Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              
              <Link 
                to="/members" 
                className="button-secondary"
              >
                Become a Member
              </Link>
            </div>
          </div>
          
          {/* Image/Visual Element */}
          <div className={cn(
            "relative transition-all duration-1000 delay-300",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-white p-2">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-green-100 via-white to-green-50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 backdrop-blur-[2px] bg-white/20"></div>
                <div className="relative z-10 text-center p-6">
                  <div className="inline-block mb-6">
                    <img 
                      src="/lovable-uploads/5735d83e-b1d9-4a09-b942-bd955fb979f5.png" 
                      alt="Maitree Cooperative Logo" 
                      className="w-40 h-40 mx-auto"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Maitree Multipurpose Cooperative
                  </h2>
                  <p className="text-sm text-gray-600">
                    बहुउद्देश्यीय सहकारी संस्था
                  </p>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-6 left-6 w-16 h-16 rounded-full bg-green-500/10"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-green-500/10"></div>
                <div className="absolute top-1/3 right-12 w-8 h-8 rounded-full bg-green-500/20"></div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white rounded-2xl shadow-lg p-4 glass-card animate-fade-up" style={{ animationDelay: '0.6s' }}>
              <div className="h-full flex flex-col justify-center">
                <p className="text-xs text-gray-500 mb-1">Members</p>
                <p className="text-xl font-bold text-green-600">2,500+</p>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 w-28 h-28 bg-white rounded-2xl shadow-lg p-4 glass-card animate-fade-up" style={{ animationDelay: '0.8s' }}>
              <div className="h-full flex flex-col justify-center">
                <p className="text-xs text-gray-500 mb-1">Since</p>
                <p className="text-xl font-bold text-green-600">2005</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Services Preview */}
        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 relative transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {/* Service Card 1 */}
          <div className="glass-card rounded-xl p-6 hover-card">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Savings & Loans</h3>
            <p className="text-sm text-gray-600 mb-4">
              Secure your financial future with our flexible savings plans and accessible loan options.
            </p>
            <Link to="/services#savings" className="text-sm font-medium text-green-600 flex items-center hover:text-green-800 transition-colors">
              Learn More <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {/* Service Card 2 */}
          <div className="glass-card rounded-xl p-6 hover-card">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Agricultural Support</h3>
            <p className="text-sm text-gray-600 mb-4">
              Comprehensive solutions for agricultural production, processing, and marketing.
            </p>
            <Link to="/services#agriculture" className="text-sm font-medium text-green-600 flex items-center hover:text-green-800 transition-colors">
              Learn More <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {/* Service Card 3 */}
          <div className="glass-card rounded-xl p-6 hover-card">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Mobile Banking</h3>
            <p className="text-sm text-gray-600 mb-4">
              Access your accounts, transfer funds, and manage finances conveniently from your mobile device.
            </p>
            <Link to="/services#mobile-banking" className="text-sm font-medium text-green-600 flex items-center hover:text-green-800 transition-colors">
              Learn More <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
