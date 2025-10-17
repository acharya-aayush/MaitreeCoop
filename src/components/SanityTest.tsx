import React, { useEffect, useState } from 'react';
import { client, queries, urlFor } from '@/lib/sanity';

interface BoardMember {
  _id: string;
  name: string;
  nameNepali?: string;
  position: string;
  positionNepali?: string;
  photo?: any;
  email?: string;
  phone?: string;
  bio?: string;
  bioNepali?: string;
  order: number;
}

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

const SanityTest = () => {
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch board members and news in parallel
        const [boardData, newsData] = await Promise.all([
          client.fetch(queries.boardMembers),
          client.fetch(queries.news)
        ]);

        setBoardMembers(boardData);
        setNews(newsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data from Sanity');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">🔄 Loading Sanity Content...</h1>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-600">❌ Error</h1>
        <p className="text-red-500 text-center">{error}</p>
        <p className="text-gray-600 text-center mt-2">Make sure your Sanity Studio is running on localhost:3335</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🎉 Sanity Content Test</h1>
        <p className="text-gray-600">Your content is now connected to your React app!</p>
      </div>

      {/* Board Members Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">👥 Board Members ({boardMembers.length})</h2>
        {boardMembers.length === 0 ? (
          <p className="text-center text-gray-500 italic">No board members found. Create some in your Sanity Studio!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardMembers.map((member) => (
              <div key={member._id} className="bg-white rounded-lg shadow-md p-6 border">
                {member.photo && (
                  <img
                    src={urlFor(member.photo).width(200).height(200).url()}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                )}
                <div className="text-center">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  {member.nameNepali && (
                    <p className="text-gray-600 text-sm">{member.nameNepali}</p>
                  )}
                  <p className="text-primary font-medium mt-2">{member.position}</p>
                  {member.positionNepali && (
                    <p className="text-primary text-sm">{member.positionNepali}</p>
                  )}
                  {member.email && (
                    <p className="text-sm text-gray-500 mt-2">{member.email}</p>
                  )}
                  {member.phone && (
                    <p className="text-sm text-gray-500">{member.phone}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">Order: {member.order}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* News Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">📰 Latest News ({news.length})</h2>
        {news.length === 0 ? (
          <p className="text-center text-gray-500 italic">No news articles found. Create some in your Sanity Studio!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.map((article) => (
              <div key={article._id} className="bg-white rounded-lg shadow-md overflow-hidden border">
                {article.featuredImage && (
                  <img
                    src={urlFor(article.featuredImage).width(400).height(200).url()}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    {article.category && (
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                        {article.category}
                      </span>
                    )}
                    {article.isPinned && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                        📌 Pinned
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{article.title}</h3>
                  {article.titleNepali && (
                    <p className="text-gray-600 font-medium mb-2">{article.titleNepali}</p>
                  )}
                  {article.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  )}
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{article.author}</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Debug Info */}
      <section className="bg-gray-100 p-6 rounded-lg">
        <h3 className="font-bold mb-4">🛠️ Debug Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Board Members Found:</strong> {boardMembers.length}</p>
            <p><strong>News Articles Found:</strong> {news.length}</p>
            <p><strong>Sanity Project ID:</strong> w4d9v3bc</p>
          </div>
          <div>
            <p><strong>Dataset:</strong> production</p>
            <p><strong>Studio URL:</strong> localhost:3335</p>
            <p><strong>Connection:</strong> ✅ Working</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SanityTest;