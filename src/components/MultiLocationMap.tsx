import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BranchLocation {
  name: string;
  address: string;
  phone?: string;
  coordinates?: string;
}

interface MultiLocationMapProps {
  mainOffice: BranchLocation;
  branches: BranchLocation[];
  className?: string;
  height?: string;
  showBranchList?: boolean;
}

const MultiLocationMap: React.FC<MultiLocationMapProps> = ({
  mainOffice,
  branches,
  className = "",
  height = "400px",
  showBranchList = true
}) => {
  const { t } = useTranslation();

  // Create a query that includes all locations for a wider view
  const allLocations = [mainOffice, ...branches];
  const locationQuery = allLocations.map(loc => encodeURIComponent(loc.address)).join(' OR ');
  
  // Use a wider area search to show all branches in Gulmi region
  const multiLocationEmbedUrl = `https://maps.google.com/maps?q=Gulmi+Nepal+cooperative+branches+${locationQuery}&t=&z=10&ie=UTF8&iwloc=&output=embed`;
  
  // Main office direct link for directions
  const mainOfficeUrl = "https://maps.app.goo.gl/CLixzuYHJAYvn64M7";
  
  // General search for all locations
  const searchUrl = `https://www.google.com/maps/search/?api=1&query=Gulmi+Nepal+cooperative+branches`;

  return (
    <div className={`${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <MapPin className="h-5 w-5 text-green-600 mr-2" />
          {t('map.branchLocations')}
        </h3>
      </div>
      
      <div className="space-y-8">
        {/* Map Section - Full Width */}
        <div>
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={multiLocationEmbedUrl}
              width="100%"
              height={height}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Maitree Cooperative - All Locations"
              className="w-full"
            />
          </div>
          
          <div className="mt-4 text-center space-y-2">
            <a
              href={mainOfficeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300 text-sm font-medium mr-2"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {t('map.getDirections')} - {t('contact.mainOffice.title')}
            </a>
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 text-sm font-medium"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {t('map.viewOnGoogleMaps')}
            </a>
          </div>
        </div>
        
        {/* Branch Cards - Horizontal Grid Below Map */}
        {showBranchList && (
          <div className="space-y-6">
            {/* Main Office Card */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-800 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {t('contact.mainOffice.title')}
              </h4>
              <div className="glass-card p-6 rounded-xl border-l-4 border-green-500 hover-card">
                <div className="flex items-start">
                  <div className="bg-green-500 rounded-full p-3 mr-4">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-green-800 text-lg">{mainOffice.name}</h5>
                    <p className="text-gray-600 mt-1">{mainOffice.address}</p>
                    {mainOffice.phone && (
                      <p className="text-sm text-gray-500 mt-1">{mainOffice.phone}</p>
                    )}
                    <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mt-3">
                      मुख्य कार्यालय
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Branch Offices Grid */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-800 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {t('map.branchLocations')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {branches.map((branch, index) => (
                  <div key={index} className="glass-card p-4 rounded-xl border-l-4 border-blue-400 hover-card">
                    <div className="flex items-start">
                      <div className="bg-blue-400 rounded-full p-2 mr-3">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-blue-800 text-sm">{branch.name}</h5>
                        <p className="text-xs text-gray-600 mt-1">{branch.address}</p>
                        {branch.phone && (
                          <p className="text-xs text-gray-500 mt-1">{branch.phone}</p>
                        )}
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mt-2">
                          {t('contact.serviceCenters.branch')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiLocationMap;