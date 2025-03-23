
import React, { useEffect, useState, useRef } from 'react';
import { Clock, Globe, ArrowRightLeft, Cloud } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Expanded list of 50+ locations
const locations = [
  { city: "New York", country: "USA", timezone: "America/New_York" },
  { city: "London", country: "UK", timezone: "Europe/London" },
  { city: "Tokyo", country: "Japan", timezone: "Asia/Tokyo" },
  { city: "Sydney", country: "Australia", timezone: "Australia/Sydney" },
  { city: "Tel Aviv", country: "Israel", timezone: "Asia/Jerusalem" },
  { city: "Dubai", country: "UAE", timezone: "Asia/Dubai" },
  { city: "Paris", country: "France", timezone: "Europe/Paris" },
  { city: "Berlin", country: "Germany", timezone: "Europe/Berlin" },
  { city: "Toronto", country: "Canada", timezone: "America/Toronto" },
  { city: "Singapore", country: "Singapore", timezone: "Asia/Singapore" },
  { city: "Hong Kong", country: "China", timezone: "Asia/Hong_Kong" },
  { city: "Mexico City", country: "Mexico", timezone: "America/Mexico_City" },
  { city: "Rio de Janeiro", country: "Brazil", timezone: "America/Sao_Paulo" },
  { city: "Cape Town", country: "South Africa", timezone: "Africa/Johannesburg" },
  { city: "Auckland", country: "New Zealand", timezone: "Pacific/Auckland" },
  { city: "Moscow", country: "Russia", timezone: "Europe/Moscow" },
  { city: "Bangkok", country: "Thailand", timezone: "Asia/Bangkok" },
  { city: "Los Angeles", country: "USA", timezone: "America/Los_Angeles" },
  { city: "Chicago", country: "USA", timezone: "America/Chicago" },
  { city: "Mumbai", country: "India", timezone: "Asia/Kolkata" },
  { city: "Madrid", country: "Spain", timezone: "Europe/Madrid" },
  { city: "Rome", country: "Italy", timezone: "Europe/Rome" },
  { city: "Amsterdam", country: "Netherlands", timezone: "Europe/Amsterdam" },
  { city: "Brussels", country: "Belgium", timezone: "Europe/Brussels" },
  { city: "Vienna", country: "Austria", timezone: "Europe/Vienna" },
  { city: "Budapest", country: "Hungary", timezone: "Europe/Budapest" },
  { city: "Prague", country: "Czech Republic", timezone: "Europe/Prague" },
  { city: "Warsaw", country: "Poland", timezone: "Europe/Warsaw" },
  { city: "Stockholm", country: "Sweden", timezone: "Europe/Stockholm" },
  { city: "Oslo", country: "Norway", timezone: "Europe/Oslo" },
  { city: "Helsinki", country: "Finland", timezone: "Europe/Helsinki" },
  { city: "Copenhagen", country: "Denmark", timezone: "Europe/Copenhagen" },
  { city: "Athens", country: "Greece", timezone: "Europe/Athens" },
  { city: "Istanbul", country: "Turkey", timezone: "Europe/Istanbul" },
  { city: "Cairo", country: "Egypt", timezone: "Africa/Cairo" },
  { city: "Nairobi", country: "Kenya", timezone: "Africa/Nairobi" },
  { city: "Lagos", country: "Nigeria", timezone: "Africa/Lagos" },
  { city: "Casablanca", country: "Morocco", timezone: "Africa/Casablanca" },
  { city: "Tunis", country: "Tunisia", timezone: "Africa/Tunis" },
  { city: "Buenos Aires", country: "Argentina", timezone: "America/Argentina/Buenos_Aires" },
  { city: "Lima", country: "Peru", timezone: "America/Lima" },
  { city: "Bogota", country: "Colombia", timezone: "America/Bogota" },
  { city: "Santiago", country: "Chile", timezone: "America/Santiago" },
  { city: "Caracas", country: "Venezuela", timezone: "America/Caracas" },
  { city: "Manila", country: "Philippines", timezone: "Asia/Manila" },
  { city: "Jakarta", country: "Indonesia", timezone: "Asia/Jakarta" },
  { city: "Seoul", country: "South Korea", timezone: "Asia/Seoul" },
  { city: "Beijing", country: "China", timezone: "Asia/Shanghai" },
  { city: "Shanghai", country: "China", timezone: "Asia/Shanghai" },
  { city: "Taipei", country: "Taiwan", timezone: "Asia/Taipei" },
  { city: "Kuala Lumpur", country: "Malaysia", timezone: "Asia/Kuala_Lumpur" },
  { city: "Ho Chi Minh City", country: "Vietnam", timezone: "Asia/Ho_Chi_Minh" },
  { city: "Hanoi", country: "Vietnam", timezone: "Asia/Ho_Chi_Minh" },
  { city: "Brisbane", country: "Australia", timezone: "Australia/Brisbane" },
  { city: "Melbourne", country: "Australia", timezone: "Australia/Melbourne" },
  { city: "Perth", country: "Australia", timezone: "Australia/Perth" },
];

