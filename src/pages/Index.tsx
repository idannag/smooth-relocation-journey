
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  initialSection?: 'blog' | 'news' | 'services' | 'destinations' | 'chatbot' | 'time-currency' | 
                  'cost-calculator' | 'community' | 'planner' |
                  'consult-relocation' | 'consult-education' | 'consult-real-estate';
}

const Index = ({ initialSection }: IndexProps = {}) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // If an initial section is specified, show the appropriate lightbox
    if (initialSection) {
      const url = initialSectionToUrl(initialSection);
      // We don't need to manually create a lightbox - the component below will handle it
    }
  }, [initialSection, navigate]);
  
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
        return 'https://chatgpt.com/g/g-67b6c40963908191b77e23c6fecc2e57-the-24-7-relocation-life-ai-assistant';
      case 'time-currency':
        return 'time-currency';
      case 'cost-calculator':
        return 'https://ocean-calculator.netlify.app';
      case 'community':
        return 'My Ocean Community';
      case 'planner':
        return 'https://preview--ocean-journey-61.lovable.app/';
      case 'consult-relocation':
        return 'https://www.app.ocean-il.co.il/form/relocation-journey/9/';
      case 'consult-education':
        return 'https://www.app.ocean-il.co.il/education-copy/';
      case 'consult-real-estate':
        return 'https://www.app.ocean-il.co.il/real-estate-copy/';
      default:
        return '';
    }
  };

  // Handle closing the lightbox
  const handleCloseLightbox = () => {
    navigate('/');
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
          onClose={handleCloseLightbox} 
        />
      )}
    </div>
  );
};

export default Index;
