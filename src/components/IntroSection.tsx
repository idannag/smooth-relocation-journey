const IntroSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
            Relocation is a complex journey
          </h2>
          <p className="text-xl md:text-2xl mb-6 animate-slide-up text-gray-700">
            Therefore, it needs 360° support
          </p>
          <p className="text-lg animate-slide-up delay-150 text-gray-600">
            Watch our unique way
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;