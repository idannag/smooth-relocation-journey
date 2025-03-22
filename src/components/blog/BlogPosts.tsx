
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogSearch from './BlogSearch';
import BlogPostGrid from './BlogPostGrid';
import BlogPostsSkeleton from './BlogPostsSkeleton';
import { 
  usePosts, 
  useCategories, 
  WordPressPost
} from '@/services/postsService';

const BlogPosts = () => {
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState<WordPressPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Fetch posts using infinite query
  const { 
    data, 
    isLoading: postsLoading, 
    isError: postsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = usePosts();
  
  // Fetch categories
  const { 
    data: categories, 
    isLoading: categoriesLoading 
  } = useCategories();
  
  // Update all posts when new data arrives
  useEffect(() => {
    if (data?.pages) {
      const posts = data.pages.flat() as WordPressPost[];
      setAllPosts(posts);
    }
  }, [data]);
  
  // Filter posts based on search term and selected category
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.rendered.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
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
  
  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };
  
  // Show loading skeleton
  if (postsLoading && !isFetchingNextPage) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent mb-8">
            Ocean Blog
          </h2>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <BlogSearch
                searchTerm=""
                selectedCategory="all"
                categoriesLoading={true}
                onSearchChange={() => {}}
                onCategoryChange={() => {}}
              />
            </div>
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
        <BlogSearch
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          categories={categories}
          categoriesLoading={categoriesLoading}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        />
        
        {/* Posts Grid */}
        <BlogPostGrid
          posts={filteredPosts}
          hasMorePosts={!!hasNextPage}
          isLoadingMore={isFetchingNextPage}
          onPostClick={handlePostClick}
          onLoadMore={() => fetchNextPage()}
          onClearFilters={searchTerm || selectedCategory !== 'all' ? handleClearFilters : undefined}
        />
        
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
