
import React, { useEffect, useState } from 'react';
import { Review } from "@/types/testimonials";
import ReviewCarousel from "./testimonials/ReviewCarousel";
import TestimonialsHeader from "./testimonials/TestimonialsHeader";
import TestimonialActions from "./testimonials/TestimonialActions";
import TestimonialsLoading from "./testimonials/TestimonialsLoading";
import { fetchGoogleReviews } from "@/utils/testimonialService";
import { useTestimonialScroll } from "@/hooks/useTestimonialScroll";

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { scrollRef, scroll } = useTestimonialScroll(reviews);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const { reviews: fetchedReviews, error: fetchError } = await fetchGoogleReviews();
        setReviews(fetchedReviews);
        if (fetchError) {
          setError(fetchError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <TestimonialsLoading />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 animate-fade-in">
        <TestimonialsHeader />

        <ReviewCarousel 
          reviews={reviews}
          scrollRef={scrollRef}
          scroll={scroll}
        />

        {error && (
          <div className="text-center text-amber-600 mt-4">
            {error}
          </div>
        )}

        <TestimonialActions />
      </div>
    </section>
  );
};

export default Testimonials;
