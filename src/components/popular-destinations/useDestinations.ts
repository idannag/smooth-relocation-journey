
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Destination } from './types';

export const useDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2JRzcSHOmFKT3Q8Fgz4i79GzmwkA5FKknRMiOIy2izJ7TAZydkU8s_hbjn9E5IiwonupQsEkHbZfj/pub?gid=136618633&single=true&output=tsv');
        const text = await response.text();
        
        // Parse TSV
        const rows = text.split('\n');
        const headers = rows[0].split('\t').map(header => header.trim());
        
        const parsedDestinations = rows.slice(1).map((row, index) => {
          const values = row.split('\t').map(value => value.trim());
          
          const destination: any = {
            id: index
          };
          
          headers.forEach((header, i) => {
            let key = header.toLowerCase().replace(/\s+/g, '');
            destination[key] = values[i] || '';
          });
          
          return destination as Destination;
        });
        
        setDestinations(parsedDestinations);
      } catch (error) {
        console.error('Error fetching destinations:', error);
        toast.error('Failed to load destinations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % destinations.length);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + destinations.length) % destinations.length);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return {
    destinations,
    loading,
    activeIndex,
    activeDestination: destinations[activeIndex],
    handleNext,
    handlePrev,
    handleDotClick,
  };
};
