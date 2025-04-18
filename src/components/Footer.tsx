
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Maitree Cooperative</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Established to improve members' living standards through agricultural 
              initiatives, financial services, and community development.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="#" 
                aria-label="Facebook"
                className="text-gray-500 hover:text-primary transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                aria-label="Instagram"
                className="text-gray-500 hover:text-primary transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                aria-label="Twitter"
                className="text-gray-500 hover:text-primary transition-colors duration-300"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-primary transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-600 hover:text-primary transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/members" className="text-sm text-gray-600 hover:text-primary transition-colors duration-300">
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm text-gray-600 hover:text-primary transition-colors duration-300">
                  News & Notices
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-sm text-gray-600 hover:text-primary transition-colors duration-300">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services#savings" className="text-sm text-gray-600 hover:text-primary transition-colors duration-300">
                  Savings
                </Link>
              </li>
              <li>
                <Link to="/services#loans" className="text-sm text-gray-600 hover:text-primary transition-colors duration-300">
                  Loans
                </Link>
              </li>
              <li>
                <Link to="/services#remittance" className="text-sm text-gray-600 hover:text-primary transition-colors duration-300">
                  Remittance
                </Link>
              </li>
              <li>
                <Link to="/services#mobile-banking" className="text-sm text-gray-600 hover:text-primary transition-colors duration-300">
                  Mobile Banking
                </Link>
              </li>
              <li>
                <Link to="/services#cooperative-store" className="text-sm text-gray-600 hover:text-primary transition-colors duration-300">
                  Cooperative Store
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  रेसुङ्गा नगरपालिका - ८ गुल्मी
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-primary mr-2 flex-shrink-0" />
                <a href="mailto:maitreecooperative@gmail.com" className="text-sm text-gray-600 hover:text-primary transition-colors duration-300">
                  maitreecooperative@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-primary mr-2 flex-shrink-0" />
                <a href="tel:+9779876543210" className="text-sm text-gray-600 hover:text-primary transition-colors duration-300">
                  +977 9876543210
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Maitree Multipurpose Cooperative. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-primary transition-colors duration-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-sm text-gray-500 hover:text-primary transition-colors duration-300">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/sitemap" className="text-sm text-gray-500 hover:text-primary transition-colors duration-300">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
