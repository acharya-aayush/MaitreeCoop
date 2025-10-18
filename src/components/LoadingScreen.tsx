import React from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
      {/* Animated Circle Loader */}
      <div className="mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" height="80px" width="80px" className="spinner">
          <circle 
            strokeDashoffset="-376.4" 
            strokeDasharray="377 377" 
            strokeLinecap="round" 
            transform="rotate(-90,64,64)" 
            strokeWidth="6" 
            stroke="hsl(142, 70%, 35%)" 
            fill="none" 
            r="60" 
            cy="64" 
            cx="64" 
            className="ring1"
          />
          <circle 
            strokeDashoffset="-329.3" 
            strokeDasharray="329.9 329.9" 
            strokeLinecap="round" 
            transform="rotate(-90,64,64)" 
            strokeWidth="5" 
            stroke="hsl(142, 75%, 40%)" 
            fill="none" 
            r="52.5" 
            cy="64" 
            cx="64" 
            className="ring2"
          />
          <circle 
            strokeDashoffset="-288.6" 
            strokeDasharray="289 289" 
            strokeLinecap="round" 
            transform="rotate(-90,64,64)" 
            strokeWidth="4" 
            stroke="hsl(142, 80%, 45%)" 
            fill="none" 
            r="46" 
            cy="64" 
            cx="64" 
            className="ring3"
          />
          <circle 
            strokeDashoffset="-254" 
            strokeDasharray="254.5 254.5" 
            strokeLinecap="round" 
            transform="rotate(-90,64,64)" 
            strokeWidth="3" 
            stroke="hsl(142, 85%, 50%)" 
            fill="none" 
            r="40.5" 
            cy="64" 
            cx="64" 
            className="ring4"
          />
          <circle 
            strokeDashoffset="-225.8" 
            strokeDasharray="226.2 226.2" 
            strokeLinecap="round" 
            transform="rotate(-90,64,64)" 
            strokeWidth="2" 
            stroke="hsl(142, 90%, 55%)" 
            fill="none" 
            r="36" 
            cy="64" 
            cx="64" 
            className="ring5"
          />
          <circle 
            strokeDashoffset="-203.9" 
            strokeDasharray="204.2 204.2" 
            strokeLinecap="round" 
            transform="rotate(-90,64,64)" 
            strokeWidth="2" 
            stroke="hsl(142, 95%, 60%)" 
            fill="none" 
            r="32.5" 
            cy="64" 
            cx="64" 
            className="ring6"
          />
        </svg>
      </div>
      
      {/* Text Animation */}
      <div className="loading-card">
        <div className="text-loader">
          <p>loading</p>
          <div className="words">
            <span className="word">services</span>
            <span className="word">gallery</span>
            <span className="word">members</span>
            <span className="word">news</span>
            <span className="word">banking</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .spinner {
            transform-origin: 50% 50%;
          }

          .spinner circle {
            transform-box: fill-box;
            transform-origin: 50% 50%;
          }

          .ring1 {
            animation: ring1_ 3s 0s ease-in-out infinite;
          }

          .ring2 {
            animation: ring2_ 3s 0.1s ease-in-out infinite;
          }

          .ring3 {
            animation: ring3_ 3s 0.2s ease-in-out infinite;
          }

          .ring4 {
            animation: ring4_ 3s 0.3s ease-in-out infinite;
          }

          .ring5 {
            animation: ring5_ 3s 0.4s ease-in-out infinite;
          }

          .ring6 {
            animation: ring6_ 3s 0.5s ease-in-out infinite;
          }

          /* Loading Text Animation Styles */
          .loading-card {
            --bg-color: #ffffff;
            background-color: var(--bg-color);
            padding: 1rem 2rem;
            border-radius: 1.25rem;
          }

          .text-loader {
            color: rgb(124, 124, 124);
            font-family: "Inter", sans-serif;
            font-weight: 500;
            font-size: 20px;
            height: 32px;
            padding: 8px 8px;
            display: flex;
            align-items: center;
            border-radius: 8px;
            gap: 8px;
          }

          .words {
            overflow: hidden;
            position: relative;
            height: 32px;
          }

          .words::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
              var(--bg-color) 10%,
              transparent 30%,
              transparent 70%,
              var(--bg-color) 90%
            );
            z-index: 20;
          }

          .word {
            display: block;
            height: 100%;
            padding-left: 6px;
            color: hsl(142, 70%, 35%);
            animation: spin_words 4s infinite;
            line-height: 32px;
          }

          @keyframes spin_words {
            10% {
              transform: translateY(-102%);
            }
            25% {
              transform: translateY(-100%);
            }
            35% {
              transform: translateY(-202%);
            }
            50% {
              transform: translateY(-200%);
            }
            60% {
              transform: translateY(-302%);
            }
            75% {
              transform: translateY(-300%);
            }
            85% {
              transform: translateY(-402%);
            }
            100% {
              transform: translateY(-400%);
            }
          }

          /* Ring 1 Animation */
          @keyframes ring1_ {
            from {
              stroke-dashoffset: -376.237129776;
              transform: rotate(-0.25turn);
              animation-timing-function: ease-in;
            }
            25% {
              stroke-dashoffset: -94.247778;
              transform: rotate(1turn);
              animation-timing-function: ease-out;
            }
            50% {
              stroke-dashoffset: -376.237129776;
              transform: rotate(2.25turn);
              animation-timing-function: ease-in;
            }
            75% {
              stroke-dashoffset: -94.247778;
              transform: rotate(3.5turn);
              animation-timing-function: ease-out;
            }
            to {
              stroke-dashoffset: -376.237129776;
              transform: rotate(4.75turn);
            }
          }

          /* Ring 2 Animation */
          @keyframes ring2_ {
            from {
              stroke-dashoffset: -329.207488554;
              transform: rotate(-0.25turn);
              animation-timing-function: ease-in;
            }
            25% {
              stroke-dashoffset: -82.46680575;
              transform: rotate(1turn);
              animation-timing-function: ease-out;
            }
            50% {
              stroke-dashoffset: -329.207488554;
              transform: rotate(2.25turn);
              animation-timing-function: ease-in;
            }
            75% {
              stroke-dashoffset: -82.46680575;
              transform: rotate(3.5turn);
              animation-timing-function: ease-out;
            }
            to {
              stroke-dashoffset: -329.207488554;
              transform: rotate(4.75turn);
            }
          }

          /* Ring 3 Animation */
          @keyframes ring3_ {
            from {
              stroke-dashoffset: -288.4484661616;
              transform: rotate(-0.25turn);
              animation-timing-function: ease-in;
            }
            25% {
              stroke-dashoffset: -72.2566298;
              transform: rotate(1turn);
              animation-timing-function: ease-out;
            }
            50% {
              stroke-dashoffset: -288.4484661616;
              transform: rotate(2.25turn);
              animation-timing-function: ease-in;
            }
            75% {
              stroke-dashoffset: -72.2566298;
              transform: rotate(3.5turn);
              animation-timing-function: ease-out;
            }
            to {
              stroke-dashoffset: -288.4484661616;
              transform: rotate(4.75turn);
            }
          }

          /* Ring 4 Animation */
          @keyframes ring4_ {
            from {
              stroke-dashoffset: -253.9600625988;
              transform: rotate(-0.25turn);
              animation-timing-function: ease-in;
            }
            25% {
              stroke-dashoffset: -63.61725015;
              transform: rotate(1turn);
              animation-timing-function: ease-out;
            }
            50% {
              stroke-dashoffset: -253.9600625988;
              transform: rotate(2.25turn);
              animation-timing-function: ease-in;
            }
            75% {
              stroke-dashoffset: -63.61725015;
              transform: rotate(3.5turn);
              animation-timing-function: ease-out;
            }
            to {
              stroke-dashoffset: -253.9600625988;
              transform: rotate(4.75turn);
            }
          }

          /* Ring 5 Animation */
          @keyframes ring5_ {
            from {
              stroke-dashoffset: -225.7422778656;
              transform: rotate(-0.25turn);
              animation-timing-function: ease-in;
            }
            25% {
              stroke-dashoffset: -56.5486668;
              transform: rotate(1turn);
              animation-timing-function: ease-out;
            }
            50% {
              stroke-dashoffset: -225.7422778656;
              transform: rotate(2.25turn);
              animation-timing-function: ease-in;
            }
            75% {
              stroke-dashoffset: -56.5486668;
              transform: rotate(3.5turn);
              animation-timing-function: ease-out;
            }
            to {
              stroke-dashoffset: -225.7422778656;
              transform: rotate(4.75turn);
            }
          }

          /* Ring 6 Animation */
          @keyframes ring6_ {
            from {
              stroke-dashoffset: -203.795111962;
              transform: rotate(-0.25turn);
              animation-timing-function: ease-in;
            }
            25% {
              stroke-dashoffset: -51.05087975;
              transform: rotate(1turn);
              animation-timing-function: ease-out;
            }
            50% {
              stroke-dashoffset: -203.795111962;
              transform: rotate(2.25turn);
              animation-timing-function: ease-in;
            }
            75% {
              stroke-dashoffset: -51.05087975;
              transform: rotate(3.5turn);
              animation-timing-function: ease-out;
            }
            to {
              stroke-dashoffset: -203.795111962;
              transform: rotate(4.75turn);
            }
          }
        `
      }} />
    </div>
  );
};

export default LoadingScreen;