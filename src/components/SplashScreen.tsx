import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Extended to 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: {
              duration: 0.8,
              ease: "easeOut"
            }
          }}
          exit={{ 
            opacity: 0,
            scale: 1.2,
            transition: {
              duration: 0.5,
              ease: "easeIn"
            }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: 0.3
              }
            }}
          >
            <video
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://www.app.ocean-il.co.il/wp-content/uploads/2022/11/fSplash.m4v" type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;