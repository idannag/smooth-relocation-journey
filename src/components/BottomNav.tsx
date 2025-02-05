import { Home, Calculator, BookOpen, Building2, GraduationCap, Home as HomeIcon } from 'lucide-react';
import { useState } from 'react';

const BottomNav = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const mainNavItems = [
    { 
      icon: <Home className="w-5 h-5" />, 
      label: 'Home',
      subItems: [] 
    },
    { 
      icon: <Calculator className="w-5 h-5" />, 
      label: 'Info',
      subItems: [
        { icon: <Calculator className="w-5 h-5" />, label: 'Cost Calculator' },
        { icon: <BookOpen className="w-5 h-5" />, label: 'Useful Articles' }
      ]
    },
    { 
      icon: <Building2 className="w-5 h-5" />, 
      label: 'Consult',
      subItems: [
        { icon: <HomeIcon className="w-5 h-5" />, label: 'Relocation' },
        { icon: <GraduationCap className="w-5 h-5" />, label: 'Education' },
        { icon: <Building2 className="w-5 h-5" />, label: 'Real-Estate' }
      ]
    },
    { 
      icon: <HomeIcon className="w-5 h-5" />, 
      label: 'Client Area',
      subItems: [] 
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {mainNavItems.map((item, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => setActiveSection(activeSection === item.label ? null : item.label)}
                className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors duration-200"
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </button>
              
              {item.subItems.length > 0 && activeSection === item.label && (
                <div className="absolute bottom-full mb-2 w-40 bg-white rounded-lg shadow-lg border animate-fade-in">
                  {item.subItems.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href="#"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                    >
                      {subItem.icon}
                      <span className="text-sm">{subItem.label}</span>
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