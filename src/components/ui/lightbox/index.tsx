
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import TimeAndCurrencyConverter from "./TimeAndCurrencyConverter";
import Orders from "./Orders";
import DestinationInfo from "./DestinationInfo";
import ArticleDetail from "./ArticleDetail";
import NewsContent from "./NewsContent";
import GuidesContent from "./GuidesContent";

interface LightboxProps {
  url: string;
  onClose: () => void;
}

// Main Lightbox component
const Lightbox = ({ url, onClose }: LightboxProps) => {
  const [loading, setLoading] = useState(true);
  
  // Parse the URL to determine what content to show
  const [contentType, contentId] = url.split(':');
  
  // Simulate content loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle click outside to close
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Render content based on the URL
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Loader className="w-12 h-12 text-[#2C5AAE] animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading content...</p>
          </div>
        </div>
      );
    }
    
    switch(contentType) {
      case 'calculator':
        return <TimeAndCurrencyConverter />;
      case 'orders':
        return <Orders />;
      case 'destination':
        return <DestinationInfo city={contentId} />;
      case 'article':
        return <ArticleDetail title={contentId} />;
      case 'news':
        return <NewsContent />;
      case 'guides':
        return <GuidesContent />;
      default:
        return <div className="p-8 text-center">Content not found</div>;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto p-4"
      onClick={handleBackgroundClick}
    >
      <div 
        className="relative bg-white rounded-xl overflow-hidden w-full max-w-4xl max-h-[90vh] animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 bg-white/80 rounded-full p-2 text-gray-800 hover:bg-white hover:text-[#2C5AAE] transition-colors z-10"
        >
          ✕
        </button>
        <div className="h-full overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
