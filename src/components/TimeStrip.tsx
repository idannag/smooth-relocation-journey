
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TimeStrip = () => {
  const [times, setTimes] = useState<{ [key: string]: string }>({});
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const cities = [
    { name: 'New York' },
    { name: 'London' },
    { name: 'Tokyo' },
    { name: 'Paris' },
    { name: 'Dubai' },
    { name: 'Singapore' },
    { name: 'Sydney' },
    { name: 'Tel Aviv' }
  ];
  
  useEffect(() => {
    const updateTimes = () => {
      const newTimes: { [key: string]: string } = {};
      cities.forEach(city => {
        const time = new Date().toLocaleTimeString('en-US', {
          timeZone: getTimeZone(city.name),
          hour: '2-digit',
          minute: '2-digit'
        });
        newTimes[city.name] = time;
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
    <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600">
      <div 
        className={`flex items-center space-x-1 whitespace-nowrap transition-all duration-500 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <Clock className="w-3 h-3 md:w-4 md:h-4" />
        <span className="font-bold">{currentCity.name}:</span>
        <span className="font-bold">{times[currentCity.name]}</span>
      </div>
    </div>
  );
};

export default TimeStrip;
