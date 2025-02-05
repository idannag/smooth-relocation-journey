import { motion } from 'framer-motion';

const Associates = () => {
  const logos = [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-inter bg-gradient-to-r from-[#4776E6] to-[#8E54E9] bg-clip-text text-transparent">
          Our Associates
        </h2>
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <img src={logo} alt={`Associate ${index + 1}`} className="w-24 h-24 object-contain" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Associates;