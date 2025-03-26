
import React, { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

interface ExternalContentProps {
  url: string;
}

const ExternalContent = ({ url }: ExternalContentProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [corsError, setCorsError] = useState(false);
  
  // Add https:// prefix if the URL doesn't have a protocol
  const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
  
  // Check if the URL is accessible with a fetch request
  useEffect(() => {
    const checkUrl = async () => {
      try {
        // Just try to fetch headers to check CORS
        const response = await fetch(formattedUrl, { 
          method: 'HEAD',
          mode: 'no-cors'
        });
        console.log("URL check response:", response);
      } catch (error) {
        console.error("URL preflight check failed:", error);
        // We can't definitively determine CORS issues with this method
        // since no-cors doesn't provide response details
      }
    };
    
    checkUrl();
  }, [formattedUrl]);
  
  const handleLoad = () => {
    setIsLoading(false);
    setCorsError(false);
    console.log("iframe loaded successfully:", formattedUrl);
  };
  
  const handleError = (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    setIsLoading(false);
    setHasError(true);
    
    // Check if this might be a CORS error
    if (window.location.protocol === 'https:' && formattedUrl.startsWith('http:')) {
      setCorsError(true);
    }
    
    console.error("Failed to load iframe content:", formattedUrl, e);
    toast({
      title: "Content could not be loaded",
      description: "There was an issue loading the external content. This might be due to CORS restrictions.",
      variant: "destructive"
    });
  };
  
  return (
    <div className="relative w-full h-screen">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-4 border-[#2C5AAE] border-t-transparent animate-spin"></div>
            <p className="mt-4 text-[#2C5AAE] font-medium">Loading content...</p>
          </div>
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center p-6 max-w-md">
            <h3 className="text-lg font-bold text-red-600 mb-2">Failed to load content</h3>
            <p className="text-gray-700 mb-4">We couldn't load the external content from {url}.</p>
            
            {corsError ? (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-amber-700 text-sm font-medium">CORS Restriction Detected</p>
                <p className="text-gray-600 text-sm mt-1">
                  The website may have blocked embedding in iframes due to security settings.
                </p>
              </div>
            ) : (
              <p className="text-gray-600 text-sm mb-4">This might be due to content restrictions or connectivity issues.</p>
            )}
            
            <a 
              href={formattedUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-[#2C5AAE] text-white rounded-md hover:bg-[#517cc7] transition-colors"
            >
              Open in new tab instead
            </a>
          </div>
        </div>
      )}
      
      <iframe 
        src={formattedUrl} 
        className="w-full h-screen" 
        frameBorder="0"
        title="External content"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
        onLoad={handleLoad}
        onError={handleError}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default ExternalContent;
