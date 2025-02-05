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

const LatestArticles = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-poppins">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 animate-fade-in"
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