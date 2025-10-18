
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';
import { client, queries, getImageUrl } from '@/lib/sanity';

interface NewsArticle {
  _id: string;
  title: string;
  titleNepali?: string;
  slug: { current: string };
  excerpt?: string;
  excerptNepali?: string;
  featuredImage?: any;
  category?: string;
  publishedAt: string;
  author: string;
  isPinned?: boolean;
}

const News = () => {
  const { t, i18n } = useTranslation();
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(queries.news);
        setNewsArticles(data);
        setFilteredNews(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to fetch news articles');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filterNews = (category: string) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredNews(newsArticles);
    } else {
      setFilteredNews(newsArticles.filter(article => article.category === category));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(i18n.language === 'np' ? 'ne-NP' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800',
      financial: 'bg-green-100 text-green-800',
      services: 'bg-purple-100 text-purple-800',
      events: 'bg-orange-100 text-orange-800',
      announcements: 'bg-yellow-100 text-yellow-800',
      achievements: 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <ContactBar />
        <Navbar />
        <div className="page-header text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
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
            <h1 className="text-4xl md:text-5xl font-bold">{t('news.title')}</h1>
            <div className="mt-8 p-4 bg-red-50 rounded-lg">
              <p className="text-red-600">{error}</p>
              <p className="text-sm text-gray-600 mt-2">
                Please make sure your Sanity Studio is running and you have published some news articles.
              </p>
            </div>
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
      
      <div className="page-header text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">{t('news.title')}</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('news.intro')}
          </p>
        </div>
      </div>
      
      <div className="section-container">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{t('news.recentUpdates')}</h2>
              <span className="text-sm text-gray-500">
                {filteredNews.length} {filteredNews.length === 1 ? 'article' : 'articles'}
              </span>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button 
                onClick={() => filterNews('all')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeFilter === 'all' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('news.categories.all', 'All')}
              </button>
              {['general', 'financial', 'services', 'events', 'announcements', 'achievements'].map(category => (
                <button 
                  key={category}
                  onClick={() => filterNews(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                    activeFilter === category 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500">
                {activeFilter === 'all' 
                  ? 'No news articles have been published yet.' 
                  : `No articles found in the "${activeFilter}" category.`
                }
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredNews.map((article) => (
                <article key={article._id} className="glass-card p-6 rounded-xl overflow-hidden hover-card group">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Featured Image */}
                    {article.featuredImage && getImageUrl(article.featuredImage) && (
                      <div className="lg:w-1/3">
                        <img
                          src={getImageUrl(article.featuredImage)}
                          alt={article.title}
                          className="w-full h-48 lg:h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className={`${article.featuredImage ? 'lg:w-2/3' : 'w-full'}`}>
                      <div className="flex flex-col sm:flex-row justify-between mb-3">
                        <div className="flex items-center gap-3 mb-2 sm:mb-0">
                          {article.category && (
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                              {article.category}
                            </span>
                          )}
                          {article.isPinned && (
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              📌 Pinned
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(article.publishedAt)}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {i18n.language === 'np' && article.titleNepali ? article.titleNepali : article.title}
                      </h3>
                      
                      {(article.excerpt || article.excerptNepali) && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {i18n.language === 'np' && article.excerptNepali ? article.excerptNepali : article.excerpt}
                        </p>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          By {article.author}
                        </span>
                        <Link
                          to={`/news/${article.slug.current}`}
                          className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm"
                        >
                          {t('news.readMore', 'Read More')}
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default News;
