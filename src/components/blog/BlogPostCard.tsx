
import React from 'react';
import { Tag } from 'lucide-react';
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
import { 
  WordPressPost, 
  getFeaturedImageUrl,
  getPostCategories
} from '@/services/postsService';

interface BlogPostCardProps {
  post: WordPressPost;
  onClick: (postId: number) => void;
}

const BlogPostCard = ({ post, onClick }: BlogPostCardProps) => {
  const featuredImage = getFeaturedImageUrl(post);
  const postCategories = getPostCategories(post);
  
  // Function to strip HTML tags from excerpt
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };
  
  const excerpt = stripHtml(post.excerpt.rendered).substring(0, 120) + '...';
  
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={featuredImage} 
          alt={post.title.rendered}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-2">
          {post.title.rendered}
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {postCategories.map(cat => (
            <Badge key={cat.id} variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
              <Tag className="w-3 h-3 mr-1" />
              {cat.name}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <CardDescription className="line-clamp-3">
          {excerpt}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="text-[#2C5AAE] hover:text-[#40E0D0] transition-colors"
          onClick={() => onClick(post.id)}
        >
          Read more
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
