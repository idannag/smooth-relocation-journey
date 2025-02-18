
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
  const isMobile = window.innerWidth < 768;
  const radius = isMobile ? 38 : 32;

  return (
    <section className="py-6 bg-gradient-to-r from-blue-50 to-blue-100 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-2">
          <h2 className="text-3xl font-bold font-inter bg-gradient-to-r from-[#4776E6] to-[#8E54E9] bg-clip-text text-transparent animate-fade-in">
            We focus on the life cycle of mobility customer
          </h2>
          <p className="mt-1 text-lg text-gray-600 animate-slide-up">Every relocatee is unique and requires a set of solutions.</p>
        </div>
        <div className="relative w-full aspect-square max-w-2xl mx-auto my-8 p-8">
          <div className="absolute inset-[20%] md:inset-[25%] rounded-full bg-[#1e3a8a] bg-opacity-90 flex items-center justify-center text-white p-4 md:p-6 text-center animate-fade-in">
            <p className="text-sm md:text-base">
              Let us help you plan your shipping options for a smooth relocation abroad.
            </p>
          </div>

          {stages.map((stage, index) => {
            const angle = (index * 360) / stages.length;
            const x = 50 + radius * Math.cos((angle - 90) * (Math.PI / 180));
            const y = 50 + radius * Math.sin((angle - 90) * (Math.PI / 180));

            return (
              <motion.button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`absolute w-20 h-20 md:w-24 md:h-24 -ml-10 md:-ml-12 -mt-10 md:-mt-12 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
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
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {React.createElement(stage.icon, {
                  size: isMobile ? 20 : 24,
                  className: "mb-1 stroke-[1.5]"
                })}
                <span className="text-[10px] md:text-xs text-center px-1 leading-tight">{stage.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LifecycleCircle;
