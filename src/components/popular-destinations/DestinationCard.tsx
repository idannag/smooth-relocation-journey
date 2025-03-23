
import { Destination } from './types';

interface DestinationCardProps {
  destination: Destination;
  onClick: (city: string) => void;
}

const DestinationCard = ({ destination, onClick }: DestinationCardProps) => {
  // Use only the video property that exists in the Destination type
  const videoUrl = destination.video;
  
  return (
    <div 
      className="flex-none w-80 h-48 snap-center relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in group/card cursor-pointer" 
      onClick={() => onClick(destination.city)}
    >
      {/* Video Background - Direct video file or YouTube */}
      {videoUrl && videoUrl.includes('youtube.com') ? (
        <iframe 
          src={`${videoUrl}?autoplay=1&mute=1&loop=1&playlist=${videoUrl.split('/').pop()}&controls=0&modestbranding=1&showinfo=0&rel=0&enablejsapi=1&playsinline=1`} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
          allow="autoplay; encrypted-media" 
          frameBorder="0" 
          loading="lazy" 
          title={`Video of ${destination.city}`}
        />
      ) : videoUrl ? (
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : destination.image ? (
        <img 
          src={destination.image} 
          alt={destination.city} 
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image</span>
        </div>
      )}
      
      {/* Gradient overlay and text content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-1">{destination.city}</h3>
          <p className="text-sm mb-2">{destination.country}</p>
          <p className="text-sm opacity-90">{destination.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
