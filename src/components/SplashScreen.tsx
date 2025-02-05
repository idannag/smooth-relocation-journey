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
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://www.app.ocean-il.co.il/wp-content/uploads/2022/11/fSplash.m4v" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;