
import { useState } from "react";
import Lightbox from "./ui/lightbox";

const FooterVideo = () => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState("");

  const handleLegalClick = (url: string) => {
    setLightboxUrl(url);
    setShowLightbox(true);
  };

  return (
    <>
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
        <div className="absolute inset-0 backdrop-blur-[1px] bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C5AAE]/30 to-transparent backdrop-blur-[1px]" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg md:text-xl mb-8 animate-slide-up text-white">Let us guide you through your relocation adventure</p>
        </div>
      </section>
      
      <footer className="bg-gray-800 text-white py-2 text-center text-xs">
        <div className="container mx-auto flex flex-wrap justify-center items-center">
          <div className="flex space-x-4 mb-1">
            <button 
              onClick={() => handleLegalClick('https://www.app.ocean-il.co.il/term-and-condition/')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
            <button 
              onClick={() => handleLegalClick('https://www.app.ocean-il.co.il/privacy-policy/')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
          </div>
          <div className="w-full text-gray-400">
            Built with ❤️ by <a 
              href="https://autodigital.agency" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              AutoDigital
            </a>
          </div>
        </div>
      </footer>
      
      {showLightbox && (
        <Lightbox 
          url={lightboxUrl}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </>
  );
};

export default FooterVideo;
