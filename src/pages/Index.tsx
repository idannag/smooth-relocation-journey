
import { useEffect } from 'react';
import Header from '../components/Header';
import VideoHero from '../components/VideoHero';
import IntroSection from '../components/IntroSection';
import Statistics from '../components/Statistics';
import Testimonials from '../components/Testimonials';
import Associates from '../components/Associates';
import PopularDestinations from '../components/PopularDestinations';
import UsefulInfo from '../components/LatestArticles';
import FooterVideo from '../components/FooterVideo';
import BottomNav from '../components/BottomNav';
import SplashScreen from '../components/SplashScreen';
import Lightbox from '../components/ui/lightbox';

interface IndexProps {
  initialSection?: 'blog' | 'news' | 'services' | 'destinations' | 'chatbot' | 'time-currency';
}

const Index = ({ initialSection }: IndexProps = {}) => {
  useEffect(() => {
    // If an initial section is specified, open the appropriate lightbox
    if (initialSection) {
      // Small timeout to ensure the page has loaded
      const timer = setTimeout(() => {
        const url = initialSectionToUrl(initialSection);
        if (url) {
          // Show the appropriate lightbox content
          const lightboxElement = document.createElement('div');
          lightboxElement.id = 'dynamic-lightbox';
          document.body.appendChild(lightboxElement);
          
          const root = document.getElementById('root');
          if (root) {
            root.style.overflow = 'hidden';
          }
          
          const handleClose = () => {
            document.body.removeChild(lightboxElement);
            if (root) {
              root.style.overflow = '';
            }
            window.history.pushState({}, '', '/');
          };
          
          // Create and render the lightbox
          const lightbox = <Lightbox url={url} onClose={handleClose} />;
          // We'd typically use ReactDOM.render here, but since we're in a React component,
          // we'll need a different approach in a real implementation
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [initialSection]);
  
  // Convert section name to lightbox URL
  const initialSectionToUrl = (section: string): string => {
    switch(section) {
      case 'blog':
      case 'news':
        return 'news';
      case 'services':
        return 'services';
      case 'destinations':
        return 'destinations';
      case 'chatbot':
        return 'chatbot';
      case 'time-currency':
        return 'time-currency';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen font-poppins">
      <SplashScreen />
      <Header />
      <VideoHero />
      <IntroSection />
      <UsefulInfo />
      <PopularDestinations />
      <Statistics />
      <Testimonials />
      <Associates />
      <FooterVideo />
      <BottomNav />
      
      {/* Conditionally render the lightbox if initialSection is provided */}
      {initialSection && (
        <Lightbox 
          url={initialSectionToUrl(initialSection)} 
          onClose={() => window.history.pushState({}, '', '/')} 
        />
      )}
    </div>
  );
};

export default Index;
