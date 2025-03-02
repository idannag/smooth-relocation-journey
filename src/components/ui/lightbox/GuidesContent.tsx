
const GuidesContent = () => {
  const guides = [
    {
      title: "Complete Relocation Checklist",
      category: "Planning",
      excerpt: "A comprehensive guide to planning your international move, from six months before departure to your first week in your new home.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b"
    },
    {
      title: "Navigating International Schools",
      category: "Education",
      excerpt: "How to research, apply for, and select the right international school for your children when relocating abroad.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
    },
    {
      title: "Managing Finances Across Borders",
      category: "Finance",
      excerpt: "Essential tips for managing bank accounts, taxes, investments, and daily expenses when living as an expatriate.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f"
    },
    {
      title: "Cultural Adaptation Strategies",
      category: "Lifestyle",
      excerpt: "Proven techniques to overcome culture shock and integrate more quickly into your new environment.",
      image: "https://images.unsplash.com/photo-1526560244967-61cae296dfbf"
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
        Relocation Guides
      </h2>
      <p className="text-center text-gray-600 mb-8">Expert resources to help you navigate your relocation journey</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img 
              src={guide.image} 
              alt={guide.title} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6">
              <div className="mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {guide.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[#2C5AAE] mb-2">{guide.title}</h3>
              <p className="text-gray-700 mb-4">{guide.excerpt}</p>
              <button className="text-[#2C5AAE] font-medium hover:text-[#40E0D0] transition-colors">
                Read full guide →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuidesContent;
