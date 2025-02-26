
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const PopularDestinations = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const destinations = [
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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
          Popular Destinations
        </h2>
        
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg 
            transition-all duration-300 hover:bg-white hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-[#2C5AAE]" />
          </button>
          
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 px-4 pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="flex-none w-80 h-48 snap-center relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in group/card"
              >
                {destination.video.includes('youtube.com') ? (
                  <iframe
                    src={`${destination.video}?autoplay=1&mute=1&loop=1&playlist=${destination.video.split('/').pop()}&controls=0&modestbranding=1&showinfo=0&rel=0&enablejsapi=1&playsinline=1`}
                    className="w-[120%] h-[120%] absolute -top-[10%] -left-[10%] pointer-events-none"
                    allow="autoplay; encrypted-media"
                    frameBorder="0"
                  />
                ) : (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={destination.video} type="video/mp4" />
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{destination.city}</h3>
                    <p className="text-sm mb-2">{destination.country}</p>
                    <p className="text-sm opacity-90">{destination.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg 
            transition-all duration-300 hover:bg-white hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-[#2C5AAE]" />
          </button>
        </div>
      </div>
    