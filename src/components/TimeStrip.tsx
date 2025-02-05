import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TimeStrip = () => {
  const [times, setTimes] = useState<{ [key: string]: string }>({});
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const cities = ['New York', 'London', 'Tokyo'];
  
  useEffect(() => {
    const updateTimes = () => {
      const newTimes: { [key: string]: string } = {};
      cities.forEach(city => {
        const time = new Date().toLocaleTimeString('en-US', {
          timeZone: getTimeZone(city),
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        newTimes[city] = time;
      });
      setTimes(newTimes);
    };

    updateTimes();
    const timeInterval = setInterval(updateTimes, 1000);
    
    // Cycle through cities every 3 seconds with fade effect
    const cycleInterval = setInterval(() => {
      setIsVisible(false); // Trigger fade out
      setTimeout(() => {
        setCurrentCityIndex((prev) => (prev + 1) % cities.length);
        setIsVisible(true); // Trigger fade in
      }, 300); // Wait for fade out to complete
    }, 3000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(cycleInterval);
    };
  }, []);

  const getTimeZone = (city: string): string => {
    const timeZones: { [key: string]: string } = {
      'New York': 'America/New_York',
      'London': 'Europe/London',
      'Tokyo': 'Asia/Tokyo'
    };
    return timeZones[city] || 'UTC';
  };

  const currentCity = cities[currentCityIndex];

  return (
    <div className="flex items-center space-x-2 text-[10px] text-gray-600">
      <div 
        className={`flex items-center space-x-1 whitespace-nowrap transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Clock className="w-2.5 h-2.5" />
        <span className="font-medium">Now in {currentCity}:</span>
        <span>{times[currentCity]}</span>
      </div>
    </div>
  );
};

export default TimeStrip;