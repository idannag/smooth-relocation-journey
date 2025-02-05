const VideoHero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://www.app.ocean-il.co.il/wp-content/uploads/2022/04/ocean-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50" />
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in font-inter">
          Relocation is a complex journey
        </h1>
        <p className="text-xl md:text-2xl mb-6 animate-slide-up">
          Therefore, it needs 360° support
        </p>
        <p className="text-lg animate-slide-up delay-150">
          Watch our unique way
        </p>
      </div>
    </div>
  );
};

export default VideoHero;