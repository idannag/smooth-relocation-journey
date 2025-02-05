import Header from '../components/Header';
import VideoHero from '../components/VideoHero';
import Statistics from '../components/Statistics';
import BottomNav from '../components/BottomNav';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <VideoHero />
      <Statistics />
      <div className="pb-16">
        {/* Space for bottom navigation */}
      </div>
      <BottomNav />
    </div>
  );
};

export default Index;