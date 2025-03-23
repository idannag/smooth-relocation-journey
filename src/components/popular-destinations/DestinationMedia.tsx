
import { ChevronLeft, ChevronRight, MapPin, Info } from 'lucide-react';
import { Destination } from './types';

interface DestinationMediaProps {
  activeDestination: Destination;
  handlePrev: () => void;
  handleNext: () => void;
  destinations: Destination[];
  activeIndex: number;
  handleDotClick: (index: number) => void;
}

const DestinationMedia = ({
  activeDestination,
  handlePrev,
  handleNext,
  destinations,
  activeIndex,
  handleDotClick
}: DestinationMediaProps) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg h-[350px] lg:h-[450px]">
      {/* Show map instead of video/image */}
      <div className="w-full h-full">
        {activeDestination.mapUrl ? (
          <iframe 
            src={activeDestination.mapUrl}
            className="w-full h-full object-cover border-none"
            loading="lazy"
            allowFullScreen
            title={`Map of ${activeDestination.city}, ${activeDestination.country}`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
            <MapPin className="w-12 h-12 text-[#2C5AAE] mb-4" />
            <h3 className="text-xl font-bold text-[#2C5AAE]">
              {activeDestination.city}, {activeDestination.country}
            </h3>
            <p className="text-gray-500 mt-2">Interactive map not available</p>
          </div>
        )}
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={handlePrev} 
        aria-label="Previous destination" 
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 text-[#2C5AAE]" />
      </button>
      
      <button 
        onClick={handleNext} 
        aria-label="Next destination" 
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 text-[#2C5AAE]" />
      </button>
      
      {/* Dots navigation */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
        <div className="flex space-x-2 p-2 bg-white/20 backdrop-blur-sm rounded-full">
          {destinations.map((_, index) => (
            <button 
              key={index} 
              onClick={() => handleDotClick(index)} 
              className={`w-2 h-2 rounded-full transition-colors ${index === activeIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'}`} 
              aria-label={`Go to destination ${index + 1}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationMedia;
