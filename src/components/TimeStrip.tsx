import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TimeStrip = () => {
  const [times, setTimes] = useState<{ [key: string]: string }>({});
  const cities = ['New York', 'London', 'Tokyo', 'Sydney', 'Berlin'];
  
  useEffect(() => {
    const updateTimes = () => {
      const newTimes: { [key: string]: string } = {};
      cities.forEach(city => {
        const time = new Date().toLocaleTimeString('en-US', {
          timeZone: getTimeZone(city),
          hour: '2-digit',
          minute: '2-digit'
        });
        newTimes[city] = time;
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeZone = (city: string): string => {
    const timeZones: { [key: string]: string } = {
      'New York': 'America/New_York',
      'London': 'Europe/London',
      'Tokyo': 'Asia/Tokyo',
      'Sydney': 'Australia/Sydney',
      'Berlin': 'Europe/Berlin'
    };
    return timeZones[city] || 'UTC';
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
        {cities.map((city) => (
          <div key={city} className="flex items-center space-x-2 whitespace-nowrap">
            <Clock className="w-3 h-3" />
            <span className="font-medium">{city}</span>
            <span>{times[city]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeStrip;