
import DestinationSkeleton from './DestinationSkeleton';
import DestinationMedia from './DestinationMedia';
import DestinationInfo from './DestinationInfo';
import { useDestinations } from './useDestinations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PopularDestinationsLightbox = () => {
  const {
    destinations,
    loading,
    activeIndex,
    activeDestination,
    handleNext,
    handlePrev,
    handleDotClick,
  } = useDestinations();

  // If there are no destinations and not loading, show message
  if (!loading && destinations.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>No destinations found. Please try again later.</p>
      </div>
    );
  }

  // Show loading skeleton
  if (loading || !activeDestination) {
    return <DestinationSkeleton />;
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto relative">
      <h2 className="text-3xl font-bold text-center mb-8 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
        Popular Destinations
      </h2>

      {/* Navigation buttons moved to the sides of the entire component */}
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

      <div className="relative px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
    </div>
  );
};

export default PopularDestinationsLightbox;
