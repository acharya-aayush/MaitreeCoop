
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Members = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="page-header text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">Members Area</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Access exclusive member resources and information about joining our cooperative.
          </p>
        </div>
      </div>
      
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-sm mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Member Benefits</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Access to low-interest loans for agriculture, business, education, and personal needs</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Competitive interest rates on various savings accounts</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Technical training and support for agricultural activities</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Patronage dividends based on cooperative's annual profits</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Voting rights at general assemblies and eligibility for election to board positions</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Access to the cooperative store with fair-priced goods</span>
              </li>
            </ul>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-bold text-green-700 mb-4">How to Join</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>Complete a membership application form at our office</li>
                <li>Pay the membership fee of Rs. 100</li>
                <li>Purchase a minimum of one share (Rs. 1,000 per share)</li>
                <li>Provide citizenship certificate or other valid ID</li>
                <li>Submit a passport-sized photograph</li>
              </ol>
              
              <div className="mt-6">
                <a 
                  href="#" 
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Download Application Form
                </a>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-bold text-green-700 mb-4">Member Login</h2>
              <p className="text-gray-600 mb-4">
                Existing members can log in to access their account information, transaction history, and other exclusive resources.
              </p>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Member ID or Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Enter your ID or email"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Sign In
                  </button>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="font-medium text-green-600 hover:text-green-500">
                    Forgot your password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Members;
