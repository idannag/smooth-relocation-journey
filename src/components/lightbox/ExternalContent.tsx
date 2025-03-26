
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";

interface ExternalContentProps {
  url: string;
}

const ExternalContent = ({ url }: ExternalContentProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Add https:// prefix if the URL doesn't have a protocol
  const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
  
  const handleLoad = () => {
    setIsLoading(false);
    console.log("iframe loaded successfully:", formattedUrl);
  };
  
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error("Failed to load iframe content:", formattedUrl);
    toast({
      title: "Content could not be loaded",
      description: "There was an issue loading the external content. Please try again later.",
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
            <p className="text-gray-600 text-sm mb-4">This might be due to content restrictions or connectivity issues.</p>
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
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default ExternalContent;
