
import DestinationSkeleton from './DestinationSkeleton';
import DestinationMedia from './DestinationMedia';
import DestinationInfo from './DestinationInfo';
import { useDestinations } from './useDestinations';

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
  if (loading) {
    return <DestinationSkeleton />;
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
        Popular Destinations
      </h2>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side: Video/Image and navigation */}
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
