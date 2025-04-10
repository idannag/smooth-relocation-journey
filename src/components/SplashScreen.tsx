import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = () => {
  // Set isVisible to false by default to ensure it doesn't show at all
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // No need for a timeout since we're not showing the splash screen
    return () => {};
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
            <div className="relative z-10">
              <div className="flex flex-col items-center">
                <motion.div 
                  className="w-20 h-20 rounded-full border-4 border-t-transparent border-white animate-spin"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "linear" 
                  }}
                />
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      delay: 0.3,
                      duration: 0.5
                    }
                  }}
                  className="text-white text-xl font-semibold mt-6"
                  style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}
                >
                  Loading Ocean
                </motion.p>
                <motion.div
                  className="flex gap-1.5 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-white rounded-full"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
