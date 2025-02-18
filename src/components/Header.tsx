import { useState, useEffect, useRef } from "react";
import { Menu, Home, Calculator, Newspaper, Building2, GraduationCap, UserRound, ShoppingCart, Route, Bot, BookText, Headphones, Globe, Play, ChevronDown, ChevronUp } from "lucide-react";
import TimeStrip from "./TimeStrip";
import CurrencyStrip from "./CurrencyStrip";
import { useIsMobile } from '../hooks/use-mobile';

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

  const handleSubmenuItemClick = (url: string, size: 'full' | 'medium' = 'medium') => {
    setLightboxContent({ url, size });
    setShowLightbox(true);
  };

  const mainNavItems = [
    { 
      icon: <Home className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Home',
      subItems: [] 
    },
    { 
      icon: <Calculator className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Useful Info',
      subItems: [
        { 
          icon: <Newspaper className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
          label: 'Relocation News',
          onClick: () => handleSubmenuItemClick('/relocation-news', 'medium')
        },
        { 
          icon: <BookText className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, 
          label: 'Relocation Guides',
          onClick: () => handleSubmenuItemClick('/relocation-guides', 'medium')
        },
        { 
          icon: <Calculator className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
          label: 'Calculators & Tools',
          onClick: () => handleSubmenuItemClick('https://www.app.ocean-il.co.il/cost-of-living-comparison-calculator-copy/', 'medium')
        }
      ]
    },
    { 
      icon: <Headphones className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Consult',
      subItems: [
        { 
          icon: <Home className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
          label: 'Relocation',
          onClick: () => handleSubmenuItemClick('https://www.app.ocean-il.co.il/form/relocation-journey/9/', isMobile ? 'full' : 'medium')
        },
        { 
          icon: <GraduationCap className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, 
          label: 'Education',
          onClick: () => handleSubmenuItemClick('https://www.app.ocean-il.co.il/education-copy/', isMobile ? 'full' : 'medium')
        },
        { 
          icon: <Building2 className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
          label: 'Real-Estate',
          onClick: () => handleSubmenuItemClick('https://www.app.ocean-il.co.il/real-estate-copy/', isMobile ? 'full' : 'medium')
        }
      ]
    },
    { 
      icon: <UserRound className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Client Area',
      subItems: [
        { 
          icon: <Route className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
          label: 'My Relocation',
          onClick: () => handleSubmenuItemClick('https://preview--ocean-journey.lovable.app/', 'medium')
        },
        { icon: <ShoppingCart className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'My Orders' },
        { icon: <Globe className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Online Jobs' },
        { icon: <UserRound className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Connections' },
        { icon: <Bot className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'My AI Assistant 24/7' },
        { icon: <Play className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Relocation VOD' }
      ]
    }
  ];

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

            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex items-center space-x-8">
                {mainNavItems.map((item, index) => (
                  <div key={index} className="relative">
                    <button 
                      onClick={() => toggleItem(item.label)}
                      className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                    {item.subItems.length > 0 && expandedItems.includes(item.label) && (
                      <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border">
                        {item.subItems.map((subItem, subIndex) => (
                          <button
                            key={subIndex}
                            onClick={subItem.onClick}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors w-full text-left"
                          >
                            {subItem.icon}
                            <span>{subItem.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div ref={menuRef}>
          {isOpen && (
            <div className="md:hidden bg-white border-t shadow-lg">
              <nav className="px-2 py-1">
                {mainNavItems.map((item, index) => (
                  <div key={index} className="py-1 border-b border-gray-100 last:border-0">
                    <button
                      onClick={() => toggleItem(item.label)}
                      className="flex items-center justify-between w-full px-2 py-1.5 text-gray-600 hover:text-primary transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="text-sm">{item.label}</span>
                      </div>
                      {item.subItems.length > 0 && (
                        expandedItems.includes(item.label) ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    {item.subItems.length > 0 && expandedItems.includes(item.label) && (
                      <div className="pl-6 mt-1 space-y-1 animate-accordion-down">
                        {item.subItems.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href="#"
                            onClick={subItem.onClick}
                            className="flex items-center gap-2 px-2 py-1 text-xs text-gray-600 hover:text-primary transition-colors"
                          >
                            {subItem.icon}
                            <span>{subItem.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {showLightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 animate-fade-in">
          <div className={`relative w-full ${lightboxContent.size === 'full' ? 'h-full' : 'h-[80vh] max-w-4xl mx-auto'} bg-white rounded-2xl overflow-hidden shadow-2xl`}>
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
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
            <iframe
              src={lightboxContent.url}
              className="w-full h-full"
              frameBorder="0"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
