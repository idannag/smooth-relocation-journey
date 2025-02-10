import { useEffect, useState } from 'react';

const Testimonials = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
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
            text: "Outstanding support from start to finish. They really understand the challenges of relocating and provide comprehensive solutions.",
            profile_photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
          }
        ];
        setReviews(dummyReviews);
        setLoading(false);
      } catch (err) {
        setError('Failed to load reviews');
        setLoading(false);
      }
    };

    fetchGoogleReviews();
  }, []);

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
        <div className="flex items-center justify-center gap-2 mb-8">
          <h2 className="text-3xl font-bold text-center font-inter bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <img 
            src="https://i0.wp.com/www.skitsolutionbd.com/wp-content/uploads/2019/05/verified-customer-Google-reviews.png" 
            alt="Google Reviews" 
            className="h-12 w-auto"
          />
          <div className="flex items-center">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-lg font-semibold">5.0</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in"
              style={{
                animation: `slide-up 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-semibold">{review.author_name}</h3>
                  <div className="flex items-center">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-2">{review.text}</p>
              <p className="text-sm text-gray-500">{review.relative_time_description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a 
            href="https://maps.app.goo.gl/3DkAx4B6kb8Q1B9J7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            View all reviews on Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
