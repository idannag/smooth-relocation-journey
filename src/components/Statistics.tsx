
import { Globe, Clock, Users } from 'lucide-react';

const statistics = [
  {
    icon: Globe,
    topText: "Relocating to over",
    number: "100",
    bottomText: "Countries"
  },
  {
    icon: Clock,
    topText: "Operating for",
    number: "80",
    bottomText: "Years"
  },
  {
    icon: Users,
    topText: "Guiding over",
    number: "3,000",
    bottomText: "Relocations a year"
  }
];

const Statistics = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
          We Are
        </h2>
        
        <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-4xl mx-auto">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white via-blue-50 to-white p-2 md:p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 animate-fade-in group/stat"
            >
              <div className="relative mb-2 md:mb-3">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-full transform scale-110 opacity-0 group-hover/stat:opacity-100 transition-all duration-500" />
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 mx-auto text-[#2C5AAE] transform group-hover/stat:scale-110 transition-transform duration-500" />
              </div>
              <div className="text-center space-y-0.5 md:space-y-1">
                <p className="text-gray-600 text-[11px] md:text-xs font-medium">{stat.topText}</p>
                <h3 className="text-xl md:text-2xl font-bold text-[#2C5AAE] transform group-hover/stat:translate-y-[-2px] transition-transform duration-500">
                  {stat.number}
                </h3>
                <p className="text-gray-600 text-[11px] md:text-xs font-medium group-hover/stat:text-gray-800 transition-colors duration-500">
                  {stat.bottomText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
