import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TimeStrip from './TimeStrip';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <TimeStrip />
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <img 
          src="https://www.app.ocean-il.co.il/wp-content/uploads/2022/04/cropped-logo.jpg" 
          alt="Ocean Logo" 
          className="h-12 w-auto"
        />
        <Sheet>
          <SheetTrigger>
            <Menu className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col gap-4 pt-8">
              <a href="#" className="text-lg font-medium hover:text-primary transition-colors">Home</a>
              <a href="#" className="text-lg font-medium hover:text-primary transition-colors">Services</a>
              <a href="#" className="text-lg font-medium hover:text-primary transition-colors">About</a>
              <a href="#" className="text-lg font-medium hover:text-primary transition-colors">Contact</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;