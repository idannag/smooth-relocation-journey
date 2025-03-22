
import React from 'react';
import { Tag, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  WordPressPost, 
  getFeaturedImageUrl,
  getPostCategories,
  createMarkup
} from '@/services/postsService';

interface BlogPostCardProps {
  post: WordPressPost;
  onClick: (postId: number) => void;
}

const BlogPostCard = ({ post, onClick }: BlogPostCardProps) => {
  const featuredImage = getFeaturedImageUrl(post);
  const postCategories = getPostCategories(post);
  
  // Function to strip HTML tags and decode entities from excerpt
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };
  
  const excerpt = stripHtml(post.excerpt.rendered).substring(0, 100) + '...';
  
  // Format the date
  const formattedDate = format(parseISO(post.date), 'MMM d, yyyy');
  
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden group cursor-pointer" onClick={() => onClick(post.id)}>
      <Link to={`/post/${post.id}`} className="h-full flex flex-col">
        <div className="h-36 overflow-hidden">
          <img 
            src={featuredImage} 
            alt={post.title.rendered}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
          <CardTitle className="text-base font-semibold line-clamp-2">
            <div dangerouslySetInnerHTML={createMarkup(post.title.rendered)} />
          </CardTitle>
          <div className="flex flex-wrap gap-1 mt-2">
            {postCategories.slice(0, 2).map(cat => (
              <Badge key={cat.id} variant="outline" className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100">
                <Tag className="w-3 h-3 mr-1" />
                {cat.name}
              </Badge>
            ))}
            {postCategories.length > 2 && (
              <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700">
                +{postCategories.length - 2}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="py-2 px-4 flex-grow">
          <CardDescription className="text-xs line-clamp-3">
            {excerpt}
          </CardDescription>
        </CardContent>
        <CardFooter className="pt-0 pb-4 px-4">
          <Button 
            variant="outline" 
            size="sm"
            className="text-[#2C5AAE] hover:text-white hover:bg-[#2C5AAE] transition-colors w-full group-hover:bg-[#2C5AAE] group-hover:text-white"
          >
            Read more
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default BlogPostCard;
