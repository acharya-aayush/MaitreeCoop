import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[50vh] bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-12 h-12 rounded-full border-4 border-green-100"></div>
          {/* Inner spinning ring */}
          <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-green-600 animate-spin"></div>
        </div>
        {/* Loading text */}
        <p className="text-sm text-gray-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
