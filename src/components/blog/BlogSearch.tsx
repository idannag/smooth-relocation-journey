
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { WordPressCategory } from '@/services/postsService';

interface BlogSearchProps {
  searchTerm: string;
  selectedCategory: string;
  categories?: WordPressCategory[];
  categoriesLoading: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (value: string) => void;
}

const BlogSearch = ({
  searchTerm,
  selectedCategory,
  categories,
  categoriesLoading,
  onSearchChange,
  onCategoryChange
}: BlogSearchProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          className="pl-10"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <Select value={selectedCategory} onValueChange={onCategoryChange} disabled={categoriesLoading}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories?.map(category => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name} ({category.count})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BlogSearch;
