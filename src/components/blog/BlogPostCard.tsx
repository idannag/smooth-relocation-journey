
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
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { 
  WordPressPost, 
  getFeaturedImageUrl,
  getPostCategories,
  createMarkup
} from '@/services/postsService';

interface BlogPostCardProps {
  post: WordPressPost;
  onClick: (postId: number) => void;
  simplified?: boolean;
}

const BlogPostCard = ({ post, onClick, simplified = false }: BlogPostCardProps) => {
  const featuredImage = getFeaturedImageUrl(post);
  const postCategories = getPostCategories(post);
  const location = useLocation();
  
  // Check if we're in the blog lightbox view
  const isLightboxView = location.pathname === '/blog' || location.pathname.startsWith('/post/');
  
  // Format the date
  const formattedDate = format(parseISO(post.date), 'MMM d, yyyy');
  
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden group cursor-pointer bg-white" onClick={() => onClick(post.id)}>
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
          
          {/* Only show categories in lightbox view or when not simplified */}
          {(isLightboxView || !simplified) && (
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
          )}
        </CardHeader>
        
        {/* Only show description in full card mode (not simplified) */}
        {!simplified && (
          <CardContent className="py-2 px-4 flex-grow">
            {/* No excerpt in this version as requested */}
          </CardContent>
        )}
        
        {/* No Read More button as requested */}
        <CardFooter className="pt-0 pb-4 px-4 mt-auto">
          {/* Footer space kept for consistent card height */}
        </CardFooter>
      </Link>
    </Card>
  );
};

export default BlogPostCard;
