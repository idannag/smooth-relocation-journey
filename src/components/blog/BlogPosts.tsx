
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Tag, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BlogPostsSkeleton from './BlogPostsSkeleton';
import { 
  usePosts, 
  useCategories, 
  WordPressPost, 
  WordPressCategory,
  getFeaturedImageUrl,
  getPostCategories,
  createMarkup
} from '@/services/postsService';

const BlogPosts = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<WordPressPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Fetch posts
  const { 
    data: latestPosts, 
    isLoading: postsLoading, 
    isError: postsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = usePosts(page);
  
  // Fetch categories
  const { 
    data: categories, 
    isLoading: categoriesLoading 
  } = useCategories();
  
  // Update all posts when new data arrives
  useEffect(() => {
    if (latestPosts) {
      setAllPosts(prev => {
        // If it's page 1, replace the array, otherwise append
        if (page === 1) return [...latestPosts];
        return [...prev, ...latestPosts];
      });
    }
  }, [latestPosts, page]);
  
  // Handle "Load More" button click
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };
  
  // Filter posts based on search term and selected category
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.rendered.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || 
      (post.categories && post.categories.includes(parseInt(selectedCategory)));
    
    return matchesSearch && matchesCategory;
  });
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle category selection change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };
  
  // Navigate to single post page
  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };
  
  // Function to strip HTML tags from excerpt
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };
  
  // Show loading skeleton
  if (postsLoading && page === 1) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent mb-8">
            Ocean Blog
          </h2>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10"
                placeholder="Search articles..."
                disabled
              />
            </div>
            <Select disabled>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
            </Select>
          </div>
        </div>
        <BlogPostsSkeleton />
      </div>
    );
  }
  
  // Show error message
  if (postsError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-bold text-center font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent mb-8">
          Ocean Blog
        </h2>
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          <p>Error loading blog posts. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent mb-8">
          Ocean Blog
        </h2>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories?.map(category => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name} ({category.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredPosts.map(post => {
              const featuredImage = getFeaturedImageUrl(post);
              const postCategories = getPostCategories(post);
              const excerpt = stripHtml(post.excerpt.rendered).substring(0, 120) + '...';
              
              return (
                <Card key={post.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={featuredImage} 
                      alt={post.title.rendered}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-2">
                      {post.title.rendered}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {postCategories.map(cat => (
                        <Badge key={cat.id} variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                          <Tag className="w-3 h-3 mr-1" />
                          {cat.name}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="py-2 flex-grow">
                    <CardDescription className="line-clamp-3">
                      {excerpt}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="text-[#2C5AAE] hover:text-[#40E0D0] transition-colors"
                      onClick={() => handlePostClick(post.id)}
                    >
                      Read more
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No posts found matching your criteria.</p>
            {searchTerm || selectedCategory ? (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
              >
                Clear filters
              </Button>
            ) : null}
          </div>
        )}
        
        {/* Load More Button */}
        {filteredPosts.length > 0 && latestPosts && latestPosts.length >= 6 && (
          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleLoadMore}
              disabled={isFetchingNextPage}
              className="bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white"
            >
              {isFetchingNextPage ? 'Loading...' : 'Load More'}
              {isFetchingNextPage && <ChevronDown className="ml-2 animate-bounce" />}
            </Button>
          </div>
        )}
        
        {/* Loading more posts indicator */}
        {isFetchingNextPage && (
          <div className="mt-8">
            <BlogPostsSkeleton />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPosts;
