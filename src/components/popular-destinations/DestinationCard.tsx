
import React from 'react';
import { MapPin } from 'lucide-react';
import { Destination } from './types';

interface DestinationCardProps {
  destination: Destination;
  onClick: (city: string) => void;
}

const DestinationCard = ({ destination, onClick }: DestinationCardProps) => {
  // Use video from the correct property
  const videoBackground = destination.video || '';
  
  // Handle click on the card
  const handleClick = () => {
    onClick(destination.city);
  };
  
  return (
    <div 
      onClick={handleClick}
      className="relative min-w-[280px] w-[280px] h-[350px] rounded-lg overflow-hidden shadow-md cursor-pointer snap-start transition-transform duration-300 hover:scale-[1.01] flex-shrink-0"
    >
      {/* Video Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10" />
      
      {videoBackground ? (
        <video 
          src={videoBackground} 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div className="absolute inset-0 bg-gray-600" />
      )}

      {/* Big City Title Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <h2 className="text-4xl font-bold text-white text-center drop-shadow-lg transform transition-transform duration-300 hover:scale-110">
          {destination.city}
        </h2>
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
        <div className="flex items-center mb-2">
          <MapPin className="w-5 h-5 mr-1 text-white/80" />
          <span className="text-sm font-medium">{destination.country}</span>
        </div>
        
        <h3 className="text-xl font-semibold mb-1">{destination.city}</h3>
        <p className="text-sm text-white/90 line-clamp-2">{destination.description}</p>
      </div>
    </div>
  );
};

export default DestinationCard;
