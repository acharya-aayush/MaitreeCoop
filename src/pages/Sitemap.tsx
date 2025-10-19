import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Globe, ExternalLink, Search, MapPin, Building2, Users, FileText, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sitemap: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isNepali = i18n.language === 'ne';

  const toggleLanguage = () => {
    i18n.changeLanguage(isNepali ? 'en' : 'ne');
  };

  const sitePages = [
    {
      category: isNepali ? 'मुख्य पृष्ठहरू' : 'Main Pages',
      icon: <Building2 className="w-5 h-5" />,
      pages: [
        { 
          name: isNepali ? 'मुख्य पृष्ठ' : 'Home', 
          url: '/', 
          description: isNepali ? 'सहकारी अवलोकन र मुख्य सूचनाहरू' : 'Cooperative overview and main information',
          keywords: 'maitree multipurpose cooperative, sahakari, homepage, मैत्री बहुउद्देश्यीय सहकारी'
        },
        { 
          name: isNepali ? 'हाम्रो बारेमा' : 'About Us', 
          url: '/about', 
          description: isNepali ? 'सहकारीको इतिहास, मिसन र संगठनात्मक जानकारी' : 'Cooperative history, mission and organizational information',
          keywords: 'about maitree, multipurpose cooperative history, मैत्री बहुउद्देश्यीय इतिहास, sahakari jankari'
        },
        { 
          name: isNepali ? 'सेवाहरू' : 'Services', 
          url: '/services', 
          description: isNepali ? 'वित्तीय उत्पादन र सदस्य सेवाहरू' : 'Financial products and member services',
          keywords: 'cooperative services, financial products, loan services, बचत सेवा, ऋण सेवा'
        },
        { 
          name: isNepali ? 'निर्देशक बोर्ड' : 'Board of Directors', 
          url: '/board', 
          description: isNepali ? 'नेतृत्व टोली र संगठनात्मक संरचना' : 'Leadership team and organizational structure',
          keywords: 'board members, cooperative leadership, निर्देशक बोर्ड, नेतृत्व'
        },
        { 
          name: isNepali ? 'सदस्यहरू' : 'Members', 
          url: '/members', 
          description: isNepali ? 'सदस्य जानकारी र स्रोतहरू' : 'Member information and resources',
          keywords: 'cooperative members, membership, सदस्यता, साधाकारी सदस्य'
        },
      ]
    },
    {
      category: isNepali ? 'जानकारी र स्रोतहरू' : 'Information & Resources',
      icon: <FileText className="w-5 h-5" />,
      pages: [
        { 
          name: isNepali ? 'समाचार र अपडेटहरू' : 'News & Updates', 
          url: '/news', 
          description: isNepali ? 'पछिल्लो समाचार, घोषणाहरू र सहकारी अपडेटहरू' : 'Latest news, announcements and cooperative updates',
          keywords: 'cooperative news, updates, समाचार, घोषणा'
        },
        { 
          name: isNepali ? 'फोटो ग्यालेरी' : 'Gallery', 
          url: '/gallery', 
          description: isNepali ? 'सहकारीका गतिविधि र कार्यक्रमका तस्बिरहरू' : 'Photos of cooperative activities and events',
          keywords: 'photo gallery, cooperative events, कार्यक्रम, फोटो'
        },
        { 
          name: isNepali ? 'वित्तीय प्रतिवेदन' : 'Financial Reports', 
          url: '/financial', 
          description: isNepali ? 'वित्तीय विवरण र पारदर्शिता प्रतिवेदनहरू' : 'Financial statements and transparency reports',
          keywords: 'financial reports, transparency, वित्तीय विवरण, पारदर्शिता'
        },
        { 
          name: isNepali ? 'समुदाय' : 'Community', 
          url: '/community', 
          description: isNepali ? 'सामुदायिक सहभागिता र सामाजिक पहलहरू' : 'Community involvement and social initiatives',
          keywords: 'community, social initiatives, समुदाय, सामाजिक कार्य'
        },
      ]
    },
    {
      category: isNepali ? 'सम्पर्क र सहयोग' : 'Contact & Support',
      icon: <Phone className="w-5 h-5" />,
      pages: [
        { 
          name: isNepali ? 'सम्पर्क गर्नुहोस्' : 'Contact Us', 
          url: '/contact', 
          description: isNepali ? 'सम्पर्क जानकारी र सोधपुछ फारम' : 'Contact information and inquiry form',
          keywords: 'contact maitree, cooperative contact, सम्पर्क, ठेगाना'
        },
      ]
    },
    {
      category: isNepali ? 'कानुनी र अनुपालना' : 'Legal & Compliance',
      icon: <FileText className="w-5 h-5" />,
      pages: [
        { 
          name: isNepali ? 'गोपनीयता नीति' : 'Privacy Policy', 
          url: '/privacy-policy', 
          description: isNepali ? 'डाटा संरक्षण र गोपनीयता जानकारी' : 'Data protection and privacy information',
          keywords: 'privacy policy, data protection, गोपनीयता नीति'
        },
        { 
          name: isNepali ? 'सेवाका सर्तहरू' : 'Terms of Service', 
          url: '/terms-of-service', 
          description: isNepali ? 'वेबसाइट प्रयोगका नियम र सर्तहरू' : 'Website usage terms and conditions',
          keywords: 'terms of service, usage terms, सेवाका सर्तहरू'
        },
        { 
          name: isNepali ? 'साइट म्याप' : 'Sitemap', 
          url: '/sitemap', 
          description: isNepali ? 'पूर्ण वेबसाइट नेभिगेसन र पृष्ठ संरचना' : 'Complete website navigation and page structure',
          keywords: 'sitemap, website structure, साइट म्याप'
        },
      ]
    }
  ];

  const cooperativeKeywords = [
    'मैत्री बहुउद्देश्यीय सहकारी', 'Maitree Multipurpose Cooperative', 'sahakari', 'tamghas', 'gulmi',
    'बहुउद्देश्यीय', 'multipurpose', 'cooperative bank', 'सहकारी बैंक',
    'loan services', 'ऋण सेवा', 'saving account', 'बचत खाता', 'resunga municipality',
    'financial services', 'वित्तीय सेवा', 'cooperative society', 'सहकारी संस्था'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              {isNepali ? 'मुख्य पृष्ठमा फर्कनुहोस्' : 'Back to Home'}
            </Link>
            <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Globe className="mr-2" size={16} />
              {isNepali ? 'English' : 'नेपाली'}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isNepali ? 'वेबसाइट साइट म्याप' : 'Website Sitemap'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isNepali 
              ? 'मैत्री बहुउद्देश्यीय सहकारी संस्थाको वेबसाइटका सबै पृष्ठहरू र खण्डहरूमा नेभिगेट गर्नुहोस्।'
              : 'Navigate through all pages and sections of the Maitree Multipurpose Cooperative website.'
            }
          </p>
        </div>

        {/* SEO Keywords Section */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
          <div className="flex items-center mb-4">
            <Search className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-blue-900">
              {isNepali ? 'खोज कीवर्डहरू' : 'Search Keywords'}
            </h2>
          </div>
          <p className="text-blue-700 text-sm mb-3">
            {isNepali 
              ? 'हाम्रो वेबसाइट निम्नलिखित कीवर्डहरूका लागि अनुकूलित छ:'
              : 'Our website is optimized for the following keywords:'
            }
          </p>
          <div className="flex flex-wrap gap-2">
            {cooperativeKeywords.map((keyword, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200">
                {keyword}
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="space-y-0">
            {sitePages.map((category, categoryIndex) => (
              <div key={categoryIndex} className={`${categoryIndex > 0 ? 'border-t border-gray-200' : ''}`}>
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="text-blue-600 mr-3">
                      {category.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {category.category}
                    </h2>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                    {category.pages.map((page, pageIndex) => (
                      <div key={pageIndex} className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-all duration-200 border border-gray-200 hover:border-gray-300">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                              <Link 
                                to={page.url} 
                                className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                              >
                                {page.name}
                                <ExternalLink className="w-4 h-4 ml-1" />
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                              {page.description}
                            </p>
                            <div className="mb-3">
                              <p className="text-xs text-gray-500 font-mono bg-white px-2 py-1 rounded border inline-block">
                                {window.location.origin}{page.url}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {page.keywords.split(', ').map((keyword, keyIndex) => (
                                <span key={keyIndex} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded border border-green-200">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="ml-4">
                            <Link 
                              to={page.url}
                              className="inline-flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                              {isNepali ? 'पृष्ठ हेर्नुहोस्' : 'Visit Page'}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 border-t border-gray-200">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {isNepali ? 'खोज इन्जिनहरूका लागि XML साइटम्याप' : 'XML Sitemap for Search Engines'}
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  {isNepali 
                    ? 'SEO उद्देश्यका लागि, हाम्रो संरचित साइटम्याप खोज इन्जिन क्रलरहरूका लागि XML फर्म्याटमा उपलब्ध छ।'
                    : 'For SEO purposes, our structured sitemap is available in XML format for search engine crawlers.'
                  }
                </p>
                <div className="flex items-center space-x-4">
                  <code className="text-xs bg-white px-3 py-2 rounded border text-gray-600 font-mono">
                    {window.location.origin}/sitemap.xml
                  </code>
                  <button
                    onClick={() => window.open('/sitemap.xml', '_blank')}
                    className="text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex items-center"
                  >
                    {isNepali ? 'XML हेर्नुहोस्' : 'View XML'}
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 text-white p-6 text-center">
            <p className="text-sm">
              {isNepali ? 'तपाईंले खोजिरहनुभएको कुरा फेला पार्न सक्नुभएन?' : "Can't find what you're looking for?"} 
              <Link to="/contact" className="text-blue-400 hover:text-blue-300 ml-1 underline">
                {isNepali ? 'सहायताका लागि हामीलाई सम्पर्क गर्नुहोस्' : 'Contact us for assistance'}
              </Link>
            </p>
            <div className="mt-4 text-xs text-gray-400">
              <p>
                <strong>{isNepali ? 'अन्तिम अपडेट:' : 'Last Updated:'}</strong> {isNepali ? '२०२५ अक्टोबर १९' : 'October 19, 2025'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;