
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
    />
  );
};

export default ExternalContent;
