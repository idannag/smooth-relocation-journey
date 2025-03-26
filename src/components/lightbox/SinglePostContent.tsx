
import React, { useState, useEffect } from 'react';
import SinglePost from '../blog/SinglePost';
import LoadingSpinner from './LoadingSpinner';

interface SinglePostContentProps {
  postId: number;
  onClose?: () => void;
}

const SinglePostContent = ({ postId: initialPostId, onClose }: SinglePostContentProps) => {
  const [postId, setPostId] = useState(initialPostId);
  const [isLoading, setIsLoading] = useState(false);

  // Listen for post ID changes from pagination navigation
  useEffect(() => {
    const handlePostIdChange = (event: CustomEvent) => {
      setIsLoading(true);
      // Short timeout to show loading state
      setTimeout(() => {
        setPostId(Number(event.detail));
        setIsLoading(false);
      }, 300);
    };

    // Add event listener for custom postIdChanged event
    window.addEventListener('postIdChanged', handlePostIdChange as EventListener);
    
    // Clean up
    return () => {
      window.removeEventListener('postIdChanged', handlePostIdChange as EventListener);
    };
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    if (document.querySelector('.lightbox-content')) {
      document.querySelector('.lightbox-content')?.scrollTo(0, 0);
    }
  }, [postId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <SinglePost postId={postId} onClose={onClose} />;
};

export default SinglePostContent;
