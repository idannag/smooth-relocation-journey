
import { ChevronDown, ChevronUp } from "lucide-react";
import { NavItem } from "@/types/navigation";

interface MobileNavProps {
  items: NavItem[];
  expandedItems: string[];
  onToggleItem: (label: string) => void;
  onSubItemClick: (url: string) => void;
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
}

const MobileNav = ({ items, expandedItems, onToggleItem, onSubItemClick, isOpen, menuRef }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <div ref={menuRef} className="md:hidden bg-white border-t shadow-lg">
      <nav className="px-2 py-1">
        {items.map((item, index) => (
          <div key={index} className="py-1 border-b border-gray-100 last:border-0">
            <button
              onClick={() => onToggleItem(item.label)}
              className="flex items-center justify-between w-full px-2 py-1.5 text-gray-600 hover:text-[#2C5AAE] transition-colors"
              type="button"
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
                  <button
                    key={subIndex}
                    onClick={() => {
                      if (subItem.onClick) {
                        subItem.onClick();
                      } else if (subItem.label === "My AI Assistant 24/7") {
                        onSubItemClick('chatbot');
                      }
                    }}
                    className="flex items-center gap-2 px-2 py-1 text-xs text-gray-600 hover:text-[#2C5AAE] transition-colors w-full text-left"
                    type="button"
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

export default MobileNav;
