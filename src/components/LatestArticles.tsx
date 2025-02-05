import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const LatestArticles = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const articles = [
    {
      title: "Guide to International Schools",
      excerpt: "Everything you need to know about choosing the right school for your children abroad...",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      link: "#"
    },
    {
      title: "Housing Market Insights",
      excerpt: "Latest trends and tips for finding your perfect home in a new country...",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      link: "#"
    },
    {
      title: "Visa Application Process",
      excerpt: "Step-by-step guide to securing your visa successfully in different countries...",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      link: "#"
    },
    {
      title: "Cultural Adaptation Tips",
      excerpt: "How to embrace and adapt to your new cultural environment...",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      link: "#"
    },
    {
      title: "Healthcare Systems Worldwide",
      excerpt: "Understanding healthcare access and insurance in popular destinations...",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      link: "#"
    },
    {
      title: "Banking & Finance Abroad",
      excerpt: "Essential guide to managing your finances in a new country...",
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

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-inter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Latest Articles
        </h2>
        
        <div className="relative group">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {articles.map((article, index) => (
              <div
                key={index}
                className="flex-none w-80 snap-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in group"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                  <a
                    href={article.link}
                    className="text-primary font-medium hover:text-secondary transition-colors"
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
      </div>
    </section>
  );
};

export default LatestArticles;