
interface ArticleDetailProps {
  title: string;
}

const ArticleDetail = ({ title }: ArticleDetailProps) => {
  // Mock article data
  const articleContent = {
    title: title,
    date: "May 15, 2023",
    author: "Ocean Relocation Team",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.</p>
      <p>Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus.</p>
      <h3>Key Points</h3>
      <ul>
        <li>International mobility is changing rapidly post-pandemic</li>
        <li>Remote work policies are affecting relocation decisions</li>
        <li>Housing markets have seen significant shifts in expatriate hubs</li>
        <li>New immigration policies are being introduced in many countries</li>
      </ul>
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet.</p>
      <p>Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit.</p>
    `,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 max-w-4xl mx-auto h-full overflow-y-auto">
      <h2 className="text-3xl font-bold text-center mb-2 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
        {articleContent.title}
      </h2>
      <div className="flex justify-center items-center gap-2 text-gray-600 mb-6">
        <span>{articleContent.date}</span>
        <span>•</span>
        <span>{articleContent.author}</span>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <img 
          src={articleContent.image} 
          alt={articleContent.title} 
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <div 
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: articleContent.content }}
          />
        </div>
        
        <div className="px-6 py-4 bg-gray-50 flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Relocation</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Global Mobility</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Immigration</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Trends</span>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button className="px-6 py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-md font-medium hover:opacity-95 transition-opacity">
          Read More Articles
        </button>
      </div>
    </div>
  );
};

export default ArticleDetail;
