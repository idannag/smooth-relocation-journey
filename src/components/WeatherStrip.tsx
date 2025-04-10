
import { useState, useEffect } from 'react';
import { CloudSun } from 'lucide-react';

interface WeatherStripProps {
  onClick?: () => void;
}

const WeatherStrip = ({ onClick }: WeatherStripProps) => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        // Get user's location
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            // Use OpenWeatherMap API with coordinates
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=55d20eccb4f278f819dfacad7e4fc5f9`
            );
            
            if (!response.ok) {
              throw new Error('Weather data not available');
            }
            
            const data = await response.json();
            setTemperature(Math.round(data.main.temp));
            setIsLoading(false);
          },
          () => {
            // Fallback to a default location if geolocation is denied
            console.log('Geolocation permission denied, using default location');
            fetchDefaultWeather();
          }
        );
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Unable to fetch weather');
        setIsLoading(false);
        // Fallback to default location
        fetchDefaultWeather();
      }
    };

    const fetchDefaultWeather = async () => {
      try {
        // Use Tel Aviv as default location
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Tel%20Aviv&units=metric&appid=55d20eccb4f278f819dfacad7e4fc5f9`
        );
        
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        
        const data = await response.json();
        setTemperature(Math.round(data.main.temp));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching default weather:', error);
        setError('Unable to fetch weather');
        setIsLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <button
      onClick={onClick}
      className="flex items-center text-[#2C5AAE] hover:text-[#40E0D0] transition-colors text-sm md:text-[14px]"
    >
      <div className="flex items-center space-x-1 whitespace-nowrap">
        <CloudSun className="w-4 h-4 mr-1" />
        <span className="font-medium">
          {isLoading ? '...' : error ? '--' : `${temperature}°C`}
        </span>
      </div>
    </button>
  );
};

export default WeatherStrip;
