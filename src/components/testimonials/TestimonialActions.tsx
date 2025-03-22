
import React from 'react';

const TestimonialActions = () => {
  return (
    <div className="mt-8 text-center flex justify-center gap-4">
      <a
        href="https://maps.app.goo.gl/3DkAx4B6kb8Q1B9J7"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 animate-fade-in"
      >
        All Reviews
      </a>
      <a
        href="https://search.google.com/local/writereview?placeid=ChIJc0HHe0tHHRUR4G4V7hGPL08"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 animate-fade-in"
      >
        Write Review
      </a>
    </div>
  );
};

export default TestimonialActions;
