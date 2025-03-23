
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
      className="relative min-w-[220px] w-[220px] h-[280px] rounded-lg overflow-hidden shadow-md cursor-pointer snap-start transition-transform duration-300 hover:scale-[1.01] flex-shrink-0"
    >
      {/* Video Background with Gradient Overlay */}
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
      ) : destination.image ? (
        <img 
          src={destination.image} 
          alt={destination.city}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-600" />
      )}
      
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
