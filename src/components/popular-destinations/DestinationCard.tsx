
import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { Destination } from './types';

interface DestinationCardProps {
  destination: Destination;
  onClick: (city: string) => void;
}

const DestinationCard = ({ destination, onClick }: DestinationCardProps) => {
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  // Always prioritize direct video files
  const isDirectVideo = destination.video && 
    (destination.video.endsWith('.mp4') || 
     destination.video.endsWith('.m4v') || 
     destination.video.endsWith('.mov') ||
     destination.video.includes('app.ocean-il.co.il'));
  
  // Handle click on the card
  const handleClick = () => {
    onClick(destination.city);
  };
  
  // Handle video loading
  const handleVideoLoad = () => {
    setVideoReady(true);
  };
  
  // Handle video error
  const handleVideoError = () => {
    console.error('Video error for', destination.city, destination.video);
    setVideoError(true);
  };
  
  return (
    <div 
      onClick={handleClick}
      className="relative w-full h-[200px] rounded-lg overflow-hidden shadow-md cursor-pointer snap-start transition-transform duration-300 hover:scale-[1.01] flex-shrink-0"
    >
      {/* Video Background with Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10" />
      
      {isDirectVideo && destination.video ? (
        <>
          {!videoReady && !videoError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
          <video 
            src={destination.video} 
            className={`absolute inset-0 w-full h-full object-cover ${videoReady ? 'opacity-100' : 'opacity-0'}`}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
          />
        </>
      ) : destination.image ? (
        <img 
          src={destination.image} 
          alt={destination.city}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-500" />
      )}
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
        <div className="flex items-center mb-1">
          <MapPin className="w-4 h-4 mr-1 text-white/80" />
          <span className="text-sm font-medium">{destination.country}</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-1">{destination.city}</h3>
        <p className="text-sm text-white/90 line-clamp-2">{destination.description}</p>
      </div>
    </div>
  );
};

export default DestinationCard;
