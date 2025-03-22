
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { WordPressCategory } from '@/services/postsService';

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
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          className="pl-10"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {resultsCount !== undefined && (
            <>
              {resultsCount} article{resultsCount !== 1 ? 's' : ''} found
              {totalCount !== undefined && selectedCategory !== 'all' && (
                <span> (out of {totalCount} total)</span>
              )}
            </>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-2">
        <Badge 
          variant={selectedCategory === 'all' ? "default" : "outline"}
          className={`cursor-pointer transition-all duration-200 ${selectedCategory === 'all' ? 'bg-[#2C5AAE] hover:bg-[#40E0D0]' : 'hover:bg-gray-100'} px-4 py-2 rounded-full shadow-sm hover:shadow`}
          onClick={() => onCategoryChange('all')}
        >
          All Categories ({totalCount})
        </Badge>
        
        {categoriesLoading ? (
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <Badge key={i} variant="outline" className="bg-gray-100 animate-pulse px-4 py-2 rounded-full">
                Loading...
              </Badge>
            ))}
          </div>
        ) : (
          categories?.map(category => (
            <Badge 
              key={category.id} 
              variant={selectedCategory === category.id.toString() ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 ${selectedCategory === category.id.toString() ? 'bg-[#2C5AAE] hover:bg-[#40E0D0]' : 'hover:bg-gray-100'} px-4 py-2 rounded-full flex items-center shadow-sm hover:shadow`}
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
    </div>
  );
};

export default BlogSearch;
