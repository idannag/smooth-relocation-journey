
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SinglePostSkeleton from './SinglePostSkeleton';
import { 
  usePost, 
  getFeaturedImageUrl, 
  getPostCategories,
  createMarkup
} from '@/services/postsService';

interface SinglePostProps {
  postId?: number;  // Optional prop to support both route and prop-based usage
  onClose?: () => void; // Added close handler for lightbox mode
}

const SinglePost = ({ postId: propPostId, onClose }: SinglePostProps = {}) => {
  const { id: routeId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Use either the prop postId or the route id (convert to number if it's from route)
  const id = propPostId?.toString() || routeId;
  
  const {
    data: post,
    isLoading,
    isError
  } = usePost(id);
  
  const handleBackClick = () => {
    if (onClose) {
      // In lightbox mode, use the provided onClose handler
      onClose();
    } else if (routeId) {
      // In standalone page mode, navigate back to blog list
      navigate('/blog');
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="sticky top-0 z-10 bg-white py-2 mb-4 border-b flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleBackClick}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Articles
          </Button>
          
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
              aria-label="Close"
            >
              <X size={20} />
            </Button>
          )}
        </div>
        <SinglePostSkeleton />
      </div>
    );
  }
  
  if (isError || !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="sticky top-0 z-10 bg-white py-2 mb-4 border-b flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleBackClick}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Articles
          </Button>
          
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
              aria-label="Close"
            >
              <X size={20} />
            </Button>
          )}
        </div>
        <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">
          <p>Error loading blog post. The post may not exist or there was a problem fetching it.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={handleBackClick}
          >
            Go back to all articles
          </Button>
        </div>
      </div>
    );
  }
  
  const featuredImage = getFeaturedImageUrl(post);
  const postCategories = getPostCategories(post);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="sticky top-0 z-10 bg-white py-2 mb-4 border-b flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleBackClick}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Articles
        </Button>
        
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
            aria-label="Close"
          >
            <X size={20} />
          </Button>
        )}
      </div>
      
      <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <header className="p-6 pb-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-4" dangerouslySetInnerHTML={createMarkup(post.title.rendered)} />
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(post.date)}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {postCategories.map(cat => (
                <Badge key={cat.id} variant="outline" className="bg-blue-50 text-blue-700">
                  <Tag className="w-3 h-3 mr-1" />
                  {cat.name}
                </Badge>
              ))}
            </div>
          </div>
        </header>
        
        {featuredImage && (
          <div className="p-6 pt-0 pb-4">
            <img 
              src={featuredImage}
              alt={post.title.rendered}
              className="w-full h-auto rounded-lg object-cover max-h-[500px]"
            />
          </div>
        )}
        
        <div className="p-6 prose prose-blue max-w-none" dangerouslySetInnerHTML={createMarkup(post.content.rendered)} />
      </article>
    </div>
  );
};

export default SinglePost;
