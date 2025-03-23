
import React, { useState } from 'react';
import Lightbox from './ui/lightbox';
import { CheckCircle } from 'lucide-react';

const IntroSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  const bulletPoints = [
    "has <strong>a lot of blind spots</strong>", 
    "affects <strong>all aspects of life</strong>", 
    "has <strong>unique and specific needs</strong>"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-5xl font-bold mb-3 animate-fade-in font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
            Relocation needs 360° support
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 mb-5 animate-slide-up">since it:</p>
          
          <div className="space-y-3 mb-6">
            {bulletPoints.map((point, index) => (
              <div key={index} className="flex items-center justify-center gap-2 animate-slide-up" style={{
                animationDelay: `${index * 150}ms`
              }}>
                <CheckCircle className="w-5 h-5 text-[#2C5AAE]" />
                <p className="text-md md:text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: point }}></p>
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
        <div 
          className="fixed inset-0 z-[100] animate-fade-in" 
          style={{ animationDuration: '100ms' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowVideo(false);
            }
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative w-full h-full overflow-auto">
            <button
              onClick={() => setShowVideo(false)}
              className="fixed top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors hover:scale-110"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
              <video
                autoPlay
                controls
                className="w-full h-auto"
                src="https://www.app.ocean-il.co.il/wp-content/uploads/2023/04/relocation-explainer-new-1.mp4"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default IntroSection;
