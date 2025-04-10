import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TimeStrip from "./TimeStrip";
import CurrencyStrip from "./CurrencyStrip";
import { useIsMobile } from '../hooks/use-mobile';
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";
import { getMainNavItems } from "./navigation/navItems";
import Chatbot from "./Chatbot";
import { handleNavigation } from "../utils/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    const preloadVideoResource = () => {
      // Preload the hero video with high priority
      const videoElement = document.createElement('video');
      videoElement.preload = 'auto';
      videoElement.muted = true;
      videoElement.autoplay = true;
      videoElement.src = 'https://ocean.autodigital.agency/splash.mp4';
      videoElement.style.display = 'none';
      document.body.appendChild(videoElement);
      
      // Force load and then remove from DOM
      videoElement.load();
      setTimeout(() => {
        if (document.body.contains(videoElement)) {
          document.body.removeChild(videoElement);
        }
      }, 1000);
      
      // Also add the traditional preload link
      const linkVideo = document.createElement('link');
      linkVideo.rel = 'preload';
      linkVideo.as = 'video';
      linkVideo.href = 'https://ocean.autodigital.agency/splash.mp4';
      linkVideo.importance = 'high';
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
    
    preloadVideoResource();
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
    
    // Use our centralized navigation handler
    handleNavigation(url, navigate, forceExternal);
    setIsOpen(false);
  };

  const handleTimeOrCurrencyClick = () => {
    console.log("Opening time-currency lightbox");
    navigate('/time-currency');
  };

  const mainNavItems = getMainNavItems((url, forceExternal) => {
    console.log("Main nav item handler with URL:", url);
    handleSubmenuItemClick(url, forceExternal);
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
    </>
  );
};

export default Header;
