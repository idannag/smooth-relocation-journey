
import React from 'react';

const TestimonialsLoading = () => {
  return (
    <div className="animate-pulse flex flex-col items-center">
      <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow h-48"></div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsLoading;
