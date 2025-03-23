
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BlogSearch from './BlogSearch';
import BlogPostGrid from './BlogPostGrid';
import BlogPostsSkeleton from './BlogPostsSkeleton';
import { 
  usePosts, 
  useCategories, 
  WordPressPost
} from '@/services/postsService';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

interface BlogPostsProps {
  limitPosts?: number;
  showHeading?: boolean;
  alternativeHeading?: string;
  showSearch?: boolean;
  showAllPostsButton?: boolean;
  postsPerPage?: number;
  simplifiedCards?: boolean;
}

const BlogPosts = ({ 
  limitPosts, 
  showHeading = true, 
  alternativeHeading,
  showSearch = true,
  showAllPostsButton = false,
  postsPerPage = 12,
  simplifiedCards = false
}: BlogPostsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPostPage = location.pathname.startsWith('/post/');
  const isLightboxView = location.pathname === '/blog' || (location.search && location.search.includes('lightbox=true'));
  const [currentPage, setCurrentPage] = useState(1);
  
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
  
  // Calculate total pages - ALWAYS use pagination now instead of "load more"
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };
  
  // Handle category selection change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Reset to first page on category change
  };
  
  // Navigate to single post page
  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  // Show all posts (open blog lightbox)
  const handleShowAllPosts = () => {
    navigate('/blog');
  };
  
  // Show loading skeleton
  if (postsLoading && !isFetchingNextPage) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          {showHeading && (
            <h2 className="text-5xl font-bold text-center font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent mb-8">
              {alternativeHeading || "Ocean Blog"}
            </h2>
          )}
          {showSearch && (
            <div className="flex flex-col gap-4 mb-8">
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
          )}
        </div>
        <BlogPostsSkeleton />
      </div>
    );
  }
  
  // Show error message
  if (postsError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-5xl font-bold text-center font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent mb-8">
          {alternativeHeading || "Ocean Blog"}
        </h2>
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          <p>Error loading blog posts. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Sticky back button for single post pages */}
      {isPostPage && (
        <div className="sticky top-0 z-10 bg-white py-2 mb-4 border-b">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Articles
          </Button>
        </div>
      )}
      
      <div className="mb-8">
        {showHeading && (
          <h2 className="text-5xl font-bold text-center font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent mb-8">
            {alternativeHeading || "Ocean Blog"}
          </h2>
        )}
        
        {/* Search and Filter - Only shown in blog lightbox, not on main page */}
        {showSearch && (
          <BlogSearch
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            categories={categories}
            categoriesLoading={categoriesLoading}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            resultsCount={filteredPosts.length}
            totalCount={allPosts.length}
          />
        )}
        
        {/* Posts Grid with pagination */}
        <BlogPostGrid
          posts={limitPosts ? filteredPosts.slice(0, limitPosts) : currentPosts}
          hasMorePosts={false} // Always use pagination now
          isLoadingMore={false}
          onPostClick={handlePostClick}
          onLoadMore={() => {}} // No longer used
          onClearFilters={searchTerm || selectedCategory !== 'all' ? handleClearFilters : undefined}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange} // Always use pagination
          simplifiedCards={simplifiedCards}
        />
        
        {/* Show All Posts button (only on main page with limited posts) */}
        {showAllPostsButton && limitPosts && filteredPosts.length > limitPosts && (
          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleShowAllPosts}
              className="bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white hover:opacity-90"
            >
              View All Articles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPosts;
