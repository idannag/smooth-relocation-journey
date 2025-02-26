import LatestArticles from "@/components/LatestArticles";
import Chatbot from "@/components/Chatbot";
import { Globe, Clock, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

interface LightboxProps {
  url: string;
  onClose: () => void;
}

// Time and Currency Converter Component for the Lightbox
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
              {currentTime.split(",")[1].trim()}
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

// Orders Component for the Lightbox
const Orders = () => {
  const orderItems = [
    {
      id: "ORD-12345",
      date: "2023-04-15",
      service: "Visa Consultation",
      status: "Completed",
      amount: "$150.00"
    },
    {
      id: "ORD-12346",
      date: "2023-05-02",
      service: "Housing Search",
      status: "In Progress",
      amount: "$350.00"
    },
    {
      id: "ORD-12347",
      date: "2023-05-10",
      service: "School Registration",
      status: "Pending",
      amount: "$200.00"
    },
    {
      id: "ORD-12348",
      date: "2023-06-01",
      service: "Airport Pickup",
      status: "Scheduled",
      amount: "$75.00"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
        My Orders
      </h2>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-[#2C5AAE]/10 to-[#40E0D0]/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orderItems.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-[#2C5AAE] hover:text-[#40E0D0] transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-50">
          <button className="w-full py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-md font-medium hover:opacity-95 transition-opacity">
            Request New Service
          </button>
        </div>
      </div>
    </div>
  );
};

// Destination Information Component for Lightbox
const DestinationInfo = ({ city }: { city: string }) => {
  const destinations = {
    "New York": {
      country: "USA",
      description: "The city that never sleeps offers incredible career opportunities, diverse neighborhoods, and a vibrant cultural scene.",
      climate: "Four distinct seasons with hot summers and cold winters.",
      costOfLiving: "Very high, especially housing in Manhattan.",
      languages: "English (primary), Spanish widely spoken.",
      keyFacts: [
        "Home to over 8.8 million people",
        "Major financial and cultural hub",
        "Extensive public transportation system",
        "Top-rated universities and schools",
        "Diverse international communities"
      ]
    },
    "London": {
      country: "UK",
      description: "A historic city blending tradition with innovation, offering excellent career growth and cultural experiences.",
      climate: "Mild with frequent rain; cool winters and warm summers.",
      costOfLiving: "Very high, particularly housing and transportation.",
      languages: "English (primary), over 300 languages spoken.",
      keyFacts: [
        "Home to over 9 million people",
        "Global finance and business center",
        "Renowned educational institutions",
        "Rich history dating back to Roman times",
        "Extensive arts and theatre scene"
      ]
    },
    "Tel Aviv": {
      country: "Israel",
      description: "A modern, vibrant Mediterranean city known for its tech scene, beaches, and unique cultural blend.",
      climate: "Mediterranean climate with hot summers and mild winters.",
      costOfLiving: "High, especially housing in central areas.",
      languages: "Hebrew (primary), Arabic, English widely spoken.",
      keyFacts: [
        "Tech hub known as 'Silicon Wadi'",
        "Renowned for startup ecosystem",
        "Beautiful Mediterranean beaches",
        "Rich culinary scene",
        "Vibrant nightlife and cultural activities"
      ]
    },
    "Berlin": {
      country: "Germany",
      description: "A creative, affordable European capital with a rich history and thriving arts scene.",
      climate: "Continental with warm summers and cold winters.",
      costOfLiving: "Moderate, affordable compared to other European capitals.",
      languages: "German (primary), English widely spoken.",
      keyFacts: [
        "Diverse and multicultural population",
        "Thriving arts and music scene",
        "Excellent public transportation",
        "Rich historical landmarks",
        "Growing tech and startup hub"
      ]
    },
    // Add more cities as needed
  };

  const cityInfo = destinations[city as keyof typeof destinations] || {
    country: "Information coming soon",
    description: "Detailed information about this destination will be available soon.",
    climate: "Information pending",
    costOfLiving: "Information pending",
    languages: "Information pending",
    keyFacts: ["Stay tuned for detailed information about this destination."]
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
        {city}
      </h2>
      <p className="text-center text-gray-600 mb-8">{cityInfo.country}</p>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-[#2C5AAE] mb-3">About</h3>
          <p className="text-gray-700 mb-6">{cityInfo.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-[#2C5AAE] mb-2">Climate</h4>
              <p className="text-sm text-gray-700">{cityInfo.climate}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-[#2C5AAE] mb-2">Cost of Living</h4>
              <p className="text-sm text-gray-700">{cityInfo.costOfLiving}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-[#2C5AAE] mb-2">Languages</h4>
              <p className="text-sm text-gray-700">{cityInfo.languages}</p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-[#2C5AAE] mb-3">Key Facts</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {cityInfo.keyFacts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
        
        <div className="px-6 py-4 bg-gray-50">
          <button className="w-full py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-md font-medium hover:opacity-95 transition-opacity">
            Get Relocation Support for {city}
          </button>
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-sm">
        Need personalized assistance with relocating to {city}? Our experts can help you navigate the entire process.
      </div>
    </div>
  );
};

const getLightboxContent = (url: string) => {
  if (url === 'news') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8">
        <h2 className="text-3xl font-bold text-center mb-8 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
          Latest Relocation News
        </h2>
        <LatestArticles />
      </div>
    );
  }
  if (url === 'guides') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8">
        <h2 className="text-3xl font-bold text-center mb-8 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
          Relocation Guides
        </h2>
        <LatestArticles />
      </div>
    );
  }
  if (url === 'chatbot') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
          Your 24/7 Relocation Assistant
        </h2>
        <p className="text-center text-gray-600 mb-8">Ask anything about your relocation journey or try one of the suggested questions below</p>
        <Chatbot inLightbox={true} onClose={() => {}} />
      </div>
    );
  }
  if (url === 'orders') {
    return <Orders />;
  }
  if (url === 'time-currency') {
    return <TimeAndCurrencyConverter />;
  }
  if (url.startsWith('destination:')) {
    const city = url.split(':')[1];
    return <DestinationInfo city={city} />;
  }
  return (
    <iframe
      src={url}
      className="w-full h-full"
      loading="eager"
    />
  );
};

const Lightbox = ({ url, onClose }: LightboxProps) => {
  return (
    <div 
      className="fixed inset-0 z-[100] animate-fade-in p-4 md:p-8" 
      style={{ animationDuration: '100ms' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
      />
      <div className="relative w-full h-full overflow-auto rounded-2xl">
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors hover:scale-110"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="bg-white rounded-2xl overflow-hidden h-full">
          {getLightboxContent(url)}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
