import { ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import { useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UsefulInfo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const newsArticles = [
    {
      title: "Latest Relocation Trends",
      excerpt: "Stay updated with the most recent developments in global relocation...",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      link: "#"
    },
    {
      title: "Industry Updates",
      excerpt: "Important changes and updates in the relocation industry...",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      link: "#"
    }
  ];

  const guides = [
    {
      title: "Complete Guide to Moving Abroad",
      excerpt: "Everything you need to know about international relocation...",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      link: "#"
    },
    {
      title: "Education System Guide",
      excerpt: "Understanding different education systems worldwide...",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      link: "#"
    }
  ];

  const tools = [
    {
      title: "Cost of Living Calculator",
      excerpt: "Compare living costs between different cities...",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      link: "#"
    },
    {
      title: "Relocation Budget Planner",
      excerpt: "Plan your relocation expenses effectively...",
      image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
      link: "#"
    }
  ];

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
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>
      
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {articles.map((article, index) => (
          <div
            key={index}
            className="flex-none w-72 snap-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in group"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-1">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
              <a
                href={article.link}
                className="inline-flex items-center text-primary text-sm font-medium hover:text-secondary transition-colors"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 font-inter bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] bg-clip-text text-transparent">
          Useful Info
        </h2>
        
        <Tabs defaultValue="news" className="w-full">
          <TabsList className="flex justify-center mb-8 bg-white/50 backdrop-blur-sm p-1 rounded-full mx-auto max-w-md">
            <TabsTrigger 
              value="news" 
              className="px-6 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
              News
            </TabsTrigger>
            <TabsTrigger 
              value="guides" 
              className="px-6 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
              Guides
            </TabsTrigger>
            <TabsTrigger 
              value="tools" 
              className="px-6 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
            >
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

        <div className="mt-12 text-center">
          <button
            onClick={() => {
              if ('Notification' in window) {
                Notification.requestPermission().then(function(permission) {
                  if (permission === "granted") {
                    console.log("Push notification permission granted");
                  }
                });
              }
            }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-white rounded-full hover:from-[#7C3AED] hover:to-[#C026D3] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:animate-pulse"
          >
            <Bell className="w-5 h-5 mr-2" />
            <span className="font-semibold">Get Instant Updates on New Content!</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default UsefulInfo;
