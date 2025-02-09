
import { motion } from 'framer-motion';

const Associates = () => {
  const logos = [
    'https://www.app.ocean-il.co.il/wp-content/uploads/2025/01/HARMONY-removebg-preview.png',  // Harmony Relocation Network
    'https://www.app.ocean-il.co.il/wp-content/uploads/2022/04/iam.png',                       // IAM
    'https://www.app.ocean-il.co.il/wp-content/uploads/2022/04/client-5.png',                  // MN Department of Education
    'https://www.app.ocean-il.co.il/wp-content/uploads/2022/04/IQC.png',                       // ISO
    'https://www.app.ocean-il.co.il/wp-content/uploads/2022/04/worldwide.png',                 // Worldwide ERC
    'https://www.app.ocean-il.co.il/wp-content/uploads/2022/04/faim2019.png',                 // FAIN
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-inter bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] bg-clip-text text-transparent">
          Our Associates
        </h2>
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-12 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {logos.map((logo, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-48 h-24 bg-white rounded-lg flex items-center justify-center p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src={logo} 
                  alt={`Associate ${index + 1}`} 
                  className="w-full h-full object-contain" 
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
