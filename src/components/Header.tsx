
import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import TimeStrip from "./TimeStrip";
import CurrencyStrip from "./CurrencyStrip";
import { useIsMobile } from '../hooks/use-mobile';
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";
import Lightbox from "./ui/lightbox";
import { getMainNavItems } from "./navigation/navItems";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxContent, setLightboxContent] = useState<{ url: string; size: 'full' | 'medium' }>({ url: '', size: 'full' });
  const menuRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setExpandedItems([]);
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleItem = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const handleSubmenuItemClick = (url: string) => {
    setLightboxContent({ 
      url: url.startsWith('http') ? url : window.location.origin + url,
      size: 'full'
    });
    setShowLightbox(true);
  };

  const mainNavItems = getMainNavItems(handleSubmenuItemClick);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <a href="/" className="flex items-center">
                <img 
                  src="https://www.app.ocean-il.co.il/wp-content/uploads/2022/04/cropped-logo.jpg" 
                  alt="Ocean IL Logo" 
                  className="h-8 w-auto"
                />
              </a>
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
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        <MobileNav 
          items={mainNavItems}
          expandedItems={expandedItems}
          onToggleItem={toggleItem}
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
    </>
  );
};

export default Header;
