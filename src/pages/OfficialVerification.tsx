import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, CheckCircle, XCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';

const OfficialVerification = () => {
  const { t, i18n } = useTranslation();
  const isNepali = i18n.language === 'np';

  return (
    <div className="min-h-screen bg-gray-50">
      <ContactBar />
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 rounded-full">
                <Shield className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {isNepali ? 'आधिकारिक वेबसाइट प्रमाणीकरण' : 'Official Website Verification'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {isNepali 
                ? 'नक्कली वेबसाइटहरूबाट सावधान रहनुहोस्। यो आधिकारिक मैत्री बहुउद्देश्यीय सहकारी संस्था लिमिटेडको वेबसाइट हो।'
                : 'Beware of fake websites. This is the official Maitree Multipurpose Cooperative Ltd. website.'}
            </p>
          </div>

          {/* Official Website Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-2 border-green-500">
            <div className="flex items-start mb-6">
              <CheckCircle className="w-8 h-8 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isNepali ? '✅ आधिकारिक वेबसाइट' : '✅ Official Website'}
                </h2>
                <p className="text-lg font-semibold text-green-600 mb-4">
                  https://www.maitreecooperative.com
                </p>
                <p className="text-gray-600">
                  {isNepali
                    ? 'यो मात्र आधिकारिक वेबसाइट हो। सदस्यता, ऋण, वा अन्य सेवाहरूको लागि यो वेबसाइट मात्र प्रयोग गर्नुहोस्।'
                    : 'This is the ONLY official website. Use only this website for membership, loans, or other services.'}
                </p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                {isNepali ? 'आधिकारिक सम्पर्क जानकारी:' : 'Official Contact Information:'}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>{isNepali ? 'फोन:' : 'Phone:'}</strong> 079-520678</li>
                <li><strong>{isNepali ? 'इमेल:' : 'Email:'}</strong> maitreecooperative@gmail.com</li>
                <li><strong>{isNepali ? 'ठेगाना:' : 'Address:'}</strong> Resunga Municipality-8, Tamghas, Gulmi, Nepal</li>
                <li><strong>{isNepali ? 'स्थापना:' : 'Established:'}</strong> 2000</li>
              </ul>
            </div>
          </div>

          {/* Fake Websites Warning */}
          <div className="bg-red-50 rounded-lg shadow-md p-8 mb-8 border-2 border-red-500">
            <div className="flex items-start mb-6">
              <XCircle className="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isNepali ? '❌ नक्कली/अनाधिकृत वेबसाइटहरू' : '❌ Fake/Unauthorized Websites'}
                </h2>
                <p className="text-gray-600 mb-4">
                  {isNepali
                    ? 'निम्न वेबसाइटहरू मैत्री बहुउद्देश्यीय सहकारी संस्था लिमिटेडसँग सम्बन्धित छैनन्:'
                    : 'The following websites are NOT affiliated with Maitree Multipurpose Cooperative Ltd.:'}
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-red-300">
                    <p className="font-mono text-red-600 font-semibold mb-2">
                      ❌ maitreecoop.com.np
                    </p>
                    <p className="text-sm text-gray-600">
                      {isNepali
                        ? 'यो वेबसाइट नक्कली हो र हाम्रो सहकारीसँग कुनै सम्बन्ध छैन।'
                        : 'This website is fake and has no connection to our cooperative.'}
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-red-300">
                    <p className="font-mono text-red-600 font-semibold mb-2">
                      ❌ Any website NOT ending with maitreecooperative.com
                    </p>
                    <p className="text-sm text-gray-600">
                      {isNepali
                        ? 'मैत्री सहकारी नाम प्रयोग गर्ने अन्य कुनै पनि वेबसाइट अनाधिकृत हो।'
                        : 'Any other website using Maitree Cooperative name is unauthorized.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Verify Section */}
          <div className="bg-blue-50 rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-start mb-6">
              <AlertTriangle className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {isNepali ? 'कसरी प्रमाणित गर्ने' : 'How to Verify'}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      1
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {isNepali ? 'URL जाँच गर्नुहोस्' : 'Check the URL'}
                      </h3>
                      <p className="text-gray-600">
                        {isNepali
                          ? 'सुनिश्चित गर्नुहोस् कि URL www.maitreecooperative.com हो।'
                          : 'Make sure the URL is www.maitreecooperative.com'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      2
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {isNepali ? 'HTTPS सुरक्षा जाँच गर्नुहोस्' : 'Check HTTPS Security'}
                      </h3>
                      <p className="text-gray-600">
                        {isNepali
                          ? 'वेबसाइट HTTPS सुरक्षित हुनुपर्छ (ब्राउजरमा ताला चिन्ह)।'
                          : 'Website must be HTTPS secured (lock icon in browser).'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      3
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {isNepali ? 'सम्पर्क जानकारी प्रमाणित गर्नुहोस्' : 'Verify Contact Information'}
                      </h3>
                      <p className="text-gray-600">
                        {isNepali
                          ? 'आधिकारिक फोन नम्बर 079-520678 मा कल गर्नुहोस्।'
                          : 'Call official phone number 079-520678 to verify.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      4
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {isNepali ? 'कार्यालयमा आउनुहोस्' : 'Visit Our Office'}
                      </h3>
                      <p className="text-gray-600">
                        {isNepali
                          ? 'तामघास, रेसुङ्गा नगरपालिका-८, गुल्मीमा हाम्रो कार्यालयमा आउनुहोस्।'
                          : 'Visit our office at Tamghas, Resunga Municipality-8, Gulmi.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Serving All Nepal */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              {isNepali ? 'हामी सम्पूर्ण नेपाललाई सेवा प्रदान गर्छौं' : 'We Serve All of Nepal'}
            </h2>
            <p className="text-center text-gray-600 mb-6">
              {isNepali
                ? 'तपाईं नेपालको कुनै पनि स्थानबाट हाम्रो सेवाहरू प्राप्त गर्न सक्नुहुन्छ:'
                : 'You can access our services from anywhere in Nepal:'}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                'Kathmandu',
                'Lalitpur',
                'Bhaktapur',
                'Pokhara',
                'Butwal',
                'Chitwan',
                'Biratnagar',
                'Dharan',
                'Hetauda',
                'Bharatpur',
                'Thamel',
                'Chabahil',
                'Koteshwor',
                'Kirtipur',
                'Gulmi',
                'Tamghas'
              ].map((city) => (
                <div key={city} className="bg-green-50 rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <span className="text-sm font-medium text-gray-700">{city}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                {isNepali
                  ? 'कुनै पनि प्रश्नको लागि हामीलाई सम्पर्क गर्नुहोस्:'
                  : 'For any questions, contact us:'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="tel:079520678"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  📞 079-520678
                </a>
                <a
                  href="mailto:maitreecooperative@gmail.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ✉️ Email Us
                </a>
              </div>
            </div>
          </div>

          {/* Report Fraud Section */}
          <div className="mt-8 bg-yellow-50 rounded-lg shadow-md p-8 border-2 border-yellow-400">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isNepali ? '⚠️ धोखाधडी रिपोर्ट गर्नुहोस्' : '⚠️ Report Fraud'}
            </h2>
            <p className="text-gray-600 mb-4">
              {isNepali
                ? 'यदि तपाईंले हाम्रो नाम दुरुपयोग गर्ने कुनै नक्कली वेबसाइट वा व्यक्ति भेट्नुभयो भने, कृपया तुरुन्त हामीलाई सूचित गर्नुहोस्।'
                : 'If you encounter any fake website or person misusing our name, please inform us immediately.'}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {isNepali ? 'रिपोर्ट गर्नुहोस्' : 'Report Now'}
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OfficialVerification;
