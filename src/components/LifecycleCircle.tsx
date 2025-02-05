import { useState } from 'react';
import { motion } from 'framer-motion';

const stages = [
  { id: 1, name: 'Initial Contact', description: 'First meeting and consultation' },
  { id: 2, name: 'Assessment', description: 'Evaluating needs and requirements' },
  { id: 3, name: 'Planning', description: 'Creating your relocation roadmap' },
  { id: 4, name: 'Housing', description: 'Finding your perfect home' },
  { id: 5, name: 'Education', description: 'School and education arrangements' },
  { id: 6, name: 'Legal Support', description: 'Visa and documentation assistance' },
  { id: 7, name: 'Settlement', description: 'Moving in and settling down' },
  { id: 8, name: 'Follow-up', description: 'Ongoing support and assistance' },
];

const LifecycleCircle = () => {
  const [activeStage, setActiveStage] = useState(1);

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-inter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Relocation Lifecycle
        </h2>
        <div className="relative w-full aspect-square max-w-3xl mx-auto">
          {/* Main circle */}
          <div className="absolute inset-[15%] rounded-full border-4 border-primary/20 bg-white shadow-lg flex items-center justify-center">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center p-8"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">
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
            const radius = 42; // percentage of container width
            const x = 50 + radius * Math.cos((angle - 90) * (Math.PI / 180));
            const y = 50 + radius * Math.sin((angle - 90) * (Math.PI / 180));

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`absolute w-16 h-16 -ml-8 -mt-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeStage === stage.id
                    ? 'bg-primary text-white scale-110'
                    : 'bg-white text-primary hover:bg-primary/10'
                }`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
              >
                <span className="text-sm font-medium">{stage.id}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LifecycleCircle;