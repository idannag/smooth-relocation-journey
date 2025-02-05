import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Sofa, School, Truck, Wallet, Briefcase, FileText, UserSquare2 } from 'lucide-react';

const stages = [
  { id: 1, name: 'Real Estate', description: 'Find your perfect home', icon: Home },
  { id: 2, name: 'Furniture Rental', description: 'Temporary furniture solutions', icon: Sofa },
  { id: 3, name: 'International education', description: 'Educational support services', icon: School },
  { id: 4, name: 'Shipping household goods', description: 'Safe and secure shipping', icon: Truck },
  { id: 5, name: 'International tax', description: 'Tax consultation and planning', icon: Wallet },
  { id: 6, name: 'Relocation consulting', description: 'Expert relocation guidance', icon: Briefcase },
  { id: 7, name: 'Employment agreement consulting', description: 'Contract review and advice', icon: FileText },
  { id: 8, name: 'Relocation for employees', description: 'Employee transition support', icon: UserSquare2 },
];

const LifecycleCircle = () => {
  const [activeStage, setActiveStage] = useState(1);

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter bg-gradient-to-r from-[#4776E6] to-[#8E54E9] bg-clip-text text-transparent">
            We focus on the life cycle of mobility customer
          </h2>
          <p className="mt-4 text-lg text-gray-600">Every relocatee is unique and requires a set of solutions.</p>
        </div>
        <div className="relative w-full aspect-square max-w-3xl mx-auto">
          {/* Center content */}
          <div className="absolute inset-[20%] rounded-full bg-[#1e3a8a] bg-opacity-90 flex items-center justify-center text-white p-8 text-center">
            <p className="text-[10px] md:text-xs">
              Having trouble deciding what personal items to send abroad? Knowing all of your options in advance will help you build the shipping package that suits your needs.
            </p>
          </div>

          {/* Surrounding circles */}
          {stages.map((stage, index) => {
            const angle = (index * 360) / stages.length;
            const radius = 42;
            const x = 50 + radius * Math.cos((angle - 90) * (Math.PI / 180));
            const y = 50 + radius * Math.sin((angle - 90) * (Math.PI / 180));

            return (
              <motion.button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`absolute w-24 h-24 -ml-12 -mt-12 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                  activeStage === stage.id
                    ? 'bg-white text-[#1e3a8a] scale-110 shadow-lg'
                    : 'bg-white text-[#1e3a8a] hover:bg-opacity-90'
                }`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {React.createElement(stage.icon, {
                  size: 24,
                  className: "mb-1 stroke-[1.5]"
                })}
                <span className="text-xs text-center px-2 leading-tight">{stage.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LifecycleCircle;