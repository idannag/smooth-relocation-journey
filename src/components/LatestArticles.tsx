const LatestArticles = () => {
const articles = [
  {
    title: "Guide to International Schools",
    excerpt: "Everything you need to know about choosing the right school...",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    link: "#"
  },
  {
    title: "Housing Market Insights",
    excerpt: "Latest trends and tips for finding your perfect home abroad...",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    link: "#"
  },
  {
    title: "Visa Application Process",
    excerpt: "Step-by-step guide to securing your visa successfully...",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    link: "#"
  }
];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-poppins bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Latest Articles</h2>
        <div className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory">
          {articles.map((article, index) => (
            <div
              key={index}
              className="flex-none w-80 snap-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 animate-fade-in"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <a
                  href={article.link}
                  className="text-primary font-medium hover:underline"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
