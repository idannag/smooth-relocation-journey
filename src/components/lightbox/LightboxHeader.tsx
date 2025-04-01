
import React from 'react';
import { X } from 'lucide-react';
import {
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface LightboxHeaderProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  shouldDisplay?: boolean;
}

const LightboxHeader = ({ title, subtitle, onClose, shouldDisplay = true }: LightboxHeaderProps) => {
  if (!shouldDisplay) return null;

  return (
    <SheetHeader className="px-4 pt-3 pb-2 sticky top-0 bg-white z-10 border-b flex-row justify-between items-center">
      <div className="flex-1">
        <SheetTitle className="text-lg md:text-2xl font-bold bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent text-left">
          {title}
        </SheetTitle>
        {subtitle && (
          <p className="text-xs md:text-sm text-gray-600 mt-0.5 text-left">{subtitle}</p>
        )}
      </div>
      <button 
        onClick={onClose}
        className="rounded-full p-2.5 hover:bg-gray-100 transition-colors flex-shrink-0 border border-gray-200 shadow-sm"
        aria-label="Close"
      >
        <X className="h-6 w-6 text-gray-600" />
      </button>
    </SheetHeader>
  );
};

export default LightboxHeader;
