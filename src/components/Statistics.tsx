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
    <section className="py-16 bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-inter bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] bg-clip-text text-transparent">
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
            className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory scrollbar-hide justify-center items-center mx-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="flex-none w-72 snap-center bg-gradient-to-br from-white via-blue-50 to-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 animate-fade-in group/stat"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-full transform scale-150 opacity-0 group-hover/stat:opacity-100 transition-all duration-500" />
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary transform group-hover/stat:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-4xl font-bold text-primary mb-2 transform group-hover/stat:translate-y-[-2px] transition-transform duration-500 text-center">
                  {stat.number}
                </h3>
                <p className="text-gray-600 group-hover/stat:text-gray-800 transition-colors duration-500 text-center">
                  {stat.description}
                </p>
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