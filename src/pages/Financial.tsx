
import React, { useState, useEffect } from 'react';
import { Download, FileText, Calendar, Shield, Users, FileCheck, Filter, Search, Eye, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';
import { client as sanityClient, queries, getFileUrl, getImageUrl } from '@/lib/sanity';

interface FinancialDocument {
  _id: string;
  title: string;
  titleNepali: string;
  slug: { current: string };
  description: string;
  descriptionNepali: string;
  category: string;
  documentFile?: {
    asset?: {
      _id: string;
      url?: string;
      originalFilename?: string;
      size?: number;
      mimeType?: string;
    };
  };
  coverImage?: {
    asset?: {
      _id: string;
      url?: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
  };
  fiscalYear: string;
  reportPeriod?: string;
  fileSize?: number;
  pageCount?: number;
  language: string;
  isConfidential: boolean;
  requiresLogin: boolean;
  downloadCount?: number;
  publishedDate: string;
  expiryDate?: string;
  approvedBy?: string;
  keywords?: string[];
  isPinned: boolean;
  lastUpdated: string;
}

const Financial = () => {
  const { t, i18n } = useTranslation();
  const isNepali = i18n.language === 'np';
  
  const [documents, setDocuments] = useState<FinancialDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchFinancialDocuments();
  }, []);

  const fetchFinancialDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await sanityClient.fetch(queries.financialDocuments);
      console.log('Fetched financial documents:', data);
      
      // Debug: Log the first document's structure if available
      if (data && data.length > 0) {
        console.log('First document structure:', data[0]);
        console.log('Document file:', data[0].documentFile);
        console.log('Cover image:', data[0].coverImage);
      }
      
      setDocuments(data || []);
    } catch (err) {
      console.error('Error fetching financial documents:', err);
      setError(isNepali ? 'कागजातहरू लोड गर्न सकिएन' : 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const getDocumentsByFilter = () => {
    let filtered = documents;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(doc => doc.category === selectedCategory);
    }

    // Filter by fiscal year
    if (selectedYear !== 'all') {
      filtered = filtered.filter(doc => doc.fiscalYear === selectedYear);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(doc => 
        (isNepali ? doc.titleNepali : doc.title).toLowerCase().includes(searchLower) ||
        (isNepali ? doc.descriptionNepali : doc.description).toLowerCase().includes(searchLower) ||
        doc.keywords?.some(keyword => keyword.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  };

  const getUniqueCategories = () => {
    const categories = [...new Set(documents.map(doc => doc.category))];
    return categories;
  };

  const getUniqueFiscalYears = () => {
    const years = [...new Set(documents.map(doc => doc.fiscalYear))].sort().reverse();
    return years;
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'annual_report': return <FileText className="h-6 w-6" />;
      case 'audit_report': return <FileCheck className="h-6 w-6" />;
      case 'financial_statement': return <FileText className="h-6 w-6" />;
      case 'policy': return <Shield className="h-6 w-6" />;
      case 'procedure': return <Users className="h-6 w-6" />;
      case 'form': return <FileText className="h-6 w-6" />;
      default: return <FileText className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'annual_report': return 'bg-blue-100 text-blue-800';
      case 'audit_report': return 'bg-green-100 text-green-800';
      case 'financial_statement': return 'bg-purple-100 text-purple-800';
      case 'policy': return 'bg-orange-100 text-orange-800';
      case 'procedure': return 'bg-teal-100 text-teal-800';
      case 'form': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    if (isNepali) {
      switch (category.toLowerCase()) {
        case 'annual_report': return 'वार्षिक प्रतिवेदन';
        case 'audit_report': return 'लेखापरीक्षण प्रतिवेदन';
        case 'financial_statement': return 'वित्तीय विवरण';
        case 'policy': return 'नीति';
        case 'procedure': return 'प्रक्रिया';
        case 'form': return 'फारम';
        default: return 'कागजात';
      }
    } else {
      switch (category.toLowerCase()) {
        case 'annual_report': return 'Annual Report';
        case 'audit_report': return 'Audit Report';
        case 'financial_statement': return 'Financial Statement';
        case 'policy': return 'Policy';
        case 'procedure': return 'Procedure';
        case 'form': return 'Form';
        default: return 'Document';
      }
    }
  };

  const formatFileSize = (bytes?: number, assetSize?: number) => {
    const fileSize = bytes || assetSize;
    if (!fileSize) return '';
    const mb = fileSize / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isNepali ? 'ne-NP' : 'en-US');
  };

  const handleDownload = (document: FinancialDocument) => {
    if (document.documentFile?.asset?.url) {
      const link = window.document.createElement('a');
      link.href = document.documentFile.asset.url;
      link.download = document.documentFile.asset.originalFilename || `${isNepali ? document.titleNepali : document.title}.pdf`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    }
  };

  const handleView = (document: FinancialDocument) => {
    if (document.documentFile?.asset?.url) {
      window.open(document.documentFile.asset.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <ContactBar />
        <Navbar />
        <div className="page-header text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              {isNepali ? 'वित्तीय प्रतिवेदन र कागजातहरू' : 'Financial Reports & Documents'}
            </h1>
          </div>
        </div>
        <div className="section-container">
          <div className="max-w-7xl mx-auto text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {isNepali ? 'कागजातहरू लोड गर्दै...' : 'Loading documents...'}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <ContactBar />
        <Navbar />
        <div className="page-header text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              {isNepali ? 'वित्तीय प्रतिवेदन र कागजातहरू' : 'Financial Reports & Documents'}
            </h1>
          </div>
        </div>
        <div className="section-container">
          <div className="max-w-7xl mx-auto text-center py-12">
            <div className="text-red-600 mb-4">
              <FileText className="h-12 w-12 mx-auto mb-2" />
              <p className="text-lg">{error}</p>
            </div>
            <button 
              onClick={fetchFinancialDocuments}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              {isNepali ? 'पुनः प्रयास गर्नुहोस्' : 'Try Again'}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const filteredDocuments = getDocumentsByFilter();
  const pinnedDocuments = filteredDocuments.filter(doc => doc.isPinned);
  const regularDocuments = filteredDocuments.filter(doc => !doc.isPinned);

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
              ? 'हाम्रा वार्षिक प्रतिवेदन, लेखापरीक्षण प्रतिवेदन र वित्तीय विवरणहरू हेर्नुहोस्।'
              : 'Access our annual reports, audit reports, and financial statements.'
            }
          </p>
        </div>
      </div>
      
      <div className="section-container">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder={isNepali ? 'कागजात खोज्नुहोस्...' : 'Search documents...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">{isNepali ? 'सबै श्रेणी' : 'All Categories'}</option>
                  {getUniqueCategories().map(category => (
                    <option key={category} value={category}>
                      {getCategoryLabel(category)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">{isNepali ? 'सबै वर्ष' : 'All Years'}</option>
                  {getUniqueFiscalYears().map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6 text-center text-gray-600">
            <p>
              {isNepali 
                ? `${filteredDocuments.length} कागजातहरू भेटिए`
                : `${filteredDocuments.length} documents found`
              }
            </p>
          </div>

          {/* Pinned Documents */}
          {pinnedDocuments.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-green-800">
                {isNepali ? 'महत्वपूर्ण कागजातहरू' : 'Important Documents'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pinnedDocuments.map((doc) => (
                  <DocumentCard 
                    key={doc._id} 
                    document={doc} 
                    isNepali={isNepali}
                    onView={handleView}
                    onDownload={handleDownload}
                    getCategoryIcon={getCategoryIcon}
                    getCategoryColor={getCategoryColor}
                    getCategoryLabel={getCategoryLabel}
                    formatFileSize={formatFileSize}
                    formatDate={formatDate}
                    isPinned={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Documents */}
          {regularDocuments.length > 0 ? (
            <div>
              {pinnedDocuments.length > 0 && (
                <h2 className="text-2xl font-bold mb-4">
                  {isNepali ? 'अन्य कागजातहरू' : 'Other Documents'}
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularDocuments.map((doc) => (
                  <DocumentCard 
                    key={doc._id} 
                    document={doc} 
                    isNepali={isNepali}
                    onView={handleView}
                    onDownload={handleDownload}
                    getCategoryIcon={getCategoryIcon}
                    getCategoryColor={getCategoryColor}
                    getCategoryLabel={getCategoryLabel}
                    formatFileSize={formatFileSize}
                    formatDate={formatDate}
                    isPinned={false}
                  />
                ))}
              </div>
            </div>
          ) : (
            filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {isNepali ? 'कुनै कागजात भेटिएन' : 'No documents found'}
                </h3>
                <p className="text-gray-500">
                  {isNepali 
                    ? 'फिल्टर परिवर्तन गर्नुहोस् वा फेरि खोज्नुहोस्।'
                    : 'Try changing your filters or search terms.'
                  }
                </p>
              </div>
            )
          )}

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

// Document Card Component
interface DocumentCardProps {
  document: FinancialDocument;
  isNepali: boolean;
  onView: (doc: FinancialDocument) => void;
  onDownload: (doc: FinancialDocument) => void;
  getCategoryIcon: (category: string) => React.ReactNode;
  getCategoryColor: (category: string) => string;
  getCategoryLabel: (category: string) => string;
  formatFileSize: (bytes?: number, assetSize?: number) => string;
  formatDate: (dateString: string) => string;
  isPinned: boolean;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  isNepali,
  onView,
  onDownload,
  getCategoryIcon,
  getCategoryColor,
  getCategoryLabel,
  formatFileSize,
  formatDate,
  isPinned
}) => {
  return (
    <div className={`glass-card rounded-xl p-6 hover-card ${isPinned ? 'ring-2 ring-yellow-400 bg-yellow-50' : ''}`}>
      {isPinned && (
        <div className="mb-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            📌 {isNepali ? 'महत्वपूर्ण' : 'Pinned'}
          </span>
        </div>
      )}

      {/* Cover Image */}
      {document.coverImage?.asset?.url && (
        <div className="mb-4">
          <img 
            src={document.coverImage.asset.url}
            alt={isNepali ? document.titleNepali : document.title}
            className="w-full h-32 object-cover rounded-lg border border-gray-200"
            onError={(e) => {
              // Hide image if it fails to load
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3">
            {getCategoryIcon(document.category)}
          </div>
          <div>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(document.category)}`}>
              {getCategoryLabel(document.category)}
            </span>
            <div className="flex items-center mt-1">
              <Calendar className="h-3 w-3 text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">{document.fiscalYear}</span>
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
        {isNepali ? document.titleNepali : document.title}
      </h3>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
        {isNepali ? document.descriptionNepali : document.description}
      </p>

      {/* Document metadata */}
      <div className="mb-4 space-y-1">
        {document.reportPeriod && (
          <div className="text-xs text-gray-500">
            {isNepali ? 'अवधि:' : 'Period:'} {document.reportPeriod}
          </div>
        )}
        {(document.fileSize || document.documentFile?.asset?.size) && (
          <div className="text-xs text-gray-500">
            {isNepali ? 'फाइल साइज:' : 'File Size:'} {formatFileSize(document.fileSize, document.documentFile?.asset?.size)}
          </div>
        )}
        {document.pageCount && (
          <div className="text-xs text-gray-500">
            {isNepali ? 'पृष्ठ संख्या:' : 'Pages:'} {document.pageCount}
          </div>
        )}
        <div className="text-xs text-gray-500">
          {isNepali ? 'प्रकाशित:' : 'Published:'} {formatDate(document.publishedDate)}
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => onView(document)}
          disabled={!document.documentFile?.asset?.url}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <Eye className="h-4 w-4 mr-1" />
          {isNepali ? 'हेर्नुहोस्' : 'View'}
        </button>
        <button
          onClick={() => onDownload(document)}
          disabled={!document.documentFile?.asset?.url}
          className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700 text-sm py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <Download className="h-4 w-4 mr-1" />
          {isNepali ? 'डाउनलोड' : 'Download'}
        </button>
      </div>

      {document.requiresLogin && (
        <div className="mt-2 text-xs text-orange-600 flex items-center">
          <Shield className="h-3 w-3 mr-1" />
          {isNepali ? 'लगइन आवश्यक' : 'Login Required'}
        </div>
      )}
    </div>
  );
};

export default Financial;
