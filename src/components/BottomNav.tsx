import { Home, Calculator, BookOpen, Building2, GraduationCap, Contact, Lock, Route } from 'lucide-react';
import { useState } from 'react';

const BottomNav = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const mainNavItems = [
    { 
      icon: <Home className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Home',
      subItems: [] 
    },
    { 
      icon: <Calculator className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Info',
      subItems: [
        { icon: <Calculator className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Cost Calculator' },
        { icon: <BookOpen className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Useful Articles' }
      ]
    },
    { 
      icon: <Building2 className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Consult',
      subItems: [
        { icon: <Home className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Relocation' },
        { icon: <GraduationCap className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Education' },
        { icon: <Building2 className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'Real-Estate' }
      ]
    },
    { 
      icon: <Contact className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, 
      label: 'Client Area',
      subItems: [
        { icon: <Route className="w-5 h-5 stroke-[1.5] text-[#2C5AAE]" />, label: 'My Relocation' },
        { icon: <Lock className="w-5 h-5 stroke-[1.5] text-[#517cc7]" />, label: 'Private Content' }
      ]
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),_0_-2px_4px_-1px_rgba(0,0,0,0.06)] border-t z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {mainNavItems.map((item, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => setActiveSection(activeSection === item.label ? null : item.label)}
                className="flex flex-col items-center text-gray-600 hover:text-[#2C5AAE] transition-colors duration-200"
              >
                {item.icon}
                <span className="text-[12px] mt-1 font-bold">{item.label}</span>
              </button>
              
              {item.subItems.length > 0 && activeSection === item.label && (
                <div className="absolute bottom-full right-0 mb-2 w-40 bg-white rounded-lg shadow-lg border animate-fade-in">
                  {item.subItems.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                    >
                      {subItem.icon}
                      <span className="text-[9px] font-medium text-gray-600">{subItem.label}</span>
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