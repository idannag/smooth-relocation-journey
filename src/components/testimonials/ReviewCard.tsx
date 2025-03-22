
import React from 'react';
import { Review } from "@/types/testimonials";
import StarRating from "./StarRating";

interface ReviewCardProps {
  review: Review;
  index: number;
}

const ReviewCard = ({ review, index }: ReviewCardProps) => {
  return (
    <div 
      className="flex-none w-80 h-80 snap-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in hover:scale-[1.02] flex flex-col overflow-hidden"
      style={{ animation: `slide-up 0.5s ease-out ${index * 0.1}s both` }}
    >
      <div className="flex items-center mb-3">
        <img 
          src={review.profile_photo_url} 
          alt={review.author_name}
          className="w-10 h-10 rounded-full object-cover" 
        />
        <div className="ml-3">
          <h3 className="font-semibold text-sm">{review.author_name}</h3>
          <StarRating rating={review.rating} />
        </div>
      </div>
      <div className="text-gray-700 text-sm flex-grow overflow-y-auto">
        <p>{review.text}</p>
      </div>
      <p className="text-xs text-gray-500 mt-3">{review.relative_time_description}</p>
    </div>
  );
};

export default ReviewCard;
