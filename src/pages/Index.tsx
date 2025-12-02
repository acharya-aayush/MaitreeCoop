
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin, Calendar, FileText, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import GoogleMap from '@/components/GoogleMap';
import OptimizedImage from '@/components/OptimizedImage';
import { useIntroductionSection } from '@/hooks/useContentSections';
import { getOptimizedImageUrl, client as sanityClient, queries } from '@/lib/sanity';

interface NewsArticle {
  _id: string;
  title: string;
  titleNepali?: string;
  slug: { current: string };
  publishedAt: string;
  category: string;
}

const Index = () => {
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const { introSection, loading: introLoading } = useIntroductionSection();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAboutVisible(true);
          if (aboutSectionRef.current) observer.unobserve(aboutSectionRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current);
    }

    return () => {
      if (aboutSectionRef.current) observer.unobserve(aboutSectionRef.current);
    };
  }, []);

  // Fetch latest news articles
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setNewsLoading(true);
        console.log('Fetching news from Sanity...', {
          projectId: sanityClient.config().projectId,
          dataset: sanityClient.config().dataset,
          useCdn: sanityClient.config().useCdn
        });
        const data = await sanityClient.fetch(queries.news);
        console.log('News data received:', data);
        // Get only the latest 3 articles
        setNewsArticles((data || []).slice(0, 3));
      } catch (error) {
        console.error("Error fetching news:", error);
        console.error("Sanity client config:", sanityClient.config());
        // Fallback to empty array to prevent crashes
        setNewsArticles([]);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Fallback data if no news is loaded
  const notices = [
    {
      id: 1,
      titleKey: 'news.items.agm.title',
      date: 'June 15, 2023',
      typeKey: 'news.categories.notices',
      link: '/news/annual-general-meeting'
    },
    {
      id: 2,
      titleKey: 'news.items.loanProgram.title',
      date: 'May 28, 2023',
      typeKey: 'news.categories.news',
      link: '/news/agricultural-loan-program'
    },
    {
      id: 3,
      titleKey: 'news.items.mobileUpdate.title',
      date: 'May 15, 2023',
      typeKey: 'news.categories.notices',
      link: '/news/mobile-banking-update'
    }
  ];

  return (
    <>
      {/* Official Website Verification Banner */}
      <div className="bg-green-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-sm">
            {i18n.language === 'np' 
              ? '⚠️ नक्कली वेबसाइटहरूबाट सावधान रहनुहोस्। यो आधिकारिक मैत्री सहकारी वेबसाइट हो।'
              : '⚠️ Beware of fake websites. This is the official Maitree Cooperative website.'}
          </p>
          <Link 
            to="/verify" 
            className="text-white underline hover:text-green-100 transition-colors text-sm whitespace-nowrap font-semibold"
          >
            {i18n.language === 'np' ? 'प्रमाणीकरण हेर्नुहोस् →' : 'Verify Now →'}
          </Link>
        </div>
      </div>
      
      {/* Hero Section */}
      <Hero />
      
      {/* Introduction Section */}
      <section 
        ref={aboutSectionRef}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {introLoading ? (
            <div className="animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="aspect-[4/3] bg-gray-200 rounded-2xl"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : introSection ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div 
                className={cn(
                  "relative rounded-2xl overflow-hidden transition-all duration-1000",
                  aboutVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                )}
              >
                {introSection.sectionImage ? (
                  <OptimizedImage
                    image={introSection.sectionImage}
                    alt={i18n.language === 'ne' && introSection.headingNepali ? introSection.headingNepali : introSection.heading}
                    preset="large"
                    className="aspect-[4/3] rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                  />
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-tr from-green-100 to-white rounded-2xl flex items-center justify-center p-8">
                    {introSection.foundingVision ? (
                      <div className="text-center space-y-4">
                        <h3 className="text-2xl font-bold text-green-800">
                          {i18n.language === 'ne' && introSection.foundingVision.quoteNepali ? 'हाम्रो दृष्टिकोण' : 'Our Founding Vision'}
                        </h3>
                        <p className="text-gray-600 italic">
                          "{i18n.language === 'ne' && introSection.foundingVision.quoteNepali ? introSection.foundingVision.quoteNepali : introSection.foundingVision.quote}"
                        </p>
                        <p className="text-sm text-gray-500">
                          {i18n.language === 'ne' && introSection.foundingVision.authorNepali ? introSection.foundingVision.authorNepali : introSection.foundingVision.author}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <h3 className="text-2xl font-bold text-green-800">{t('about.foundingVision')}</h3>
                        <p className="text-gray-600 italic">"{t('about.founderQuote')}"</p>
                        <p className="text-sm text-gray-500">{t('about.founderName')}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Decorative elements */}
                <div className="absolute bottom-5 right-5 w-20 h-20 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-800">मैत्री</span>
                </div>
              </div>
              
              {/* Text Content */}
              <div 
                className={cn(
                  "space-y-6 transition-all duration-1000 delay-300",
                  aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
              >
                <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
                  {i18n.language === 'ne' && introSection.headingNepali ? introSection.headingNepali : introSection.heading}
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  {t('about.subtitle')}
                </h2>
                
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 text-justify whitespace-pre-line">
                    {i18n.language === 'ne' && introSection.contentNepali ? introSection.contentNepali : introSection.content}
                  </p>
                </div>
                
                {/* Highlights */}
                {introSection.highlights && introSection.highlights.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                    {introSection.highlights
                      .sort((a, b) => a.displayOrder - b.displayOrder)
                      .slice(0, 4)
                      .map((highlight, index) => (
                        <div key={index} className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {highlight.value}
                          </div>
                          <div className="text-sm text-gray-600">
                            {i18n.language === 'ne' && highlight.titleNepali ? highlight.titleNepali : highlight.title}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
                
                <div className="pt-2">
                  <Link 
                    to="/about" 
                    className="button-primary flex items-center"
                  >
                    {t('about.learnStory')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            // Fallback to translation keys if no Sanity data
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="aspect-[4/3] bg-gradient-to-tr from-green-100 to-white rounded-2xl flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-green-800">{t('about.foundingVision')}</h3>
                  <p className="text-gray-600 italic">"{t('about.founderQuote')}"</p>
                  <p className="text-sm text-gray-500">{t('about.founderName')}</p>
                </div>
              </div>
              <div className="space-y-6">
                <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
                  {t('about.title')}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">{t('about.subtitle')}</h2>
                <p className="text-gray-600 text-justify">{t('about.description')}</p>
                <div className="pt-2">
                  <Link to="/about" className="button-primary flex items-center">
                    {t('about.learnStory')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              {t('services.title')}
            </span>
            
            <h2 className="mt-4 text-3xl md:text-4xl font-bold">
              {t('services.subtitle')}
            </h2>
            
            <p className="mt-4 text-lg text-gray-600">
              {t('services.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title={t('services.savings.title')}
              description={t('services.savings.description')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              linkTo="/services#savings"
              delay={100}
            />
            
            <ServiceCard
              title={t('services.loans.title')}
              description={t('services.loans.description')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              linkTo="/services#loans"
              delay={200}
            />
            
            <ServiceCard
              title={t('hero.mobile.title')}
              description={t('hero.mobile.description')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              }
              linkTo="/services#mobile-banking"
              delay={300}
            />
            
            <ServiceCard
              title={t('services.store.title')}
              description={t('services.store.description')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              }
              linkTo="/services#cooperative-store"
              delay={400}
            />
            
            <ServiceCard
              title={t('services.agriculture.title')}
              description={t('services.agriculture.description')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              }
              linkTo="/services#agricultural-support"
              delay={500}
            />
            
            <ServiceCard
              title="Maitree Yatayat"
              description="Eco-friendly electric vehicle transportation service with comfortable seating, free WiFi, and special discounts for members."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              }
              linkTo="/services#transport"
              delay={600}
            />
              delay={500}
            />
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/services" 
              className="button-primary inline-flex items-center"
            >
              {t('services.viewAllServices')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* News & Notices Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
                {t('news.stayUpdated')}
              </span>
              
              <h2 className="mt-4 text-3xl md:text-4xl font-bold">
                {t('news.title')}
              </h2>
            </div>
            
            <Link 
              to="/news" 
              className="mt-4 md:mt-0 text-green-600 font-medium hover:text-green-800 transition-colors flex items-center"
            >
              {t('news.viewAllNews')}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsLoading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="glass-card rounded-xl p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              ))
            ) : (
              // Dynamic news articles or fallback
              (newsArticles.length > 0 ? newsArticles : notices.slice(0, 3)).map((item, index) => {
                const isNewsArticle = 'slug' in item;
                const title = isNewsArticle 
                  ? (i18n.language === 'np' && item.titleNepali ? item.titleNepali : (item.title || 'Untitled'))
                  : t(item.titleKey);
                const date = isNewsArticle 
                  ? (item.publishedAt ? formatDate(item.publishedAt) : 'No date') 
                  : item.date;
                const link = isNewsArticle 
                  ? (item.slug?.current ? `/news/${item.slug.current}` : '/news')
                  : item.link;
                const categoryText = isNewsArticle 
                  ? (item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : 'News')
                  : t(item.typeKey);

                return (
                  <div 
                    key={isNewsArticle ? item._id : item.id}
                    className="glass-card rounded-xl p-6 hover-card"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="inline-block py-1 px-2 rounded bg-green-100 text-green-800 text-xs font-medium">
                        {categoryText}
                      </span>
                      <span className="text-sm text-gray-500">{date}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">{title}</h3>
                    
                    <Link 
                      to={link} 
                      className="text-green-600 font-medium hover:text-green-800 transition-colors flex items-center text-sm"
                    >
                      {t('news.readMore')}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
      
      {/* Quick Links Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-12">
            {t('quickLinks.title')}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/members" className="glass-card py-8 px-4 rounded-xl hover-card flex flex-col items-center text-center">
              <Users className="h-8 w-8 text-green-600 mb-4" />
              <span className="text-sm font-medium">{t('quickLinks.membership')}</span>
            </Link>
            
            <Link to="/financial" className="glass-card py-8 px-4 rounded-xl hover-card flex flex-col items-center text-center">
              <FileText className="h-8 w-8 text-green-600 mb-4" />
              <span className="text-sm font-medium">{t('quickLinks.financialReports')}</span>
            </Link>
            
            <Link to="/community" className="glass-card py-8 px-4 rounded-xl hover-card flex flex-col items-center text-center">
              <Calendar className="h-8 w-8 text-green-600 mb-4" />
              <span className="text-sm font-medium">{t('quickLinks.eventsCalendar')}</span>
            </Link>
            
            <Link to="/contact" className="glass-card py-8 px-4 rounded-xl hover-card flex flex-col items-center text-center">
              <MapPin className="h-8 w-8 text-green-600 mb-4" />
              <span className="text-sm font-medium">{t('quickLinks.findUs')}</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-6">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase">
              {t('contact.title')}
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {t('contact.subtitle')}
            </h2>
            
            <p className="text-gray-600">
              {t('contact.description')}
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start">
                <MapPin className="text-green-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">{t('common.address')}</h3>
                  <p className="text-gray-600">रेसुङ्गा नगरपालिका-८, गुल्मी</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="text-green-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">{t('common.email')}</h3>
                  <a 
                    href="mailto:maitreecooperative@gmail.com"
                    className="text-green-600 hover:text-green-800 transition-colors"
                  >
                    maitreecooperative@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-green-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">{t('common.phone')}</h3>
                  <a 
                    href="tel:079520678"
                    className="text-green-600 hover:text-green-800 transition-colors"
                  >
                    079-520678
                  </a>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <Link 
                to="/contact" 
                className="button-primary inline-flex items-center"
              >
                {t('contact.title')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Find Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-medium tracking-wider uppercase mb-4">
                {t('map.mainOfficeLocation')}
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('contact.getInTouch.title')}
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-green-600 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">मैत्री बहुउद्देश्यीय सहकारी संस्था</p>
                    <p className="text-gray-600">रेसुङ्गा नगरपालिका-८, गुल्मी</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-green-600 mr-3" />
                  <p className="text-gray-600">079-520678</p>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-green-600 mr-3" />
                  <p className="text-gray-600">maitreecooperative@gmail.com</p>
                </div>
              </div>
              
              <Link 
                to="/contact" 
                className="button-primary inline-flex items-center"
              >
                {t('footer.contactUs')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div>
              <GoogleMap
                location="Resunga Municipality-8, Gulmi, Nepal"
                height="400px"
                className="w-full"
                showDirectionsLink={true}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('cta.joinTitle')}
          </h2>
          
          <p className="text-green-100">
            {t('cta.joinDescription')}
          </p>
          
          <div className="pt-4">
            <Link 
              to="/members" 
              className="bg-white text-green-700 px-6 py-3 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 font-medium inline-block"
            >
              {t('cta.becomeMember')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
