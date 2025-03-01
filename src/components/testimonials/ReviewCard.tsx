
import { Review } from "@/types/testimonials";
import StarRating from "./StarRating";

interface ReviewCardProps {
  review: Review;
  index: number;
}

const ReviewCard = ({ review, index }: ReviewCardProps) => {
  return (
    <div 
      className="flex-none w-80 h-96 snap-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in hover:scale-[1.02] flex flex-col overflow-hidden"
      style={{ animation: `slide-up 0.5s ease-out ${index * 0.1}s both` }}
    >
      <div className="flex items-center mb-4">
        <img 
          src={review.profile_photo_url} 
          alt={review.author_name}
          className="w-12 h-12 rounded-full object-cover" 
        />
        <div className="ml-3">
          <h3 className="font-semibold text-base">{review.author_name}</h3>
          <StarRating rating={review.rating} />
        </div>
      </div>
      <div className="text-gray-700 text-base flex-grow overflow-y-auto">
        <p>{review.text}</p>
      </div>
      <p className="text-sm text-gray-500 mt-4">{review.relative_time_description}</p>
    </div>
  );
};

export default ReviewCard;
