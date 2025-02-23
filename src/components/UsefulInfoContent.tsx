
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export type ContentType = 'news' | 'guides' | 'tools';

interface UsefulInfoContentProps {
  type: ContentType;
}

const UsefulInfoContent = ({ type }: UsefulInfoContentProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
  }];

  const getContent = () => {
    switch (type) {
      case 'news':
        return newsArticles;
      case 'guides':
        return guides;
      case 'tools':
        return tools;
      default:
        return newsArticles;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const content = getContent();

  return (
    <div className="relative group px-4 py-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <button 
        onClick={() => scroll('left')} 
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>
      
      <div 
        ref={scrollRef} 
        className="flex overflow-x-auto gap-6 pb-4 px-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {content.map((item, index) => (
          <div 
            key={index} 
            className="flex-none w-80 snap-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in group"
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="p-4">
              <h3 className="text-base font-semibold mb-2 line-clamp-1">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.excerpt}</p>
              <a 
                href={item.link} 
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
};

export default UsefulInfoContent;
