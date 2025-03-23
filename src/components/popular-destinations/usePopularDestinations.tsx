
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
      video: "https://www.youtube.com/embed/Oxh_NsBqR1M",
      description: "Experience German culture"
    }, 
    {
      city: "Barcelona",
      country: "Spain",
      video: "https://www.youtube.com/embed/kK3uDGtR45A",
      description: "Live the Mediterranean lifestyle"
    }, 
    {
      city: "Dubai",
      country: "UAE",
      video: "https://www.youtube.com/embed/E_S4iZ7TCXo",
      description: "Embrace luxury living"
    }, 
    {
      city: "Toronto",
      country: "Canada",
      video: "https://www.youtube.com/embed/TP_hHMnyknk",
      description: "Experience multicultural living"
    }, 
    {
      city: "Greece",
      country: "Greece",
      video: "https://www.youtube.com/embed/AKXMkeib1zE",
      description: "Discover ancient history"
    }, 
    {
      city: "London",
      country: "UK",
      video: "https://www.youtube.com/embed/YUdDkKnVZN4",
      description: "Global opportunities await"
    }, 
    {
      city: "Tel Aviv",
      country: "Israel",
      video: "https://www.youtube.com/embed/9pb7paEMbmo",
      description: "Innovation meets tradition"
    }, 
    {
      city: "Paris",
      country: "France",
      video: "https://www.youtube.com/embed/kpoGrDy_ss8",
      description: "Live the French lifestyle"
    }, 
    {
      city: "Larnaca",
      country: "Cyprus",
      video: "https://www.youtube.com/embed/8m3g3SlYs3k",
      description: "Mediterranean paradise"
    }
  ];

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2JRzcSHOmFKT3Q8Fgz4i79GzmwkA5FKknRMiOIy2izJ7TAZydkU8s_hbjn9E5IiwonupQsEkHbZfj/pub?gid=136618633&single=true&output=tsv');
        const text = await response.text();
        
        // Parse TSV
        const rows = text.split('\n');
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
          
          return destination as Destination;
        });
        
        if (parsedDestinations.length > 0) {
          setDestinations(parsedDestinations);
        } else {
          setDestinations(fallbackDestinations);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
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
