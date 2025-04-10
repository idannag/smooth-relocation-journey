
import { useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const VideoHero = () => {
  const isMobile = useIsMobile();
  const videoUrl = "https://ocean.autodigital.agency/splash.mp4";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Preload the video as soon as component mounts
    if (videoRef.current) {
      videoRef.current.load();
      
      // Force immediate play
      const playPromise = videoRef.current.play();
      
      // Handle potential autoplay restrictions
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Autoplay prevented:', error);
          // We could add a play button here if needed
        });
      }
    }
  }, []);

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 1 }} // Ensure it's visible immediately
      >
        <source src={videoUrl} type="video/mp4" priority="high" />
      </video>
      <div className="absolute inset-0 bg-black/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2C5AAE]/10 to-[#40E0D0]/10" />
      <div className="relative h-full flex flex-col items-center justify-between text-white text-center px-2 max-w-4xl mx-auto pb-20">
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-bold mt-32 mb-12 animate-fade-in font-poppins text-white md:leading-[1.35]"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}
        >
          We simplify your relocation journey.
        </h1>
        <div className="space-y-4 mb-12">
          <p 
            className="text-xl md:text-2xl lg:text-3xl animate-slide-up max-w-3xl px-4 md:px-6 flex items-center justify-center text-white font-bold leading-[1.5rem] md:leading-normal"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}
          >
            Expert guidance at every step for your tailored relocation experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
