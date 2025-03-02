
const NewsContent = () => {
  const newsArticles = [
    {
      title: "New Visa Regulations for Digital Nomads",
      date: "May 15, 2023",
      content: "Several countries have introduced special visa programs for remote workers. These new 'digital nomad visas' allow professionals to legally live and work in a foreign country for extended periods...",
      image: "https://images.unsplash.com/photo-1511376777868-611b54f68947"
    },
    {
      title: "Housing Market Trends in Expatriate Hubs",
      date: "June 3, 2023",
      content: "Major expatriate destinations are experiencing significant shifts in their real estate markets post-pandemic. Cities like Dubai, Singapore, and Berlin have seen increasing demand from international relocators...",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa"
    },
    {
      title: "International Schools Facing High Demand",
      date: "June 20, 2023",
      content: "Popular relocation destinations are reporting record waitlists for international schools. Families planning to relocate should begin the application process as early as possible to secure spots...",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
        Relocation News
      </h2>
      <p className="text-center text-gray-600 mb-8">Stay informed with the latest updates in global mobility</p>
      
      <div className="space-y-6">
        {newsArticles.map((article, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-48 md:h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <h3 className="text-xl font-semibold text-[#2C5AAE] mb-2">{article.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{article.date}</p>
                <p className="text-gray-700 mb-4">{article.content}</p>
                <button className="text-[#2C5AAE] font-medium hover:text-[#40E0D0] transition-colors">
                  Read more →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsContent;
