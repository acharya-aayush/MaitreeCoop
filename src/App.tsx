
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import AnnouncementModal from "@/components/AnnouncementModal";
import { useAnnouncements } from "@/hooks/useContentSections";

// Initialize i18n
import './i18n';

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Members from "./pages/Members";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Gallery from "./pages/Gallery";
import Board from "./pages/Board";
import Financial from "./pages/Financial";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import MapTest from "./pages/MapTest";
import BoardAdmin from "./pages/BoardAdmin";
import DynamicBoard from "./pages/DynamicBoard";
import SanityTest from "./components/SanityTest";

const queryClient = new QueryClient();

const App = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
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
            <Route path="/sanity-test" element={<SanityTest />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Show announcements after initial loading and when data is available */}
          {!isInitialLoading && !announcementsLoading && (
            <AnnouncementModal announcements={announcements} />
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
