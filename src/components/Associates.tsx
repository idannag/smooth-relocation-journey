import { motion } from 'framer-motion';

const Associates = () => {
  const logos = [
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    'https://images.unsplash.com/photo-1483058712412-4245e9b90334',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-inter bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] bg-clip-text text-transparent">
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
                className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.1 }}
              >
                <img 
                  src={logo} 
                  alt={`Associate ${index + 1}`} 
                  className="w-full h-full object-cover" 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Associates;