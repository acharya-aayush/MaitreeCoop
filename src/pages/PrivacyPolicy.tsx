import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
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
          {isNepali ? 'गोपनीयता नीति' : 'Privacy Policy'}
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          
          {isNepali ? (
            <>
              {/* Nepali Content */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">१. हामीले सङ्कलन गर्ने जानकारी</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    <strong>व्यक्तिगत जानकारी:</strong> जब तपाईंले हाम्रो वेबसाइट मार्फत हामीसँग सम्पर्क गर्नुहुन्छ, हामी 
                    तपाईंको नाम, इमेल ठेगाना, फोन नम्बर, र तपाईंले प्रदान गर्नुभएको सन्देश सामग्री जस्ता 
                    व्यक्तिगत जानकारी सङ्कलन गर्न सक्छौं।
                  </p>
                  <p>
                    <strong>स्वचालित रूपमा सङ्कलन गरिएको जानकारी:</strong> हामी तपाईंको उपकरण र तपाईंले हाम्रो 
                    वेबसाइटसँग कसरी अन्तरक्रिया गर्नुहुन्छ भन्ने बारेमा केही जानकारी स्वचालित रूपमा सङ्कलन गर्न सक्छौं, 
                    जसमा IP ठेगाना, ब्राउजर प्रकार, भ्रमण गरिएका पृष्ठहरू, र हाम्रो साइटमा बिताएको समय समावेश छ।
                  </p>
                  <p>
                    <strong>कुकीजहरू:</strong> हाम्रो वेबसाइटले तपाईंको ब्राउजिङ अनुभव बृद्धि गर्न र 
                    वेबसाइट प्रयोग विश्लेषण गर्न कुकीज र समान ट्र्याकिङ प्रविधिहरू प्रयोग गर्न सक्छ।
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">२. हामी तपाईंको जानकारी कसरी प्रयोग गर्छौं</h2>
                <div className="space-y-3 text-gray-600">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>तपाईंका सोधपुछहरूको जवाफ दिन र ग्राहक सेवा प्रदान गर्न</li>
                    <li>हाम्रो सहकारी सेवाहरूको बारेमा जानकारी सञ्चार गर्न</li>
                    <li>हाम्रो वेबसाइट कार्यक्षमता र प्रयोगकर्ता अनुभव सुधार गर्न</li>
                    <li>कानुनी दायित्व र नियामक आवश्यकताहरूको पालना गर्न</li>
                    <li>हाम्रो प्रणालीहरूको सुरक्षा र अखण्डताको रक्षा गर्न</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">३. जानकारी साझाकरण र खुलासा</h2>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>
                    निम्नलिखित परिस्थितिहरूमा बाहेक हामी तपाईंको सहमति बिना तपाईंको व्यक्तिगत जानकारी 
                    तेस्रो पक्षहरूलाई बेच्दैनौं, व्यापार गर्दैनौं, वा अन्यथा स्थानान्तरण गर्दैनौं:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>जब कानून वा कानुनी प्रक्रियाद्वारा आवश्यक हुन्छ</li>
                    <li>हाम्रो अधिकार, सम्पत्ति, वा सुरक्षा, वा हाम्रा सदस्यहरूको सुरक्षा गर्न</li>
                    <li>हाम्रो वेबसाइट सञ्चालनमा सहायता गर्ने विश्वसनीय सेवा प्रदायकहरूसँग</li>
                    <li>मर्जर, अधिग्रहण, वा सम्पत्ति बिक्रीको सम्बन्धमा</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">४. डाटा सुरक्षा</h2>
                <p className="text-gray-600 leading-relaxed">
                  हामी तपाईंको व्यक्तिगत जानकारीलाई अनधिकृत पहुँच, परिवर्तन, खुलासा, वा विनाशको विरुद्ध 
                  सुरक्षा गर्न उपयुक्त प्राविधिक र संगठनात्मक सुरक्षा उपायहरू लागू गर्छौं। तथापि, 
                  इन्टरनेटमा प्रसारणको कुनै पनि विधि १००% सुरक्षित छैन, र हामी पूर्ण सुरक्षाको ग्यारेन्टी दिन सक्दैनौं।
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">५. तपाईंका अधिकारहरू</h2>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>तपाईंसँग निम्न अधिकारहरू छन्:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>तपाईंको व्यक्तिगत जानकारीको पहुँच र प्रतिलिपि प्राप्त गर्ने</li>
                    <li>गलत वा अपूर्ण व्यक्तिगत जानकारी सच्याउने</li>
                    <li>तपाईंको व्यक्तिगत जानकारी मेटाउन अनुरोध गर्ने</li>
                    <li>तपाईंको व्यक्तिगत जानकारीको प्रशोधनमा आपत्ति वा प्रतिबन्ध लगाउने</li>
                    <li>सहमतिमा आधारित प्रशोधनको सहमति फिर्ता गर्ने</li>
                  </ul>
                </div>
              </section>
            </>
          ) : (
            <>
              {/* English Content */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    <strong>Personal Information:</strong> When you contact us through our website, we may collect 
                    personal information such as your name, email address, phone number, and any message content 
                    you provide.
                  </p>
                  <p>
                    <strong>Automatically Collected Information:</strong> We may automatically collect certain 
                    information about your device and how you interact with our website, including IP address, 
                    browser type, pages visited, and time spent on our site.
                  </p>
                  <p>
                    <strong>Cookies:</strong> Our website may use cookies and similar tracking technologies to 
                    enhance your browsing experience and analyze website usage.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
                <div className="space-y-3 text-gray-600">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To respond to your inquiries and provide customer service</li>
                    <li>To communicate information about our cooperative services</li>
                    <li>To improve our website functionality and user experience</li>
                    <li>To comply with legal obligations and regulatory requirements</li>
                    <li>To protect the security and integrity of our systems</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Information Sharing and Disclosure</h2>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties without 
                    your consent, except in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>When required by law or legal process</li>
                    <li>To protect our rights, property, or safety, or that of our members</li>
                    <li>With trusted service providers who assist in operating our website</li>
                    <li>In connection with a merger, acquisition, or sale of assets</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
                <p className="text-gray-600 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. However, no method 
                  of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights</h2>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access and receive a copy of your personal information</li>
                    <li>Correct inaccurate or incomplete personal information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to or restrict the processing of your personal information</li>
                    <li>Withdraw consent where processing is based on consent</li>
                  </ul>
                </div>
              </section>
            </>
          )}

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {isNepali ? '६. सम्पर्क जानकारी' : '6. Contact Information'}
            </h2>
            <div className="text-gray-600 leading-relaxed">
              <p className="mb-3">
                {isNepali 
                  ? 'यदि तपाईंसँग यस गोपनीयता नीति वा हाम्रो गोपनीयता अभ्यासहरूको बारेमा कुनै प्रश्नहरू छन् भने, कृपया हामीलाई सम्पर्क गर्नुहोस्:'
                  : 'If you have any questions about this Privacy Policy or our privacy practices, please contact us:'
                }
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Maitree Multipurpose Cooperative Ltd.</strong></p>
                <p>{isNepali ? 'मैत्री बहुउद्देश्यीय सहकारी संस्था लिमिटेड' : 'Maitree Multipurpose Cooperative Ltd.'}</p>
                <p>{isNepali ? 'इमेल:' : 'Email:'} maitreecooperative@gmail.com</p>
                <p>{isNepali ? 'फोन:' : 'Phone:'} 079-520678</p>
                <p>{isNepali ? 'ठेगाना:' : 'Address:'} Resunga Municipality-8, Tamghas, Gulmi</p>
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

export default PrivacyPolicy;