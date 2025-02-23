import { Home, Calculator, Newspaper, Building2, GraduationCap, UserRound, ShoppingCart, Route, Bot, BookText, Headphones, Globe, Play } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Lightbox from './ui/lightbox';
import UsefulInfoContent from './UsefulInfoContent';

const BottomNav = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxContent, setLightboxContent] = useState<{ type: 'news' | 'guides' | 'tools' | null }>({ type: null });
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveSection(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (_url: string, type: 'news' | 'guides' | 'tools') => {
    setLightboxContent({ type });
    setShowLightbox(true);
    setActiveSection(null);
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
        { icon: <Newspaper className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Relocation News', url: '/news', type: 'news' as const },
        { icon: <BookText className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Relocation Guides', url: '/guides', type: 'guides' as const },
        { icon: <Calculator className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Calculators & Tools', url: 'https://www.app.ocean-il.co.il/cost-of-living-comparison-calculator-copy/', type: 'tools' as const }
      ]
    },
    { 
      icon: <Headphones className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Consult',
      subItems: [
        { icon: <Home className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Relocation', url: 'https://www.app.ocean-il.co.il/form/relocation-journey/9/', type: null },
        { icon: <GraduationCap className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Education', url: 'https://www.app.ocean-il.co.il/education-copy/', type: null },
        { icon: <Building2 className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Real-Estate', url: 'https://www.app.ocean-il.co.il/real-estate-copy/', type: null }
      ]
    },
    { 
      icon: <UserRound className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Client Area',
      subItems: [
        { icon: <Route className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'My Relocation', url: 'https://preview--ocean-journey-61.lovable.app/', type: null },
        { icon: <ShoppingCart className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'My Orders', type: null },
        { icon: <Globe className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Online Jobs', type: null },
        { icon: <UserRound className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Connections', type: null },
        { icon: <Bot className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'My AI Assistant 24/7', type: null },
        { icon: <Play className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Relocation VOD', type: null }
      ]
    }
  ];

return (
  <>
    <nav ref={navRef} className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),_0_-2px_4px_-1px_rgba(0,0,0,0.06)] border-t z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {mainNavItems.map((item, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => setActiveSection(activeSection === item.label ? null : item.label)}
                className="flex flex-col items-center text-gray-600 hover:text-[#2C5AAE] transition-colors duration-200 w-full"
              >
                {item.icon}
                <span className="text-[12px] mt-1 font-bold bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent text-center w-full">
                  {item.label}
                </span>
              </button>
              
              {item.subItems.length > 0 && activeSection === item.label && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-white rounded-lg shadow-lg border animate-fade-in">
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => subItem.url && subItem.type && handleItemClick(subItem.url, subItem.type)}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 transition-colors duration-200 w-full text-left"
                    >
                      {subItem.icon}
                      <span className="text-xs font-medium text-gray-600">{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>

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
}

export default BottomNav;
