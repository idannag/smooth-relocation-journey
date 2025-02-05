const VideoHero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1501854140801-50d01698950b"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in font-poppins">
          Relocation is a complex journey
        </h1>
        <p className="text-xl md:text-2xl mb-6 animate-fade-in">
          Therefore, it needs 360° support
        </p>
        <p className="text-lg animate-fade-in">
          Watch our unique way
        </p>
      </div>
    </div>
  );
};

export default VideoHero;