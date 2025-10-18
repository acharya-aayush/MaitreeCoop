import React from 'react';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';

interface LogoProps {
  className?: string;
  width?: string;
  height?: string;
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "h-[105px] w-[506.88px] object-contain",
  width = "506.88px",
  height = "105px",
  alt = "Maitree Cooperative Logo"
}) => {
  const { logoUrl, loading: logoLoading } = useHomepageSettings();

  if (logoLoading) {
    return (
      <div 
        className={`bg-gray-200 animate-pulse rounded flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">Loading...</span>
      </div>
    );
  }

  return (
    <img 
      src={logoUrl || "/images/logo.svg"} 
      alt={alt}
      className={`${className} transition-opacity duration-300`}
      style={{ width, height }}
      onError={(e) => {
        // Only fallback if Sanity logo actually fails, not during loading
        const target = e.target as HTMLImageElement;
        if (logoUrl && target.src !== "/images/logo.svg") {
          target.src = "/images/logo.svg";
        }
      }}
    />
  );
};