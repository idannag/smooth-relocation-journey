
import { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';

interface CurrencyStripProps {
  onClick?: () => void;
}

const CurrencyStrip = ({ onClick }: CurrencyStripProps) => {
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const currencies = [
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
  ];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        if (data && data.rates) {
          setRates(data.rates);
        } else {
          throw new Error('Failed to fetch rates');
        }
      } catch (error) {
        console.error('Error fetching rates, using mock data:', error);
        const mockRates = {
          EUR: 0.92,
          GBP: 0.79,
          ILS: 3.67,
          JPY: 150.45,
          AUD: 1.52
        };
        setRates(mockRates);
      }
    };

    fetchRates();
    const rateInterval = setInterval(fetchRates, 60000);

    const cycleInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % currencies.length);
        setIsVisible(true);
      }, 300);
    }, 5000);

    return () => {
      clearInterval(rateInterval);
      clearInterval(cycleInterval);
    };
  }, []);

  const currentCurrency = currencies[currentIndex];

  return (
    <button
      onClick={onClick}
      className="flex items-center ml-4 pl-4 border-l border-gray-300 text-[#2C5AAE] hover:text-[#40E0D0] transition-colors"
    >
      <div 
        className={`flex items-center space-x-1 whitespace-nowrap transition-all duration-500 transform text-sm md:text-[14px] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <span className="font-medium">1$ = {currentCurrency.symbol}{rates[currentCurrency.code]?.toFixed(2)}</span>
      </div>
    </button>
  );
};

export default CurrencyStrip;
