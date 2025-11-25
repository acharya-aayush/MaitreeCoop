import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';
import { getImageUrl } from '@/lib/sanity';

const Layout = () => {
    const { settings, logoUrl } = useHomepageSettings();

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <ContactBar />
            <Navbar logoUrl={logoUrl} />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
