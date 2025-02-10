
import Header from '../components/Header';
import VideoHero from '../components/VideoHero';
import IntroSection from '../components/IntroSection';
import Statistics from '../components/Statistics';
import LifecycleCircle from '../components/LifecycleCircle';
import Testimonials from '../components/Testimonials';
import Associates from '../components/Associates';
import PopularDestinations from '../components/PopularDestinations';
import UsefulInfo from '../components/LatestArticles';
import FooterVideo from '../components/FooterVideo';
import BottomNav from '../components/BottomNav';
import SplashScreen from '../components/SplashScreen';
import TimeStrip from '../components/TimeStrip';
import CurrencyStrip from '../components/CurrencyStrip';

const Index = () => {
  return (
    <div className="min-h-screen font-poppins">
      <SplashScreen />
      <Header />
      <div className="fixed top-16 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <TimeStrip />
          <CurrencyStrip />
        </div>
      </div>
      <VideoHero />
      <IntroSection />
      <UsefulInfo />
      <PopularDestinations />
      <LifecycleCircle />
      <Statistics />
      <Testimonials />
      <Associates />
      <FooterVideo />
      <BottomNav />
    </div>
  );
};

export default Index;
