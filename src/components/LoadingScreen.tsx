import React from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo Container */}
        <div className="mb-8 animate-pulse">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">मैत्री</span>
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Loading Text */}
        <p className="text-green-600 font-medium text-lg mb-2">Maitree Multipurpose Cooperative</p>
        <p className="text-gray-500 text-sm">Loading...</p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto mt-6 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-green-500 h-2 rounded-full animate-pulse"
            style={{
              width: '100%',
              animation: 'loading-progress 2s ease-out forwards'
            }}
          ></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes loading-progress {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
        `
      }} />
    </div>
  );
};

export default LoadingScreen;