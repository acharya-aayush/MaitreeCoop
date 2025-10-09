
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PiggyBank, 
  Banknote, 
  Smartphone, 
  Store, 
  Sprout, 
  Users, 
  Calendar, 
  CreditCard, 
  FileText,
  Bus
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';

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
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <ContactBar />
      <Navbar />
      
      <div className="page-header text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">{t('services.title')}</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('services.intro')}
          </p>
        </div>
      </div>
      
      <section className="section-container">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              {t('services.what.title')}
            </span>
            <h2 className="mt-4 text-3xl font-bold">{t('services.what.subtitle')}</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              {t('services.what.description')}
            </p>
          </div>
          
          {/* Featured Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <ServiceCard 
              icon={<PiggyBank className="h-7 w-7 text-green-600" />}
              title={t('services.savings.title')}
              description={t('services.savings.description')}
            />
            
            <ServiceCard 
              icon={<Banknote className="h-7 w-7 text-green-600" />}
              title={t('services.loans.title')}
              description={t('services.loans.description')}
            />
            
            <ServiceCard 
              icon={<Store className="h-7 w-7 text-green-600" />}
              title={t('services.store.title')}
              description={t('services.store.description')}
            />
            
            <ServiceCard 
              icon={<Smartphone className="h-7 w-7 text-green-600" />}
              title={t('services.mobile.title')}
              description={t('services.mobile.description')}
            />
            
            <ServiceCard 
              icon={<Sprout className="h-7 w-7 text-green-600" />}
              title={t('services.agriculture.title')}
              description={t('services.agriculture.description')}
            />
            
            <ServiceCard 
              icon={<Bus className="h-7 w-7 text-green-600" />}
              title={t('services.transport.title')}
              description={t('services.transport.description')}
            />
          </div>
          
          {/* Detailed Service Information */}
          <div className="mt-16">
            <Tabs defaultValue="savings" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-green-50">
                  <TabsTrigger value="savings">{t('services.tabs.savings')}</TabsTrigger>
                  <TabsTrigger value="loans">{t('services.tabs.loans')}</TabsTrigger>
                  <TabsTrigger value="store">{t('services.tabs.store')}</TabsTrigger>
                  <TabsTrigger value="mobile">{t('services.tabs.mobile')}</TabsTrigger>
                  <TabsTrigger value="transport">{t('services.tabs.transport')}</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="savings" className="mt-6">
                <div className="bg-green-50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">{t('services.savingsPlans.title')}</h3>
                  <p className="mb-6 text-gray-700">
                    {t('services.savingsPlans.description')}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">{t('services.savingsPlans.regular.title')}</h4>
                      <ul className="space-y-2 text-gray-600">
                        {(t('services.savingsPlans.regular.features', { returnObjects: true }) as string[]).map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">{t('services.savingsPlans.fixed.title')}</h4>
                      <ul className="space-y-2 text-gray-600">
                        {(t('services.savingsPlans.fixed.features', { returnObjects: true }) as string[]).map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">{t('services.savingsPlans.children.title')}</h4>
                      <ul className="space-y-2 text-gray-600">
                        {(t('services.savingsPlans.children.features', { returnObjects: true }) as string[]).map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">{t('services.savingsPlans.retirement.title')}</h4>
                      <ul className="space-y-2 text-gray-600">
                        {(t('services.savingsPlans.retirement.features', { returnObjects: true }) as string[]).map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <Link 
                      to="/members" 
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow transition-all duration-300"
                    >
                      {t('services.savingsPlans.cta')}
                    </Link>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="loans" className="mt-6">
                <div className="bg-green-50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">{t('services.loans.title')}</h3>
                  <p className="mb-6 text-gray-700">
                    {t('services.loans.description')}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">{t('services.loans.agricultural.title')}</h4>
                      <p className="text-gray-600 mb-3">
                        {t('services.loans.agricultural.description')}
                      </p>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        {(t('services.loans.agricultural.features', { returnObjects: true }) as string[]).map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">{t('services.loans.business.title')}</h4>
                      <p className="text-gray-600 mb-3">
                        {t('services.loans.business.description')}
                      </p>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        {(t('services.loans.business.features', { returnObjects: true }) as string[]).map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">{t('services.loans.personal.title')}</h4>
                      <p className="text-gray-600 mb-3">
                        {t('services.loans.personal.description')}
                      </p>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        {(t('services.loans.personal.features', { returnObjects: true }) as string[]).map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">{t('services.loans.livestock.title')}</h4>
                      <p className="text-gray-600 mb-3">
                        {t('services.loans.livestock.description')}
                      </p>
                      <ul className="space-y-1 text-gray-600 text-sm">
                        {(t('services.loans.livestock.features', { returnObjects: true }) as string[]).map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <Link 
                      to="/members" 
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow transition-all duration-300"
                    >
                      {t('services.loans.apply')}
                    </Link>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="store" className="mt-6">
                <div className="bg-green-50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">{t('services.store.title')}</h3>
                  <p className="mb-6 text-gray-700">
                    {t('services.store.description')}
                  </p>
                  
                  <div className="glass-card p-6 rounded-xl mb-6">
                    <h4 className="font-semibold text-lg mb-3">{t('services.store.products.title')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-green-700 mb-2">{t('services.store.products.agricultural.title')}</h5>
                        <ul className="space-y-1 text-gray-600">
                          {(t('services.store.products.agricultural.items', { returnObjects: true }) as string[]).map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-green-700 mb-2">{t('services.store.products.livestock.title')}</h5>
                        <ul className="space-y-1 text-gray-600">
                          {(t('services.store.products.livestock.items', { returnObjects: true }) as string[]).map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-green-700 mb-2">{t('services.store.products.daily.title')}</h5>
                        <ul className="space-y-1 text-gray-600">
                          {(t('services.store.products.daily.items', { returnObjects: true }) as string[]).map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl">
                    <h4 className="font-semibold text-lg mb-3">{t('services.store.benefits.title')}</h4>
                    <ul className="space-y-2 text-gray-600">
                      {(t('services.store.benefits.list', { returnObjects: true }) as string[]).map((benefit, index) => (
                        <li key={index}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <p className="text-gray-700 mb-4">
                      {t('services.store.visit')}
                    </p>
                    <Link 
                      to="/contact" 
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow transition-all duration-300"
                    >
                      {t('services.store.findLocations')}
                    </Link>
                  </div>
                </div>
              </TabsContent>              <TabsContent value="mobile" className="mt-6">
                <div className="bg-green-50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">{t('services.mobile.title')}</h3>
                  <p className="mb-6 text-gray-700">
                    {t('services.mobile.description')}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-3">{t('services.mobile.features.title')}</h4>
                      <ul className="space-y-2 text-gray-600">
                        {(t('services.mobile.features.list', { returnObjects: true }) as string[]).map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-3">{t('services.mobile.benefits.title')}</h4>
                      <ul className="space-y-2 text-gray-600">
                        {(t('services.mobile.benefits.list', { returnObjects: true }) as string[]).map((benefit, index) => (
                          <li key={index}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="text-center bg-white rounded-xl p-6 max-w-xl mx-auto">
                    <h4 className="font-semibold text-lg mb-3">{t('services.mobile.howToStart.title')}</h4>
                    <ol className="space-y-3 text-left text-gray-700">
                      {(t('services.mobile.howToStart.steps', { returnObjects: true }) as string[]).map((step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">{index + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="transport" className="mt-6">
                <div className="bg-green-50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">{t('services.transport.title')}</h3>
                  <p className="mb-6 text-gray-700">
                    {t('services.transport.description')}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-3">{t('services.transport.vehicles.title')}</h4>
                      <p className="text-gray-600 mb-3">{t('services.transport.vehicles.description')}</p>
                      <ul className="space-y-2 text-gray-600">
                        {(t('services.transport.vehicles.types', { returnObjects: true }) as string[]).map((type, index) => (
                          <li key={index}>• {type}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-3">{t('services.transport.routes.title')}</h4>
                      <p className="text-gray-600 mb-3">{t('services.transport.routes.description')}</p>
                      <ul className="space-y-2 text-gray-600">
                        {(t('services.transport.routes.list', { returnObjects: true }) as string[]).map((route, index) => (
                          <li key={index}>• {route}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-3">{t('services.transport.benefits.title')}</h4>
                      <p className="text-gray-600 mb-3">{t('services.transport.benefits.description')}</p>
                      <div className="bg-green-100 p-3 rounded-lg mb-3">
                        <p className="font-medium text-green-800">{t('services.transport.benefits.discount')}</p>
                      </div>
                      <ul className="space-y-2 text-gray-600">
                        {(t('services.transport.benefits.features', { returnObjects: true }) as string[]).map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-3">{t('services.transport.amenities.title')}</h4>
                      <ul className="space-y-2 text-gray-600">
                        {(t('services.transport.amenities.list', { returnObjects: true }) as string[]).map((amenity, index) => (
                          <li key={index}>• {amenity}</li>
                        ))}
                      </ul>
                    </div>
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
            <h2 className="text-2xl font-bold">{t('services.additional.title')}</h2>
            <p className="mt-2 text-gray-600">{t('services.additional.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-5 rounded-xl text-center hover-card">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">{t('services.additional.literacy.title')}</h3>
              <p className="text-sm text-gray-600">{t('services.additional.literacy.description')}</p>
            </div>
            
            <div className="glass-card p-5 rounded-xl text-center hover-card">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">{t('services.additional.community.title')}</h3>
              <p className="text-sm text-gray-600">{t('services.additional.community.description')}</p>
            </div>
            
            <div className="glass-card p-5 rounded-xl text-center hover-card">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">{t('services.additional.insurance.title')}</h3>
              <p className="text-sm text-gray-600">{t('services.additional.insurance.description')}</p>
            </div>
            
            <div className="glass-card p-5 rounded-xl text-center hover-card">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">{t('services.additional.documents.title')}</h3>
              <p className="text-sm text-gray-600">{t('services.additional.documents.description')}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold mb-6">{t('services.cta.title')}</h2>
          <p className="text-gray-600 mb-8">
            {t('services.cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow transition-all duration-300"
            >
              {t('services.cta.contact')}
            </Link>
            <Link 
              to="/members" 
              className="bg-white border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-full shadow transition-all duration-300"
            >
              {t('services.cta.member')}
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
