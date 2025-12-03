
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from "@/hooks/use-toast";
import GoogleMap from '@/components/GoogleMap';
import MultiLocationMap from '@/components/MultiLocationMap';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to our secure API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        toast({
          title: t('contact.contactForm.successTitle'),
          description: t('contact.contactForm.successMessage'),
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(result.error || 'Failed to submit message');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: error.message || "There was an error submitting your message. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="page-header text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">{t('contact.title')}</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>
      
      {/* Contact Information */}
      <section className="py-6 md:py-10 px-4 sm:px-6">
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
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
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('contact.mainOffice.emailLabel')}</h3>
                      <p className="text-gray-600">{t('contact.mainOffice.email')}</p>
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
              
              {/* Interactive Google Map */}
              <GoogleMap
                location="Resunga Municipality-8, Gulmi, Nepal"
                title={t('map.mainOfficeLocation')}
                height="300px"
                className="w-full"
                showDirectionsLink={true}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Centers with Map */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">{t('contact.serviceCenters.title')}</h2>
            <p className="mt-2 text-gray-600">{t('contact.serviceCenters.subtitle')}</p>
          </div>
          
          <MultiLocationMap
            mainOffice={{
              name: "मैत्री बहुउद्देश्यीय सहकारी संस्था (Head Office)",
              address: "Resunga Municipality-8, Gulmi, Nepal",
              phone: "079-520678",
              coordinates: "28.06633,83.24750"
            }}
            branches={[
              {
                name: "Dhurkot Branch",
                address: "Dhurkot, Gulmi, Nepal",
                phone: "9765875701",
                coordinates: "28.10733,83.15792"
              },
              {
                name: "Ishma Branch", 
                address: "Ishma, Gulmi, Nepal",
                phone: "9765875702",
                coordinates: "28.19005,83.20319"
              },
              {
                name: "Purkot Branch",
                address: "Purkot, Gulmi, Nepal", 
                phone: "9765875703",
                coordinates: "28.14386,83.07331"
              },
              {
                name: "Aapchaur Branch",
                address: "Aapchaur, Gulmi, Nepal",
                phone: "9765875705",
                coordinates: "28.11953,83.34686"
              },
              {
                name: "Kalikanagar Branch",
                address: "Kalikanagar, Gulmi, Nepal",
                phone: "974804507",
                coordinates: "27.67970,83.46094"
              },
              {
                name: "Baletaksar Branch",
                address: "Baletaksar, Gulmi, Nepal",
                phone: "079410078",
                coordinates: "27.99127,83.38925"
              },
              {
                name: "Sandhikharkha Branch",
                address: "Sandhikharkha, Gulmi, Nepal",
                phone: "077590678",
                coordinates: "TBD"
              }
            ]}
            height="450px"
            className="w-full"
            showBranchList={true}
          />
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-6 md:py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
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
    </>
  );
};

export default Contact;
