import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  ClipboardList, 
  Map, 
  Home, 
  GraduationCap, 
  FileText, 
  Truck, 
  HeartHandshake 
} from 'lucide-react';

const stages = [
  { id: 1, name: 'Initial Contact', description: 'First meeting and consultation', icon: Phone },
  { id: 2, name: 'Assessment', description: 'Evaluating needs and requirements', icon: ClipboardList },
  { id: 3, name: 'Planning', description: 'Creating your relocation roadmap', icon: Map },
  { id: 4, name: 'Housing', description: 'Finding your perfect home', icon: Home },
  { id: 5, name: 'Education', description: 'School and education arrangements', icon: GraduationCap },
  { id: 6, name: 'Legal Support', description: 'Visa and documentation assistance', icon: FileText },
  { id: 7, name: 'Settlement', description: 'Moving in and settling down', icon: Truck },
  { id: 8, name: 'Follow-up', description: 'Ongoing support and assistance', icon: HeartHandshake },
];

const LifecycleCircle = () => {
  const [activeStage, setActiveStage] = useState(1);

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
          Relocation Lifecycle
        </h2>
        <div className="relative w-full aspect-square max-w-3xl mx-auto">
          {/* Main circle */}
          <div className="absolute inset-[15%] rounded-full border-4 border-[#2C5AAE]/20 bg-white shadow-lg flex items-center justify-center">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center p-8"
            >
              <div className="flex justify-center mb-4">
                {stages[activeStage - 1].icon && (
                  <div className="w-12 h-12 text-[#2C5AAE]">
                    {React.createElement(stages[activeStage - 1].icon, {
                      size: 48,
                      className: "text-[#2C5AAE]"
                    })}
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold text-[#2C5AAE] mb-4">
                {stages[activeStage - 1].name}
              </h3>
              <p className="text-gray-600">
                {stages[activeStage - 1].description}
              </p>
            </motion.div>
          </div>

          {/* Surrounding circles */}
          {stages.map((stage, index) => {
            const angle = (index * 360) / stages.length;
            const radius = 42;
            const x = 50 + radius * Math.cos((angle - 90) * (Math.PI / 180));
            const y = 50 + radius * Math.sin((angle - 90) * (Math.PI / 180));

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`absolute w-16 h-16 -ml-8 -mt-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeStage === stage.id
                    ? 'bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] text-white scale-110'
                    : 'bg-white text-[#2C5AAE] hover:bg-[#2C5AAE]/10'
                }`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
              >
                {React.createElement(stage.icon, {
                  size: 24,
                  className: activeStage === stage.id ? "text-white" : "text-[#2C5AAE]"
                })}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LifecycleCircle;