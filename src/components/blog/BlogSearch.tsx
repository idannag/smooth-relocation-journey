
import React, { useRef } from 'react';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WordPressCategory } from '@/services/postsService';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from "@/components/ui/scroll-area";

interface BlogSearchProps {
  searchTerm: string;
  selectedCategory: string;
  categories?: WordPressCategory[];
  categoriesLoading: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (value: string) => void;
  resultsCount?: number;
  totalCount?: number;
}

const BlogSearch = ({
  searchTerm,
  selectedCategory,
  categories,
  categoriesLoading,
  onSearchChange,
  onCategoryChange,
  resultsCount,
  totalCount
}: BlogSearchProps) => {
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          className="pl-10"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        {resultsCount !== undefined && (
          <div>
            {resultsCount} article{resultsCount !== 1 ? 's' : ''} found
            {totalCount !== undefined && selectedCategory !== 'all' && (
              <span> (out of {totalCount} total)</span>
            )}
          </div>
        )}
      </div>
      
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-sm h-7 w-7"
          onClick={scrollLeft}
        >
          <ChevronLeft size={18} />
        </Button>
        
        <ScrollArea 
          className="w-full px-8"
          orientation="horizontal"
        >
          <div 
            ref={scrollContainerRef}
            className="flex gap-1.5 py-2 px-2 overflow-x-auto scrollbar-hide whitespace-nowrap"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <Badge 
              variant={selectedCategory === 'all' ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 flex-shrink-0 ${selectedCategory === 'all' ? 'bg-[#2C5AAE] hover:bg-[#40E0D0]' : 'hover:bg-gray-100'} ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1'} rounded-full shadow-sm hover:shadow`}
              onClick={() => onCategoryChange('all')}
            >
              All ({totalCount})
            </Badge>
            
            {categoriesLoading ? (
              <div className="flex gap-1.5">
                {[1, 2, 3].map(i => (
                  <Badge key={i} variant="outline" className="bg-gray-100 animate-pulse px-2 py-1 rounded-full text-xs flex-shrink-0">
                    Loading...
                  </Badge>
                ))}
              </div>
            ) : (
              categories?.map(category => (
                <Badge 
                  key={category.id} 
                  variant={selectedCategory === category.id.toString() ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 flex-shrink-0 ${selectedCategory === category.id.toString() ? 'bg-[#2C5AAE] hover:bg-[#40E0D0]' : 'hover:bg-gray-100'} ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1'} rounded-full flex items-center shadow-sm hover:shadow`}
                  onClick={() => onCategoryChange(category.id.toString())}
                >
                  {category.name} ({category.count})
                  {selectedCategory === category.id.toString() && (
                    <X className="ml-1 w-3 h-3" onClick={(e) => {
                      e.stopPropagation();
                      onCategoryChange('all');
                    }} />
                  )}
                </Badge>
              ))
            )}
          </div>
        </ScrollArea>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-sm h-7 w-7"
          onClick={scrollRight}
        >
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
};

export default BlogSearch;
