import { Home, Info, HandshakeIcon, MapPin, BookOpen, Building } from 'lucide-react';
import { useState } from 'react';

const BottomNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mainNavItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home' },
    { icon: <Info className="w-5 h-5" />, label: 'Info' },
    { icon: <HandshakeIcon className="w-5 h-5" />, label: 'Consult' }
  ];

  const expandedNavItems = [
    { icon: <MapPin className="w-5 h-5" />, label: 'Destinations' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Articles' },
    { icon: <Building className="w-5 h-5" />, label: 'Associates' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50">
      <div className="container mx-auto px-4">
        {/* Main navigation items */}
        <div className="flex justify-around items-center h-16">
          {mainNavItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors duration-200"
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </a>
          ))}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors duration-200"
          >
            <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
              •••
            </div>
            <span className="text-xs mt-1">More</span>
          </button>
        </div>

        {/* Expanded navigation items */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'h-16 opacity-100' : 'h-0 opacity-0'
          }`}
        >
          <div className="flex justify-around items-center h-16 animate-fade-in">
            {expandedNavItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors duration-200"
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;