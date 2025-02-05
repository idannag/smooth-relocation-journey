const FooterVideo = () => {
  return (
    <section className="relative h-[50vh] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://www.app.ocean-il.co.il/wp-content/uploads/2022/10/Brooklyn.m4v" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-[#2C5AAE]/80 to-transparent" />
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Ready to Start Your Journey?</h2>
        <p className="text-lg md:text-xl mb-8 animate-slide-up">Let us guide you through your relocation adventure</p>
        <button className="bg-white text-[#2C5AAE] px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300">
          Contact Us
        </button>
      </div>
    </section>
  );
};

export default FooterVideo;