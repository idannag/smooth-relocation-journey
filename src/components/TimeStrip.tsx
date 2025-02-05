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
    <div className="bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] text-white py-2 animate-slide-down">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-8 overflow-x-auto whitespace-nowrap">
          {cities.map((city) => (
            <div key={city} className="flex items-center space-x-2 animate-fade-in">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{city}</span>
              <span className="text-sm">{times[city]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeStrip;