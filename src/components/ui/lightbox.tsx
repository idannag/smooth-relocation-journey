
import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import LightboxHeader from '../lightbox/LightboxHeader';
import { getLightboxContent } from '../lightbox/getLightboxContent';
import LoadingSpinner from '../lightbox/LoadingSpinner';

interface LightboxProps {
  url: string;
  onClose: () => void;
}

const Lightbox = ({ url, onClose }: LightboxProps) => {
  const [isClient, setIsClient] = useState(false);
  const [postId, setPostId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsClient(true);
    
    // Check if the URL is in the format "post:123"
    if (url.startsWith('post:')) {
      const id = parseInt(url.split(':')[1]);
      if (!isNaN(id)) {
        setPostId(id);
      }
    }
    
    // Simulate loading time for content
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [url]);

  // If on server-side, return null to prevent hydration mismatch
  if (!isClient) return null;

  // Get content information based on the URL
  const contentInfo = getLightboxContent(url, postId);
  
  // Determine if header should be displayed
  // Hide header for external content and destination info
  const shouldDisplayHeader = !url.startsWith('http') && 
                             !url.startsWith('destination:') && 
                             url !== 'destinations';

  return (
    <Sheet open={true} onOpenChange={() => onClose()}>
      <SheetContent 
        className="w-full sm:max-w-none p-0 mt-16 mb-16 h-[calc(100vh-8rem)] overflow-y-auto bg-white animate-fade-in" 
        side="top"
      >
        <LightboxHeader 
          title={contentInfo.title}
          subtitle={contentInfo.subtitle}
          onClose={onClose}
          shouldDisplay={shouldDisplayHeader}
        />
        
        <div className={`p-0 overflow-auto animate-fade-in ${!shouldDisplayHeader ? 'h-full' : ''}`}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            contentInfo.component
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Lightbox;
