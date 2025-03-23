
import React, { useEffect, useState } from 'react';
import { X, Clock, CreditCard } from 'lucide-react';
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
    if (url === 'news') return 'Relocation News';
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
    if (url === 'news') return 'Latest information';
    if (url === 'services') return 'Relocation assistance';
    if (url === 'chatbot') return 'Get instant answers';
    if (url === 'time-currency') return 'Global info';
    if (url === 'destinations') return 'Explore locations';
    if (url.startsWith('post:')) return 'Detailed information';
    return '';
  };

  // If on server-side, return null to prevent hydration mismatch
  if (!isClient) return null;

  return (
    <Sheet open={true} onOpenChange={() => onClose()}>
      <SheetContent className="w-full sm:max-w-none p-0 h-screen overflow-y-auto" side="top">
        <SheetHeader className="px-4 pt-3 pb-2 sticky top-0 bg-white z-10 border-b flex-row justify-between items-center">
          <div className="flex-1">
            <SheetTitle className="text-lg md:text-2xl font-bold bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent text-left">
              {getTitle()}
            </SheetTitle>
            {getSubtitle() && (
              <p className="text-xs md:text-sm text-gray-600 mt-0.5 text-left">{getSubtitle()}</p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
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
            <div className="p-4 md:p-6 flex flex-col items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-4xl">
                {/* World Time Section */}
                <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-[#2C5AAE]" />
                    <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">World Time</h3>
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    <iframe 
                      src="https://free.timeanddate.com/clock/i8v1bmgo/n110/szw180/szh180/hoc000/hbw6/cf100/hgr0" 
                      frameBorder="0" 
                      width="180" 
                      height="180"
                      className="mx-auto"
                      title="World Clock"
                    ></iframe>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm bg-gray-50 p-3 rounded-lg">
                    <div className="flex flex-col">
                      <span className="font-medium text-[#2C5AAE]">New York:</span>
                      <span id="ny-time" className="text-gray-700">-</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-[#2C5AAE]">London:</span>
                      <span id="ldn-time" className="text-gray-700">-</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-[#2C5AAE]">Tokyo:</span>
                      <span id="tk-time" className="text-gray-700">-</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-[#2C5AAE]">Sydney:</span>
                      <span id="sy-time" className="text-gray-700">-</span>
                    </div>
                  </div>
                </div>
                
                {/* Currency Converter Section */}
                <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="h-5 w-5 text-[#2C5AAE]" />
                    <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">Currency Converter</h3>
                  </div>
                  
                  <iframe 
                    src="https://themoneyconverter.com/MoneyConverter?from=USD&to=EUR&amount=1" 
                    frameBorder="0"
                    width="100%"
                    height="280"
                    className="mx-auto rounded-lg overflow-hidden border border-gray-200"
                    title="Currency Converter"
                  ></iframe>
                </div>
              </div>
            </div>
          )}
          
          {url === 'services' && (
            <div className="p-6 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">Consultation Services</h3>
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
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">Housing & Accommodation</h3>
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
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">Immigration Support</h3>
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
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">Family Relocation</h3>
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
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">Moving & Logistics</h3>
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
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">Settlement Services</h3>
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
