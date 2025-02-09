
import { motion } from 'framer-motion';

const Associates = () => {
  const logos = [
    '/lovable-uploads/8bb6d1ab-e2ff-4a43-b1ad-dd707702f069.png#0',  // Harmony Relocation Network
    '/lovable-uploads/8bb6d1ab-e2ff-4a43-b1ad-dd707702f069.png#1',  // IAM
    '/lovable-uploads/8bb6d1ab-e2ff-4a43-b1ad-dd707702f069.png#2',  // MN Department of Education
    '/lovable-uploads/8bb6d1ab-e2ff-4a43-b1ad-dd707702f069.png#3',  // ISO
    '/lovable-uploads/8bb6d1ab-e2ff-4a43-b1ad-dd707702f069.png#4',  // Worldwide ERC
    '/lovable-uploads/8bb6d1ab-e2ff-4a43-b1ad-dd707702f069.png#5',  // FAIN
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
