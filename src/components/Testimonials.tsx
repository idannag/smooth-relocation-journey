import { Quote } from 'lucide-react';

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
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-poppins bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Client Stories</h2>
        <div className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-none w-80 snap-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in"
            >
              <Quote className="w-8 h-8 text-primary mb-4" />
              <p className="text-gray-700 mb-4">{testimonial.text}</p>
              <div className="border-t pt-4">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.route}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
