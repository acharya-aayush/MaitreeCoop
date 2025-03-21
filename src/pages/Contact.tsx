
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
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
        title: "Message Sent!",
        description: "We've received your message and will get back to you soon.",
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
          <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for any questions or assistance you might need.
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
                <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
                <p className="text-gray-600">
                  Fill out the form below, and our team will get back to you as soon as possible.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="glass-card p-6 rounded-xl">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
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
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
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
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
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
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Contact Info & Map */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-gray-600">
                  You can reach us through various channels or visit our offices in person.
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
                      <h3 className="font-semibold mb-1">Head Office</h3>
                      <p className="text-gray-600">रेसुङ्गा नगरपालिका - ८ गुल्मी</p>
                      <p className="text-gray-600">Tamghas, Gulmi, Nepal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-gray-600">+977 9876543210</p>
                      <p className="text-gray-600">+977 079-520123</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-gray-600">maitreecooperative@gmail.com</p>
                      <p className="text-gray-600">info@maitreecooperative.org.np</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Working Hours</h3>
                      <p className="text-gray-600">Sunday - Friday: 10:00 AM - 5:00 PM</p>
                      <p className="text-gray-600">Saturday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map (Placeholder) */}
              <div className="glass-card rounded-xl overflow-hidden h-72 bg-green-50">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-medium">Map Location</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      रेसुङ्गा नगरपालिका - ८ गुल्मी
                    </p>
                    <p className="text-xs text-gray-500 mt-4">
                      Interactive map will be integrated here
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
            <h2 className="text-2xl font-bold">Our Service Centers</h2>
            <p className="mt-2 text-gray-600">Find us at these locations across multiple districts</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="glass-card p-5 rounded-xl hover-card">
              <h3 className="font-semibold mb-2">Tamghas (Head Office)</h3>
              <p className="text-sm text-gray-600 mb-1">Resunga Municipality-8, Gulmi</p>
              <p className="text-sm text-gray-600">Phone: +977 079-520123</p>
            </div>
            
            <div className="glass-card p-5 rounded-xl hover-card">
              <h3 className="font-semibold mb-2">Baletaxar Branch</h3>
              <p className="text-sm text-gray-600 mb-1">Baletaxar, Gulmi</p>
              <p className="text-sm text-gray-600">Phone: +977 98XXXXXXXX</p>
            </div>
            
            <div className="glass-card p-5 rounded-xl hover-card">
              <h3 className="font-semibold mb-2">Dhurkot Branch</h3>
              <p className="text-sm text-gray-600 mb-1">Dhurkot, Gulmi</p>
              <p className="text-sm text-gray-600">Phone: +977 98XXXXXXXX</p>
            </div>
            
            <div className="glass-card p-5 rounded-xl hover-card">
              <h3 className="font-semibold mb-2">Ishma Branch</h3>
              <p className="text-sm text-gray-600 mb-1">Ishma, Gulmi</p>
              <p className="text-sm text-gray-600">Phone: +977 98XXXXXXXX</p>
            </div>
            
            <div className="glass-card p-5 rounded-xl hover-card">
              <h3 className="font-semibold mb-2">Purkotdah Branch</h3>
              <p className="text-sm text-gray-600 mb-1">Purkotdah, Gulmi</p>
              <p className="text-sm text-gray-600">Phone: +977 98XXXXXXXX</p>
            </div>
            
            <div className="glass-card p-5 rounded-xl hover-card">
              <h3 className="font-semibold mb-2">Ampchaur Branch</h3>
              <p className="text-sm text-gray-600 mb-1">Ampchaur, Gulmi</p>
              <p className="text-sm text-gray-600">Phone: +977 98XXXXXXXX</p>
            </div>
            
            <div className="glass-card p-5 rounded-xl hover-card">
              <h3 className="font-semibold mb-2">Butwal Branch</h3>
              <p className="text-sm text-gray-600 mb-1">Butwal, Rupandehi</p>
              <p className="text-sm text-gray-600">Phone: +977 98XXXXXXXX</p>
            </div>
            
            <div className="glass-card p-5 rounded-xl hover-card">
              <h3 className="font-semibold mb-2">Taulihawa Branch</h3>
              <p className="text-sm text-gray-600 mb-1">Taulihawa, Kapilbastu</p>
              <p className="text-sm text-gray-600">Phone: +977 98XXXXXXXX</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-2 text-gray-600">Find quick answers to common questions</p>
          </div>
          
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-semibold mb-2">What are the requirements to become a member?</h3>
              <p className="text-gray-600">
                To become a member, you need to be a resident of our service area, provide citizenship or identity proof, 
                fill out the membership form, and purchase at least one share (value determined by current share price).
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-semibold mb-2">How can I apply for a loan?</h3>
              <p className="text-gray-600">
                Loans are available to members who have maintained an active savings account for at least 3 months. 
                Visit any of our branches with your membership card to fill out a loan application form.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-semibold mb-2">What are the cooperative's working hours?</h3>
              <p className="text-gray-600">
                Our branches are open Sunday through Friday from 10:00 AM to 5:00 PM. We are closed on Saturdays and 
                national holidays. Mobile banking services are available 24/7.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-semibold mb-2">How do I access mobile banking services?</h3>
              <p className="text-gray-600">
                You need to register for mobile banking at any of our branches by bringing your membership card and 
                valid ID. After registration, you can download our app and log in with the provided credentials.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
