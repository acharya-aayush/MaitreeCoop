import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';
import NepalBranchMap from '@/components/NepalBranchMap';

const MapTest = () => {
  return (
    <div className="min-h-screen bg-white">
      <ContactBar />
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nepal Branch Map Test
            </h1>
            <p className="text-lg text-gray-600">
              Testing our custom Nepal SVG map with branch locations
            </p>
          </div>
          
          <NepalBranchMap />
          
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Click on any branch marker or card to see details and get directions!
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MapTest;