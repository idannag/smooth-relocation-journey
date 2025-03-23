
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
      {activeDestination.video && activeDestination.video.includes('youtube.com') ? (
        <iframe 
          src={`${activeDestination.video}?autoplay=1&mute=1&loop=1&playlist=${activeDestination.video.split('/').pop()}&controls=0&modestbranding=1&showinfo=0&rel=0&enablejsapi=1&playsinline=1`}
          className="w-full h-full object-cover"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        />
      ) : activeDestination.video ? (
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={activeDestination.video} type="video/mp4" />
        </video>
      ) : (
        <img 
          src={activeDestination.image || "/placeholder.svg"} 
          alt={activeDestination.city} 
          className="w-full h-full object-cover"
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-1">{activeDestination.city}</h3>
          <p className="text-sm mb-2">{activeDestination.country}</p>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button onClick={handlePrev} aria-label="Previous destination" className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110">
        <ChevronLeft className="w-6 h-6 text-[#2C5AAE]" />
      </button>
      
      <button onClick={handleNext} aria-label="Next destination" className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110">
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
