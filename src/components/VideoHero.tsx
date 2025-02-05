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
        <source src="https://www.app.ocean-il.co.il/wp-content/uploads/2022/10/Brooklyn.m4v" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-2 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in font-poppins text-white">
          We simplify your relocation process.
        </h1>
        <div className="space-y-4 mt-4">
          <p className="text-lg md:text-xl lg:text-2xl animate-slide-up max-w-3xl px-4 md:px-6">
            From start to finish - your personalized relocation journey starts here, expertly guided
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;