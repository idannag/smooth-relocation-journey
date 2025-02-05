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
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in font-poppins bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] bg-clip-text text-transparent">
          We simplify the relocation process.
        </h1>
        <div className="space-y-4">
          <p className="text-lg md:text-xl lg:text-2xl animate-slide-up max-w-3xl">
            Every relocatee is unique and requires a set of solutions.
          </p>
          <p className="text-lg md:text-xl lg:text-2xl animate-slide-up max-w-3xl">
            We provide a tailor-made journey, specifically for your needs and requirements – throughout the entire process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;