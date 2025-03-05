import { Globe, Clock, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
const statistics = [{
  icon: Globe,
  topText: "Relocating to over",
  number: "100",
  bottomText: "Countries"
}, {
  icon: Clock,
  topText: "Operating for",
  number: "80",
  bottomText: "Years"
}, {
  icon: Users,
  topText: "Guiding over",
  number: "3,000",
  bottomText: "Relocations a year"
}];
const Statistics = () => {
  const isMobile = useIsMobile();
  return <section className="py-6 sm:py-12 bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 md:mb-8 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
          We Are
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {statistics.map((stat, index) => <div key={index} className="bg-white p-4 md:p-6 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 animate-fade-in group/stat">
              {isMobile ?
          // Mobile layout: Icon on the left, text on the right
          <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full transform scale-110 opacity-0 group-hover/stat:opacity-100 transition-all duration-500" />
                    <stat.icon className="w-8 h-8 text-[#2C5AAE] transform group-hover/stat:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 font-medium mb-0.5 text-base">{stat.topText}</p>
                    <div className="flex items-baseline gap-1 py-0">
                      <h3 className="font-bold text-[#2C5AAE] transform group-hover/stat:translate-y-[-2px] transition-transform duration-500 text-lg py-0">
                        {stat.number}
                      </h3>
                      <p className="font-medium transition-colors duration-500 py-0 text-base text-gray-600">
                        {stat.bottomText}
                      </p>
                    </div>
                  </div>
                </div> :
          // Desktop layout: Vertical alignment
          <>
                  <div className="relative mb-4 flex justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full transform scale-110 opacity-0 group-hover/stat:opacity-100 transition-all duration-500" />
                    <stat.icon className="w-8 h-8 text-[#2C5AAE] transform group-hover/stat:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-gray-600 text-sm font-medium">{stat.topText}</p>
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#2C5AAE] transform group-hover/stat:translate-y-[-2px] transition-transform duration-500">
                      {stat.number}
                    </h3>
                    <p className="text-gray-600 text-sm font-medium group-hover/stat:text-gray-800 transition-colors duration-500">
                      {stat.bottomText}
                    </p>
                  </div>
                </>}
            </div>)}
        </div>
      </div>
    </section>;
};
export default Statistics;