
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
    "https://www.youtube.com/embed/YUdDkKnVZN4",
    "https://www.youtube.com/embed/9pb7paEMbmo",
    "https://www.youtube.com/embed/kpoGrDy_ss8",
    "https://www.youtube.com/embed/8m3g3SlYs3k"
  ];

  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo(prevVideo => {
        const currentIndex = videos.indexOf(prevVideo);
        const nextIndex = (currentIndex + 1) % videos.length;
        return videos[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const isYouTubeVideo = currentVideo.includes('youtube.com');
  const videoClassName = `absolute inset-0 w-[160%] h-[160%] ${isMobile ? '-top-[30%] -left-[30%]' : '-top-[10%] -left-[10%]'} pointer-events-none`;

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {isYouTubeVideo ? (
        <iframe
          src={`${currentVideo}?autoplay=1&mute=1&loop=1&playlist=${currentVideo.split('/').pop()}&controls=0&modestbranding=1&showinfo=0&rel=0&enablejsapi=1&playsinline=1`}
          className={videoClassName}
          allow="autoplay; encrypted-media"
          frameBorder="0"
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
      <div className="absolute inset-0 backdrop-blur-[1px] bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-[1px]" />
      <div className="relative h-full flex flex-col items-center justify-between text-white text-center px-2 max-w-4xl mx-auto pb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-32 animate-fade-in font-poppins text-white leading-normal">
          We simplify your relocation journey.
        </h1>
        <div className="space-y-4 mb-12">
          <ul className="list-none space-y-8">
            <li className="text-lg md:text-xl lg:text-2xl animate-slide-up max-w-3xl px-6 flex items-center justify-center text-white/90">
              Expert guidance every step of the way
            </li>
            <li className="text-lg md:text-xl lg:text-2xl animate-slide-up max-w-3xl px-6 flex items-center justify-center text-white/90">
              Your tailored relocation starts here
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
