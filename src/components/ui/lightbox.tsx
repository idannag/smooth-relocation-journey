
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import BlogPosts from '../blog/BlogPosts';
import SinglePost from '../blog/SinglePost';
import PopularDestinationsLightbox from '../PopularDestinationsLightbox';

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

  // Dynamic title based on content
  const getTitle = () => {
    if (url === 'news') return 'Relocation News & Guides';
    if (url === 'services') return 'My Services';
    if (url === 'chatbot') return 'My 24/7 AI Assistant';
    if (url === 'time-currency') return 'World Time & Currency';
    if (url === 'destinations') return 'Popular Destinations';
    if (url.startsWith('destination:')) return url.split(':')[1];
    if (url.startsWith('post:')) return 'Article';
    return 'External Content';
  };

  // If on server-side, return null to prevent hydration mismatch
  if (!isClient) return null;

  return (
    <Sheet open={true} onOpenChange={() => onClose()}>
      <SheetContent className="w-full sm:max-w-none p-0 h-screen overflow-y-auto" side="top">
        <SheetHeader className="px-4 pt-4 pb-2 sticky top-0 bg-white z-10 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle>{getTitle()}</SheetTitle>
            <button 
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </SheetHeader>
        
        <div className="p-0 overflow-auto">
          {url === 'news' && (
            <div className="p-4">
              <BlogPosts 
                showHeading={false}
                showSearch={true}
                showAllPostsButton={false}
                postsPerPage={12}
                simplifiedCards={false}
              />
            </div>
          )}
          
          {url === 'destinations' && (
            <PopularDestinationsLightbox />
          )}
          
          {url.startsWith('post:') && postId && (
            <SinglePost postId={postId} />
          )}
          
          {url.startsWith('http') && (
            <iframe 
              src={url} 
              className="w-full h-[calc(100vh-72px)]" 
              frameBorder="0"
              title="External content"
            />
          )}
          
          {url === 'chatbot' && (
            <div className="flex items-center justify-center h-[calc(100vh-80px)]">
              <div className="max-w-2xl w-full p-4">
                <iframe
                  src="https://chat.widget.autodigital.agency/"
                  className="w-full h-[80vh] border rounded-lg shadow-lg"
                  frameBorder="0"
                  title="AI Chatbot"
                />
              </div>
            </div>
          )}
          
          {url === 'time-currency' && (
            <div className="p-6 flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-6">World Time & Currency</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">World Time</h3>
                  <iframe 
                    src="https://free.timeanddate.com/clock/i8v1bmgo/n110/szw210/szh210/hoc000/hbw6/cf100/hgr0" 
                    frameBorder="0" 
                    width="210" 
                    height="210"
                    className="mx-auto mb-4"
                  ></iframe>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>New York: <span id="ny-time">-</span></div>
                    <div>London: <span id="ldn-time">-</span></div>
                    <div>Tokyo: <span id="tk-time">-</span></div>
                    <div>Sydney: <span id="sy-time">-</span></div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">Currency Converter</h3>
                  <iframe 
                    src="https://themoneyconverter.com/MoneyConverter?from=USD&to=EUR&amount=1" 
                    frameBorder="0"
                    width="100%"
                    height="300"
                    className="mx-auto"
                  ></iframe>
                </div>
              </div>
            </div>
          )}
          
          {url === 'services' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">My Services</h2>
              <p className="text-center text-gray-600 mb-8">
                Services content will be displayed here.
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Lightbox;
