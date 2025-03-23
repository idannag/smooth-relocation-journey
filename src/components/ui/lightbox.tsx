
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

  // Get subtitle based on content
  const getSubtitle = () => {
    if (url === 'news') return 'Latest information to help your relocation journey';
    if (url === 'services') return 'Comprehensive relocation assistance';
    if (url === 'chatbot') return 'Get instant answers to your questions';
    if (url === 'time-currency') return 'Stay informed about global times and currencies';
    if (url === 'destinations') return 'Explore popular locations around the world';
    if (url.startsWith('post:')) return 'Detailed information about this topic';
    return '';
  };

  // If on server-side, return null to prevent hydration mismatch
  if (!isClient) return null;

  return (
    <Sheet open={true} onOpenChange={() => onClose()}>
      <SheetContent className="w-full sm:max-w-none p-0 h-screen overflow-y-auto" side="top">
        <SheetHeader className="px-4 pt-4 pb-2 sticky top-0 bg-white z-10 border-b">
          <div className="flex justify-between items-center">
            <div>
              <SheetTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
                {getTitle()}
              </SheetTitle>
              {getSubtitle() && (
                <p className="text-sm text-gray-600 mt-1">{getSubtitle()}</p>
              )}
            </div>
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
            <div className="p-6 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-[#7E69AB]">Consultation Services</h3>
                  <p className="text-gray-600 mb-4">
                    Personalized consultation to help you understand your relocation options, requirements, and create a tailored plan.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                    <li>Initial assessment of your needs</li>
                    <li>Custom relocation timeline</li>
                    <li>Budget planning assistance</li>
                    <li>Documentation guidance</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-[#7E69AB]">Housing & Accommodation</h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive support for finding and securing your new home abroad, from temporary to permanent housing.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                    <li>Property search assistance</li>
                    <li>Neighborhood guides</li>
                    <li>Lease negotiation support</li>
                    <li>Utility setup coordination</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-[#7E69AB]">Immigration Support</h3>
                  <p className="text-gray-600 mb-4">
                    Expert guidance through the visa and immigration process for your destination country.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                    <li>Visa application assistance</li>
                    <li>Document preparation</li>
                    <li>Application tracking</li>
                    <li>Residence permit guidance</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-[#7E69AB]">Family Relocation</h3>
                  <p className="text-gray-600 mb-4">
                    Specialized services for families moving abroad, with special attention to children's needs.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                    <li>School search and application</li>
                    <li>Family healthcare setup</li>
                    <li>Cultural adaptation guidance</li>
                    <li>Spouse career support</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-[#7E69AB]">Moving & Logistics</h3>
                  <p className="text-gray-600 mb-4">
                    Coordination of all aspects of your physical move, from packing to customs clearance.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                    <li>Moving company coordination</li>
                    <li>Shipping and customs guidance</li>
                    <li>Insurance recommendations</li>
                    <li>Pet relocation assistance</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-[#7E69AB]">Settlement Services</h3>
                  <p className="text-gray-600 mb-4">
                    Essential support for the first weeks and months in your new country.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                    <li>Banking setup assistance</li>
                    <li>Local registration support</li>
                    <li>Healthcare enrollment</li>
                    <li>Community integration</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Lightbox;
