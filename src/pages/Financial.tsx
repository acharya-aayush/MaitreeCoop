
import React from 'react';
import { Download, FileText, Calendar, Shield, Users, FileCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';

interface Document {
  title: string;
  titleNp: string;
  filename: string;
  description: string;
  descriptionNp: string;
  year?: string;
  category: 'procedure' | 'form' | 'policy' | 'report';
  icon: React.ReactNode;
}

const Financial = () => {
  const { t, i18n } = useTranslation();
  const isNepali = i18n.language === 'np';

  const documents: Document[] = [
    {
      title: "Annual General Assembly and Election Procedure",
      titleNp: "वार्षिक साधारण सभा र निर्वाचन प्रक्रिया", 
      filename: "9) General Assembly and election Procedure 2078.pdf",
      description: "Guidelines for conducting annual general meetings and board elections",
      descriptionNp: "वार्षिक साधारण सभा र सञ्चालक समिति निर्वाचन सञ्चालनका लागि निर्देशिका",
      year: "2078",
      category: "procedure",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Amendment to Internal Regulations",
      titleNp: "आन्तरिक नियमावली संशोधन",
      filename: "2) Aathaiks parsan neamabali samsodhan 077.pdf", 
      description: "Updated internal regulations and amendments",
      descriptionNp: "आन्तरिक नियमावली र संशोधनहरू",
      year: "2077",
      category: "policy",
      icon: <FileCheck className="h-6 w-6" />
    },
    {
      title: "Money Laundering Prevention Procedure",
      titleNp: "मनी लान्ड्रिङ रोकथाम प्रक्रिया",
      filename: "6) Money Loundering Procuder 2077.pdf",
      description: "Anti-money laundering policies and compliance procedures", 
      descriptionNp: "मनी लान्ड्रिङ विरुद्धका नीति र अनुपालन प्रक्रियाहरू",
      year: "2077",
      category: "policy",
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "Service Center Operating Procedure",
      titleNp: "सेवा केन्द्र सञ्चालन प्रक्रिया",
      filename: "7) Service center Procedur 2077.pdf",
      description: "Standard operating procedures for service centers",
      descriptionNp: "सेवा केन्द्रहरूका लागि मानक सञ्चालन प्रक्रियाहरू", 
      year: "2077",
      category: "procedure",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Application Form",
      titleNp: "दरखास्त फारम",
      filename: "दरखास्त फाराम.pdf",
      description: "Standard application form for various services",
      descriptionNp: "विभिन्न सेवाहरूका लागि मानक दरखास्त फारम",
      category: "form",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Collateral Valuation Guidelines", 
      titleNp: "धितो मूल्याङ्कन निर्देशिका",
      filename: "धितो मुल्यांकन निर्देशिका.pdf",
      description: "Guidelines for asset valuation and collateral assessment",
      descriptionNp: "सम्पत्ति मूल्याङ्कन र धितो मूल्याङ्कनका लागि निर्देशिका",
      category: "policy", 
      icon: <FileCheck className="h-6 w-6" />
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'procedure': return 'bg-blue-100 text-blue-800';
      case 'form': return 'bg-green-100 text-green-800'; 
      case 'policy': return 'bg-purple-100 text-purple-800';
      case 'report': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    if (isNepali) {
      switch (category) {
        case 'procedure': return 'प्रक्रिया';
        case 'form': return 'फारम';
        case 'policy': return 'नीति';
        case 'report': return 'प्रतिवेदन';
        default: return 'कागजात';
      }
    } else {
      switch (category) {
        case 'procedure': return 'Procedure';
        case 'form': return 'Form';
        case 'policy': return 'Policy';
        case 'report': return 'Report';
        default: return 'Document';
      }
    }
  };

  const handleDownload = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/documents/financial/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (filename: string) => {
    window.open(`/documents/financial/${filename}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <ContactBar />
      <Navbar />
      
      <div className="page-header text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            {isNepali ? 'वित्तीय प्रतिवेदन र कागजातहरू' : 'Financial Reports & Documents'}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {isNepali 
              ? 'हाम्रा वार्षिक प्रतिवेदन, बैठकका कार्यवृत्त र वित्तीय विवरणहरू हेर्नुहोस्।'
              : 'Access our annual reports, meeting minutes, and financial statements.'
            }
          </p>
        </div>
      </div>
      
      <div className="section-container">
        <div className="max-w-7xl mx-auto">
          {/* Document Categories Filter */}
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <FileText className="h-4 w-4 mr-1" />
              {isNepali ? 'प्रक्रियाहरू' : 'Procedures'}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <FileCheck className="h-4 w-4 mr-1" />
              {isNepali ? 'फारमहरू' : 'Forms'}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              <Shield className="h-4 w-4 mr-1" />
              {isNepali ? 'नीतिहरू' : 'Policies'}
            </span>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <div key={index} className="glass-card rounded-xl p-6 hover-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      {doc.icon}
                    </div>
                    <div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                        {getCategoryLabel(doc.category)}
                      </span>
                      {doc.year && (
                        <div className="flex items-center mt-1">
                          <Calendar className="h-3 w-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">{doc.year}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {isNepali ? doc.titleNp : doc.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {isNepali ? doc.descriptionNp : doc.description}
                </p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(doc.filename)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    {isNepali ? 'हेर्नुहोस्' : 'View'}
                  </button>
                  <button
                    onClick={() => handleDownload(doc.filename)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    {isNepali ? 'डाउनलोड' : 'Download'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-12 bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-green-800">
              {isNepali ? 'थप जानकारी' : 'Additional Information'}
            </h3>
            <p className="text-green-700 text-sm">
              {isNepali 
                ? 'यदि तपाईंलाई थप कागजातहरू चाहिन्छ वा कुनै प्रश्न छ भने, कृपया हाम्रो कार्यालयमा सम्पर्क गर्नुहोस्। सबै कागजातहरू PDF ढाँचामा उपलब्ध छन् र डाउनलोड गर्न सकिन्छ।'
                : 'If you need additional documents or have any questions, please contact our office. All documents are available in PDF format and can be downloaded.'
              }
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Financial;