// Expanded list of 50+ currencies
const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "ILS", name: "Israeli Shekel" },
  { code: "INR", name: "Indian Rupee" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "AED", name: "UAE Dirham" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "ZAR", name: "South African Rand" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "THB", name: "Thai Baht" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "DKK", name: "Danish Krone" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "CZK", name: "Czech Koruna" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "RON", name: "Romanian Leu" },
  { code: "BGN", name: "Bulgarian Lev" },
  { code: "HRK", name: "Croatian Kuna" },
  { code: "ISK", name: "Icelandic Krona" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "VND", name: "Vietnamese Dong" },
  { code: "KRW", name: "South Korean Won" },
  { code: "EGP", name: "Egyptian Pound" },
  { code: "CLP", name: "Chilean Peso" },
  { code: "COP", name: "Colombian Peso" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "PEN", name: "Peruvian Sol" },
  { code: "UYU", name: "Uruguayan Peso" },
  { code: "DOP", name: "Dominican Peso" },
  { code: "CRC", name: "Costa Rican Colón" },
  { code: "QAR", name: "Qatari Riyal" },
  { code: "KWD", name: "Kuwaiti Dinar" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "JOD", name: "Jordanian Dinar" },
  { code: "BHD", name: "Bahraini Dinar" },
  { code: "OMR", name: "Omani Rial" },
  { code: "MAD", name: "Moroccan Dirham" },
  { code: "TWD", name: "Taiwan Dollar" },
];

