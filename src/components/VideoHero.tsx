
const VideoHero = () => {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
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
      <div className="relative h-full flex flex-col items-center justify-between text-white text-center px-2 max-w-4xl mx-auto pb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-32 animate-fade-in font-poppins text-white">
          We simplify your relocation journey.
        </h1>
        <div className="space-y-4 mb-12">
          <ul className="list-none space-y-6">
            <li className="text-lg md:text-xl lg:text-2xl animate-slide-up max-w-3xl px-6 py-3 flex items-center justify-center bg-gradient-to-r from-[#8B5CF6]/20 to-[#D946EF]/20 backdrop-blur-sm rounded-lg border border-white/10 shadow-lg hover:scale-105 transition-transform duration-300">
              Expert guidance every step of the way
            </li>
            <li className="text-lg md:text-xl lg:text-2xl animate-slide-up max-w-3xl px-6 py-3 flex items-center justify-center bg-gradient-to-r from-[#8B5CF6]/20 to-[#D946EF]/20 backdrop-blur-sm rounded-lg border border-white/10 shadow-lg hover:scale-105 transition-transform duration-300">
              Your tailored relocation starts here
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
