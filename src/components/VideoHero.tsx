
import { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const VideoHero = () => {
  const isMobile = useIsMobile();
  const videos = [
    "https://www.app.ocean-il.co.il/wp-content/uploads/2022/10/Brooklyn.m4v",
    "https://www.youtube.com/embed/Oxh_NsBqR1M",
    "https://www.youtube.com/embed/kK3uDGtR45A",
    "https://www.youtube.com/embed/E_S4iZ7TCXo",
    "https://www.youtube.com/embed/TP_hHMnyknk",
    "https://www.youtube.com/embed/AKXMkeib1zE",
    "https://www.youtube.com/embed/YUdDGKnVZN4",
    "https://www.youtube.com/embed/9pb7paEMbmo",
    "https://www.youtube.com/embed/kpoGrDy_ss8",
    "https://www.youtube.com/embed/8m3g3SlYs3k"
  ];

  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  useEffect(() => {
    // Change video every 30 seconds
    const interval = setInterval(() => {
      setCurrentVideo(prevVideo => {
        const currentIndex = videos.indexOf(prevVideo);
        const nextIndex = (currentIndex + 1) % videos.length;
        return videos[nextIndex];
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const isYouTubeVideo = currentVideo.includes('youtube.com');

  const videoClassName = `absolute inset-0 w-full h-full object-cover ${isMobile ? 'h-screen' : ''}`;

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {isYouTubeVideo ? (
        <iframe
          src={`${currentVideo}?autoplay=1&mute=1&loop=1&playlist=${currentVideo.split('/').pop()}&controls=0&modestbranding=1&showinfo=0&rel=0&enablejsapi=1`}
          className={videoClassName}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          className={videoClassName}
        >
          <source src={currentVideo} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      <div className="relative h-full flex flex-col items-center justify-between text-white text-center px-2 max-w-4xl mx-auto pb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-32 animate-fade-in font-poppins text-white leading-relaxed">
          We simplify your relocation journey.
        </h1>
        <div className="space-y-4 mb-12">
          <ul className="list-none space-y-8">
            <li className="text-lg md:text-xl lg:text-2xl animate-slide-up max-w-3xl px-6 flex items-center justify-center text-white/90 border-l-4 border-white/30 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-[2px]">
              Expert guidance every step of the way
            </li>
            <li className="text-lg md:text-xl lg:text-2xl animate-slide-up max-w-3xl px-6 flex items-center justify-center text-white/90 border-l-4 border-white/30 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-[2px]">
              Your tailored relocation starts here
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
