
import React from 'react';
import BlogPostCard from './BlogPostCard';
import { Button } from "@/components/ui/button";
import { WordPressPost } from '@/services/postsService';
import { Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface BlogPostGridProps {
  posts: WordPressPost[];
  hasMorePosts?: boolean;
  isLoadingMore?: boolean;
  onPostClick: (postId: number) => void;
  onLoadMore?: () => void;
  onClearFilters?: () => void;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  simplifiedCards?: boolean;
}

const BlogPostGrid = ({
  posts,
  hasMorePosts,
  isLoadingMore,
  onPostClick,
  onLoadMore,
  onClearFilters,
  totalPages,
  currentPage,
  onPageChange,
  simplifiedCards = false
}: BlogPostGridProps) => {
  const location = useLocation();
  const isLightboxView = location.pathname === '/blog' || (location.search && location.search.includes('lightbox=true'));
  
  // If there are no posts, show a message
  if (posts.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-700 mb-4">No articles found with the current filters.</p>
        {onClearFilters && (
          <Button 
            onClick={onClearFilters}
            variant="outline"
            size="sm"
          >
            Clear Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <BlogPostCard 
            key={post.id} 
            post={post} 
            onClick={() => onPostClick(post.id)} 
            simplified={simplifiedCards}
          />
        ))}
      </div>
      
      {/* Pagination Controls - only show in lightbox view */}
      {totalPages > 1 && isLightboxView && (
        <nav className="mt-8">
          <ul className="flex flex-wrap justify-center gap-2">
            {/* Previous Page Button */}
            <li>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3"
              >
                &laquo;
              </Button>
            </li>
            
            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page}>
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className={`px-3 ${
                    currentPage === page 
                      ? "bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white" 
                      : ""
                  }`}
                >
                  {page}
                </Button>
              </li>
            ))}
            
            {/* Next Page Button */}
            <li>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3"
              >
                &raquo;
              </Button>
            </li>
          </ul>
        </nav>
      )}
      
      {/* "Load More" Button removed completely */}
    </div>
  );
};

export default BlogPostGrid;
