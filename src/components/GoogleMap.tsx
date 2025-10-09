import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GoogleMapProps {
  location: string;
  className?: string;
  height?: string;
  showDirectionsLink?: boolean;
  title?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  location,
  className = "",
  height = "300px",
  showDirectionsLink = true,
  title
}) => {
  const { t } = useTranslation();

  // Use the actual Maitree Cooperative location embed URL
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3218.0765855643767!2d83.24494277509488!3d28.066295675978697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399641006ff6c60f%3A0x17d8bffedfa116c0!2sMaitri%20multipurposeCooperative%20ltd!5e1!3m2!1sen!2snp!4v1759431626017!5m2!1sen!2snp";
  
  // Google Maps directions URL using the actual location link
  const directionsUrl = "https://maps.app.goo.gl/CLixzuYHJAYvn64M7";

  return (
    <div className={`relative ${className}`}>
      {title && (
        <div className="mb-4 flex items-center">
          <MapPin className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
      )}
      
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <iframe
          src={embedUrl}
          width="100%"
          height={height}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Maitree Multipurpose Cooperative Ltd - Location"
          className="w-full"
        />
      </div>
      
      {showDirectionsLink && (
        <div className="mt-4 text-center">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300 text-sm font-medium"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            {t('map.getDirections', { defaultValue: 'Get Directions' })}
          </a>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;