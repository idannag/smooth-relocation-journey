
import { useState, useRef, useEffect, RefObject } from 'react';
import { Review } from "@/types/testimonials";

export const useTestimonialScroll = (reviews: Review[]) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto scroll testimonials
  useEffect(() => {
    if (reviews.length <= 1) return;
    
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const cardWidth = 320; // Card width + gap
        const nextIndex = (currentIndex + 1) % (reviews.length - 2); // Stop 2 cards before the end
        
        scrollRef.current.scrollTo({
          left: nextIndex * cardWidth,
          behavior: 'smooth'
        });
        
        setCurrentIndex(nextIndex);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentIndex, reviews.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      const newPosition = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount 
        : scrollRef.current.scrollLeft + scrollAmount;
        
      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      const newIndex = Math.round(newPosition / scrollAmount);
      setCurrentIndex(Math.max(0, Math.min(newIndex, reviews.length - 3)));
    }
  };

  return {
    scrollRef,
    currentIndex,
    scroll
  };
};
