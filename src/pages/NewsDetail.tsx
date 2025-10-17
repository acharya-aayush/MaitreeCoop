import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';
import PortableTextRenderer from '@/components/PortableTextRenderer';
import { client as sanityClient, queries } from '@/lib/sanity';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
  return builder.image(source);
}

interface NewsArticle {
  _id: string;
  title: string;
  titleNepali: string;
  slug: { current: string };
  excerpt: string;
  excerptNepali: string;
  content: any;
  contentNepali: any;
  featuredImage: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  author: string;
  isPinned: boolean;
}

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isNepali = i18n.language === 'np';
  
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    if (slug) {
      fetchArticle(slug);
    }
  }, [slug]);

  const fetchArticle = async (articleSlug: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch the specific article
      const articleData = await sanityClient.fetch(queries.singleNewsArticle(articleSlug));
      
      if (!articleData) {
        setError(isNepali ? 'लेख भेटिएन' : 'Article not found');
        return;
      }
      
      setArticle(articleData);
      
      // Fetch related articles
      const related = await sanityClient.fetch(`
        *[_type == "news" && isPublished == true && _id != "${articleData._id}" && category == "${articleData.category}"] | order(publishedAt desc) [0...3] {
          _id,
          title,
          titleNepali,
          slug,
          excerpt,
          excerptNepali,
          featuredImage,
          category,
          publishedAt,
          author
        }
      `);
      
      setRelatedArticles(related || []);
      
    } catch (err) {
      console.error('Error fetching article:', err);
      setError(isNepali ? 'लेख लोड गर्न सकिएन' : 'Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isNepali ? 'ne-NP' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      general: 'bg-blue-100 text-blue-800',
      financial: 'bg-green-100 text-green-800',
      services: 'bg-purple-100 text-purple-800',
      events: 'bg-orange-100 text-orange-800',
      announcements: 'bg-yellow-100 text-yellow-800',
      achievements: 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryLabel = (category: string) => {
    if (isNepali) {
      const labels: { [key: string]: string } = {
        general: 'सामान्य समाचार',
        financial: 'वित्तीय अद्यावधिक',
        services: 'सदस्य सेवाहरू',
        events: 'सामुदायिक कार्यक्रमहरू',
        announcements: 'घोषणाहरू',
        achievements: 'उपलब्धिहरू'
      };
      return labels[category] || category;
    }
    
    const labels: { [key: string]: string } = {
      general: 'General News',
      financial: 'Financial Updates',
      services: 'Member Services',
      events: 'Community Events',
      announcements: 'Announcements',
      achievements: 'Achievements'
    };
    return labels[category] || category;
  };

  const shareUrl = window.location.href;
  const shareTitle = article ? (isNepali && article.titleNepali ? article.titleNepali : article.title) : '';

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`
    };
    
    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <ContactBar />
        <Navbar />
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {isNepali ? 'लेख लोड गर्दै...' : 'Loading article...'}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white">
        <ContactBar />
        <Navbar />
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="text-red-600 mb-4">
              <h1 className="text-2xl font-bold mb-2">
                {isNepali ? 'लेख भेटिएन' : 'Article Not Found'}
              </h1>
              <p>{error || (isNepali ? 'यो लेख अवस्थित छैन वा हटाइएको छ।' : 'This article does not exist or has been removed.')}</p>
            </div>
            <Link 
              to="/news"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {isNepali ? 'समाचारमा फर्कनुहोस्' : 'Back to News'}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ContactBar />
      <Navbar />
      
      <article className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link 
              to="/news"
              className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {isNepali ? 'समाचारमा फर्कनुहोस्' : 'Back to News'}
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            {/* Category and Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                {getCategoryLabel(article.category)}
              </span>
              {article.isPinned && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  📌 {isNepali ? 'महत्वपूर्ण' : 'Pinned'}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isNepali && article.titleNepali ? article.titleNepali : article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{article.author}</span>
              </div>
            </div>

            {/* Featured Image */}
            {article.featuredImage && (
              <div className="mb-8">
                <img
                  src={urlFor(article.featuredImage).width(1200).height(600).fit('crop').auto('format').url()}
                  alt={article.featuredImage.alt || (isNepali && article.titleNepali ? article.titleNepali : article.title)}
                  className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                />
                {article.featuredImage.alt && (
                  <p className="mt-2 text-sm text-gray-600 text-center italic">
                    {article.featuredImage.alt}
                  </p>
                )}
              </div>
            )}

            {/* Excerpt */}
            {(article.excerpt || article.excerptNepali) && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8">
                <p className="text-lg text-gray-700 font-medium">
                  {isNepali && article.excerptNepali ? article.excerptNepali : article.excerpt}
                </p>
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="prose max-w-none mb-12">
            <PortableTextRenderer 
              content={isNepali && article.contentNepali ? article.contentNepali : article.content}
            />
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="border-t border-gray-200 pt-6 mb-8">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 mr-2">
                  {isNepali ? 'ट्यागहरू:' : 'Tags:'}
                </span>
                {article.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="border-t border-gray-200 pt-6 mb-12">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {isNepali ? 'साझेदारी गर्नुहोस्' : 'Share this article'}
              </h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleShare('email')}
                  className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  aria-label="Share via Email"
                >
                  <Mail className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="border-t border-gray-200 pt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {isNepali ? 'सम्बन्धित समाचारहरू' : 'Related Articles'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle._id}
                    to={`/news/${relatedArticle.slug.current}`}
                    className="group"
                  >
                    <article className="glass-card rounded-xl overflow-hidden hover-card">
                      {relatedArticle.featuredImage && (
                        <div className="aspect-w-16 aspect-h-9">
                          <img
                            src={urlFor(relatedArticle.featuredImage).width(400).height(200).fit('crop').auto('format').url()}
                            alt={isNepali && relatedArticle.titleNepali ? relatedArticle.titleNepali : relatedArticle.title}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(relatedArticle.category)}`}>
                          {getCategoryLabel(relatedArticle.category)}
                        </span>
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                          {isNepali && relatedArticle.titleNepali ? relatedArticle.titleNepali : relatedArticle.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {isNepali && relatedArticle.excerptNepali ? relatedArticle.excerptNepali : relatedArticle.excerpt}
                        </p>
                        <div className="mt-2 text-xs text-gray-500">
                          {formatDate(relatedArticle.publishedAt)}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default NewsDetail;