
import React from 'react';
import PopularDestinationsLightbox from '../popular-destinations/PopularDestinationsLightbox';

interface PopularDestinationsContentProps {
  initialCity?: string;
  onClose?: () => void;
}

const PopularDestinationsContent = ({ initialCity, onClose }: PopularDestinationsContentProps) => {
  return <PopularDestinationsLightbox initialCity={initialCity} onClose={onClose} />;
};

export default PopularDestinationsContent;
