
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import TimeStrip from "./TimeStrip";
import CurrencyStrip from "./CurrencyStrip";
import { useIsMobile } from '../hooks/use-mobile';
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";
import Lightbox from "./ui/lightbox";
import { getMainNavItems } from "./navigation/navItems";
import Chatbot from "./Chatbot";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxContent, setLightboxContent] = useState<string>('');
  const [showChatbot, setShowChatbot] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const preloadResources = () => {
      const linkVideo = document.createElement('link');
      linkVideo.rel = 'preload';
      linkVideo.as = 'video';
      linkVideo.href = 'https://ocean.autodigital.agency/splash.mp4';
      document.head.appendChild(linkVideo);
      
      const imagesToPreload = [
        'https://www.app.ocean-il.co.il/wp-content/uploads/2022/04/cropped-logo.jpg',
        'https://www.app.ocean-il.co.il/wp-content/uploads/2023/04/relocation-explainer-new-1.mp4',
        '/lovable-uploads/7fc61af8-ea7f-4585-8f82-c8a61f99c608.png'
      ];
      
      const additionalImages = [
        'https://www.app.ocean-il.co.il/wp-content/uploads/2022/10/Brooklyn.m4v',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
      ];
      
      [...imagesToPreload, ...additionalImages].forEach(imgUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = imgUrl.endsWith('.mp4') ? 'video' : 'image';
        link.href = imgUrl;
        document.head.appendChild(link);
      });
    };
    
    preloadResources();
  }, []);

  useEffect(() => {
    setExpandedItems([]);
  }, [isMobile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleItem = (label: string) => {
    console.log("Toggle item clicked:", label);
    setExpandedItems(prev => 
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };

  const handleSubmenuItemClick = (url: string, forceExternal?: boolean) => {
    console.log("Submenu item clicked:", url, "forceExternal:", forceExternal);
    
    // For the specific external links or when forceExternal is true, open in the device browser
    if (forceExternal || url === 'chatbot' || url === 'My Ocean Community' || 
        url === 'https://chatgpt.com/g/g-67b6c40963908191b77e23c6fecc2e57-the-24-7-relocation-life-ai-assistant') {
      // Use target="_system" for WebView apps, which is interpreted correctly by mobile WebViews
      // This opens the link in the device's default browser instead of the WebView
      const link = document.createElement('a');
      link.href = url === 'My Ocean Community' ? 'https://chat.whatsapp.com/LODS9mJleJU9e1Y27ml2TB' : 
                  url === 'chatbot' ? 'https://chat.widget.autodigital.agency/' : url;
      link.target = "_system"; // This special target is recognized by Cordova/Capacitor WebViews
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsOpen(false);
      return;
    }
    
    if (url.startsWith('http')) {
      setLightboxContent(url);
      setShowLightbox(true);
      setIsOpen(false);
      return;
    }
    
    setLightboxContent(url);
    setShowLightbox(true);
    setIsOpen(false);
  };

  const handleTimeOrCurrencyClick = () => {
    console.log("Opening time-currency lightbox");
    setLightboxContent('time-currency');
    setShowLightbox(true);
  };

  const mainNavItems = getMainNavItems((url) => {
    console.log("Main nav item handler with URL:", url);
    handleSubmenuItemClick(url);
  });

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center">
                <img 
                  src="https://www.app.ocean-il.co.il/wp-content/uploads/2022/04/cropped-logo.jpg" 
                  alt="Ocean IL Logo" 
                  className="h-8 w-auto"
                  loading="eager"
                />
              </a>
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold text-[#2C5AAE]">Ocean Relocation App</h1>
                <p className="text-xs text-gray-600">Your relocation partner</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <TimeStrip onClick={handleTimeOrCurrencyClick} />
              <CurrencyStrip onClick={handleTimeOrCurrencyClick} />
            </div>

            <DesktopNav 
              items={mainNavItems}
              expandedItems={expandedItems}
              onToggleItem={toggleItem}
            />

            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              type="button"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <MobileNav 
          items={mainNavItems}
          expandedItems={expandedItems}
          onToggleItem={toggleItem}
          onSubItemClick={handleSubmenuItemClick}
          isOpen={isOpen}
          menuRef={menuRef}
        />
      </header>

      {showLightbox && (
        <Lightbox 
          url={lightboxContent}
          onClose={() => setShowLightbox(false)}
        />
      )}

      {showChatbot && (
        <Chatbot onClose={() => setShowChatbot(false)} />
      )}
    </>
  );
};

export default Header;
