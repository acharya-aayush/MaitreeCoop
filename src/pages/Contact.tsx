
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: t('contact.contactForm.successTitle'),
        description: t('contact.contactForm.successMessage'),
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="page-header text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">{t('contact.title')}</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>
      
      {/* Contact Information */}
      <section className="section-container">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{t('contact.contactForm.title')}</h2>
                <p className="text-gray-600">
                  {t('contact.contactForm.description')}
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="glass-card p-6 rounded-xl">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.contactForm.fields.name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.contactForm.fields.email')}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.contactForm.fields.phone')}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.contactForm.fields.subject')}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.contactForm.fields.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? t('contact.contactForm.sending') : (
                    <>
                      {t('contact.contactForm.sendButton')}
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Contact Info & Map */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{t('contact.getInTouch.title')}</h2>
                <p className="text-gray-600">
                  {t('contact.getInTouch.description')}
                </p>
              </div>
              
              {/* Contact Details */}
              <div className="glass-card p-6 rounded-xl mb-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('contact.mainOffice.title')}</h3>
                      <p className="text-gray-600">{t('contact.mainOffice.name')}</p>
                      <p className="text-gray-600">{t('contact.mainOffice.address')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('contact.mainOffice.phoneLabel')}</h3>
                      <p className="text-gray-600">{t('contact.mainOffice.phone')}</p>
                      <p className="text-gray-600">{t('contact.mainOffice.landline')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('contact.mainOffice.emailLabel')}</h3>
                      <p className="text-gray-600">{t('contact.mainOffice.email')}</p>
                      <p className="text-gray-600">{t('contact.mainOffice.emailSecondary')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('contact.businessHours.title')}</h3>
                      <p className="text-gray-600">{t('contact.businessHours.weekdays.label')}: {t('contact.businessHours.weekdays.hours')}</p>
                      <p className="text-gray-600">{t('contact.businessHours.saturday.label')}: {t('contact.businessHours.saturday.hours')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map (Placeholder) */}
              <div className="glass-card rounded-xl overflow-hidden h-72 bg-green-50">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-medium">{t('contact.map.title')}</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {t('contact.map.location')}
                    </p>
                    <p className="text-xs text-gray-500 mt-4">
                      {t('contact.map.placeholder')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Centers */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">{t('contact.serviceCenters.title')}</h2>
            <p className="mt-2 text-gray-600">{t('contact.serviceCenters.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(t('contact.serviceCenters.centers', { returnObjects: true }) as Record<string, any>).map(([key, center]) => (
              <div key={key} className="glass-card p-5 rounded-xl hover-card">
                <h3 className="font-semibold mb-2">{center.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{center.address}</p>
                <p className="text-sm text-gray-600">{t('contact.serviceCenters.phoneLabel')}: {center.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">{t('contact.faq.title')}</h2>
            <p className="mt-2 text-gray-600">{t('contact.faq.subtitle')}</p>
          </div>
          
          <div className="space-y-6">
            {Object.entries(t('contact.faq.questions', { returnObjects: true }) as Record<string, any>).map(([key, faq]) => (
              <div key={key} className="glass-card p-6 rounded-xl">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
