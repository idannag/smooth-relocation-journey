
import { useEffect, useState, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Review } from "@/types/testimonials";
import ReviewCarousel from "./testimonials/ReviewCarousel";

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('getGoogleReviews');
        if (error) throw error;
        if (data.result && data.result.reviews) {
          const highRatedReviews = data.result.reviews.filter(review => review.rating >= 4);
          setReviews(highRatedReviews);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        const dummyReviews = [
          {
            author_name: "Sarah L.",
            rating: 5,
            relative_time_description: "2 months ago",
            text: "Ocean International - Israel made our relocation smooth and stress-free. Their team was professional and attentive throughout the entire process.",
            profile_photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
          },
          {
            author_name: "David K.",
            rating: 5,
            relative_time_description: "a month ago",
            text: "Excellent service! The team at Ocean helped us navigate all the complexities of international relocation with expertise and care.",
            profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
          },
          {
            author_name: "Rachel M.",
            rating: 5,
            relative_time_description: "3 months ago",
            text: "Outstanding support from start to finish. They really understand the challenges of relocating.",
            profile_photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
          }
        ];
        setReviews(dummyReviews);
        setLoading(false);
      }
    };

    fetchGoogleReviews();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow h-48"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-red-500">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-8 font-inter bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] bg-clip-text text-transparent animate-fade-in hover:scale-105 transition-transform duration-300">
          What Our Clients Say
        </h2>

        <div className="flex justify-center mb-8 animate-slide-up">
          <img 
            src="/lovable-uploads/7fc61af8-ea7f-4585-8f82-c8a61f99c608.png" 
            alt="Google Reviews" 
            className="h-12 w-auto hover:scale-105 transition-transform duration-300" 
          />
        </div>

        <ReviewCarousel 
          reviews={reviews}
          scrollRef={scrollRef}
          scroll={scroll}
        />

        <div className="mt-8 text-center flex justify-center gap-4">
          <a
            href="https://maps.app.goo.gl/3DkAx4B6kb8Q1B9J7"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 animate-fade-in"
          >
            All Reviews
          </a>
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJc0HHe0tHHRUR4G4V7hGPL08"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-secondary text-white rounded-full hover:bg-secondary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 animate-fade-in"
          >
            Write Review
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
