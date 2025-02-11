
import { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const VideoHero = () => {
  const isMobile = useIsMobile();
  const videoUrl = "https://ocean.autodigital.agency/splash.mp4";

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
      <div className="relative h-full flex flex-col items-center justify-between text-white text-center px-2 max-w-4xl mx-auto pb-20">
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mt-32 mb-12 animate-fade-in font-poppins text-white leading-normal"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}
        >
          We simplify your relocation journey.
        </h1>
        <div className="space-y-4 mb-12">
          <ul className="list-none space-y-8">
            <li 
              className="text-lg md:text-xl lg:text-2xl animate-slide-up max-w-3xl px-6 flex items-center justify-center text-white/90"
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}
            >
              Expert guidance every step of the way
            </li>
            <li 
              className="text-lg md:text-xl lg:text-2xl animate-slide-up max-w-3xl px-6 flex items-center justify-center text-white/90"
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}
            >
              Your tailored relocation starts here
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
