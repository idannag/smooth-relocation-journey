
import { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';

const CurrencyStrip = () => {
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
      // In production, this should use a real API with your backend
      const mockRates = {
        EUR: 0.92,
        GBP: 0.79,
        ILS: 3.67,
        JPY: 150.45,
        AUD: 1.52
      };
      setRates(mockRates);
    };

    fetchRates();
    const rateInterval = setInterval(fetchRates, 60000); // Update every minute

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
    <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
      <div 
        className={`flex items-center space-x-1 whitespace-nowrap transition-all duration-500 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <DollarSign className="w-3 h-3 animate-pulse" />
        <span className="font-semibold">1 USD = </span>
        <span className="font-bold">{currentCurrency.symbol}{rates[currentCurrency.code]?.toFixed(2)} {currentCurrency.code}</span>
      </div>
    </div>
  );
};

export default CurrencyStrip;
