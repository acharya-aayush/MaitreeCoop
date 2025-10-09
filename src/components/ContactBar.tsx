import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactBar: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if it's mobile screen
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    // Initial check
    checkScreenSize();

    // Listen for screen size changes
    window.addEventListener('resize', checkScreenSize);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only apply scroll behavior on mobile screens
      if (isMobile) {
        // Show contact bar when scrolling up or at the top on mobile
        if (currentScrollY < lastScrollY || currentScrollY < 100) {
          setIsVisible(true);
        } 
        // Hide contact bar when scrolling down on mobile
        else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        }
      } else {
        // Always visible on desktop
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener('scroll', throttledHandleScroll);
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', checkScreenSize);
      clearTimeout(timeoutId);
    };
  }, [lastScrollY, isMobile]);

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 bg-green-600 text-white transition-transform duration-300 ease-in-out border-0 ${
        isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
      }`}
      style={{ height: isMobile ? '28px' : '36px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full">
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm h-full py-1">
          {/* Left side - Contact info */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-6">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>079-520678</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span className="hidden sm:inline">maitreecooperative@gmail.com</span>
              <span className="sm:hidden text-xs">maitree@gmail.com</span>
            </div>
          </div>
          
          {/* Right side - Office hours and location */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="hidden sm:inline">{t('contactBar.hours', 'Sun-Fri: 10:00 AM - 5:00 PM')}</span>
              <span className="sm:hidden text-xs">{t('contactBar.hoursMobile', 'Mon-Fri: 10-5')}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>Resunga Municipality-8, Gulmi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBar;