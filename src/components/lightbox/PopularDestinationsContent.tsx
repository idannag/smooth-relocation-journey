
import React from 'react';
import PopularDestinationsLightbox from '../popular-destinations/PopularDestinationsLightbox';

interface PopularDestinationsContentProps {
  initialCity?: string;
  onClose?: () => void;
}

const PopularDestinationsContent = ({ initialCity, onClose }: PopularDestinationsContentProps) => {
  return (
    <div className="animate-fade-in">
      <PopularDestinationsLightbox initialCity={initialCity} onClose={onClose} />
    </div>
  );
};

export default PopularDestinationsContent;
