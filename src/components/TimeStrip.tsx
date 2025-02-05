import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TimeStrip = () => {
  const [times, setTimes] = useState<{ [key: string]: string }>({});
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const cities = [
    'New York',
    'London',
    'Tokyo',
    'Paris',
    'Dubai',
    'Singapore',
    'Sydney',
    'Tel Aviv'
  ];
  
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
    
    const cycleInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentCityIndex((prev) => (prev + 1) % cities.length);
        setIsVisible(true);
      }, 300);
    }, 5000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(cycleInterval);
    };
  }, []);

  const getTimeZone = (city: string): string => {
    const timeZones: { [key: string]: string } = {
      'New York': 'America/New_York',
      'London': 'Europe/London',
      'Tokyo': 'Asia/Tokyo',
      'Paris': 'Europe/Paris',
      'Dubai': 'Asia/Dubai',
      'Singapore': 'Asia/Singapore',
      'Sydney': 'Australia/Sydney',
      'Tel Aviv': 'Asia/Tel_Aviv'
    };
    return timeZones[city] || 'UTC';
  };

  const currentCity = cities[currentCityIndex];

  return (
    <div className="flex items-center space-x-2 text-xs text-gray-600">
      <div 
        className={`flex items-center space-x-1 whitespace-nowrap transition-all duration-500 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <Clock className="w-3 h-3 animate-pulse" />
        <span className="font-semibold animate-fade-in">Now in {currentCity}:</span>
        <span className="font-bold animate-fade-in">{times[currentCity]}</span>
      </div>
    </div>
  );
};

export default TimeStrip;