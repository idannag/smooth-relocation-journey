import { Users, Building, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const statistics = [
  {
    icon: Users,
    number: "5000+",
    description: "Successful Relocations"
  },
  {
    icon: Building,
    number: "50+",
    description: "Partner Companies"
  },
  {
    icon: Globe,
    number: "30+",
    description: "Destination Countries"
  },
  {
    icon: Users,
    number: "10000+",
    description: "Happy Clients"
  },
  {
    icon: Building,
    number: "100+",
    description: "Global Offices"
  }
];

const Statistics = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
          We Are
        </h2>
        
        <div className="relative group">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6 text-[#2C5AAE]" />
          </button>
          
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="flex-none w-72 snap-center bg-gradient-to-br from-white to-blue-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-[#2C5AAE]" />
                <h3 className="text-4xl font-bold text-[#2C5AAE] mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6 text-[#2C5AAE]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Statistics;