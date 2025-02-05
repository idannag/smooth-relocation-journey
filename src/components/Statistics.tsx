import { Users, Building, Globe } from 'lucide-react';

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
  }
];

const Statistics = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">We Are</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg text-center transform hover:scale-105 transition-transform duration-300"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-4xl font-bold text-primary mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;