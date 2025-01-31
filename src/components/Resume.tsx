import { useState } from 'react';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Spinner } from '@nextui-org/spinner';
import { Button } from '@nextui-org/button';
import { Expand, Minimize } from 'lucide-react';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const Resume = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className={`relative ${isFullScreen ? 'fixed inset-0 z-50 bg-white' : 'w-full max-w-4xl mx-auto'}`}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div className={`overflow-hidden ${isFullScreen ? 'h-screen' : 'h-[70vh] md:h-[1150px]'} flex flex-col`}>
          {/* Toolbar */}
          <div className="flex justify-end p-2 bg-white">
            <Button
              isIconOnly
              variant="light"
              className="text-gray-600 hover:bg-gray-200"
              onClick={() => setIsFullScreen(!isFullScreen)}
            >
              {isFullScreen ? <Minimize className="w-5 h-5" /> : <Expand className="w-5 h-5" />}
            </Button>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-hidden">
            <Viewer
              fileUrl="/assets/documents/CV-ParamjitSingh.pdf"
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={SpecialZoomLevel.PageWidth}
              theme="light"
              renderLoader={() => (
                <div className="flex items-center justify-center h-full">
                  <Spinner size="lg" />
                  <span className="ml-2 text-gray-600">Loading resume...</span>
                </div>
              )}
            />
          </div>
        </div>
      </Worker>
    </div>
  );
};

export default Resume;
