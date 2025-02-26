
import LatestArticles from "@/components/LatestArticles";
import Chatbot from "@/components/Chatbot";

interface LightboxProps {
  url: string;
  onClose: () => void;
}

const getLightboxContent = (url: string) => {
  if (url === 'news') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8">
        <h2 className="text-3xl font-bold text-center mb-8 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
          Latest Relocation News
        </h2>
        <LatestArticles />
      </div>
    );
  }
  if (url === 'guides') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8">
        <h2 className="text-3xl font-bold text-center mb-8 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
          Relocation Guides
        </h2>
        <LatestArticles />
      </div>
    );
  }
  if (url === 'chatbot') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
          Your 24/7 Relocation AI Assistant
        </h2>
        <p className="text-center text-gray-600 mb-8">Ask anything about your relocation journey or try one of the suggested questions below</p>
        <Chatbot inLightbox={true} onClose={() => {}} />
      </div>
    );
  }
  return (
    <iframe
      src={url}
      className="w-full h-full"
      loading="eager"
    />
  );
};

const Lightbox = ({ url, onClose }: LightboxProps) => {
  return (
    <div 
      className="fixed inset-0 z-[100] animate-fade-in" 
      style={{ animationDuration: '100ms' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
      />
      <div className="relative w-full h-full overflow-auto">
        <button
          onClick={onClose}
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
        {getLightboxContent(url)}
      </div>
    </div>
  );
};

export default Lightbox;
