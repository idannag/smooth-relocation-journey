
import React, { useState } from 'react';
import Lightbox from './ui/lightbox';
import { CheckCircle } from 'lucide-react';

const IntroSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  const bulletPoints = [
    "Expert immigration & visa services",
    "Housing search & relocation logistics",
    "Cultural integration & local support"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
            Relocation needs 360° support
          </h2>
          
          <div className="space-y-3 mb-6">
            {bulletPoints.map((point, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center gap-2 animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CheckCircle className="w-5 h-5 text-[#2C5AAE]" />
                <p className="text-md md:text-lg text-gray-700">{point}</p>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => setShowVideo(true)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white font-semibold 
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
