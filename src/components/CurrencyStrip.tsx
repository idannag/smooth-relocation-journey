
import { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';

const CurrencyStrip = () => {
  const [currentCurrencyIndex, setCurrentCurrencyIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const currencies = [
    { code: 'USD/EUR', rate: '0.92' },
    { code: 'USD/ILS', rate: '3.67' },
    { code: 'EUR/GBP', rate: '0.85' },
    { code: 'JPY/USD', rate: '0.0067' },
    { code: 'GBP/ILS', rate: '4.67' }
  ];

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentCurrencyIndex((prev) => (prev + 1) % currencies.length);
        setIsVisible(true);
      }, 300);
    }, 5000);

    return () => clearInterval(cycleInterval);
  }, []);

  const currentCurrency = currencies[currentCurrencyIndex];

  return (
    <div className="flex items-center space-x-2 text-xs text-gray-600 border-l pl-4">
      <div 
        className={`flex items-center space-x-1 whitespace-nowrap transition-all duration-500 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <DollarSign className="w-3 h-3 animate-pulse" />
        <span className="font-semibold animate-fade-in">{currentCurrency.code}:</span>
        <span className="font-bold animate-fade-in">{currentCurrency.rate}</span>
      </div>
    </div>
  );
};

export default CurrencyStrip;
