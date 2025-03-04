
import { ChevronDown, ChevronUp } from "lucide-react";
import { NavItem } from "@/types/navigation";
import { useState } from "react";

interface MobileNavProps {
  items: NavItem[];
  expandedItems: string[];
  onToggleItem: (label: string) => void;
  onSubItemClick: (url: string) => void;
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
}

const MobileNav = ({ items, onSubItemClick, isOpen, menuRef }: MobileNavProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef} 
      className="md:hidden fixed inset-x-0 top-16 bottom-16 bg-white shadow-lg overflow-y-auto"
    >
      <nav className="container mx-auto px-4 py-2">
        {items.map((item, index) => (
          <div key={index} className="border-b border-gray-100 last:border-0">
            <button
              onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
              className="flex items-center justify-between w-full py-3 text-gray-600 hover:text-[#2C5AAE] transition-colors"
              type="button"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-base font-medium">{item.label}</span>
              </div>
              {item.subItems.length > 0 && (
                expandedItem === item.label ? 
                  <ChevronUp className="w-5 h-5" /> : 
                  <ChevronDown className="w-5 h-5" />
              )}
            </button>
            
            {item.subItems.length > 0 && expandedItem === item.label && (
              <div className="bg-gray-50 rounded-lg mb-2 animate-accordion-down overflow-hidden">
                {item.subItems.map((subItem, subIndex) => (
                  <button
                    key={subIndex}
                    onClick={() => {
                      if (subItem.onClick) {
                        subItem.onClick();
                      } else if (subItem.label === "My Ocean Community") {
                        window.open('https://chat.whatsapp.com/LODS9mJleJU9e1Y27ml2TB', '_blank');
                      } else {
                        onSubItemClick(subItem.label.toLowerCase().replace(/\s+/g, '-'));
                      }
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-[#2C5AAE] hover:bg-gray-100 transition-colors w-full"
                    type="button"
                  >
                    {subItem.icon}
                    <span className="text-sm">{subItem.label}</span>
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

export default MobileNav;
