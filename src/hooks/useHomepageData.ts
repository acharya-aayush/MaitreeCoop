import { useState, useEffect } from 'react';
import { client, queries } from '@/lib/sanity';

// Global cache for homepage data
let cachedHomepageData: HomepageData | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export interface HomepageData {
    heroSettings: any;
    introSection: any;
    news: any[];
}

export const useHomepageData = () => {
    const [isLoading, setIsLoading] = useState(!cachedHomepageData);
    const [data, setData] = useState<HomepageData | null>(cachedHomepageData);

    useEffect(() => {
        const now = Date.now();

        // Use cached data if it's fresh
        if (cachedHomepageData && (now - cacheTimestamp) < CACHE_DURATION) {
            setData(cachedHomepageData);
            setIsLoading(false);
            return;
        }

        // Fetch all homepage data in parallel
        const fetchAllData = async () => {
            try {
                const [heroSettings, introSection, news] = await Promise.all([
                    client.fetch(queries.homepageSettings),
                    client.fetch(queries.introductionSection),
                    client.fetch(queries.news)
                ]);

                const homepageData: HomepageData = {
                    heroSettings,
                    introSection,
                    news: (news || []).slice(0, 3) // Get only latest 3
                };

                cachedHomepageData = homepageData;
                cacheTimestamp = Date.now();
                setData(homepageData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching homepage data:', error);
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);

    return {
        isLoading,
        heroSettings: data?.heroSettings || null,
        introSection: data?.introSection || null,
        news: data?.news || []
    };
};
