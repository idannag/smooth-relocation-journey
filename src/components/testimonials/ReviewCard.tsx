
import { Review } from "@/types/testimonials";
import StarRating from "./StarRating";

interface ReviewCardProps {
  review: Review;
  index: number;
}

const ReviewCard = ({ review, index }: ReviewCardProps) => {
  return (
    <div 
      className="flex-none w-80 h-56 snap-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in hover:scale-[1.02]"
      style={{ animation: `slide-up 0.5s ease-out ${index * 0.1}s both` }}
    >
      <div className="flex items-center mb-3">
        <img 
          src={review.profile_photo_url} 
          alt={review.author_name}
          className="w-8 h-8 rounded-full object-cover" 
        />
        <div className="ml-2">
          <h3 className="font-semibold text-sm">{review.author_name}</h3>
          <StarRating rating={review.rating} />
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-2 line-clamp-4">{review.text}</p>
      <p className="text-xs text-gray-500">{review.relative_time_description}</p>
    </div>
  );
};

export default ReviewCard;
