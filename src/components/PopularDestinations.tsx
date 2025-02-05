import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const PopularDestinations = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const destinations = [
    {
      city: "Berlin",
      country: "Germany",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      description: "Discover relocation opportunities"
    },
    {
      city: "Toronto",
      country: "Canada",
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
      description: "Discover relocation opportunities"
    },
    {
      city: "Sydney",
      country: "Australia",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
      description: "Discover relocation opportunities"
    },
    {
      city: "London",
      country: "UK",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      description: "Discover relocation opportunities"
    },
    {
      city: "Singapore",
      country: "Singapore",
      image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
      description: "Discover relocation opportunities"
    },
    {
      city: "Amsterdam",
      country: "Netherlands",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      description: "Discover relocation opportunities"
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
        <h2 className="text-3xl font-bold text-center mb-12 font-inter bg-gradient-to-r from-[#FF512F] to-[#DD2476] bg-clip-text text-transparent">
          Popular Destinations
        </h2>
        
        <div className="relative group">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="flex-none w-80 snap-center relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in group/card"
              >
                <img
                  src={destination.image}
                  alt={destination.city}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover/card:scale-110"
                />
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
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
