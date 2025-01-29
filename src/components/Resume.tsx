import React, { useState, useEffect } from 'react';
import { Loader2, Maximize2, Minimize2 } from 'lucide-react';

const Resume = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [iframeHeight, setIframeHeight] = useState('100vh');
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);

  const handleLoad = () => {
    setIsLoading(false);
    updateDimensions();
  };

  const updateDimensions = () => {
    const container = document.getElementById('pdf-container');
    if (container) {
      const width = container.offsetWidth;
      setContainerWidth(width);
      // Standard US Letter size PDF width is 8.5 inches (816 pixels at 96 DPI)
      const pdfWidth = 816;
      const newScale = width / pdfWidth;
      setScale(Math.min(newScale, 1)); // Don't scale up beyond 100%
    }
    setIframeHeight(window.innerHeight * 0.9 + 'px');
  };

  useEffect(() => {
    const handleResize = () => {
      updateDimensions();
    };

    // Initial update
    updateDimensions();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    // Re-calculate dimensions after toggling fullscreen
    setTimeout(updateDimensions, 100);
  };

  return (
    <div className={`relative transition-all duration-300 ease-in-out ${
      isFullScreen 
        ? 'fixed inset-0 z-50 bg-white' 
        : 'w-full max-w-4xl mx-auto py-8 px-4 min-h-screen'
    }`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      )}
      
      <button
        onClick={toggleFullScreen}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
      >
        {isFullScreen ? (
          <Minimize2 className="h-5 w-5" />
        ) : (
          <Maximize2 className="h-5 w-5" />
        )}
      </button>

      <div 
        id="pdf-container"
        className={`w-full rounded-lg shadow-lg overflow-hidden bg-white ${
          isFullScreen ? 'h-screen' : ''
        }`}
      >
        <div className="w-full overflow-x-hidden">
          <iframe
            src="/assets/documents/CV-ParamjitSingh.pdf"
            title="Resume"
            className={`w-full border-0 transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              height: isFullScreen ? '100vh' : iframeHeight,
              width: `${100 / scale}%`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left'
            }}
            onLoad={handleLoad}
          />
        </div>
      </div>
    </div>
  );
};

export default Resume;