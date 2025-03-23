
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Destination } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

export const useDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        // Fetch data from the Google Sheets TSV
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2JRzcSHOmFKT3Q8Fgz4i79GzmwkA5FKknRMiOIy2izJ7TAZydkU8s_hbjn9E5IiwonupQsEkHbZfj/pub?gid=136618633&single=true&output=tsv');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch destinations: ${response.status}`);
        }
        
        const text = await response.text();
        
        // Parse TSV
        const rows = text.split('\n');
        if (rows.length <= 1) {
          throw new Error('No destination data found');
        }
        
        const headers = rows[0].split('\t').map(header => header.trim());
        
        const parsedDestinations = rows.slice(1).map((row, index) => {
          const values = row.split('\t').map(value => value.trim());
          
          // Create an object with the correct property mapping
          const destination: Partial<Destination> = {
            id: index
          };
          
          // Map each header to the corresponding value
          headers.forEach((header, i) => {
            // Convert header to camelCase
            let key = header.toLowerCase()
              .replace(/\s+(.)/g, (_, char) => char.toUpperCase())
              .replace(/\s+/g, '')
              .replace(/&/g, 'And');
            
            // Handle special cases for our data structure
            if (key === 'city') destination.city = values[i] || '';
            else if (key === 'country') destination.country = values[i] || '';
            else if (key === 'description') destination.description = values[i] || '';
            else if (key === 'video' || key === 'videoUrl') {
              let videoUrl = values[i] || '';
              // If it's a YouTube URL but not in embed format, convert it
              if (videoUrl.includes('youtube.com/watch') && !videoUrl.includes('youtube.com/embed')) {
                const videoId = videoUrl.split('v=')[1]?.split('&')[0];
                if (videoId) {
                  videoUrl = `https://www.youtube.com/embed/${videoId}`;
                }
              }
              destination.video = videoUrl;
            }
            else if (key === 'image' || key === 'imageUrl') destination.image = values[i] || '';
            else if (key === 'mapUrl') {
              // Ensure map URL is valid
              let mapUrl = values[i] || '';
              // If it's a Google Maps URL but not an embed URL, convert it
              if (mapUrl.includes('google.com/maps') && !mapUrl.includes('google.com/maps/embed')) {
                mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(destination.city || '')}%2C${encodeURIComponent(destination.country || '')}&key=`;
              }
              destination.mapUrl = mapUrl;
            }
            else if (key === 'population') destination.population = values[i] || '';
            else if (key === 'language') destination.language = values[i] || '';
            else if (key === 'timeZone') destination.timeZone = values[i] || '';
            else if (key === 'currency') destination.currency = values[i] || '';
            else if (key === 'averageCost') destination.averageCost = values[i] || '';
            else if (key === 'bestTimeToVisit') destination.bestTimeToVisit = values[i] || '';
            else if (key === 'popularAttractions') destination.popularAttractions = values[i] || '';
            else {
              // For any other fields, add them to the destination object
              (destination as any)[key] = values[i] || '';
            }
          });
          
          // Make sure city doesn't include country
          if (destination.city && destination.city.includes(',')) {
            const parts = destination.city.split(',');
            destination.city = parts[0].trim();
          }
          
          return destination as Destination;
        });
        
        console.log('Parsed destinations for lightbox:', parsedDestinations);
        setDestinations(parsedDestinations);
      } catch (error) {
        console.error('Error fetching destinations for lightbox:', error);
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
    isMobile
  };
};
