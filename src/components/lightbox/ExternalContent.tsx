
import React from 'react';

interface ExternalContentProps {
  url: string;
}

const ExternalContent = ({ url }: ExternalContentProps) => {
  // Add https:// prefix if the URL doesn't have a protocol
  const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
  
  return (
    <iframe 
      src={formattedUrl} 
      className="w-full h-screen" 
      frameBorder="0"
      title="External content"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
    />
  );
};

export default ExternalContent;

