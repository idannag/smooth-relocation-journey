
import { Home, Calculator, Newspaper, Building2, GraduationCap, UserRound, Route, Bot, BookText, Headphones, Globe, Play, ShoppingCart, MapPin } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Lightbox from './ui/lightbox';
import { handleNavigation } from '../utils/navigation';

const BottomNav = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState("");
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveSection(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (url: string, forceExternal?: boolean) => {
    // Use our centralized navigation handler
    handleNavigation(url, navigate, forceExternal);
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
        { icon: <Newspaper className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Relocation News', url: '/news' },
        { icon: <MapPin className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Popular Destinations', url: '/destinations' },
        { icon: <Calculator className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Cost-of-Living AI Calculator', url: 'https://ocean-calculator.netlify.app', forceExternal: true }
      ]
    },
    { 
      icon: <Headphones className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Consult',
      subItems: [
        { icon: <Home className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Relocation', url: 'https://www.app.ocean-il.co.il/form/relocation-journey/9/', forceExternal: true },
        { icon: <GraduationCap className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Education', url: 'https://www.app.ocean-il.co.il/education-copy/', forceExternal: true },
        { icon: <Building2 className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Real-Estate', url: 'https://www.app.ocean-il.co.il/real-estate-copy/', forceExternal: true }
      ]
    },
    { 
      icon: <UserRound className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Client Area',
      subItems: [
        { icon: <Route className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'My Relocation Planner', url: 'https://ocean-pm.netlify.app', forceExternal: true },
        { icon: <ShoppingCart className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'My Services', url: '/services' },
        { icon: <UserRound className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'My Ocean Community', url: 'My Ocean Community', forceExternal: true },
        { icon: <Bot className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'My 24/7 AI Assistant', url: '/chatbot' }
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
                  <span className="text-[13px] md:text-[16px] mt-1 font-bold bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent text-center w-full">
                    {item.label}
                  </span>
                </button>
                
                {item.subItems.length > 0 && activeSection === item.label && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-white rounded-lg shadow-lg border animate-fade-in">
                    {item.subItems.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => subItem.url && handleItemClick(subItem.url, subItem.forceExternal)}
                        className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 transition-colors duration-200 w-full text-left"
                      >
                        {subItem.icon}
                        <span className="text-sm md:text-base font-medium text-gray-600">{subItem.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomNav;
