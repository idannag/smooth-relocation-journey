
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, Tag, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SinglePostSkeleton from './SinglePostSkeleton';
import { 
  usePost, 
  usePosts,
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
  const [isLoadingNavigation, setIsLoadingNavigation] = useState(false);
  
  // Use either the prop postId or the route id (convert to number if it's from route)
  const id = propPostId?.toString() || routeId;
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  const {
    data: post,
    isLoading,
    isError
  } = usePost(id);
  
  // Fetch all posts to determine next and previous posts
  const { data } = usePosts();
  
  // Find the current post index in the posts array
  const allPosts = data?.pages.flat() || [];
  const currentPostIndex = allPosts.findIndex(p => p.id.toString() === id);
  
  // Get previous and next post IDs
  const previousPostId = currentPostIndex > 0 ? allPosts[currentPostIndex - 1]?.id : null;
  const nextPostId = currentPostIndex < allPosts.length - 1 ? allPosts[currentPostIndex + 1]?.id : null;
  
  const handleBackClick = () => {
    navigate('/blog');
  };
  
  const handleCloseClick = () => {
    // Always close the lightbox if onClose is provided
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };
  
  const handlePreviousClick = () => {
    if (previousPostId) {
      setIsLoadingNavigation(true);
      if (onClose) {
        // For lightbox view, just update URL without full page reload
        window.history.pushState({}, '', `/post/${previousPostId}`);
        // Use URL to reload the component without page refresh
        window.dispatchEvent(new CustomEvent('postIdChanged', { detail: previousPostId }));
        setIsLoadingNavigation(false);
      } else {
        navigate(`/post/${previousPostId}`);
      }
    }
  };
  
  const handleNextClick = () => {
    if (nextPostId) {
      setIsLoadingNavigation(true);
      if (onClose) {
        // For lightbox view, just update URL without full page reload
        window.history.pushState({}, '', `/post/${nextPostId}`);
        // Use URL to reload the component without page refresh
        window.dispatchEvent(new CustomEvent('postIdChanged', { detail: nextPostId }));
        setIsLoadingNavigation(false);
      } else {
        navigate(`/post/${nextPostId}`);
      }
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
  
  if (isLoading || isLoadingNavigation) {
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
            Back
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCloseClick}
            className="rounded-full p-2.5 h-10 w-10 hover:bg-gray-100 border border-gray-200 shadow-sm"
            aria-label="Close"
          >
            <X size={20} className="text-gray-600" />
          </Button>
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
            Back
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCloseClick}
            className="rounded-full p-2.5 h-10 w-10 hover:bg-gray-100 border border-gray-200 shadow-sm"
            aria-label="Close"
          >
            <X size={20} className="text-gray-600" />
          </Button>
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
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="sticky top-0 z-10 bg-white py-2 mb-4 border-b flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleBackClick}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCloseClick}
          className="rounded-full p-2.5 h-10 w-10 hover:bg-gray-100 border border-gray-200 shadow-sm"
          aria-label="Close"
        >
          <X size={20} className="text-gray-600" />
        </Button>
      </div>
      
      <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden relative">
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
              loading="lazy"
            />
          </div>
        )}
        
        <div className="p-6 prose prose-blue max-w-none" dangerouslySetInnerHTML={createMarkup(post.content.rendered)} />
        
        {/* Pagination Navigation */}
        <div className="mt-8 border-t pt-6 pb-6">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={previousPostId ? handlePreviousClick : undefined}
              className={!previousPostId ? "opacity-50 pointer-events-none" : "hover:bg-blue-50"}
              disabled={!previousPostId}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextPostId ? handleNextClick : undefined}
              className={!nextPostId ? "opacity-50 pointer-events-none" : "hover:bg-blue-50"}
              disabled={!nextPostId}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default SinglePost;
