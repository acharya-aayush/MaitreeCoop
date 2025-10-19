import React, { useState, useEffect } from 'react';

const DeveloperModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  // Easter egg: Press "A-A" (for Aayush Acharya) to open developer modal
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if user is in an input field, textarea, or contenteditable element
      const activeElement = document.activeElement;
      const isInputFocused = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.hasAttribute('contenteditable')
      );

      // Don't activate if user is typing in an input field
      if (isInputFocused) return;

      const key = event.key.toLowerCase();
      setKeySequence(prev => {
        const newSequence = [...prev, key].slice(-2); // Keep only last 2 keys
        
        // Check for "aa" sequence
        if (newSequence.join('') === 'aa') {
          setIsOpen(true);
          return [];
        }
        
        return newSequence;
      });
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .cardContainer {
          width: 260px;
          height: 320px;
          background-color: rgb(255, 255, 255);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition-duration: .5s;
          cursor: pointer;
          border-radius: 12px;
          box-shadow: rgba(34, 197, 94, 0.2) 0px 10px 30px -5px;
        }

        .profileDiv {
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          background-image: url('/images/avatar.png');
          background-size: cover;
          background-position: center 10%;
          transition-duration: .5s;
          border-radius: 12px;
          position: relative;
          padding: 15px;
        }

        .profile-text-overlay {
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 3;
        }

        .profile-name {
          font-size: 18px;
          font-weight: 700;
          color: white;
          text-shadow: 
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000,
            2px 4px 8px rgba(0, 0, 0, 0.8);
          margin: 0;
          line-height: 1.2;
        }

        .profile-title {
          font-size: 13px;
          font-weight: 600;
          color: white;
          text-shadow: 
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000,
            2px 3px 6px rgba(0, 0, 0, 0.8);
          margin: 0;
          line-height: 1.2;
        }

        .profile-details {
          font-size: 9px;
          font-weight: 500;
          color: white;
          text-shadow: 
            -0.5px -0.5px 0 #000,
            0.5px -0.5px 0 #000,
            -0.5px 0.5px 0 #000,
            0.5px 0.5px 0 #000,
            1px 2px 4px rgba(0, 0, 0, 0.8);
          margin: 0;
          margin-top: 6px;
          line-height: 1.5;
          max-width: 180px;
        }

        .profile-tech {
          font-size: 8px;
          font-weight: 500;
          color: white;
          text-shadow: 
            -0.5px -0.5px 0 #000,
            0.5px -0.5px 0 #000,
            -0.5px 0.5px 0 #000,
            0.5px 0.5px 0 #000,
            1px 2px 4px rgba(0, 0, 0, 0.8);
          margin: 0;
          line-height: 1.4;
        }

        .cardContainer:hover .profileDiv {
          transform: translateX(-30%) translateY(-15%);
          transition-duration: .5s;
          border-radius: 8px 0 0 8px;
        }

        .infoDiv {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          z-index: 1;
          border-radius: 12px;
        }

        .nameDiv {
          width: 70%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          background: transparent;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          gap: 6px;
          padding: 15px;
          padding-bottom: 10px;
          padding-right: 0;
        }

        .name {
          margin: 0;
          padding: 0;
          font-size: 16px;
          font-weight: 600;
          color: #166534;
        }

        .role {
          margin: 0;
          padding: 0;
          font-size: 20px;
          font-weight: 700;
          color: #000000;
          text-shadow: 0 0 8px rgba(34, 197, 94, 0.6), 0 0 16px rgba(34, 197, 94, 0.4);
          margin-bottom: 5px;
        }

        .description {
          margin: 0;
          padding: 0;
          font-size: 12px;
          font-weight: 400;
          color: #166534;
          text-align: center;
          line-height: 1.4;
          margin-bottom: 8px;
        }

        .skills {
          margin: 0;
          padding: 0;
          font-size: 10px;
          font-weight: 500;
          color: #22c55e;
          text-align: center;
          margin-bottom: 15px;
        }

        .ui-btn {
          --btn-default-bg: rgba(255, 255, 255, 0.15);
          --btn-padding: 6px 14px;
          --btn-hover-bg: rgba(255, 255, 255, 0.25);
          --btn-transition: .3s;
          --btn-letter-spacing: .1rem;
          --btn-animation-duration: 1.2s;
          --btn-shadow-color: rgba(34, 197, 94, 0.2);
          --btn-shadow: 0 4px 10px 0 var(--btn-shadow-color);
          --hover-btn-color: #22c55e;
          --default-btn-color: #166534;
          --font-size: 11px;
          --font-weight: 600;
          --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          
          box-sizing: border-box;
          padding: var(--btn-padding);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--default-btn-color);
          font: var(--font-weight) var(--font-size) var(--font-family);
          background: var(--btn-default-bg);
          border: none;
          cursor: pointer;
          transition: var(--btn-transition);
          overflow: hidden;
          box-shadow: var(--btn-shadow);
          border-radius: 6px;
          margin-top: 10px;
          backdrop-filter: blur(12px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .ui-btn span {
          letter-spacing: var(--btn-letter-spacing);
          transition: var(--btn-transition);
          box-sizing: border-box;
          position: relative;
          background: inherit;
        }

        .ui-btn span::before {
          box-sizing: border-box;
          position: absolute;
          content: "";
          background: inherit;
        }

        .ui-btn span {
          letter-spacing: var(--btn-letter-spacing);
          transition: var(--btn-transition);
          box-sizing: border-box;
          position: relative;
          background: inherit;
        }

        .ui-btn span::before {
          box-sizing: border-box;
          position: absolute;
          content: "";
          background: inherit;
        }

        .ui-btn:hover, .ui-btn:focus {
          background: var(--btn-hover-bg);
          border-color: rgba(255, 255, 255, 0.5);
          box-shadow: 0 6px 16px 0 rgba(34, 197, 94, 0.3);
          transform: translateY(-1px);
        }

        .ui-btn:hover span, .ui-btn:focus span {
          color: var(--hover-btn-color);
        }

        .ui-btn:hover span::before, .ui-btn:focus span::before {
          animation: chitchat linear both var(--btn-animation-duration);
        }

        .ui-btn:hover span, .ui-btn:focus span {
          color: var(--hover-btn-color);
        }

        .ui-btn:hover span::before, .ui-btn:focus span::before {
          animation: chitchat linear both var(--btn-animation-duration);
        }

        @keyframes chitchat {
          0% { content: "#"; }
          5% { content: "."; }
          10% { content: "^{"; }
          15% { content: "-!"; }
          20% { content: "#$_"; }
          25% { content: "№:0"; }
          30% { content: "#{+."; }
          35% { content: "@}-?"; }
          40% { content: "?{4@%"; }
          45% { content: "=.,^!"; }
          50% { content: "?2@%"; }
          55% { content: "\\;1}]"; }
          60% { content: "?{%:%"; right: 0; }
          65% { content: "|{f[4"; right: 0; }
          70% { content: "{4%0%"; right: 0; }
          75% { content: "'1_0<"; right: 0; }
          80% { content: "{0%"; right: 0; }
          85% { content: "]>'"; right: 0; }
          90% { content: "4"; right: 0; }
          95% { content: "2"; right: 0; }
          100% { content: ""; right: 0; }
        }

        /* Glassmorphism Social Design */
        .glass-social-container {
          width: 30%;
          height: 100%;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(15px);
          box-shadow: inset 0 0 20px rgba(34, 197, 94, 0.192),
            inset 0 0 5px rgba(34, 197, 94, 0.274), 0 5px 5px rgba(0, 0, 0, 0.164);
          transition: all 0.5s ease;
          opacity: 1;
          transform: translateX(0) scale(1);
          visibility: visible;
          background: rgba(34, 197, 94, 0.05);
        }

        .cardContainer:hover .glass-social-container {
          background: rgba(34, 197, 94, 0.08);
        }

        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .social-list {
          padding: 1rem;
          display: flex;
          list-style: none;
          gap: 1.5rem;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin: 0;
          height: 100%;
        }

        .social-list li {
          cursor: pointer;
        }

        .svg {
          transition: all 0.3s;
          padding: 0.5rem;
          height: 40px;
          width: 40px;
          border-radius: 100%;
          color: #22c55e;
          fill: currentColor;
          box-shadow: inset 0 0 20px rgba(34, 197, 94, 0.3),
            inset 0 0 5px rgba(34, 197, 94, 0.5), 0 5px 5px rgba(0, 0, 0, 0.164);
        }



        /* Isometric projection */
        .iso-pro {
          transition: 0.5s;
          position: relative;
        }

        .iso-pro:hover a > .svg {
          transform: translate(8px, -8px);
          border-radius: 100%;
        }



        .iso-pro:hover .svg {
          transform: translate(3px, -3px);
        }

        .iso-pro span {
          opacity: 0;
          position: absolute;
          color: #22c55e;
          border-color: #22c55e;
          box-shadow: inset 0 0 20px rgba(34, 197, 94, 0.3),
            inset 0 0 5px rgba(34, 197, 94, 0.5), 0 5px 5px rgba(0, 0, 0, 0.164);
          border-radius: 50%;
          transition: all 0.3s;
          height: 40px;
          width: 40px;
        }

        .iso-pro:hover span {
          opacity: 1;
        }

        .iso-pro:hover span:nth-child(1) {
          opacity: 0.2;
        }

        .iso-pro:hover span:nth-child(2) {
          opacity: 0.4;
          transform: translate(3px, -3px);
        }

        .iso-pro:hover span:nth-child(3) {
          opacity: 0.6;
          transform: translate(6px, -6px);
        }

        .developer-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      
      <div 
        className="developer-modal-overlay"
        onClick={() => setIsOpen(false)}
      >
        <div className="cardContainer" onClick={(e) => e.stopPropagation()}>
          <div className="profileDiv">
            <div className="profile-text-overlay">
              <p className="profile-name">Aayush Acharya</p>
              <p className="profile-title">Full Stack Developer</p>
              <div className="profile-details">
                <p className="profile-tech">Technology Stack: React, TypeScript, Vite, Tailwind CSS</p>
                <p className="profile-tech">CMS: Sanity.io</p>
                <p className="profile-tech">Deployment: Vercel</p>
              </div>
            </div>
          </div>
          <div className="infoDiv">
            <div className="nameDiv">
              <p className="role">Web Developer</p>
              <p className="skills">React • TypeScript • Node.js • Python</p>
              <button 
                className="ui-btn"
                onClick={() => window.open('https://acharya-aayush.github.io/', '_blank')}
              >
                <span>Hire Me</span>
              </button>
            </div>
            
            {/* Glassmorphism Social Cards */}
            <div className="glass-social-container">
                <ul className="social-list">
                  <li className="iso-pro">
                    <span></span>
                    <span></span>
                    <span></span>
                    <a href="#" onClick={(e) => { e.preventDefault(); window.open('https://www.facebook.com/acharya_aayush_2k4', '_blank'); }}>
                      <svg viewBox="0 0 320 512" className="svg">
                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                      </svg>
                    </a>
                  </li>
                  <li className="iso-pro">
                    <span></span>
                    <span></span>
                    <span></span>
                    <a href="#" onClick={(e) => { e.preventDefault(); window.open('https://github.com/acharya-aayush', '_blank'); }}>
                      <svg viewBox="0 0 496 512" className="svg">
                        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                      </svg>
                    </a>
                  </li>
                  <li className="iso-pro">
                    <span></span>
                    <span></span>
                    <span></span>
                    <a href="#" onClick={(e) => { e.preventDefault(); window.open('https://linkedin.com/in/acharyaaayush', '_blank'); }}>
                      <svg viewBox="0 0 448 512" className="svg">
                        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                      </svg>
                    </a>
                  </li>
                  <li className="iso-pro">
                    <span></span>
                    <span></span>
                    <span></span>
                    <a href="#" onClick={(e) => { e.preventDefault(); window.open('https://instagram.com/acharya.404', '_blank'); }}>
                      <svg viewBox="0 0 448 512" className="svg">
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                      </svg>
                    </a>
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperModal;