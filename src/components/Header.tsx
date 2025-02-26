
import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
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
  const [lightboxContent, setLightboxContent] = useState<{ url: string; size: 'full' | 'medium' }>({ url: '', size: 'full' });
  const [showChatbot, setShowChatbot] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Reset expanded items when mobile state changes
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

  // Debug logging
  console.log("showChatbot:", showChatbot);

  const toggleItem = (label: string) => {
    console.log("Toggle item clicked:", label);
    setExpandedItems(prev => 
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };

  const handleSubmenuItemClick = (url: string) => {
    console.log("Submenu item clicked:", url);
    
    if (url === 'chatbot') {
      console.log("Opening chatbot");
      setShowChatbot(true);
      setIsOpen(false);
      return;
    }
    
    setLightboxContent({ 
      url: url.startsWith('http') ? url : window.location.origin + url,
      size: 'full'
    });
    setShowLightbox(true);
    setIsOpen(false);
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
                />
              </a>
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold text-[#2C5AAE]">Ocean Relocation Platform</h1>
                <p className="text-xs text-gray-600">all what u need in one place</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <TimeStrip />
              <CurrencyStrip />
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
              <Menu className="w-6 h-6" />
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
          url={lightboxContent.url}
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
