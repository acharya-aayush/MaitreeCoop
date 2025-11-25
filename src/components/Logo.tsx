import React from 'react';

interface LogoProps {
  className?: string;
  width?: string;
  height?: string;
  alt?: string;
  logoUrl?: string | null;
}

export const Logo: React.FC<LogoProps> = ({
  className = "h-[105px] w-[506.88px] object-contain",
  width = "506.88px",
  height = "105px",
  alt = "Maitree Cooperative Logo"
}) => {
  // Always use the local hardcoded logo
  const logoUrl = "/images/logo.png";

  return (
    <img
      src={logoUrl}
      alt={alt}
      className={`${className} transition-opacity duration-300`}
      style={{ width, height }}
      onError={(e) => {
        // Fallback to SVG if PNG fails
        const target = e.target as HTMLImageElement;
        if (target.src !== "/images/logo.svg") {
          target.src = "/images/logo.svg";
        }
      }}
    />
  );
};