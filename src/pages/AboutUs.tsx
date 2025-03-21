
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users, Briefcase, Heart, Sprout, PiggyBank, Building } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="page-header text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Learn about our history, mission, and the people behind Maitree Multipurpose Cooperative.
          </p>
        </div>
      </div>
      
      {/* Mission Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              Our Mission
            </span>
            <h2 className="mt-4 text-3xl font-bold">Community Empowerment Through Cooperation</h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            Maitree Multipurpose Cooperative is dedicated to uplifting the local community by leveraging 
            cooperative values in every aspect of its operation. We believe in the power of cooperation 
            to transform lives and build sustainable communities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="glass-card p-6 rounded-xl hover-card">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Sprout className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Agricultural Excellence</h3>
                  <p className="text-gray-600">
                    Engage in agricultural production, collection, processing, and marketing based on cooperative values.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl hover-card">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Livestock & Enterprise</h3>
                  <p className="text-gray-600">
                    Commercialize animal husbandry and promote self-employment opportunities among members.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl hover-card">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Community Empowerment</h3>
                  <p className="text-gray-600">
                    Build social capital by increasing cooperation among members, improving living standards through savings and loans at concessional rates.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl hover-card">
              <div className="flex items-start mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Cooperative Advancement</h3>
                  <p className="text-gray-600">
                    Expand the cooperative movement throughout the district and beyond, touching more lives and communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* History Timeline */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              Our Journey
            </span>
            <h2 className="mt-4 text-3xl font-bold">A Brief History & Milestones</h2>
          </div>
          
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-green-200"></div>
            
            {/* Timeline items */}
            <div className="relative z-10">
              {/* Timeline item 1 */}
              <div className="mb-16 flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <div className="glass-card p-6 rounded-xl inline-block">
                    <h3 className="font-bold text-lg text-green-800">Registration & Foundation</h3>
                    <p className="text-sm text-gray-500 mb-2">1st Kartik 2058</p>
                    <p className="text-gray-700">
                      Registered under Cooperative Act 2048 and Regulation 2049 with 33 members and an initial capital of 13,200.
                    </p>
                  </div>
                </div>
                <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="flex-1 md:pl-8 hidden md:block"></div>
              </div>
              
              {/* Timeline item 2 */}
              <div className="mb-16 flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-8 hidden md:block"></div>
                <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="flex-1 md:pl-8 mb-4 md:mb-0">
                  <div className="glass-card p-6 rounded-xl inline-block">
                    <h3 className="font-bold text-lg text-green-800">Early Operations</h3>
                    <p className="text-sm text-gray-500 mb-2">2058-2064</p>
                    <p className="text-gray-700">
                      Started with savings & loan programs, microfinance awareness, dairy business, and a fair price shop. Later added electric vehicle service.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Timeline item 3 */}
              <div className="mb-16 flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <div className="glass-card p-6 rounded-xl inline-block">
                    <h3 className="font-bold text-lg text-green-800">First Expansion</h3>
                    <p className="text-sm text-gray-500 mb-2">2064</p>
                    <p className="text-gray-700">
                      Expanded operations to 17 Village Development Committees (VDCs), reaching more rural communities.
                    </p>
                  </div>
                </div>
                <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="flex-1 md:pl-8 hidden md:block"></div>
              </div>
              
              {/* Timeline item 4 */}
              <div className="mb-16 flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-8 hidden md:block"></div>
                <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">4</span>
                </div>
                <div className="flex-1 md:pl-8 mb-4 md:mb-0">
                  <div className="glass-card p-6 rounded-xl inline-block">
                    <h3 className="font-bold text-lg text-green-800">District-wide Growth</h3>
                    <p className="text-sm text-gray-500 mb-2">2072</p>
                    <p className="text-gray-700">
                      Operations expanded to 75 gavis in Gulmi and 4 gavis in Arghakhanchi, cementing our regional presence.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Timeline item 5 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <div className="glass-card p-6 rounded-xl inline-block">
                    <h3 className="font-bold text-lg text-green-800">Multi-District Reach</h3>
                    <p className="text-sm text-gray-500 mb-2">2077 - Present</p>
                    <p className="text-gray-700">
                      Extended to six districts (Gulmi, Palpa, Arghakhanchi, Kapilbastu, Rupandehi, and Nawalparasi) with headquarters in Tamghas and multiple service centers.
                    </p>
                    <p className="mt-2 font-medium text-green-800">
                      Today, we proudly serve 13,836 share members!
                    </p>
                  </div>
                </div>
                <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">5</span>
                </div>
                <div className="flex-1 md:pl-8 hidden md:block"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="section-container bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              Our Values
            </span>
            <h2 className="mt-4 text-3xl font-bold">What Guides Us</h2>
          </div>
          
          <div className="glass-card p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mr-4">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Community First</h3>
                  <p className="text-gray-600 text-sm">
                    We prioritize the welfare of our members and the broader community in all our decisions and actions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mr-4">
                  <PiggyBank className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Financial Inclusion</h3>
                  <p className="text-gray-600 text-sm">
                    We strive to make financial services accessible to all, especially those underserved by traditional banking.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mr-4">
                  <Sprout className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Sustainable Growth</h3>
                  <p className="text-gray-600 text-sm">
                    We believe in growing our cooperative in ways that are environmentally sustainable and socially responsible.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mr-4">
                  <Heart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Compassionate Service</h3>
                  <p className="text-gray-600 text-sm">
                    We approach our work with empathy and a genuine desire to improve lives through our services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Join Our Cooperative Community
          </h2>
          
          <p className="text-green-100">
            Become a member and be part of a movement that's transforming lives and building stronger communities.
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

export default AboutUs;
