
import { Home, Calculator, Newspaper, Building2, GraduationCap, UserRound, ShoppingCart, Route, Bot, Wrench, BookText, Headphones } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const BottomNav = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
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
        { icon: <Newspaper className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Relocation News' },
        { icon: <BookText className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Relocation Guides' },
        { icon: <Calculator className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Calculators' },
        { icon: <Wrench className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Tools' }
      ]
    },
    { 
      icon: <Headphones className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Consult',
      subItems: [
        { icon: <Home className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Relocation' },
        { icon: <GraduationCap className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Education' },
        { icon: <Building2 className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Real-Estate' }
      ]
    },
    { 
      icon: <UserRound className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Client Area',
      subItems: [
        { icon: <Route className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'My Relocation' },
        { icon: <ShoppingCart className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'My Orders' },
        { icon: <Building2 className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Jobs' },
        { icon: <UserRound className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Connections' },
        { icon: <Bot className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'My AI Assistant' }
      ]
    }
  ];

  return (
    <nav ref={navRef} className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),_0_-2px_4px_-1px_rgba(0,0,0,0.06)] border-t z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {mainNavItems.map((item, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => setActiveSection(activeSection === item.label ? null : item.label)}
                className="flex flex-col items-center text-gray-600 hover:text-[#2C5AAE] transition-colors duration-200"
              >
                {item.icon}
                <span className="text-[12px] mt-1 font-bold bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
                  {item.label}
                </span>
              </button>
              
              {item.subItems.length > 0 && activeSection === item.label && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 bg-white rounded-lg shadow-lg border">
                  {item.subItems.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href="#"
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 transition-colors duration-200"
                    >
                      {subItem.icon}
                      <span className="text-xs font-medium text-gray-600">{subItem.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
