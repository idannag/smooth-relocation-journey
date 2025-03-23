
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Globe, Calendar, Banknote, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface Destination {
  id: number;
  city: string;
  country: string;
  description: string;
  video: string;
  image: string;
  population: string;
  language: string;
  currency: string;
  timeZone: string;
  averageCost: string;
  bestTimeToVisit: string;
  popularAttractions: string;
  mapUrl: string;
}

const PopularDestinationsLightbox = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2JRzcSHOmFKT3Q8Fgz4i79GzmwkA5FKknRMiOIy2izJ7TAZydkU8s_hbjn9E5IiwonupQsEkHbZfj/pub?gid=136618633&single=true&output=csv');
        const text = await response.text();
        
        // Parse CSV
        const rows = text.split('\n');
        const headers = rows[0].split(',').map(header => header.trim());
        
        const parsedDestinations = rows.slice(1).map((row, index) => {
          const values = row.split(',').map(value => value.trim());
          
          const destination: any = {
            id: index
          };
          
          headers.forEach((header, i) => {
            let key = header.toLowerCase().replace(/\s+/g, '');
            destination[key] = values[i] || '';
          });
          
          return destination as Destination;
        });
        
        setDestinations(parsedDestinations);
      } catch (error) {
        console.error('Error fetching destinations:', error);
        toast.error('Failed to load destinations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % destinations.length);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + destinations.length) % destinations.length);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

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
    return (
      <div className="p-6 space-y-8">
        <div className="flex justify-center">
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-64 w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const activeDestination = destinations[activeIndex];

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
        Popular Destinations
      </h2>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side: Video/Image and navigation */}
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
          
          {/* Right side: Destination information */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="info">Information</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="space-y-4">
                <h3 className="text-2xl font-bold text-[#2C5AAE]">
                  {activeDestination.city}, {activeDestination.country}
                </h3>
                
                <p className="text-gray-700 mb-4">{activeDestination.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Globe className="w-5 h-5 text-[#2C5AAE] mt-0.5" />
                    <div>
                      <h4 className="font-semibold">General:</h4>
                      <p className="text-sm text-gray-600">Population: {activeDestination.population}</p>
                      <p className="text-sm text-gray-600">Language: {activeDestination.language}</p>
                      <p className="text-sm text-gray-600">Time Zone: {activeDestination.timeZone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Banknote className="w-5 h-5 text-[#2C5AAE] mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Financial:</h4>
                      <p className="text-sm text-gray-600">Currency: {activeDestination.currency}</p>
                      <p className="text-sm text-gray-600">Average Cost: {activeDestination.averageCost}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Calendar className="w-5 h-5 text-[#2C5AAE] mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Best Time to Visit:</h4>
                      <p className="text-sm text-gray-600">{activeDestination.bestTimeToVisit}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-[#2C5AAE] mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Popular Attractions:</h4>
                      <p className="text-sm text-gray-600">{activeDestination.popularAttractions}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="map">
                <div className="h-[300px] rounded-lg overflow-hidden">
                  {activeDestination.mapUrl ? (
                    <iframe 
                      src={activeDestination.mapUrl}
                      className="w-full h-full border-none"
                      loading="lazy"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <Info className="w-6 h-6 text-gray-400 mr-2" />
                      <span className="text-gray-500">Map not available</span>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularDestinationsLightbox;
