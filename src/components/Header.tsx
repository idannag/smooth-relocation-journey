import { useState } from "react";
import { Menu } from "lucide-react";
import TimeStrip from "./TimeStrip";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-primary">
              ReloGuide
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-600 hover:text-primary transition-colors">
              Services
            </a>
            <a href="#about" className="text-gray-600 hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        {/* TimeStrip added below the main header content */}
        <div className="py-2 border-t border-gray-100">
          <TimeStrip />
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            <a
              href="#services"
              className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="#about"
              className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;