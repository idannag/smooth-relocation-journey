import { Home, Info, HandshakeIcon } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50">
      <div className="flex justify-around items-center h-16">
        <a href="#" className="flex flex-col items-center text-gray-600 hover:text-secondary">
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </a>
        <a href="#" className="flex flex-col items-center text-gray-600 hover:text-secondary">
          <Info className="w-6 h-6" />
          <span className="text-xs mt-1">Information</span>
        </a>
        <a href="#" className="flex flex-col items-center text-gray-600 hover:text-secondary">
          <HandshakeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Consultation</span>
        </a>
      </div>
    </nav>
  );
};

export default BottomNav;