
import { MapPin, PlayCircle } from 'lucide-react';
import { Destination } from './types';
import React, { useState } from 'react';

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
  destinations,
  activeIndex,
  handleDotClick
}: DestinationMediaProps) => {
  const [showVideo, setShowVideo] = useState(false);
  
  const toggleMedia = () => {
    if (activeDestination.video) {
      setShowVideo(!showVideo);
    }
  };

  // Function to generate Google Maps embed URL for a city and country
  const getGoogleMapsUrl = (city: string, country: string) => {
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(`${city}, ${country}`)}`;
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg h-[300px] lg:h-[400px]">
      {/* Show video when available and requested */}
      {showVideo && activeDestination.video ? (
        <div className="w-full h-full">
          {activeDestination.video.includes('youtube.com') ? (
            <iframe 
              src={`${activeDestination.video}?autoplay=1&mute=0&controls=1&modestbranding=1&showinfo=0&rel=0`}
              className="w-full h-full object-cover border-none"
              allowFullScreen
              allow="autoplay; encrypted-media"
              title={`Video of ${activeDestination.city}`}
            />
          ) : (
            <video controls autoPlay className="w-full h-full object-cover">
              <source src={activeDestination.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          
          {/* Back to map button */}
          <button 
            onClick={toggleMedia}
            className="absolute top-4 left-4 bg-white/90 rounded-full p-2 shadow-lg z-10"
            aria-label="Back to map"
          >
            <MapPin className="w-5 h-5 text-[#2C5AAE]" />
          </button>
        </div>
      ) : (
        <>
          {/* Show map by default */}
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
              <iframe
                src={getGoogleMapsUrl(activeDestination.city, activeDestination.country)}
                className="w-full h-full border-none"
                loading="lazy"
                allowFullScreen
                title={`Map of ${activeDestination.city}, ${activeDestination.country}`}
              />
            )}
          </div>
          
          {/* Video button - only show if video is available */}
          {activeDestination.video && (
            <button 
              onClick={toggleMedia}
              className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-lg z-10"
              aria-label="Show video"
            >
              <PlayCircle className="w-5 h-5 text-[#2C5AAE]" />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default DestinationMedia;
