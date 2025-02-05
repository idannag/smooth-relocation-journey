import Header from '../components/Header';
import VideoHero from '../components/VideoHero';
import IntroSection from '../components/IntroSection';
import Statistics from '../components/Statistics';
import LifecycleCircle from '../components/LifecycleCircle';
import Testimonials from '../components/Testimonials';
import PopularDestinations from '../components/PopularDestinations';
import LatestArticles from '../components/LatestArticles';
import FooterVideo from '../components/FooterVideo';
import BottomNav from '../components/BottomNav';

const Index = () => {
  return (
    <div className="min-h-screen font-inter">
      <Header />
      <VideoHero />
      <IntroSection />
      <Statistics />
      <LifecycleCircle />
      <Testimonials />
      <PopularDestinations />
      <LatestArticles />
      <FooterVideo />
      <div className="pb-32">
        {/* Space for bottom navigation */}
      </div>
      <BottomNav />
    </div>
  );
};

export default Index;