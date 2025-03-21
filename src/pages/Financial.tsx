
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Financial = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="page-header text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">Financial Reports & Documents</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Access our annual reports, meeting minutes, and financial statements.
          </p>
        </div>
      </div>
      
      <div className="section-container">
        <p className="text-center text-gray-500">Financial Reports & Documents page content coming soon...</p>
      </div>
      
      <Footer />
    </div>
  );
};

export default Financial;
