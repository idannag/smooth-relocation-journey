import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    text: "The relocation process was seamless thanks to the amazing support.",
    author: "Sarah Johnson",
    route: "USA to Germany"
  },
  {
    text: "Professional guidance made our transition incredibly smooth.",
    author: "Michael Chen",
    route: "China to Canada"
  },
  {
    text: "Couldn't have managed this big move without their expertise.",
    author: "Emma Williams",
    route: "UK to Australia"
  },
  {
    text: "Their local knowledge was invaluable for our family's transition.",
    author: "David Martinez",
    route: "Spain to France"
  },
  {
    text: "Outstanding support throughout the entire relocation journey.",
    author: "Sophie Anderson",
    route: "Sweden to Japan"
  },
  {
    text: "They made a complex process feel simple and manageable.",
    author: "James Wilson",
    route: "Canada to Singapore"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-poppins bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Client Stories
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in h-full">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-gray-700 mb-4">{testimonial.text}</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.route}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;