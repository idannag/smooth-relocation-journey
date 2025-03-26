
import { useState, useEffect, useRef } from 'react';
import { toast } from "sonner";
import { Destination } from './types';

export const usePopularDestinations = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackDestinations = [
    {
      city: "New York",
      country: "USA",
      video: "https://www.app.ocean-il.co.il/wp-content/uploads/2022/10/Brooklyn.m4v",
      description: "Discover relocation opportunities"
    }, 
    {
      city: "Berlin",
      country: "Germany",
      video: "https://www.app.ocean-il.co.il/wp-content/uploads/2023/03/Berlin.mp4",
      description: "Experience German culture"
    }, 
    {
      city: "Barcelona",
      country: "Spain",
      video: "https://www.app.ocean-il.co.il/wp-content/uploads/2023/03/Barcelona.mp4",
      description: "Live the Mediterranean lifestyle"
    }, 
    {
      city: "Dubai",
      country: "UAE",
      video: "https://www.app.ocean-il.co.il/wp-content/uploads/2023/03/Dubai.mp4",
      description: "Embrace luxury living"
    }, 
    {
      city: "Toronto",
      country: "Canada",
      video: "https://www.app.ocean-il.co.il/wp-content/uploads/2023/03/Toronto.mp4",
      description: "Experience multicultural living"
    }, 
    {
      city: "Greece",
      country: "Greece",
      video: "https://www.app.ocean-il.co.il/wp-content/uploads/2023/03/Greece.mp4",
      description: "Discover ancient history"
    }, 
    {
      city: "London",
      country: "UK",
      video: "https://www.app.ocean-il.co.il/wp-content/uploads/2023/03/London.mp4",
      description: "Global opportunities await"
    }, 
    {
      city: "Tel Aviv",
      country: "Israel",
      video: "https://www.app.ocean-il.co.il/wp-content/uploads/2023/03/TelAviv.mp4",
      description: "Innovation meets tradition"
    }, 
    {
      city: "Paris",
      country: "France",
      video: "https://www.app.ocean-il.co.il/wp-content/uploads/2023/03/Paris.mp4",
      description: "Live the French lifestyle"
    }, 
    {
      city: "Larnaca",
      country: "Cyprus",
      video: "https://www.app.ocean-il.co.il/wp-content/uploads/2023/03/Larnaca.mp4",
      description: "Mediterranean paradise"
    }
  ];

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
        
        const parsedDestinations = rows.slice(1).map((row) => {
          const values = row.split('\t').map(value => value.trim());
          
          const destination: any = {};
          
          headers.forEach((header, i) => {
            // Convert header to camelCase for better property mapping
            let key = header.toLowerCase()
              .replace(/\s+(.)/g, (_, char) => char.toUpperCase())
              .replace(/\s+/g, '')
              .replace(/&/g, 'And');
            
            destination[key] = values[i] || '';
          });
          
          // Make sure video URL is direct video file when possible
          if (destination.video) {
            destination.video = destination.video.trim();
            
            // If it's a YouTube URL, try to replace with a direct video URL based on city name
            if (destination.video.includes('youtube.com')) {
              const cityName = destination.city || '';
              const cityForUrl = cityName.replace(/\s+/g, '');
              
              // Try to find a matching video in our fallback collection
              const fallbackDestination = fallbackDestinations.find(
                fb => fb.city.toLowerCase() === cityName.toLowerCase()
              );
              
              if (fallbackDestination && fallbackDestination.video) {
                destination.video = fallbackDestination.video;
              } else {
                // Generic fallback based on city name
                destination.video = `https://www.app.ocean-il.co.il/wp-content/uploads/2023/03/${cityForUrl}.mp4`;
              }
            }
          }
          
          return destination as Destination;
        });
        
        console.log('Parsed destinations with videos:', parsedDestinations);
        
        if (parsedDestinations.length > 0) {
          setDestinations(parsedDestinations);
        } else {
          console.warn('No destinations found in spreadsheet, using fallback data');
          setDestinations(fallbackDestinations);
          toast.warning('Could not load destination data, using fallback information');
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
        toast.error('Failed to load destinations. Using fallback data.');
        setDestinations(fallbackDestinations);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleDestinationClick = (city: string) => {
    if (city) {
      setSelectedDestination(`destination:${city}`);
    } else {
      setSelectedDestination("destinations");
    }
    setShowLightbox(true);
  };

  const handleSectionTitleClick = () => {
    setSelectedDestination("destinations");
    setShowLightbox(true);
  };

  return {
    scrollRef,
    showLightbox,
    selectedDestination,
    destinations,
    loading,
    scroll,
    handleDestinationClick,
    handleSectionTitleClick,
    setShowLightbox
  };
};
