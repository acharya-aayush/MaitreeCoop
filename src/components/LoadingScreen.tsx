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
        <div className="mb-8">
          <img 
            src="/images/logo.png" 
            alt="Maitree Cooperative Logo" 
            className="w-24 h-24 mx-auto object-contain"
          />
        </div>

        {/* Custom Loading Text Animation */}
        <div className="loader mb-8">
          <span className="l">L</span>
          <span className="o">o</span>
          <span className="a">a</span>
          <span className="d">d</span>
          <span className="i">i</span>
          <span className="n">n</span>
          <span className="g">g</span>
          <span className="d1">.</span>
          <span className="d2">.</span>
        </div>

        {/* Cooperative Name */}
        <p className="text-green-600 font-medium text-lg">Maitree Multipurpose Cooperative</p>
        <p className="text-gray-500 text-sm mt-1">मैत्री बहुउद्देश्यीय सहकारी संस्था</p>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .loader {
            font-size: 24px;
            font-weight: bold;
            font-family: 'Arial', sans-serif;
          }

          .l {
            color: #16a34a;
            opacity: 0;
            animation: pass 2s ease-in-out infinite;
            animation-delay: 0.2s;
            letter-spacing: 0.1em;
            text-shadow: 2px 2px 3px #919191;
          }

          .o {
            color: #16a34a;
            opacity: 0;
            animation: pass 2s ease-in-out infinite;
            animation-delay: 0.4s;
            letter-spacing: 0.1em;
            text-shadow: 2px 2px 3px #919191;
          }

          .a {
            color: #16a34a;
            opacity: 0;
            animation: pass 2s ease-in-out infinite;
            animation-delay: 0.6s;
            letter-spacing: 0.1em;
            text-shadow: 2px 2px 3px #919191;
          }

          .d {
            color: #16a34a;
            opacity: 0;
            animation: pass 2s ease-in-out infinite;
            animation-delay: 0.8s;
            letter-spacing: 0.1em;
            text-shadow: 2px 2px 3px #919191;
          }

          .i {
            color: #16a34a;
            opacity: 0;
            animation: pass 2s ease-in-out infinite;
            animation-delay: 1s;
            letter-spacing: 0.1em;
            text-shadow: 2px 2px 3px #919191;
          }

          .n {
            color: #16a34a;
            opacity: 0;
            animation: pass 2s ease-in-out infinite;
            animation-delay: 1.2s;
            letter-spacing: 0.1em;
            text-shadow: 2px 2px 3px #919191;
          }

          .g {
            color: #16a34a;
            opacity: 0;
            animation: pass 2s ease-in-out infinite;
            animation-delay: 1.4s;
            letter-spacing: 0.1em;
            text-shadow: 2px 2px 3px #919191;
          }

          .d1 {
            color: #059669;
            opacity: 0;
            animation: pass1 2s ease-in-out infinite;
            animation-delay: 1.6s;
            letter-spacing: 0.1em;
            text-shadow: 2px 2px 3px #919191;
          }

          .d2 {
            color: #059669;
            opacity: 0;
            animation: pass1 2s ease-in-out infinite;
            animation-delay: 1.8s;
            letter-spacing: 0.1em;
            text-shadow: 2px 2px 3px #919191;
          }

          @keyframes pass {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes pass1 {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `
      }} />
    </div>
  );
};

export default LoadingScreen;