
import LatestArticles from "@/components/LatestArticles";
import Chatbot from "@/components/Chatbot";
import { Globe, Clock, Calendar, ShoppingCart, Headphones } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

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
      <div className="bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] p-3">
        <h2 className="text-white text-center text-lg font-bold">Global Tools</h2>
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

// Orders Component for the Lightbox
const Orders = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'services'>('services');
  
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

  const availableServices = [
    {
      id: "SRV-001",
      service: "Visa & Immigration Support",
      description: "Expert assistance with visa applications, work permits, and immigration procedures",
      price: "$300",
      duration: "2-4 weeks"
    },
    {
      id: "SRV-002",
      service: "Home Finding",
      description: "Personalized housing search based on your preferences and budget",
      price: "$500",
      duration: "1-3 weeks"
    },
    {
      id: "SRV-003",
      service: "School Search",
      description: "Finding the right schools or educational institutions for your children",
      price: "$350",
      duration: "1-2 weeks"
    },
    {
      id: "SRV-004",
      service: "Area Orientation",
      description: "Guided tour of your new city with insights on neighborhoods, amenities, and local culture",
      price: "$200",
      duration: "1 day"
    },
    {
      id: "SRV-005",
      service: "Document Translation",
      description: "Professional translation of important documents for local authorities",
      price: "$25 per page",
      duration: "3-5 days"
    },
    {
      id: "SRV-006",
      service: "Banking Setup",
      description: "Assistance with opening bank accounts and setting up financial services",
      price: "$150",
      duration: "1 week"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 sm:p-4 max-w-4xl mx-auto h-full overflow-y-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
        Client Services
      </h2>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'services'
                ? 'text-[#2C5AAE] border-b-2 border-[#2C5AAE]'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('services')}
          >
            <Headphones className="inline-block mr-2 h-4 w-4" />
            Available Services
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'orders'
                ? 'text-[#2C5AAE] border-b-2 border-[#2C5AAE]'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingCart className="inline-block mr-2 h-4 w-4" />
            My Orders
          </button>
        </div>
        
        {activeTab === 'orders' ? (
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
        ) : (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableServices.map((service) => (
              <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-[#2C5AAE]">{service.service}</h3>
                <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                <div className="flex justify-between mt-4">
                  <span className="text-sm">
                    <strong>Price:</strong> {service.price}
                  </span>
                  <span className="text-sm">
                    <strong>Duration:</strong> {service.duration}
                  </span>
                </div>
                <button className="w-full mt-4 py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-md text-sm hover:opacity-90 transition-opacity">
                  Order Service
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="px-6 py-4 bg-gray-50">
          <button className="w-full py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-md font-medium hover:opacity-95 transition-opacity">
            {activeTab === 'orders' ? 'Request Custom Service' : 'View All Services'}
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
    }
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
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 sm:p-6 max-w-4xl mx-auto h-full overflow-y-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
        {city}
      </h2>
      <p className="text-center text-gray-600 mb-4">{cityInfo.country}</p>
      
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

// Article Detail Component for Lightbox
const ArticleDetail = ({ title }: { title: string }) => {
  // Mock article data
  const articleContent = {
    title: title,
    date: "May 15, 2023",
    author: "Ocean Relocation Team",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.</p>
      <p>Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus.</p>
      <h3>Key Points</h3>
      <ul>
        <li>International mobility is changing rapidly post-pandemic</li>
        <li>Remote work policies are affecting relocation decisions</li>
        <li>Housing markets have seen significant shifts in expatriate hubs</li>
        <li>New immigration policies are being introduced in many countries</li>
      </ul>
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet.</p>
      <p>Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit.</p>
    `,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 sm:p-6 max-w-4xl mx-auto h-full overflow-y-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
        {articleContent.title}
      </h2>
      <div className="flex justify-center items-center gap-2 text-gray-600 mb-4">
        <span>{articleContent.date}</span>
        <span>•</span>
        <span>{articleContent.author}</span>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <img 
          src={articleContent.image} 
          alt={articleContent.title} 
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <div 
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: articleContent.content }}
          />
        </div>
        
        <div className="px-6 py-4 bg-gray-50 flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Relocation</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Global Mobility</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Immigration</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Trends</span>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button className="px-6 py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-md font-medium hover:opacity-95 transition-opacity">
          Read More Articles
        </button>
      </div>
    </div>
  );
};

// News Content Component for Lightbox
const NewsContent = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 sm:p-6 h-full overflow-y-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
        Latest Relocation News
      </h2>
      <LatestArticles />
      <div className="mt-6 text-center">
        <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white font-semibold 
          hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          Get relocation updates
        </button>
      </div>
    </div>
  );
};

// Guides Content Component for Lightbox
const GuidesContent = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 sm:p-6 h-full overflow-y-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
        Relocation Guides
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200">
              <img 
                src={`https://source.unsplash.com/random/300x200?relocation,travel,${index}`} 
                alt="Guide Cover" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-[#2C5AAE]">
                {index === 1 ? "Complete Relocation Checklist" : 
                 index === 2 ? "Guide to Schooling Abroad" : 
                 index === 3 ? "Housing Search Tips" : 
                 index === 4 ? "Visa Application Process" : 
                 index === 5 ? "Banking & Finance Setup" : 
                 "Healthcare Systems Explained"}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Essential information to help you navigate the complexities of international relocation.
              </p>
              <button className="text-sm text-[#2C5AAE] font-medium hover:underline">
                Read Guide
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Iframe Content Component for Lightbox
const IframeContent = ({ url }: { url: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-white h-full w-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5AAE]"></div>
            <p className="mt-3 text-[#2C5AAE] font-medium">Loading content...</p>
          </div>
        </div>
      )}
      <iframe 
        src={url} 
        className="w-full h-full border-0" 
        onLoad={() => setIsLoading(false)}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        title="External Content"
        loading="lazy"
      />
    </div>
  );
};

// Function to determine which content to render in the lightbox
const getLightboxContent = (url: string, onClose: () => void) => {
  // Handle special internal links
  if (url === 'news') {
    return <NewsContent />;
  } else if (url === 'guides') {
    return <GuidesContent />;
  } else if (url === 'chatbot') {
    return <Chatbot onClose={onClose} inLightbox={true} />;
  } else if (url === 'orders') {
    return <Orders />;
  } else if (url === 'time-currency') {
    return <TimeAndCurrencyConverter />;
  } else if (url.startsWith('destination:')) {
    const city = url.split(':')[1];
    return <DestinationInfo city={city} />;
  } else if (url.startsWith('article:')) {
    const title = url.split(':')[1];
    return <ArticleDetail title={title} />;
  } else if (url.startsWith('http')) {
    // External URL, show in iframe
    return <IframeContent url={url} />;
  }
  
  // Default or fallback content
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-gradient-to-r from-blue-50 to-blue-100">
      <h3 className="text-xl font-bold text-gray-700 mb-2">Content Not Found</h3>
      <p className="text-gray-600 mb-4">The requested content for: "{url}" could not be found.</p>
      <button 
        className="px-4 py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-md"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

// Main Lightbox Component
const Lightbox = ({ url, onClose }: LightboxProps) => {
  const [closing, setClosing] = useState(false);
  const isMobile = useIsMobile();

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        closing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`relative w-full ${
          isMobile ? 'h-full' : 'h-[90vh] max-w-5xl rounded-xl'
        } bg-white overflow-hidden transition-transform duration-300 ${
          closing ? 'scale-95' : 'scale-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-1.5 shadow-md hover:bg-white transition-colors"
          onClick={handleClose}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="h-full overflow-auto">
          {getLightboxContent(url, handleClose)}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
