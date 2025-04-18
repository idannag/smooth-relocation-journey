
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Destination } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

export const useDestinations = (initialCity?: string) => {
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
              .replace(/&/g, 'And')
              .replace(/\(/g, '')
              .replace(/\)/g, '')
              .replace(/\//g, '')
              .replace(/²/g, '2');
            
            // Map all fields from the dataset to our destination object
            if (key === 'city') destination.city = values[i] || '';
            else if (key === 'country') destination.country = values[i] || '';
            else if (key === 'description' || key === 'shortdescription') destination.description = values[i] || '';
            else if (key === 'video' || key === 'destinationvideo' || key === 'videourl') {
              let videoUrl = values[i] || '';
              
              // If it's a YouTube URL, try to use a direct video URL instead
              if (videoUrl.includes('youtube.com')) {
                const cityName = destination.city || '';
                // Try to construct a direct video URL
                videoUrl = `https://www.app.ocean-il.co.il/wp-content/uploads/2023/03/${cityName.replace(/\s+/g, '')}.mp4`;
              }
              
              destination.video = videoUrl;
            }
            else if (key === 'image' || key === 'imageurl') destination.image = values[i] || '';
            else if (key === 'mapurl') {
              // Ensure map URL is valid
              let mapUrl = values[i] || '';
              // If it's a Google Maps URL but not an embed URL, convert it
              if (mapUrl.includes('google.com/maps') && !mapUrl.includes('google.com/maps/embed')) {
                mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(destination.city || '')}%2C${encodeURIComponent(destination.country || '')}&key=`;
              }
              destination.mapUrl = mapUrl;
            }
            else if (key === 'population') destination.population = values[i] || '';
            else if (key === 'area' || key === 'areakm2') destination.area = values[i] || '';
            else if (key === 'populationdensity' || key === 'populationdensitypeopleperkm2') destination.populationDensity = values[i] || '';
            else if (key === 'gdppercapita' || key === 'gdppercapita$') destination.gdpPerCapita = values[i] || '';
            else if (key === 'language' || key === 'officiallanguages') destination.language = values[i] || '';
            else if (key === 'predominantlanguages' || key === 'predominantlanguagesofpopulation') destination.predominantLanguages = values[i] || '';
            else if (key === 'timezone') destination.timeZone = values[i] || '';
            else if (key === 'currency' || key === 'localcurrency') destination.currency = values[i] || '';
            else if (key === 'averagecost') destination.averageCost = values[i] || '';
            else if (key === 'besttimetovisit') destination.bestTimeToVisit = values[i] || '';
            else if (key === 'uniquerelocationfacts' || key === 'uniquerelocationlivingfacts') destination.uniqueRelocationFacts = values[i] || '';
            else if (key === 'visaimmigrationconditions' || key === 'visaandimmigrationconditions') destination.visaImmigrationConditions = values[i] || '';
            else if (key === 'religiouscommunities' || key === 'religiouscommunitiesjewishpresence') destination.religiousCommunities = values[i] || '';
            else if (key === 'popularattractions') destination.popularAttractions = values[i] || '';
            else if (key === 'flagimg') destination.flagImg = values[i] || '';
            else if (key === 'housingmarket') destination.housingMarket = values[i] || '';
            else if (key === 'publictransport') destination.publicTransport = values[i] || '';
            else if (key === 'cafeculture') destination.cafeCulture = values[i] || '';
            else if (key === 'internetconnectivity') destination.internetConnectivity = values[i] || '';
            else if (key === 'healthcaresystem') destination.healthcareSystem = values[i] || '';
            else if (key === 'educationsystem') destination.educationSystem = values[i] || '';
            else if (key === 'jobmarket') destination.jobMarket = values[i] || '';
            else if (key === 'qualityoflife') destination.qualityOfLife = values[i] || '';
            else if (key === 'climate') destination.climate = values[i] || '';
            else if (key === 'naturalenvironment') destination.naturalEnvironment = values[i] || '';
            else if (key === 'safety') destination.safety = values[i] || '';
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
        
        // If initialCity is provided, find and set the active index
        if (initialCity && parsedDestinations.length > 0) {
          const index = parsedDestinations.findIndex(
            dest => dest.city.toLowerCase() === initialCity.toLowerCase()
          );
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      } catch (error) {
        console.error('Error fetching destinations for lightbox:', error);
        toast.error('Failed to load destinations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [initialCity]);

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
