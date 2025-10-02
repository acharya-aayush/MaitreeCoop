
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: t('navigation.home'), path: '/' },
    { name: t('navigation.aboutUs'), path: '/about' },
    { name: t('navigation.services'), path: '/services' },
    { name: t('navigation.members'), path: '/members' },
    { name: t('navigation.news'), path: '/news' },
    { name: t('navigation.gallery'), path: '/gallery' },
    { name: t('navigation.board'), path: '/board' },
    { name: t('navigation.financial'), path: '/financial' },
    { name: t('navigation.contact'), path: '/contact' },
    { name: t('navigation.community'), path: '/community' },
  ];

  return (
    <nav 
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        scrolled ? 'navbar-fixed navbar-scrolled' : 'navbar-fixed'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3 md:space-x-10">
          <div className="flex items-center justify-start">
            <Link to="/" className="flex items-center">
              <img 
                src="/images/logo.png" 
                alt="Maitree Cooperative Logo" 
                className="h-12 md:h-14 mr-2"
              />
              <div className="flex flex-col -ml-2">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
                  Maitree Cooperative
                </span>
                <span className="text-[10px] text-green-600 hidden md:inline-block leading-tight">
                  {t('navigation.tagline')}
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors duration-300 hover:text-primary whitespace-nowrap",
                  location.pathname === link.path ? "text-primary" : "text-foreground/80"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link 
              to="/members"
              className="px-5 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-all duration-300"
            >
              {t('navigation.members')}
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-500 ease-in-out overflow-hidden",
          isOpen ? "max-h-screen" : "max-h-0"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-lg border-t">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/members"
            className="block mt-4 px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-primary/90"
          >
            {t('navigation.members')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
