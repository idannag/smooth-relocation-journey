
import DestinationSkeleton from './DestinationSkeleton';
import DestinationMedia from './DestinationMedia';
import DestinationInfo from './DestinationInfo';
import { useDestinations } from './useDestinations';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PopularDestinationsLightboxProps {
  initialCity?: string;
  onClose?: () => void;
}

const PopularDestinationsLightbox = ({ initialCity, onClose }: PopularDestinationsLightboxProps) => {
  const {
    destinations,
    loading,
    activeIndex,
    activeDestination,
    handleNext,
    handlePrev,
    handleDotClick,
    isMobile
  } = useDestinations(initialCity);

  // If there are no destinations and not loading, show message
  if (!loading && destinations.length === 0) {
    return (
      <div className="p-2 text-center">
        <p>No destinations found. Please try again later.</p>
      </div>
    );
  }

  // Show loading skeleton
  if (loading || !activeDestination) {
    return <DestinationSkeleton />;
  }

  return (
    <div className={`p-1 md:p-6 max-w-6xl mx-auto relative`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold md:mb-0 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
          {activeDestination.city}, {activeDestination.country}
        </h2>
        
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full p-1.5 h-8 w-8"
            aria-label="Close"
          >
            <X size={16} />
          </Button>
        )}
      </div>

      {/* Navigation buttons moved outside to the whole component */}
      <button 
        onClick={handlePrev} 
        aria-label="Previous destination" 
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 z-10"
      >
        <ChevronLeft className="w-6 h-6 text-[#2C5AAE]" />
      </button>
      
      <button 
        onClick={handleNext} 
        aria-label="Next destination" 
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 z-10"
      >
        <ChevronRight className="w-6 h-6 text-[#2C5AAE]" />
      </button>

      <div className={`relative ${isMobile ? 'px-1' : 'px-10'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {/* Left side: Map/video display */}
          <DestinationMedia
            activeDestination={activeDestination}
            handlePrev={handlePrev}
            handleNext={handleNext}
            destinations={destinations}
            activeIndex={activeIndex}
            handleDotClick={handleDotClick}
          />
          
          {/* Right side: Destination information */}
          <DestinationInfo activeDestination={activeDestination} />
        </div>
      </div>
      
      {/* Dots pagination moved outside the map */}
      <div className="flex justify-center mt-4">
        <div className="flex space-x-2 p-2 bg-white/90 rounded-full shadow-md">
          {destinations.map((_, index) => (
            <button 
              key={index} 
              onClick={() => handleDotClick(index)} 
              className={`w-3 h-3 rounded-full transition-colors ${index === activeIndex ? 'bg-[#2C5AAE]' : 'bg-gray-300 hover:bg-gray-400'}`} 
              aria-label={`Go to destination ${index + 1}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDestinationsLightbox;
