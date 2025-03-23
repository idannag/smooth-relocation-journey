
import React from 'react';

interface ExternalContentProps {
  url: string;
}

const ExternalContent = ({ url }: ExternalContentProps) => {
  return (
    <iframe 
      src={url} 
      className="w-full h-[calc(100vh-72px)]" 
      frameBorder="0"
      title="External content"
    />
  );
};

export default ExternalContent;
