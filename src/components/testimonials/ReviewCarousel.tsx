
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Review } from "@/types/testimonials";
import ReviewCard from "./ReviewCard";

interface ReviewCarouselProps {
  reviews: Review[];
  scrollRef: React.RefObject<HTMLDivElement>;
  scroll: (direction: 'left' | 'right') => void;
}

const ReviewCarousel = ({ reviews, scrollRef, scroll }: ReviewCarouselProps) => {
  return (
    <div className="relative max-w-6xl mx-auto">
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg 
          transition-all duration-300 hover:bg-white hover:scale-110"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6 text-[#2C5AAE]" />
      </button>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 px-4 pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} index={index} />
        ))}
      </div>

      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg 
          transition-all duration-300 hover:bg-white hover:scale-110"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6 text-[#2C5AAE]" />
      </button>
    </div>
  );
};

export default ReviewCarousel;
