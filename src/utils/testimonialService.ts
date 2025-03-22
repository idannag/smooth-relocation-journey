
import { supabase } from "@/integrations/supabase/client";
import { Review } from "@/types/testimonials";

// Fallback dummy reviews to use when API fails
export const getDummyReviews = (): Review[] => [
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
  },
  {
    author_name: "Michael P.",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "The team at Ocean International made our move to Israel seamless. Their knowledge and support were invaluable.",
    profile_photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    author_name: "Emma W.",
    rating: 5,
    relative_time_description: "2 weeks ago",
    text: "Fantastic service from start to finish. The team was always available to answer questions and provide guidance.",
    profile_photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
  },
  {
    author_name: "Daniel R.",
    rating: 4,
    relative_time_description: "1 week ago",
    text: "Very professional service. They helped us with all aspects of our relocation, making it much easier than expected.",
    profile_photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
  },
  {
    author_name: "Jessica T.",
    rating: 5,
    relative_time_description: "3 weeks ago",
    text: "Ocean's team provided exceptional service during our relocation. They handled everything from housing to school enrollment for our children.",
    profile_photo_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
  },
  {
    author_name: "Mark S.",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "Moving countries was daunting, but Ocean made it feel manageable. Their expertise in visa processes saved us countless hours.",
    profile_photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
  }
];

export const fetchGoogleReviews = async (): Promise<{ 
  reviews: Review[]; 
  error: string | null;
}> => {
  try {
    // Try to fetch from Supabase function
    try {
      const { data, error } = await supabase.functions.invoke('getGoogleReviews');
      
      if (error) throw error;
      
      if (data?.result?.reviews) {
        console.log("Fetched reviews:", data.result.reviews);
        const highRatedReviews = data.result.reviews.filter((review: Review) => review.rating >= 4);
        return { reviews: highRatedReviews, error: null };
      } else {
        console.error("No reviews found in the response");
        throw new Error("No reviews found");
      }
    } catch (apiError) {
      console.error('Error fetching reviews:', apiError);
      throw apiError; // Re-throw to trigger fallback
    }
  } catch (err) {
    console.error('Using fallback reviews due to error:', err);
    // Always use mock data for now until the API is fixed
    return { 
      reviews: getDummyReviews(), 
      error: "Could not load reviews. Using sample data instead." 
    };
  }
};
