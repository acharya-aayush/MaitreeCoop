
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import AnnouncementModal from "@/components/AnnouncementModal";
import { useAnnouncements } from "@/hooks/useContentSections";

// Initialize i18n
import './i18n';

// Lazy-loaded pages for code splitting (~40% bundle reduction)
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Services = lazy(() => import("./pages/Services"));
const Members = lazy(() => import("./pages/Members"));
const News = lazy(() => import("./pages/News"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Board = lazy(() => import("./pages/Board"));
const Financial = lazy(() => import("./pages/Financial"));
const Contact = lazy(() => import("./pages/Contact"));
const Community = lazy(() => import("./pages/Community"));
const MapTest = lazy(() => import("./pages/MapTest"));
const BoardAdmin = lazy(() => import("./pages/BoardAdmin"));
const DynamicBoard = lazy(() => import("./pages/DynamicBoard"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const OfficialVerification = lazy(() => import("./pages/OfficialVerification"));

// Non-lazy components (needed immediately)
import DeveloperModal from "./components/DeveloperModal";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Developer signature in console
  useEffect(() => {
    console.log(
      `%c
╭─────────────────────────────────────────────────────────────╮
│                    🏛️ MaitreeCoop Website                    │
│                                                             │
│  Developed by: Aayush Acharya                              │
│  GitHub: https://github.com/acharya-aayush                 │
│  Technology: React + TypeScript + Sanity CMS               │
│  Year: 2025                                                │
│                                                             │
│  Professional web development for financial cooperatives    │
│  Press "A" twice to access developer information           │
╰─────────────────────────────────────────────────────────────╯
      `,
      'color: #16a34a; font-family: monospace; line-height: 1.5;'
    );
  }, []);
  const { announcements, loading: announcementsLoading } = useAnnouncements();

  useEffect(() => {
    // Show loading screen for at least 2 seconds to ensure smooth logo loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LoadingScreen isLoading={isInitialLoading} />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/members" element={<Members />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/board" element={<Board />} />
              <Route path="/financial" element={<Financial />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/community" element={<Community />} />
              <Route path="/map-test" element={<MapTest />} />
              <Route path="/admin/board" element={<BoardAdmin />} />
              <Route path="/board-dynamic" element={<DynamicBoard />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/verify" element={<OfficialVerification />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>

          {/* Show announcements after initial loading and when data is available */}
          {!isInitialLoading && !announcementsLoading && (
            <AnnouncementModal announcements={announcements} />
          )}

          {/* Developer easter egg modal */}
          <DeveloperModal />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
