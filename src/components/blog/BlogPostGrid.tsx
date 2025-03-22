
import React from 'react';
import { WordPressPost } from '@/services/postsService';
import BlogPostCard from './BlogPostCard';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BlogPostGridProps {
  posts: WordPressPost[];
  hasMorePosts: boolean;
  isLoadingMore: boolean;
  onPostClick: (postId: number) => void;
  onLoadMore: () => void;
  onClearFilters?: () => void;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  limit?: number;
}

const BlogPostGrid = ({
  posts,
  hasMorePosts,
  isLoadingMore,
  onPostClick,
  onLoadMore,
  onClearFilters,
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  limit
}: BlogPostGridProps) => {
  const displayPosts = limit ? posts.slice(0, limit) : posts;
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No posts found matching your criteria.</p>
        {onClearFilters && (
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={onClearFilters}
          >
            Clear filters
          </Button>
        )}
      </div>
    );
  }
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {displayPosts.map(post => (
          <BlogPostCard 
            key={post.id} 
            post={post} 
            onClick={onPostClick}
          />
        ))}
      </div>
      
      {/* Pagination - Only show if we have page navigation functionality */}
      {onPageChange && totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              // Calculate which page numbers to show
              let pageNum = i + 1;
              if (totalPages > 5) {
                if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
              }
              
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink 
                    isActive={pageNum === currentPage}
                    onClick={() => onPageChange(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      
      {/* Load More Button - Only show when using infinite loading */}
      {hasMorePosts && !onPageChange && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white hover:opacity-90"
          >
            {isLoadingMore ? 'Loading...' : 'Load More'}
            {isLoadingMore ? <ChevronRight className="ml-2 animate-bounce" /> : <ChevronRight className="ml-2" />}
          </Button>
        </div>
      )}
    </>
  );
};

export default BlogPostGrid;
