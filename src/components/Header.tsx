
import { useState } from "react";
import { Menu, Home, Calculator, BookOpen, Building2, GraduationCap, UserRound, Lock, Route, Headset } from "lucide-react";
import TimeStrip from "./TimeStrip";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        { icon: <BookOpen className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Relocation News' },
        { icon: <BookOpen className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Relocation Guides' },
        { icon: <Calculator className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Calculators' },
        { icon: <Route className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Tools' }
      ]
    },
    { 
      icon: <Headset className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
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
        { icon: <Lock className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'My Orders' },
        { icon: <Building2 className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Jobs' },
        { icon: <UserRound className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Connections' },
        { icon: <Headset className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'My AI Assistant' }
      ]
    }
  ];

  return (
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

          <TimeStrip />

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {mainNavItems.map((item, index) => (
                <div key={index} className="relative group">
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                  {item.subItems.length > 0 && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border hidden group-hover:block">
                      {item.subItems.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
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
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="px-4 pt-2 pb-4">
            {mainNavItems.map((item, index) => (
              <div key={index} className="py-2">
                <div className="flex items-center justify-between px-3 py-2 text-gray-600 hover:text-primary transition-colors">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.subItems.length > 0 && (
                    <Menu className="w-5 h-5" />
                  )}
                </div>
                {item.subItems.length > 0 && (
                  <div className="pl-8 mt-2 space-y-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="#"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary transition-colors"
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
    </header>
  );
};

export default Header;
