
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin">
          <div className="h-full w-full rounded-full border-t-4 border-[#2C5AAE] border-opacity-50"></div>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}>
          <div className="h-full w-full rounded-full border-l-4 border-r-4 border-[#40E0D0]"></div>
        </div>
      </div>
      <p className="mt-4 text-[#2C5AAE] font-medium">Loading content...</p>
    </div>
  );
};

export default LoadingSpinner;
