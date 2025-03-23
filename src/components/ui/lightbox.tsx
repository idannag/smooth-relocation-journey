
import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import LightboxHeader from '../lightbox/LightboxHeader';
import { getLightboxContent } from '../lightbox/getLightboxContent';

interface LightboxProps {
  url: string;
  onClose: () => void;
}

const Lightbox = ({ url, onClose }: LightboxProps) => {
  const [isClient, setIsClient] = useState(false);
  const [postId, setPostId] = useState<number | null>(null);
  
  useEffect(() => {
    setIsClient(true);
    
    // Check if the URL is in the format "post:123"
    if (url.startsWith('post:')) {
      const id = parseInt(url.split(':')[1]);
      if (!isNaN(id)) {
        setPostId(id);
      }
    }
  }, [url]);

  // If on server-side, return null to prevent hydration mismatch
  if (!isClient) return null;

  // Get content information based on the URL
  const contentInfo = getLightboxContent(url, postId);

  return (
    <Sheet open={true} onOpenChange={() => onClose()}>
      <SheetContent className="w-full sm:max-w-none p-0 h-screen overflow-y-auto" side="top">
        <LightboxHeader 
          title={contentInfo.title}
          subtitle={contentInfo.subtitle}
          onClose={onClose}
        />
        
        <div className="p-0 overflow-auto">
          {contentInfo.component}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Lightbox;
