
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

const Index = () => {
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
    </div>
  );
};

export default Index;
