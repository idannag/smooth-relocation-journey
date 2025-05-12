
import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Import types from your services
import { WordPressPost } from '@/services/postsService';

interface BlogPostCardProps {
  post: WordPressPost;
  view?: 'grid' | 'list';
  showExcerpt?: boolean;
  showDate?: boolean;
  showCategory?: boolean;
  showReadMore?: boolean;
  onPostClick?: (postId: number) => void;
  simplified?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
  view = 'grid',
  showExcerpt = true,
  showDate = true,
  showCategory = true,
  showReadMore = true,
  onPostClick
}) => {
  if (!post) {
    return (
      <Card className="w-full h-64 flex flex-col justify-between p-4">
        <Skeleton className="w-full h-4 bg-gray-200 rounded-md mb-2" />
        <Skeleton className="w-3/4 h-4 bg-gray-200 rounded-md mb-4" />
        <Skeleton className="h-24 bg-gray-200 rounded-md" />
        <div className="flex justify-between items-center mt-4">
          <Skeleton className="w-20 h-4 bg-gray-200 rounded-md" />
          <Skeleton className="w-16 h-4 bg-gray-200 rounded-md" />
        </div>
      </Card>
    );
  }

  const cardClasses = `w-full flex flex-col justify-between p-4 ${
    view === 'grid' ? 'h-64' : 'h-auto'
  }`;

  const imageStyle = {
    backgroundImage: `url(${post.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: view === 'grid' ? '120px' : '200px',
  };

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const handleClick = () => {
    if (onPostClick) {
      onPostClick(post.id);
    }
  };

  return (
    <Card className={cardClasses} onClick={handleClick} style={{ cursor: onPostClick ? 'pointer' : 'default' }}>
      {post.image && (
        <div style={imageStyle} className="rounded-md mb-4"></div>
      )}
      <CardContent className="p-0">
        {showCategory && post.category && (
          <div className="text-sm text-gray-500 mb-1">{post.category}</div>
        )}
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">
          {/* Fix for object with 'rendered' key - use the rendered property instead of the object */}
          {post.title.rendered}
        </h3>
        {showExcerpt && (
          <p className="text-sm text-gray-700 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
        )}
      </CardContent>
      <div className="flex justify-between items-center mt-4">
        {showDate && post.date && (
          <span className="text-gray-600 text-xs">{formatDate(post.date)}</span>
        )}
        {showReadMore && (
          <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline text-sm">
            Read More
          </Link>
        )}
      </div>
    </Card>
  );
};

export default BlogPostCard;
