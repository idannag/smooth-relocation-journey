
import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const Testimonials = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxContent, setLightboxContent] = useState<{
    url: string;
    size: 'full' | 'medium'
  }>({
    url: '',
    size: 'full'
  });

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('getGoogleReviews');
        if (error) throw error;
        if (data.result && data.result.reviews) {
          setReviews(data.result.reviews);
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

  const handleOpenReviewLink = (url: string) => {
    setLightboxContent({
      url,
      size: 'medium'
    });
    setShowLightbox(true);
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
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 font-inter bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] bg-clip-text text-transparent animate-fade-in">
          What Our Clients Say
        </h2>

        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/7fc61af8-ea7f-4585-8f82-c8a61f99c608.png" 
            alt="Google Reviews" 
            className="h-12 w-auto" 
          />
        </div>

        <div className="relative group max-w-6xl mx-auto">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, index) => (
              <div 
                key={index}
                className="flex-none w-72 snap-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in"
                style={{ animation: `slide-up 0.5s ease-out ${index * 0.1}s both` }}
              >
                <div className="flex items-center mb-2">
                  <img 
                    src={review.profile_photo_url} 
                    alt={review.author_name}
                    className="w-8 h-8 rounded-full object-cover" 
                  />
                  <div className="ml-2">
                    <h3 className="font-semibold text-sm">{review.author_name}</h3>
                    <div className="flex items-center">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-2 line-clamp-3">{review.text}</p>
                <p className="text-xs text-gray-500">{review.relative_time_description}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </div>

        <div className="mt-8 text-center space-y-4">
          <button
            onClick={() => handleOpenReviewLink("https://maps.app.goo.gl/3DkAx4B6kb8Q1B9J7")}
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg mx-2 animate-fade-in"
          >
            Read Reviews
          </button>
          <button
            onClick={() => handleOpenReviewLink("https://search.google.com/local/writereview?placeid=ChIJc0HHe0tHHRUR4G4V7hGPL08")}
            className="px-6 py-2 bg-secondary text-white rounded-full hover:bg-secondary/90 transition-all duration-300 shadow-md hover:shadow-lg mx-2 animate-fade-in"
          >
            Write Review
          </button>
        </div>
      </div>

      {showLightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 animate-fade-in">
          <div className="relative w-full max-w-4xl mx-auto h-[80vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={lightboxContent.url}
              className="w-full h-full"
              frameBorder="0"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
