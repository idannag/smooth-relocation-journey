
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // 5000 ms (5 seconds) duration

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
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
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
              <source 
                src="https://ocean.autodigital.agency/splash.mp4" 
                type="video/mp4" 
              />
            </video>
          </motion.div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ zIndex: 0 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{ 
                    background: "conic-gradient(from 0deg, #2C5AAE, #40E0D0, #33C3F0, #2C5AAE)",
                    filter: "blur(4px)",
                  }}
                  animate={{
                    background: "conic-gradient(from 360deg, #2C5AAE, #40E0D0, #33C3F0, #2C5AAE)",
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
              <img 
                src="https://www.app.ocean-il.co.il/wp-content/uploads/2022/04/cropped-logo.jpg"
                alt="Ocean IL Logo"
                className="w-32 h-32 object-contain mb-4 rounded-2xl relative z-10"
                style={{ border: "2px solid transparent", padding: "2px", background: "white" }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white text-xl font-semibold"
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
