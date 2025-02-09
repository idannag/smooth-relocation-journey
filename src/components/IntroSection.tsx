
import React from 'react';

const IntroSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in font-inter bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] bg-clip-text text-transparent">
            Relocation is a complex journey
          </h2>
          <p className="text-xl md:text-2xl mb-6 animate-slide-up text-gray-700">
            Therefore, it needs 360° support
          </p>
          <p className="text-lg animate-slide-up delay-150 text-gray-600 mb-8">
            Watch our unique way
          </p>
          <div className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <video
              controls
              className="w-full aspect-video object-cover"
              poster="https://www.app.ocean-il.co.il/wp-content/uploads/2025/01/test.png"
            >
              <source src="https://www.app.ocean-il.co.il/wp-content/uploads/2023/04/relocation-explainer-new-1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
