
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Lightbox from './ui/lightbox';
import DestinationCard from './popular-destinations/DestinationCard';
import DestinationSkeleton from './popular-destinations/DestinationSkeleton';
import { usePopularDestinations } from './popular-destinations/usePopularDestinations';
import { useIsMobile } from '@/hooks/use-mobile';

const PopularDestinations = () => {
  const {
    scrollRef,
    showLightbox,
    selectedDestination,
    destinations,
    loading,
    scroll,
    handleDestinationClick,
    handleSectionTitleClick,
    setShowLightbox
  } = usePopularDestinations();
  
  const isMobile = useIsMobile();

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <h2 onClick={handleSectionTitleClick} className="font-bold text-center mb-12 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent cursor-pointer text-5xl">
          Popular Destinations
        </h2>
        
        <div className="relative">
          <button 
            onClick={() => scroll('left')} 
            aria-label="Scroll left" 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 text-base px-[2px] py-[2px]"
          >
            <ChevronLeft className="w-6 h-6 text-[#2C5AAE]" />
          </button>
          
          <div 
            ref={scrollRef} 
            className="flex overflow-x-auto hide-scrollbar gap-6 px-4 pb-4 snap-x snap-mandatory scroll-smooth touch-pan-x"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {loading ? 
              Array(5).fill(0).map((_, index) => (
                <div key={index} className={`flex-shrink-0 ${isMobile ? 'w-full' : 'w-[calc(100%/4.5)] sm:w-[calc(100%/3.5)] md:w-[calc(100%/3.5)] lg:w-[calc(100%/4)]'}`}>
                  <DestinationSkeleton />
                </div>
              )) : 
              destinations.map((destination, index) => (
                <div key={index} className={`flex-shrink-0 ${isMobile ? 'w-full' : 'w-[calc(100%/4.5)] sm:w-[calc(100%/3.5)] md:w-[calc(100%/3.5)] lg:w-[calc(100%/4)]'}`}>
                  <DestinationCard destination={destination} onClick={handleDestinationClick} />
                </div>
              ))
            }
          </div>
          
          <button 
            onClick={() => scroll('right')} 
            aria-label="Scroll right" 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 py-[2px] px-[2px]"
          >
            <ChevronRight className="w-6 h-6 text-[#2C5AAE]" />
          </button>
        </div>
      </div>

      {showLightbox && <Lightbox url={selectedDestination} onClose={() => setShowLightbox(false)} />}
    </section>
  );
};

export default PopularDestinations;