const TimeAndCurrencyContent = () => {
  const [cityTimes, setCityTimes] = useState<{[key: string]: string}>({});
  const [currentTime, setCurrentTime] = useState('');
  const [displayLocations, setDisplayLocations] = useState(locations.slice(0, 16));
  const [searchLocation, setSearchLocation] = useState('');
  
  const activeTabRef = useRef<string>("time");
  
  useEffect(() => {
    updateCityTimes();
    
    const secondsInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    }, 1000);
    
    const minuteInterval = setInterval(updateCityTimes, 60000);
    
    return () => {
      clearInterval(secondsInterval);
      clearInterval(minuteInterval);
    };
  }, []);
  
  useEffect(() => {
    if (searchLocation.trim() === '') {
      setDisplayLocations(locations.slice(0, 16));
    } else {
      const filtered = locations.filter(
        loc => loc.city.toLowerCase().includes(searchLocation.toLowerCase()) || 
              loc.country.toLowerCase().includes(searchLocation.toLowerCase())
      );
      setDisplayLocations(filtered.slice(0, 16));
    }
  }, [searchLocation]);
  
  const updateCityTimes = () => {
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    };
    
    const now = new Date();
    const times: {[key: string]: string} = {};
    
    locations.forEach(location => {
      try {
        const localTime = new Date(now.toLocaleString('en-US', { timeZone: location.timezone }));
        times[location.city] = formatTime(localTime);
      } catch (error) {
        console.error(`Error getting time for ${location.city}:`, error);
        times[location.city] = 'Error';
      }
    });
    
    setCityTimes(times);
  };

  // Currency converter state
  const [amount, setAmount] = useState<string>("2");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [result, setResult] = useState<string>("");
  const [exchangeRates, setExchangeRates] = useState<{[key: string]: number}>({});
  const [isLoadingCurrency, setIsLoadingCurrency] = useState<boolean>(false);
  const [currencySearch, setCurrencySearch] = useState<string>("");
  const [filteredCurrencies, setFilteredCurrencies] = useState(currencies);

  // Weather state
  const [city, setCity] = useState<string>("New York");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (currencySearch.trim() === '') {
      setFilteredCurrencies(currencies);
    } else {
      const filtered = currencies.filter(
        curr => curr.code.toLowerCase().includes(currencySearch.toLowerCase()) || 
               curr.name.toLowerCase().includes(currencySearch.toLowerCase())
      );
      setFilteredCurrencies(filtered);
    }
  }, [currencySearch]);

  const fetchExchangeRates = async () => {
    try {
      setIsLoadingCurrency(true);
      const response = await fetch('https://api.exchangerate.host/latest?base=USD');
      const data = await response.json();
      if (data && data.rates) {
        setExchangeRates(data.rates);
      } else {
        throw new Error('Failed to fetch rates');
      }
    } catch (error) {
      console.error('Error fetching rates, using mock data:', error);
      const mockRates = {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 150.45,
        AUD: 1.52,
        CAD: 1.37,
        CHF: 0.91,
        CNY: 7.24,
        ILS: 3.67,
        INR: 83.12,
        SGD: 1.35,
        AED: 3.67,
        HKD: 7.81,
        NZD: 1.64,
        ZAR: 18.53,
        BRL: 5.05,
        MXN: 16.75,
        THB: 35.61,
        RUB: 91.23,
      };
      setExchangeRates(mockRates);
    } finally {
      setIsLoadingCurrency(false);
    }
  };

  const convertCurrency = () => {
    setIsLoadingCurrency(true);
    
    if (!amount || isNaN(Number(amount))) {
      setResult("Please enter a valid amount");
      setIsLoadingCurrency(false);
      return;
    }

    try {
      const numericAmount = parseFloat(amount);
      
      if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
        const amountInUSD = fromCurrency === "USD" 
          ? numericAmount 
          : numericAmount / exchangeRates[fromCurrency];
        
        const convertedAmount = toCurrency === "USD"
          ? amountInUSD
          : amountInUSD * exchangeRates[toCurrency];
        
        setResult(`${numericAmount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
      } else {
        setResult("Currency conversion failed");
      }
    } catch (error) {
      console.error("Conversion error:", error);
      setResult("Currency conversion failed");
    }
    
    setIsLoadingCurrency(false);
  };

  const fetchWeatherData = async () => {
    if (!city) return;
    
    setIsLoadingWeather(true);
    setWeatherError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8c392034a39f5ebcdcad3a78ae2783c3`
      );
      
      if (!response.ok) {
        throw new Error('City not found or weather data unavailable');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeatherError('Unable to fetch weather data. Please try another city.');
    } finally {
      setIsLoadingWeather(false);
    }
  };

  useEffect(() => {
    // Fetch weather for default city
    fetchWeatherData();
  }, []);

  return (
    <div className="p-4 md:p-6 flex flex-col items-center animate-fade-in">
      <div className="w-full max-w-4xl">
        <Tabs 
          defaultValue="time" 
          className="w-full"
          onValueChange={(value) => {
            activeTabRef.current = value;
            if (value === "time") {
              updateCityTimes();
            }
          }}
        >
          <TabsList className="grid grid-cols-3 mb-6 w-full">
            <TabsTrigger value="time" className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              <span>World Time</span>
            </TabsTrigger>
            <TabsTrigger value="currency" className="flex items-center justify-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Currency Converter</span>
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center justify-center gap-2">
              <Cloud className="h-4 w-4" />
              <span>Weather</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="time" className="mt-4 animate-fade-in">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex justify-center mb-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{currentTime}</div>
                  <p className="text-gray-500">Current Local Time</p>
                </div>
              </div>
              
              <div className="px-6 mb-4">
                <Input
                  type="text"
                  placeholder="Search for a city or country..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-b-lg">
                {displayLocations.map((location) => (
                  <div key={location.city} className="flex flex-col bg-white p-3 rounded-md shadow-sm">
                    <span className="font-medium text-[#2C5AAE]">{location.city}</span>
                    <span className="text-xs text-gray-500">{location.country}</span>
                    <span className="text-gray-700 mt-1">{cityTimes[location.city] || '--:--'}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="currency" className="mt-4 animate-fade-in">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6">
              <h3 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
                Currency Converter
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="currency-search" className="block text-sm font-medium text-gray-700 mb-1">
                      Search Currency
                    </label>
                    <Input
                      id="currency-search"
                      type="text"
                      value={currencySearch}
                      onChange={(e) => setCurrencySearch(e.target.value)}
                      placeholder="Search currency by name or code"
                      className="w-full mb-4"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="from-currency" className="block text-sm font-medium text-gray-700 mb-1">
                      From
                    </label>
                    <Select
                      value={fromCurrency}
                      onValueChange={setFromCurrency}
                    >
                      <SelectTrigger id="from-currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCurrencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="to-currency" className="block text-sm font-medium text-gray-700 mb-1">
                      To
                    </label>
                    <Select
                      value={toCurrency}
                      onValueChange={setToCurrency}
                    >
                      <SelectTrigger id="to-currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCurrencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <button
                  onClick={convertCurrency}
                  disabled={isLoadingCurrency}
                  className="w-full py-2 px-4 rounded-md bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  {isLoadingCurrency ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  ) : (
                    <ArrowRightLeft className="w-5 h-5 mr-2" />
                  )}
                  Convert
                </button>
                
                {result && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Result</p>
                    <p className="text-xl font-semibold text-[#2C5AAE]">{result}</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="weather" className="mt-4 animate-fade-in">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6">
              <h3 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
                Weather Forecast
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-grow">
                    <Input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter a city name"
                      className="w-full"
                    />
                  </div>
                  <button
                    onClick={fetchWeatherData}
                    disabled={isLoadingWeather}
                    className="py-2 px-4 rounded-md bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    {isLoadingWeather ? 'Loading...' : 'Search'}
                  </button>
                </div>
                
                {weatherError && (
                  <div className="p-4 text-red-500 bg-red-50 rounded-md">
                    {weatherError}
                  </div>
                )}
                
                {weatherData && !weatherError && (
                  <div className="mt-6 text-center">
                    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <h4 className="text-2xl font-bold text-[#2C5AAE]">{weatherData.name}, {weatherData.sys.country}</h4>
                      
                      <div className="flex items-center mt-4">
                        <img 
                          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                          alt={weatherData.weather[0].description}
                          className="w-16 h-16"
                        />
                        <div className="text-4xl font-bold ml-2">{Math.round(weatherData.main.temp)}°C</div>
                      </div>
                      
                      <p className="text-lg capitalize mt-2">{weatherData.weather[0].description}</p>
                      
                      <div className="grid grid-cols-2 gap-x-10 gap-y-2 mt-6 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Feels like:</span>
                          <span className="font-semibold">{Math.round(weatherData.main.feels_like)}°C</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Humidity:</span>
                          <span className="font-semibold">{weatherData.main.humidity}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Wind:</span>
                          <span className="font-semibold">{Math.round(weatherData.wind.speed * 3.6)} km/h</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Pressure:</span>
                          <span className="font-semibold">{weatherData.main.pressure} hPa</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Data provided by OpenWeatherMap</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TimeAndCurrencyContent;
