
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PiggyBank, 
  Banknote, 
  SendHorizontal, 
  Smartphone, 
  Store, 
  Sprout, 
  Users, 
  Calendar, 
  CreditCard, 
  FileText
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ServiceCard = ({ icon, title, description }) => (
  <div className="glass-card p-6 rounded-xl hover-card">
    <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="page-header text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">Our Services</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the comprehensive services we offer to our members and community.
          </p>
        </div>
      </div>
      
      <section className="section-container">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              What We Offer
            </span>
            <h2 className="mt-4 text-3xl font-bold">Services Designed For You</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our service offerings are designed to cater to the financial and practical needs of our members, 
              all while staying true to our cooperative principles.
            </p>
          </div>
          
          {/* Featured Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <ServiceCard 
              icon={<PiggyBank className="h-7 w-7 text-green-600" />}
              title="Savings (बचत)"
              description="We offer various savings plans tailored to different needs, helping members build financial security and achieve their goals."
            />
            
            <ServiceCard 
              icon={<Banknote className="h-7 w-7 text-green-600" />}
              title="Loans (ऋण)"
              description="Access affordable credit for personal, business, or agricultural needs with flexible repayment options and competitive rates."
            />
            
            <ServiceCard 
              icon={<SendHorizontal className="h-7 w-7 text-green-600" />}
              title="Remittance (रेमिट्यान्स)"
              description="Send and receive money safely and quickly, with both domestic and international transfer options available."
            />
            
            <ServiceCard 
              icon={<Store className="h-7 w-7 text-green-600" />}
              title="Cooperative Store (सहकारी पसल)"
              description="Shop for quality agricultural inputs, household necessities, and more at fair prices at our cooperative store."
            />
            
            <ServiceCard 
              icon={<Smartphone className="h-7 w-7 text-green-600" />}
              title="Mobile Banking (मोबाइल बैंकिङ)"
              description="Manage your accounts, transfer funds, and access our services conveniently from your mobile device."
            />
            
            <ServiceCard 
              icon={<Sprout className="h-7 w-7 text-green-600" />}
              title="Agricultural Support"
              description="Get guidance on farming practices, access to quality seeds and fertilizers, and marketing support for your produce."
            />
          </div>
          
          {/* Detailed Service Information */}
          <div className="mt-16">
            <Tabs defaultValue="savings" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-green-50">
                  <TabsTrigger value="savings">Savings</TabsTrigger>
                  <TabsTrigger value="loans">Loans</TabsTrigger>
                  <TabsTrigger value="remittance">Remittance</TabsTrigger>
                  <TabsTrigger value="store">Cooperative Store</TabsTrigger>
                  <TabsTrigger value="mobile">Mobile Banking</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="savings" className="mt-6">
                <div className="bg-green-50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Savings Plans</h3>
                  <p className="mb-6 text-gray-700">
                    Saving with Maitree helps you build financial security while enabling us to provide loans to other members.
                    We offer several types of savings accounts to meet different needs:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">Regular Savings</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Minimum deposit: Rs. 100 per month</li>
                        <li>• Flexible deposits and withdrawals</li>
                        <li>• Competitive interest rates</li>
                        <li>• Quarterly interest calculation</li>
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">Fixed Deposit</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Higher interest rates</li>
                        <li>• Terms from 3 months to 5 years</li>
                        <li>• Minimum deposit: Rs. 10,000</li>
                        <li>• Loan facility against deposit</li>
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">Children's Savings</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Special account for minors</li>
                        <li>• Educational benefits</li>
                        <li>• Long-term saving option</li>
                        <li>• Bonus on maturity</li>
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">Retirement Savings</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Long-term security planning</li>
                        <li>• Higher interest rates</li>
                        <li>• Regular monthly contribution</li>
                        <li>• Additional benefits at maturity</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <Link 
                      to="/members" 
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow transition-all duration-300"
                    >
                      Open a Savings Account
                    </Link>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="loans" className="mt-6">
                <div className="bg-green-50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Loan Services</h3>
                  <p className="mb-6 text-gray-700">
                    We provide accessible and affordable credit to our members to help them meet their financial needs, 
                    grow their businesses, and improve their lives.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">Agricultural Loans</h4>
                      <p className="text-gray-600 mb-3">
                        Support for farming activities, equipment purchase, and seasonal requirements.
                      </p>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        <li>• Lower interest rates for farming</li>
                        <li>• Flexible repayment schedules aligned with harvest cycles</li>
                        <li>• Loans for seeds, equipment, irrigation, and more</li>
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">Business Loans</h4>
                      <p className="text-gray-600 mb-3">
                        Financing for small businesses, entrepreneurs, and self-employment initiatives.
                      </p>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        <li>• Capital for new and existing businesses</li>
                        <li>• Competitive interest rates</li>
                        <li>• Business guidance and support</li>
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">Personal Loans</h4>
                      <p className="text-gray-600 mb-3">
                        Credit for personal needs like education, health, home improvement, etc.
                      </p>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        <li>• Quick processing for emergencies</li>
                        <li>• Flexible loan amounts based on need</li>
                        <li>• Simple documentation process</li>
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">Livestock Loans</h4>
                      <p className="text-gray-600 mb-3">
                        Special loans for animal husbandry and livestock business development.
                      </p>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        <li>• Financing for purchase of livestock</li>
                        <li>• Support for dairy and poultry business</li>
                        <li>• Loans for sheds, feed, and equipment</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <Link 
                      to="/members" 
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow transition-all duration-300"
                    >
                      Apply for a Loan
                    </Link>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="remittance" className="mt-6">
                <div className="bg-green-50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Remittance Services</h3>
                  <p className="mb-6 text-gray-700">
                    Our remittance service allows for safe, quick, and affordable money transfers both within Nepal and internationally.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">Domestic Remittance</h4>
                      <p className="text-gray-600 mb-3">
                        Send money to family and friends across Nepal quickly and securely.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Same-day transfers</li>
                        <li>• Low service charges</li>
                        <li>• ID verification for security</li>
                        <li>• Available at all our service centers</li>
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">International Remittance</h4>
                      <p className="text-gray-600 mb-3">
                        Receive money from family members working abroad safely and conveniently.
                      </p>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Partnerships with global remittance providers</li>
                        <li>• Competitive exchange rates</li>
                        <li>• Quick processing time</li>
                        <li>• SMS notifications upon receipt</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="font-semibold text-lg mb-2">Our Remittance Partners:</h4>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="font-medium">Western Union</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="font-medium">IME</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="font-medium">Prabhu Money Transfer</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="font-medium">City Express</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="store" className="mt-6">
                <div className="bg-green-50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Cooperative Store</h3>
                  <p className="mb-6 text-gray-700">
                    Our Cooperative Store (सहकारी पसल) provides quality products at fair prices, ensuring our members have 
                    access to essential goods and agricultural inputs.
                  </p>
                  
                  <div className="glass-card p-6 rounded-xl mb-6">
                    <h4 className="font-semibold text-lg mb-3">Products Available:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-green-700 mb-2">Agricultural Inputs</h5>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Quality seeds</li>
                          <li>• Organic fertilizers</li>
                          <li>• Plant protection products</li>
                          <li>• Farming tools and equipment</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-green-700 mb-2">Livestock Supplies</h5>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Animal feed</li>
                          <li>• Veterinary medicines</li>
                          <li>• Dairy supplies</li>
                          <li>• Poultry equipment</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-green-700 mb-2">Daily Essentials</h5>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Groceries and food items</li>
                          <li>• Household goods</li>
                          <li>• Personal care products</li>
                          <li>• Stationery items</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl">
                    <h4 className="font-semibold text-lg mb-3">Benefits of Shopping at Our Store:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Fair pricing without unnecessary markup</li>
                      <li>• Quality-checked products</li>
                      <li>• Special discounts for cooperative members</li>
                      <li>• Expert advice on agricultural inputs</li>
                      <li>• Support for local producers and suppliers</li>
                    </ul>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <p className="text-gray-700 mb-4">
                      Visit our store at our main office in Tamghas or at any of our service centers.
                    </p>
                    <Link 
                      to="/contact" 
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow transition-all duration-300"
                    >
                      Find Our Locations
                    </Link>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="mobile" className="mt-6">
                <div className="bg-green-50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Mobile Banking</h3>
                  <p className="mb-6 text-gray-700">
                    Our Mobile Banking service (मोबाइल बैंकिङ) brings the cooperative to your fingertips, allowing you to 
                    manage your accounts and conduct transactions from anywhere, anytime.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-3">Features</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Check account balances and transaction history</li>
                        <li>• Transfer funds between accounts</li>
                        <li>• Pay bills and make payments</li>
                        <li>• Apply for loans</li>
                        <li>• Locate nearest service centers</li>
                        <li>• Receive transaction notifications</li>
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-3">Benefits</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• 24/7 access to your accounts</li>
                        <li>• Convenience of banking from anywhere</li>
                        <li>• Save time and travel costs</li>
                        <li>• Secure and encrypted transactions</li>
                        <li>• User-friendly interface</li>
                        <li>• Free service for members</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="text-center bg-white rounded-xl p-6 max-w-xl mx-auto">
                    <h4 className="font-semibold text-lg mb-3">How to Get Started</h4>
                    <ol className="space-y-3 text-left text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                        <span>Visit any of our service centers with your membership card and valid ID</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                        <span>Complete the mobile banking registration form</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                        <span>Download our mobile app from Google Play Store or App Store</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                        <span>Log in with your provided credentials and set up your password</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">5</span>
                        <span>Start using mobile banking services immediately</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Additional Services Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">Additional Services</h2>
            <p className="mt-2 text-gray-600">Other ways we support our members and community</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-5 rounded-xl text-center hover-card">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">Financial Literacy</h3>
              <p className="text-sm text-gray-600">Training programs to improve financial knowledge and skills</p>
            </div>
            
            <div className="glass-card p-5 rounded-xl text-center hover-card">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">Community Events</h3>
              <p className="text-sm text-gray-600">Regular gatherings, celebrations, and awareness programs</p>
            </div>
            
            <div className="glass-card p-5 rounded-xl text-center hover-card">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">Insurance Services</h3>
              <p className="text-sm text-gray-600">Various insurance options for health, crops, and livestock</p>
            </div>
            
            <div className="glass-card p-5 rounded-xl text-center hover-card">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">Document Services</h3>
              <p className="text-sm text-gray-600">Assistance with forms, applications, and official documents</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold mb-6">Have Questions About Our Services?</h2>
          <p className="text-gray-600 mb-8">
            Our team is ready to help you find the right services for your needs. Contact us today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow transition-all duration-300"
            >
              Contact Us
            </Link>
            <Link 
              to="/members" 
              className="bg-white border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-full shadow transition-all duration-300"
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

export default Services;
