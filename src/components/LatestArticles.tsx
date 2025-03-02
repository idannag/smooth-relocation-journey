
import { ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import { useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Lightbox from './ui/lightbox';

const UsefulInfo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState("");
  
  const newsArticles = [{
    title: "Latest Relocation Trends",
    excerpt: "Stay updated with the most recent developments in global relocation...",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    link: "#"
  }, {
    title: "Industry Updates",
    excerpt: "Important changes and updates in the relocation industry...",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    link: "#"
  }, {
    title: "Global Mobility News",
    excerpt: "Latest insights into international mobility and expatriate trends...",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    link: "#"
  }, {
    title: "Policy Changes",
    excerpt: "Recent updates in immigration and relocation policies worldwide...",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca",
    link: "#"
  }, {
    title: "Real Estate Market Analysis",
    excerpt: "Understanding property trends in popular expatriate destinations...",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    link: "#"
  }, {
    title: "Education Systems Comparison",
    excerpt: "Comparing international education standards for relocating families...",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    link: "#"
  }];
  
  const guides = [{
    title: "Complete Guide to Moving Abroad",
    excerpt: "Everything you need to know about international relocation...",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    link: "#"
  }, {
    title: "Education System Guide",
    excerpt: "Understanding different education systems worldwide...",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    link: "#"
  }, {
    title: "Housing Search Tips",
    excerpt: "How to find the perfect home in your new location...",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    link: "#"
  }, {
    title: "Cultural Adjustment Guide",
    excerpt: "Tips for adapting to new cultural environments...",
    image: "https://images.unsplash.com/photo-1526560244967-61d7fee7f04b",
    link: "#"
  }, {
    title: "Healthcare Systems Worldwide",
    excerpt: "Understanding healthcare access in different countries...",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
    link: "#"
  }, {
    title: "Language Learning Resources",
    excerpt: "Best tools and methods for learning a new language...",
    image: "https://images.unsplash.com/photo-1546607270-2dd9c4326cd7",
    link: "#"
  }];
  
  const tools = [{
    title: "Cost of Living Calculator",
    excerpt: "Compare living costs between different cities...",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    link: "#"
  }, {
    title: "Relocation Budget Planner",
    excerpt: "Plan your relocation expenses effectively...",
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
    link: "#"
  }, {
    title: "School Finder Tool",
    excerpt: "Find the best schools in your new location...",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    link: "#"
  }, {
    title: "Visa Requirements Checker",
    excerpt: "Quickly check visa requirements for your destination...",
    image: "https://images.unsplash.com/photo-1620428268482-cf1851a383b0",
    link: "#"
  }, {
    title: "Language Translator",
    excerpt: "Essential tool for communication in a new country...",
    image: "https://images.unsplash.com/photo-1528402671154-7c65a45f21b9",
    link: "#"
  }, {
    title: "Moving Checklist Generator",
    excerpt: "Create a customized moving checklist for your relocation...",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
    link: "#"
  }];
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  const renderArticles = (articles: typeof newsArticles) => (
    <div className="relative group">
      <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg">
        <ChevronLeft className="w-5 h-5 text-[#2C5AAE]" />
      </button>
      
      <div ref={scrollRef} className="flex overflow-x-auto gap-4 pb-4 px-4 snap-x snap-mandatory scrollbar-hide" style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {articles.map((article, index) => (
          <div 
            key={index} 
            className="flex-none w-60 snap-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in group cursor-pointer"
            onClick={() => {
              setSelectedArticle(article.title);
              setShowLightbox(true);
            }}
          >
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold mb-1 line-clamp-1">{article.title}</h3>
              <p className="text-gray-600 text-xs mb-2 line-clamp-2">{article.excerpt}</p>
              <span className="inline-flex items-center text-[#2C5AAE] text-xs font-medium hover:text-[#40E0D0] transition-colors">
                Read more →
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg">
        <ChevronRight className="w-5 h-5 text-[#2C5AAE]" />
      </button>
    </div>
  );
  
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
          Useful Information
        </h2>
        
        <Tabs defaultValue="news" className="w-full">
          <TabsList className="flex justify-center mb-8 bg-white/50 backdrop-blur-sm p-1 rounded-full mx-auto max-w-md">
            <TabsTrigger value="news" className="px-6 py-2 rounded-full data-[state=active]:bg-[#2C5AAE] data-[state=active]:text-white transition-all">
              News
            </TabsTrigger>
            <TabsTrigger value="guides" className="px-6 py-2 rounded-full data-[state=active]:bg-[#2C5AAE] data-[state=active]:text-white transition-all">
              Guides
            </TabsTrigger>
            <TabsTrigger value="tools" className="px-6 py-2 rounded-full data-[state=active]:bg-[#2C5AAE] data-[state=active]:text-white transition-all">
              Tools
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="news" className="animate-fade-in">
            {renderArticles(newsArticles)}
          </TabsContent>
          
          <TabsContent value="guides" className="animate-fade-in">
            {renderArticles(guides)}
          </TabsContent>
          
          <TabsContent value="tools" className="animate-fade-in">
            {renderArticles(tools)}
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <button onClick={() => {
            if ('Notification' in window) {
              Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                  console.log("Push notification permission granted");
                }
              });
            }
          }} className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm">
            <Bell className="w-4 h-4 mr-1" />
            <span className="font-medium">Be the first to get exciting news</span>
          </button>
        </div>
      </div>

      {showLightbox && (
        <Lightbox 
          url={`article:${selectedArticle}`}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </section>
  );
};

export default UsefulInfo;
