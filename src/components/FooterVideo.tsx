import { useState } from "react";
import Lightbox from "./ui/lightbox";
const FooterVideo = () => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState("");
  const handleLegalClick = (url: string) => {
    setLightboxUrl(url);
    setShowLightbox(true);
  };
  return <>
      <section className="relative h-[50vh] overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="https://www.app.ocean-il.co.il/wp-content/uploads/2022/10/Brooklyn.m4v" type="video/mp4" />
        </video>
        <div className="absolute inset-0 backdrop-blur-[1px] bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C5AAE]/30 to-transparent backdrop-blur-[1px]" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-20 md:pt-0 py-[60px]">
          <h2 className="md:text-4xl font-bold mb-4 animate-fade-in text-white text-3xl">
            Ready to Start Your Journey?
          </h2>
          <p className="md:text-xl mb-8 animate-slide-up text-white text-base">Let us guide you through your relocation adventure</p>
          
          <div className="flex flex-wrap justify-center space-x-2 md:space-x-3 text-[10px] md:text-xs text-white mt-0 py-0 pb-4 md:pb-8">
            <button onClick={() => handleLegalClick('https://www.app.ocean-il.co.il/term-and-condition/')} className="hover:text-white transition-colors font-medium">
              Terms & Conditions
            </button>
            <span>|</span>
            <button onClick={() => handleLegalClick('https://www.app.ocean-il.co.il/privacy-policy/')} className="hover:text-white transition-colors font-medium">
              Privacy Policy
            </button>
            <span>|</span>
            <span className="text-white">
              Built with ❤️ by <a href="https://autodigital.agency" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-medium">
                AutoDigital
              </a>
            </span>
          </div>
        </div>
      </section>
      
      {showLightbox && <Lightbox url={lightboxUrl} onClose={() => setShowLightbox(false)} />}
    </>;
};
export default FooterVideo;