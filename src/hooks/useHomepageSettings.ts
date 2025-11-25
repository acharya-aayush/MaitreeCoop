import { useState, useEffect } from 'react';
import { client, queries, getImageUrl } from '@/lib/sanity';

export interface HomepageSettings {
  _id: string;
  logo?: any;
  memberCount: number;
  memberCountSuffix: string;
  memberCountNepali: string;
  lastUpdated: string;
}

// Cache for homepage settings to prevent refetching
let cachedSettings: HomepageSettings | null = null;
let cachedLogoUrl: string | null = null;
let isInitialLoad = true;

export const useHomepageSettings = () => {
  const [settings, setSettings] = useState<HomepageSettings | null>(cachedSettings);
  const [loading, setLoading] = useState(isInitialLoad);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Only show loading on initial load, not on subsequent fetches
        if (isInitialLoad) {
          setLoading(true);
        }

        const data = await client.fetch(queries.homepageSettings);

        if (data) {
          setSettings(data);
          cachedSettings = data;

          // Preload the logo image to prevent flashing
          if (data.logo) {
            const logoUrl = getImageUrl(data.logo);
            if (logoUrl && logoUrl !== cachedLogoUrl) {
              cachedLogoUrl = logoUrl;

              // Preload the image
              const img = new Image();
              img.onload = () => {
                // Image is now cached in browser
                setLoading(false);
                isInitialLoad = false;
              };
              img.onerror = () => {
                console.error('Failed to preload logo image');
                setLoading(false);
                isInitialLoad = false;
              };
              img.src = logoUrl;
            } else {
              setLoading(false);
              isInitialLoad = false;
            }
          } else {
            setLoading(false);
            isInitialLoad = false;
          }
        } else {
          setLoading(false);
          isInitialLoad = false;
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching homepage settings:', err);
        setError('Failed to load homepage settings');
        setLoading(false);
        isInitialLoad = false;
      }
    };

    fetchSettings();
  }, []);

  const logoUrl = settings?.logo ? getImageUrl(settings.logo) : cachedLogoUrl;

  return {
    settings,
    logoUrl,
    loading,
    error
  };
};

export const useLogo = () => {
  const [logoUrl, setLogoUrl] = useState<string | null>(cachedLogoUrl);
  const [loading, setLoading] = useState(!cachedLogoUrl);

  useEffect(() => {
    if (cachedLogoUrl) {
      setLogoUrl(cachedLogoUrl);
      setLoading(false);
      return;
    }

    const fetchLogo = async () => {
      try {
        const data = await client.fetch(queries.homepageLogo);
        if (data?.logo) {
          const url = getImageUrl(data.logo);
          if (url) {
            cachedLogoUrl = url;
            setLogoUrl(url);
          }
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();
  }, []);

  return { logoUrl, loading };
};