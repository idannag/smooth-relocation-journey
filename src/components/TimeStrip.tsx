import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeStripProps {
  onClick?: () => void;
}

const TimeStrip = ({ onClick }: TimeStripProps) => {
  const [currentTime, setCurrentTime] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    const visibilityInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 300);
    }, 5000);

    return () => {
      clearInterval(intervalId);
      clearInterval(visibilityInterval);
    };
  }, []);

  return (
    <button
      onClick={onClick}
      className="flex items-center text-[#2C5AAE] hover:text-[#40E0D0] transition-colors text-sm md:text-[14px]"
    >
      <div 
        className={`flex items-center space-x-1 whitespace-nowrap transition-all duration-500 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <Clock className="w-4 h-4 mr-1" />
        <span className="font-medium">{currentTime}</span>
      </div>
    </button>
  );
};

export default TimeStrip;
