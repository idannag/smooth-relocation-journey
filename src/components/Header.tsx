import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import TimeStrip from "./TimeStrip";
import CurrencyStrip from "./CurrencyStrip";
import { useIsMobile } from '../hooks/use-mobile';
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";
import Lightbox from "./ui/lightbox";
import { getMainNavItems } from "./navigation/navItems";
import UsefulInfoContent from './UsefulInfoContent';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxContent, setLightboxContent] = useState<{ type: 'news' | 'guides' | 'tools' | null }>({ type: null });
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
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };

  const handleSubmenuItemClick = (_url: string, type: 'news' | 'guides' | 'tools') => {
    setLightboxContent({ type });
    setShowLightbox(true);
    setIsOpen(false);
    setExpandedItems([]);
  };

  const mainNavItems = getMainNavItems(handleSubmenuItemClick);

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
                <h1 className="text-lg font-semibold text-primary">Ocean Relocation Platform</h1>
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
          isOpen={isOpen}
          menuRef={menuRef}
        />
      </header>

      {showLightbox && lightboxContent.type && (
        <div 
          className="fixed inset-0 z-[100] animate-fade-in" 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowLightbox(false);
            }
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative w-full h-full overflow-auto">
            <button
              onClick={() => setShowLightbox(false)}
              className="fixed top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors hover:scale-110"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <UsefulInfoContent type={lightboxContent.type} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
