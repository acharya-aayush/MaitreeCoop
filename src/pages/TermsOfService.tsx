import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isNepali = i18n.language === 'ne';

  const toggleLanguage = () => {
    i18n.changeLanguage(isNepali ? 'en' : 'ne');
  };

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
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {isNepali ? 'सेवाका सर्तहरू' : 'Terms of Service'}
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          
          {isNepali ? (
            <>
              {/* Nepali Content */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">१. सर्तहरूको स्वीकृति</h2>
                <p className="text-gray-600 leading-relaxed">
                  मैत्री बचत तथा ऋण सहकारी संस्था लिमिटेड वेबसाइट ("वेबसाइट") पहुँच र प्रयोग गरेर, 
                  तपाईं यी सेवाका सर्तहरू ("सर्तहरू") द्वारा बाध्य हुन सहमत हुनुहुन्छ। यदि तपाईं यी सर्तहरूमा 
                  सहमत हुनुहुन्न भने, कृपया हाम्रो वेबसाइट प्रयोग नगर्नुहोस्।
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">२. सेवाको विवरण</h2>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>
                    हाम्रो वेबसाइटले मैत्री बचत तथा ऋण सहकारी संस्था लिमिटेडको बारेमा जानकारी प्रदान गर्दछ, जसमा समावेश छ:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>सहकारी सेवाहरू र वित्तीय उत्पादनहरू</li>
                    <li>बोर्ड सदस्य र संगठनात्मक जानकारी</li>
                    <li>समाचार, घोषणाहरू, र समुदायिक अपडेटहरू</li>
                    <li>सदस्य सोधपुछका लागि सम्पर्क फारमहरू</li>
                    <li>शैक्षिक स्रोतहरू र सहकारी जानकारी</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">३. प्रयोगकर्ता जिम्मेवारीहरू</h2>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>हाम्रो वेबसाइट प्रयोग गरेर, तपाईं निम्नलिखितमा सहमत हुनुहुन्छ:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>फारमहरू पेश गर्दा सही र सत्य जानकारी प्रदान गर्ने</li>
                    <li>वेबसाइटलाई केवल कानुनी उद्देश्यका लागि प्रयोग गर्ने</li>
                    <li>सहकारीको बौद्धिक सम्पत्ति अधिकारहरूको सम्मान गर्ने</li>
                    <li>हाम्रो प्रणालीहरूमा अनधिकृत पहुँच प्राप्त गर्ने प्रयास नगर्ने</li>
                    <li>हानिकारक वा दुर्भावनापूर्ण सामग्री प्रसारण गर्न वेबसाइट प्रयोग नगर्ने</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">४. बौद्धिक सम्पत्ति अधिकारहरू</h2>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>
                    यस वेबसाइटको सबै सामग्री, पाठ, ग्राफिक्स, लोगो, छविहरू समेत, 
                    मैत्री बचत तथा ऋण सहकारी संस्था लिमिटेडको सम्पत्ति हो र प्रतिलिपि अधिकार, 
                    ट्रेडमार्क, र अन्य बौद्धिक सम्पत्ति कानूनहरूद्वारा सुरक्षित छ।
                  </p>
                </div>
              </section>
            </>
          ) : (
            <>
              {/* English Content */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing and using the Maitree Savings and Credit Cooperative Ltd. website ("Website"), 
                  you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, 
                  please do not use our Website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>
                    Our Website provides information about Maitree Savings and Credit Cooperative Ltd., including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Cooperative services and financial products</li>
                    <li>Board member and organizational information</li>
                    <li>News, announcements, and community updates</li>
                    <li>Contact forms for member inquiries</li>
                    <li>Educational resources and cooperative information</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Responsibilities</h2>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>By using our Website, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and truthful information when submitting forms</li>
                    <li>Use the Website only for lawful purposes</li>
                    <li>Respect the intellectual property rights of the Cooperative</li>
                    <li>Not attempt to gain unauthorized access to our systems</li>
                    <li>Not use the Website to transmit harmful or malicious content</li>
                    <li>Comply with all applicable local, state, and federal laws</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Intellectual Property Rights</h2>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>
                    All content on this Website, including but not limited to text, graphics, logos, images, 
                    audio clips, digital downloads, and software, is the property of Maitree Savings and Credit 
                    Cooperative Ltd. or its content suppliers and is protected by copyright, trademark, and other 
                    intellectual property laws.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Financial Services Disclaimer</h2>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>
                    The information provided on this Website is for general informational purposes only and does 
                    not constitute financial advice. All financial services are subject to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Current cooperative policies and procedures</li>
                    <li>Regulatory requirements and compliance standards</li>
                    <li>Individual member eligibility and creditworthiness</li>
                    <li>Available funds and operational capacity</li>
                  </ul>
                </div>
              </section>
            </>
          )}

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {isNepali ? '५. सम्पर्क जानकारी' : '6. Contact Information'}
            </h2>
            <div className="text-gray-600 leading-relaxed">
              <p className="mb-3">
                {isNepali 
                  ? 'यदि तपाईंसँग यी सेवाका सर्तहरूको बारेमा कुनै प्रश्नहरू छन् भने, कृपया हामीलाई सम्पर्क गर्नुहोस्:'
                  : 'If you have any questions about these Terms of Service, please contact us:'
                }
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Maitree Savings and Credit Cooperative Ltd.</strong></p>
                <p>{isNepali ? 'मैत्री बचत तथा ऋण सहकारी संस्था लिमिटेड' : 'मैत्री बचत तथा ऋण सहकारी संस्था लिमिटेड'}</p>
                <p>{isNepali ? 'इमेल:' : 'Email:'} info@maitreecoop.com</p>
                <p>{isNepali ? 'फोन:' : 'Phone:'} [Contact Number]</p>
                <p>{isNepali ? 'ठेगाना:' : 'Address:'} [Cooperative Address]</p>
              </div>
            </div>
          </section>

          <div className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-500 text-center">
              <strong>{isNepali ? 'अन्तिम अपडेट:' : 'Last Updated:'}</strong> {isNepali ? '२०२५ अक्टोबर १९' : 'October 19, 2025'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;