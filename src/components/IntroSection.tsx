
import React, { useState } from 'react';
import Lightbox from './ui/lightbox';

const IntroSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in font-inter bg-gradient-to-r from-[#40E0D0] to-[#89CFF0] bg-clip-text text-transparent">
            Relocation is a complex journey
          </h2>
          <p className="text-xl md:text-2xl mb-6 animate-slide-up text-gray-700">
            Therefore, it needs 360° support
          </p>
          <button
            onClick={() => setShowVideo(true)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#40E0D0] to-[#89CFF0] text-white font-semibold 
            hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-slide-up delay-150"
          >
            Watch our unique way
          </button>
        </div>
      </div>

      {showVideo && (
        <Lightbox
          url="https://www.app.ocean-il.co.il/wp-content/uploads/2023/04/relocation-explainer-new-1.mp4"
          onClose={() => setShowVideo(false)}
        />
      )}
    </section>
  );
};

export default IntroSection;
