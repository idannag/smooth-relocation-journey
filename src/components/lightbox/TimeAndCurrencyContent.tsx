import React, { useEffect, useState, useRef } from 'react';
import { Clock, Globe, ArrowRightLeft, Cloud, Droplets, Wind, Sun } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const locations = [{
  city: "New York",
  country: "USA",
  timezone: "America/New_York"
}, {
  city: "London",
  country: "UK",
  timezone: "Europe/London"
}, {
  city: "Tokyo",
  country: "Japan",
  timezone: "Asia/Tokyo"
}, {
  city: "Sydney",
  country: "Australia",
  timezone: "Australia/Sydney"
}, {
  city: "Tel Aviv",
  country: "Israel",
  timezone: "Asia/Jerusalem"
}, {
  city: "Dubai",
  country: "UAE",
  timezone: "Asia/Dubai"
}, {
  city: "Paris",
  country: "France",
  timezone: "Europe/Paris"
}, {
  city: "Berlin",
  country: "Germany",
  timezone: "Europe/Berlin"
}, {
  city: "Toronto",
  country: "Canada",
  timezone: "America/Toronto"
}, {
  city: "Singapore",
  country: "Singapore",
  timezone: "Asia/Singapore"
}, {
  city: "Hong Kong",
  country: "China",
  timezone: "Asia/Hong_Kong"
}, {
  city: "Mexico City",
  country: "Mexico",
  timezone: "America/Mexico_City"
}, {
  city: "Rio de Janeiro",
  country: "Brazil",
  timezone: "America/Sao_Paulo"
}, {
  city: "Cape Town",
  country: "South Africa",
  timezone: "Africa/Johannesburg"
}, {
  city: "Auckland",
  country: "New Zealand",
  timezone: "Pacific/Auckland"
}, {
  city: "Moscow",
  country: "Russia",
  timezone: "Europe/Moscow"
}, {
  city: "Bangkok",
  country: "Thailand",
  timezone: "Asia/Bangkok"
}, {
  city: "Los Angeles",
  country: "USA",
  timezone: "America/Los_Angeles"
}, {
  city: "Chicago",
  country: "USA",
  timezone: "America/Chicago"
}, {
  city: "Mumbai",
  country: "India",
  timezone: "Asia/Kolkata"
}, {
  city: "Amsterdam",
  country: "Netherlands",
  timezone: "Europe/Amsterdam"
}, {
  city: "Madrid",
  country: "Spain",
  timezone: "Europe/Madrid"
}, {
  city: "Seoul",
  country: "South Korea",
  timezone: "Asia/Seoul"
}, {
  city: "Stockholm",
  country: "Sweden",
  timezone: "Europe/Stockholm"
}, {
  city: "Vienna",
  country: "Austria",
  timezone: "Europe/Vienna"
}, {
  city: "Zurich",
  country: "Switzerland",
  timezone: "Europe/Zurich"
}, {
  city: "Brussels",
  country: "Belgium",
  timezone: "Europe/Brussels"
}, {
  city: "Dublin",
  country: "Ireland",
  timezone: "Europe/Dublin"
}, {
  city: "Athens",
  country: "Greece",
  timezone: "Europe/Athens"
}, {
  city: "Rome",
  country: "Italy",
  timezone: "Europe/Rome"
}, {
  city: "Lisbon",
  country: "Portugal",
  timezone: "Europe/Lisbon"
}, {
  city: "Warsaw",
  country: "Poland",
  timezone: "Europe/Warsaw"
}, {
  city: "Johannesburg",
  country: "South Africa",
  timezone: "Africa/Johannesburg"
}, {
  city: "Cairo",
  country: "Egypt",
  timezone: "Africa/Cairo"
}, {
  city: "Istanbul",
  country: "Turkey",
  timezone: "Europe/Istanbul"
}, {
  city: "Nairobi",
  country: "Kenya",
  timezone: "Africa/Nairobi"
}, {
  city: "Manila",
  country: "Philippines",
  timezone: "Asia/Manila"
}, {
  city: "Jakarta",
  country: "Indonesia",
  timezone: "Asia/Jakarta"
}, {
  city: "Kuala Lumpur",
  country: "Malaysia",
  timezone: "Asia/Kuala_Lumpur"
}, {
  city: "Shanghai",
  country: "China",
  timezone: "Asia/Shanghai"
}];
const TimeAndCurrencyContent = () => {
  const [cityTimes, setCityTimes] = useState<{
    [key: string]: string;
  }>({});
  const [currentTime, setCurrentTime] = useState('');
  const [displayLocations, setDisplayLocations] = useState(locations);
  const [searchLocation, setSearchLocation] = useState('');
  const activeTabRef = useRef<string>("time");
  const [weatherCity, setWeatherCity] = useState('London');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
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
      setDisplayLocations(locations);
    } else {
      const filtered = locations.filter(loc => loc.city.toLowerCase().includes(searchLocation.toLowerCase()) || loc.country.toLowerCase().includes(searchLocation.toLowerCase()));
      setDisplayLocations(filtered);
    }
  }, [searchLocation]);
  useEffect(() => {
    if (activeTabRef.current === "weather") {
      fetchWeatherData();
    }
  }, [weatherCity]);
  useEffect(() => {
    if (activeTabRef.current === "weather" && !weatherData) {
      fetchWeatherData();
    }
  }, [activeTabRef.current]);
  const fetchWeatherData = async () => {
    if (!weatherCity) return;
    setWeatherLoading(true);
    setWeatherError(null);
    try {
      // Fetch current weather
      const currentResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=74af2ebb879a48ed9ee111314250804&q=${weatherCity}&aqi=no`);
      if (!currentResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const currentData = await currentResponse.json();
      setWeatherData(currentData);

      // Fetch forecast
      const forecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=74af2ebb879a48ed9ee111314250804&q=${weatherCity}&days=5&aqi=no&alerts=no`);
      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch forecast data');
      }
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherError('Failed to fetch weather data. Please try again.');
    } finally {
      setWeatherLoading(false);
    }
  };
  const updateCityTimes = () => {
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    };
    const now = new Date();
    const times: {
      [key: string]: string;
    } = {};
    locations.forEach(location => {
      try {
        const localTime = new Date(now.toLocaleString('en-US', {
          timeZone: location.timezone
        }));
        times[location.city] = formatTime(localTime);
      } catch (error) {
        console.error(`Error getting time for ${location.city}:`, error);
        times[location.city] = 'Error';
      }
    });
    setCityTimes(times);
  };
  const [amount, setAmount] = useState<string>("2");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [result, setResult] = useState<string>("");
  const [exchangeRates, setExchangeRates] = useState<{
    [key: string]: number;
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currencies = [{
    code: "USD",
    name: "US Dollar"
  }, {
    code: "EUR",
    name: "Euro"
  }, {
    code: "GBP",
    name: "British Pound"
  }, {
    code: "JPY",
    name: "Japanese Yen"
  }, {
    code: "AUD",
    name: "Australian Dollar"
  }, {
    code: "CAD",
    name: "Canadian Dollar"
  }, {
    code: "CHF",
    name: "Swiss Franc"
  }, {
    code: "CNY",
    name: "Chinese Yuan"
  }, {
    code: "ILS",
    name: "Israeli Shekel"
  }, {
    code: "INR",
    name: "Indian Rupee"
  }, {
    code: "SGD",
    name: "Singapore Dollar"
  }, {
    code: "AED",
    name: "UAE Dirham"
  }, {
    code: "HKD",
    name: "Hong Kong Dollar"
  }, {
    code: "NZD",
    name: "New Zealand Dollar"
  }, {
    code: "ZAR",
    name: "South African Rand"
  }, {
    code: "BRL",
    name: "Brazilian Real"
  }, {
    code: "MXN",
    name: "Mexican Peso"
  }, {
    code: "THB",
    name: "Thai Baht"
  }, {
    code: "RUB",
    name: "Russian Ruble"
  }, {
    code: "SEK",
    name: "Swedish Krona"
  }, {
    code: "NOK",
    name: "Norwegian Krone"
  }, {
    code: "DKK",
    name: "Danish Krone"
  }, {
    code: "PLN",
    name: "Polish Złoty"
  }, {
    code: "CZK",
    name: "Czech Koruna"
  }, {
    code: "HUF",
    name: "Hungarian Forint"
  }, {
    code: "RON",
    name: "Romanian Leu"
  }, {
    code: "TRY",
    name: "Turkish Lira"
  }, {
    code: "PHP",
    name: "Philippine Peso"
  }, {
    code: "IDR",
    name: "Indonesian Rupiah"
  }, {
    code: "MYR",
    name: "Malaysian Ringgit"
  }, {
    code: "KRW",
    name: "South Korean Won"
  }, {
    code: "EGP",
    name: "Egyptian Pound"
  }, {
    code: "NGN",
    name: "Nigerian Naira"
  }, {
    code: "KES",
    name: "Kenyan Shilling"
  }, {
    code: "SAR",
    name: "Saudi Riyal"
  }, {
    code: "QAR",
    name: "Qatari Riyal"
  }, {
    code: "KWD",
    name: "Kuwaiti Dinar"
  }, {
    code: "MAD",
    name: "Moroccan Dirham"
  }, {
    code: "VND",
    name: "Vietnamese Dong"
  }, {
    code: "COP",
    name: "Colombian Peso"
  }];
  useEffect(() => {
    fetchExchangeRates();
  }, []);
  const fetchExchangeRates = async () => {
    try {
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
        SEK: 10.45,
        NOK: 10.82,
        DKK: 6.86,
        PLN: 4.01,
        CZK: 23.14,
        HUF: 362.85,
        RON: 4.57,
        TRY: 32.54,
        PHP: 57.32,
        IDR: 15724.56,
        MYR: 4.72,
        KRW: 1367.89,
        EGP: 30.92,
        NGN: 1507.23,
        KES: 130.47,
        SAR: 3.75,
        QAR: 3.64,
        KWD: 0.31,
        MAD: 10.02,
        VND: 25347.62,
        COP: 3957.83
      };
      setExchangeRates(mockRates);
    }
  };
  const convertCurrency = () => {
    setIsLoading(true);
    if (!amount || isNaN(Number(amount))) {
      setResult("Please enter a valid amount");
      setIsLoading(false);
      return;
    }
    try {
      const numericAmount = parseFloat(amount);
      if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
        const amountInUSD = fromCurrency === "USD" ? numericAmount : numericAmount / exchangeRates[fromCurrency];
        const convertedAmount = toCurrency === "USD" ? amountInUSD : amountInUSD * exchangeRates[toCurrency];
        setResult(`${numericAmount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
      } else {
        setResult("Currency conversion failed");
      }
    } catch (error) {
      console.error("Conversion error:", error);
      setResult("Currency conversion failed");
    }
    setIsLoading(false);
  };

  // Format date from YYYY-MM-DD to readable format (e.g., "Mon, Apr 8")
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  return <div className="p-4 md:p-6 flex flex-col items-center animate-fade-in">
      <div className="w-full max-w-4xl">
        <Tabs defaultValue="time" className="w-full" onValueChange={value => {
        activeTabRef.current = value;
        if (value === "time") {
          updateCityTimes();
        }
        if (value === "weather" && !weatherData) {
          fetchWeatherData();
        }
      }}>
          <TabsList className="grid grid-cols-3 mb-6 w-full border border-gray-200">
            <TabsTrigger value="time" className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              <span>World Time</span>
            </TabsTrigger>
            <TabsTrigger value="currency" className="flex items-center justify-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Currency </span>
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
                <Input type="text" placeholder="Search for a city or country..." value={searchLocation} onChange={e => setSearchLocation(e.target.value)} className="w-full" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-b-lg max-h-[500px] overflow-y-auto">
                {displayLocations.map(location => <div key={location.city} className="flex flex-col bg-white p-3 rounded-md shadow-sm">
                    <span className="font-medium text-[#2C5AAE]">{location.city}</span>
                    <span className="text-xs text-gray-500">{location.country}</span>
                    <span className="text-gray-700 mt-1">{cityTimes[location.city] || '--:--'}</span>
                  </div>)}
              </div>
            </div>
          </TabsContent>
          
          
          <TabsContent value="currency" className="mt-4 animate-fade-in">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6">
              
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <Input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="from-currency" className="block text-sm font-medium text-gray-700 mb-1">
                      From
                    </label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger id="from-currency" className="w-full">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent className="max-h-80">
                        {currencies.map(currency => <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="to-currency" className="block text-sm font-medium text-gray-700 mb-1">
                      To
                    </label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger id="to-currency" className="w-full">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent className="max-h-80">
                        {currencies.map(currency => <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <button onClick={convertCurrency} disabled={isLoading} className="w-full py-2 px-4 rounded-md bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center">
                  {isLoading ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div> : <ArrowRightLeft className="w-5 h-5 mr-2" />}
                  Convert
                </button>
                
                {result && <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Result</p>
                    <p className="text-xl font-semibold text-[#2C5AAE]">{result}</p>
                  </div>}
              </div>
            </div>
          </TabsContent>
          
          
          <TabsContent value="weather" className="mt-4 animate-fade-in">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6">
              <div className="mb-6">
                <label htmlFor="weather-city" className="block text-sm font-medium text-gray-700 mb-1">
                  Search City
                </label>
                <div className="flex gap-2">
                  <Input id="weather-city" value={weatherCity} onChange={e => setWeatherCity(e.target.value)} placeholder="Enter city name..." className="w-full" />
                  <button onClick={fetchWeatherData} className="px-4 py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-md hover:opacity-90 transition-opacity">
                    Search
                  </button>
                </div>
              </div>
              
              {weatherLoading && <div className="flex justify-center items-center py-10">
                  <div className="animate-spin h-8 w-8 border-4 border-[#2C5AAE] border-t-transparent rounded-full"></div>
                </div>}
              
              {weatherError && <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
                  {weatherError}
                </div>}
              
              {!weatherLoading && weatherData && <div className="flex flex-col gap-6">
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-[#2C5AAE]">{weatherData.location.name}</h2>
                        <p className="text-gray-500">{weatherData.location.country}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Local time</p>
                        <p className="font-semibold">{weatherData.location.localtime.split(' ')[1]}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center my-4">
                      <img src={weatherData.current.condition.icon.replace('64x64', '128x128')} alt={weatherData.current.condition.text} className="h-24 w-24" />
                    </div>
                    
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-[#2C5AAE]">{weatherData.current.temp_c}°C</div>
                      <div className="text-gray-600 mt-1">{weatherData.current.condition.text}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/60 p-3 rounded-lg">
                        <p className="text-gray-500">Feels like</p>
                        <p className="font-semibold">{weatherData.current.feelslike_c}°C</p>
                      </div>
                      <div className="bg-white/60 p-3 rounded-lg">
                        <p className="text-gray-500">Humidity</p>
                        <p className="font-semibold">{weatherData.current.humidity}%</p>
                      </div>
                      <div className="bg-white/60 p-3 rounded-lg">
                        <p className="text-gray-500">Wind</p>
                        <p className="font-semibold">{weatherData.current.wind_kph} km/h</p>
                      </div>
                      <div className="bg-white/60 p-3 rounded-lg">
                        <p className="text-gray-500">UV Index</p>
                        <p className="font-semibold">{weatherData.current.uv}</p>
                      </div>
                    </div>
                  </div>
                  
                  
                  {forecastData && <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                      <h3 className="font-semibold text-[#2C5AAE] mb-4">5-Day Forecast</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                        {forecastData.forecast.forecastday.map((day: any) => <div key={day.date} className="bg-gray-50 rounded-lg p-3 text-center">
                            <p className="font-medium text-gray-700">{formatDate(day.date)}</p>
                            <img src={day.day.condition.icon} alt={day.day.condition.text} className="mx-auto my-2 w-12 h-12" />
                            <div className="flex justify-between items-center px-2">
                              <span className="text-blue-600 font-medium">{Math.round(day.day.mintemp_c)}°</span>
                              <span className="text-gray-400">|</span>
                              <span className="text-red-500 font-medium">{Math.round(day.day.maxtemp_c)}°</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 truncate" title={day.day.condition.text}>
                              {day.day.condition.text}
                            </p>
                            <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
                              <div className="flex items-center justify-center gap-1">
                                <Droplets className="h-3 w-3 text-blue-400" />
                                <span>{day.day.daily_chance_of_rain}%</span>
                              </div>
                              <div className="flex items-center justify-center gap-1">
                                <Wind className="h-3 w-3 text-gray-400" />
                                <span>{Math.round(day.day.maxwind_kph)} km/h</span>
                              </div>
                            </div>
                          </div>)}
                      </div>
                    </div>}
                  
                  
                  <div className="bg-white rounded-xl p-6 flex-1 border border-gray-100">
                    <h3 className="font-semibold text-[#2C5AAE] mb-4">Popular Cities</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Dubai', 'Tel Aviv', 'Berlin'].map(city => <button key={city} onClick={() => setWeatherCity(city)} className={`p-3 rounded-md text-center transition-colors ${weatherCity === city ? 'bg-blue-50 text-[#2C5AAE] font-medium' : 'hover:bg-gray-50'}`}>
                          {city}
                        </button>)}
                    </div>
                  </div>
                </div>}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
export default TimeAndCurrencyContent;