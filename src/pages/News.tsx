
import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const News = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
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
            <h2 className="text-2xl font-bold mb-6">{t('news.recentUpdates')}</h2>
            
            {/* Filter Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
              <button className="px-4 py-2 text-sm font-medium rounded-md bg-white text-green-600 shadow-sm">
                {t('news.categories.all')}
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-green-600">
                {t('news.categories.news')}
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-green-600">
                {t('news.categories.notices')}
              </button>
            </div>
          </div>
          
          <div className="space-y-8">
            {Object.entries(t('news.items', { returnObjects: true })).map(([key, item]) => (
              <div key={key} className="glass-card p-6 rounded-xl overflow-hidden hover-card">
                <div className="flex flex-col sm:flex-row justify-between mb-3">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      item.type === t('news.categories.notices') ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  <time className="text-sm text-gray-500 mt-1 sm:mt-0">{item.date}</time>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <button className="text-sm font-medium text-green-600 hover:text-green-800 transition-colors">
                    {t('news.readMore')}
                  </button>
                  
                  <div className="flex space-x-3">
                    <button className="text-gray-400 hover:text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <button className="px-6 py-3 bg-white border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
              {t('news.loadMore')}
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default News;
