import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';

const Layout = () => {
    const { logoUrl } = useHomepageSettings();

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <ContactBar />
            <Navbar logoUrl={logoUrl} />
            <main className="flex-grow">
                {/* ErrorBoundary catches render errors, Suspense handles lazy loading */}
                <ErrorBoundary>
                    <Suspense fallback={<LoadingSpinner />}>
                        <Outlet />
                    </Suspense>
                </ErrorBoundary>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
