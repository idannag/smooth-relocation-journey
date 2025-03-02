
import { useState, useEffect } from "react";
import { Globe, Clock } from "lucide-react";

const TimeAndCurrencyConverter = () => {
  const [activeTab, setActiveTab] = useState<'time' | 'currency'>('time');
  const [selectedTimezone, setSelectedTimezone] = useState("America/New_York");
  const [currentTime, setCurrentTime] = useState("");
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("");
  const [rates, setRates] = useState<Record<string, number>>({});

  const timezones = [
    { value: "America/New_York", label: "New York" },
    { value: "Europe/London", label: "London" },
    { value: "Asia/Tokyo", label: "Tokyo" },
    { value: "Europe/Paris", label: "Paris" },
    { value: "Asia/Dubai", label: "Dubai" },
    { value: "Asia/Singapore", label: "Singapore" },
    { value: "Australia/Sydney", label: "Sydney" },
    { value: "Asia/Tel_Aviv", label: "Tel Aviv" }
  ];

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "ILS", name: "Israeli Shekel" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" }
  ];

  // Update time based on selected timezone
  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleString("en-US", {
        timeZone: selectedTimezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      setCurrentTime(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedTimezone]);

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        if (data && data.rates) {
          setRates(data.rates);
          convert(amount, fromCurrency, toCurrency, data.rates);
        } else {
          throw new Error('Failed to fetch rates');
        }
      } catch (error) {
        console.error('Error fetching rates, using mock data:', error);
        // Fallback to mock rates
        const mockRates = {
          USD: 1,
          EUR: 0.92,
          GBP: 0.79,
          ILS: 3.67,
          JPY: 150.45,
          AUD: 1.52,
          CAD: 1.36,
          CHF: 0.89
        };
        setRates(mockRates);
        convert(amount, fromCurrency, toCurrency, mockRates);
      }
    };

    fetchRates();
  }, []);

  const convert = (amount: string, from: string, to: string, rates: Record<string, number>) => {
    if (!rates || !rates[from] || !rates[to]) return;
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) return;
    
    // Convert to USD first (base currency), then to target
    const inUSD = from === "USD" ? amountNum : amountNum / rates[from];
    const converted = to === "USD" ? inUSD : inUSD * rates[to];
    
    setResult(converted.toFixed(2));
  };

  const handleConvert = () => {
    convert(amount, fromCurrency, toCurrency, rates);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] p-4">
        <h2 className="text-white text-center text-xl font-bold">Global Tools</h2>
      </div>
      
      <div className="flex border-b">
        <button
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === 'time'
              ? 'text-[#2C5AAE] border-b-2 border-[#2C5AAE]'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('time')}
        >
          <Clock className="inline-block mr-2 h-4 w-4" />
          World Time
        </button>
        <button
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === 'currency'
              ? 'text-[#2C5AAE] border-b-2 border-[#2C5AAE]'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('currency')}
        >
          <Globe className="inline-block mr-2 h-4 w-4" />
          Currency Converter
        </button>
      </div>
      
      {activeTab === 'time' ? (
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Timezone
            </label>
            <select
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#2C5AAE] focus:border-transparent"
            >
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-500 mb-1">Current Time</div>
            <div className="text-2xl font-bold text-[#2C5AAE]">
              {currentTime.split(",")[1]?.trim()}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              {currentTime.split(",")[0]}, {currentTime.split(",")[2]}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                convert(e.target.value, fromCurrency, toCurrency, rates);
              }}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#2C5AAE] focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => {
                  setFromCurrency(e.target.value);
                  convert(amount, e.target.value, toCurrency, rates);
                }}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#2C5AAE] focus:border-transparent"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <select
                value={toCurrency}
                onChange={(e) => {
                  setToCurrency(e.target.value);
                  convert(amount, fromCurrency, e.target.value, rates);
                }}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#2C5AAE] focus:border-transparent"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            onClick={handleConvert}
            className="w-full py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-md font-medium hover:opacity-95 transition-opacity"
          >
            Convert
          </button>
          
          {result && (
            <div className="mt-4 bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-500 mb-1">Result</div>
              <div className="text-2xl font-bold text-[#2C5AAE]">
                {amount} {fromCurrency} = {result} {toCurrency}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeAndCurrencyConverter;
