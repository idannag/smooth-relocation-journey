import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Lightbox from './ui/lightbox';

interface Destination {
  city: string;
  country: string;
  video: string;
  description: string;
}

const PopularDestinations = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackDestinations = [
    {
      city: "New York",
      country: "USA",
      video: "https://www.app.ocean-il.co.il/wp-content/uploads/2022/10/Brooklyn.m4v",
      description: "Discover relocation opportunities"
    }, 
    {
      city: "Berlin",
      country: "Germany",
      video: "https://www.youtube.com/embed/Oxh_NsBqR1M",
      description: "Experience German culture"
    }, 
    {
      city: "Barcelona",
      country: "Spain",
      video: "https://www.youtube.com/embed/kK3uDGtR45A",
      description: "Live the Mediterranean lifestyle"
    }, 
    {
      city: "Dubai",
      country: "UAE",
      video: "https://www.youtube.com/embed/E_S4iZ7TCXo",
      description: "Embrace luxury living"
    }, 
    {
      city: "Toronto",
      country: "Canada",
      video: "https://www.youtube.com/embed/TP_hHMnyknk",
      description: "Experience multicultural living"
    }, 
    {
      city: "Greece",
      country: "Greece",
      video: "https://www.youtube.com/embed/AKXMkeib1zE",
      description: "Discover ancient history"
    }, 
    {
      city: "London",
      country: "UK",
      video: "https://www.youtube.com/embed/YUdDkKnVZN4",
      description: "Global opportunities await"
    }, 
    {
      city: "Tel Aviv",
      country: "Israel",
      video: "https://www.youtube.com/embed/9pb7paEMbmo",
      description: "Innovation meets tradition"
    }, 
    {
      city: "Paris",
      country: "France",
      video: "https://www.youtube.com/embed/kpoGrDy_ss8",
      description: "Live the French lifestyle"
    }, 
    {
      city: "Larnaca",
      country: "Cyprus",
      video: "https://www.youtube.com/embed/8m3g3SlYs3k",
      description: "Mediterranean paradise"
    }
  ];

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2JRzcSHOmFKT3Q8Fgz4i79GzmwkA5FKknRMiOIy2izJ7TAZydkU8s_hbjn9E5IiwonupQsEkHbZfj/pub?gid=136618633&single=true&output=csv');
        const text = await response.text();
        
        const rows = text.split('\n');
        const headers = rows[0].split(',').map(header => header.trim());
        
        const parsedDestinations = rows.slice(1).map((row) => {
          const values = row.split(',').map(value => value.trim());
          
          const destination: any = {};
          
          headers.forEach((header, i) => {
            let key = header.toLowerCase().replace(/\s+/g, '');
            destination[key] = values[i] || '';
          });
          
          return destination as Destination;
        });
        
        if (parsedDestinations.length > 0) {
          setDestinations(parsedDestinations);
        } else {
          setDestinations(fallbackDestinations);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
        setDestinations(fallbackDestinations);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleDestinationClick = (city: string) => {
    if (city) {
      setSelectedDestination(`destination:${city}`);
    } else {
      setSelectedDestination("destinations");
    }
    setShowLightbox(true);
  };

  const handleSectionTitleClick = () => {
    setSelectedDestination("destinations");
    setShowLightbox(true);
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <h2 
          className="text-3xl font-bold text-center mb-12 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent cursor-pointer"
          onClick={handleSectionTitleClick}
        >
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
            className="flex overflow-x-auto gap-6 px-4 pb-4 snap-x snap-mandatory scrollbar-hide" 
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {loading ? (
              Array(5).fill(0).map((_, index) => (
                <div key={index} className="flex-none w-80 h-48 snap-center bg-gray-200 animate-pulse rounded-lg"></div>
              ))
            ) : (
              destinations.map((destination, index) => (
                <div 
                  key={index} 
                  className="flex-none w-80 h-48 snap-center relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in group/card cursor-pointer" 
                  onClick={() => handleDestinationClick(destination.city)}
                >
                  {destination.video && destination.video.includes('youtube.com') ? (
                    <iframe 
                      src={`${destination.video}?autoplay=1&mute=1&loop=1&playlist=${destination.video.split('/').pop()}&controls=0&modestbranding=1&showinfo=0&rel=0&enablejsapi=1&playsinline=1`} 
                      className="w-[120%] h-[120%] absolute -top-[10%] -left-[10%] pointer-events-none" 
                      allow="autoplay; encrypted-media" 
                      frameBorder="0" 
                      loading="lazy" 
                    />
                  ) : destination.video ? (
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                      <source src={destination.video} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-1">{destination.city}</h3>
                      <p className="text-sm mb-2">{destination.country}</p>
                      <p className="text-sm opacity-90">{destination.description}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
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

      {showLightbox && (
        <Lightbox 
          url={selectedDestination} 
          onClose={() => setShowLightbox(false)} 
        />
      )}
    </section>
  );
};

export default PopularDestinations;
