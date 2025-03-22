
import React from 'react';
import { WordPressPost } from '@/services/postsService';
import BlogPostCard from './BlogPostCard';
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';

interface BlogPostGridProps {
  posts: WordPressPost[];
  hasMorePosts: boolean;
  isLoadingMore: boolean;
  onPostClick: (postId: number) => void;
  onLoadMore: () => void;
  onClearFilters?: () => void;
}

const BlogPostGrid = ({
  posts,
  hasMorePosts,
  isLoadingMore,
  onPostClick,
  onLoadMore,
  onClearFilters
}: BlogPostGridProps) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {posts.map(post => (
          <BlogPostCard 
            key={post.id} 
            post={post} 
            onClick={onPostClick}
          />
        ))}
      </div>
      
      {hasMorePosts && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white"
          >
            {isLoadingMore ? 'Loading...' : 'Load More'}
            {isLoadingMore && <ChevronDown className="ml-2 animate-bounce" />}
          </Button>
        </div>
      )}
    </>
  );
};

export default BlogPostGrid;
