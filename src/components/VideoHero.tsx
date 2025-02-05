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
      <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50" />
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-[fadeIn_1s_ease-out] font-inter">
          We simplify the relocation process.
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl animate-[slideUp_1s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards] max-w-3xl">
          Every relocatee is unique and requires a set of solutions. We provide a tailor-made journey, specifically for your needs and requirements – throughout the entire process.
        </p>
      </div>
    </div>
  );
};

export default VideoHero;