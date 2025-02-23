
import { NavItem } from "@/types/navigation";
import { useEffect, useRef } from "react";

interface DesktopNavProps {
  items: NavItem[];
  expandedItems: string[];
  onToggleItem: (label: string) => void;
}

const DesktopNav = ({ items, expandedItems, onToggleItem }: DesktopNavProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        expandedItems.forEach(item => onToggleItem(item));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [expandedItems, onToggleItem]);

  return (
    <div className="hidden md:flex items-center space-x-8" ref={menuRef}>
      <nav className="flex items-center space-x-8">
        {items.map((item, index) => (
          <div key={index} className="relative">
            <button 
              onClick={() => onToggleItem(item.label)}
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
  );
};

export default DesktopNav;
