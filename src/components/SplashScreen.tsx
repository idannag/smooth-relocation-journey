
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
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ zIndex: 0 }}
              >
                <motion.div
                  className="absolute rounded-2xl"
                  style={{ 
                    width: "100%",
                    height: "100%",
                    top: "0",
                    left: "0",
                    background: "transparent",
                    boxShadow: "0 0 0 6px rgba(44, 90, 174, 0.95)",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 0 6px rgba(44, 90, 174, 1), 0 0 20px 6px rgba(44, 90, 174, 0.95)",
                      "0 0 0 6px rgba(51, 195, 240, 1), 0 0 20px 6px rgba(51, 195, 240, 0.95)",
                      "0 0 0 6px rgba(139, 92, 246, 1), 0 0 20px 6px rgba(139, 92, 246, 0.95)",
                      "0 0 0 6px rgba(44, 90, 174, 1), 0 0 20px 6px rgba(44, 90, 174, 0.95)",
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
              <img 
                src="https://www.app.ocean-il.co.il/wp-content/uploads/2022/04/cropped-logo.jpg"
                alt="Ocean IL Logo"
                className="w-32 h-32 object-contain rounded-2xl relative z-10"
                style={{ border: "none", background: "white" }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white text-xl font-semibold mt-4"
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
