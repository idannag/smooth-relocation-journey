
import React, { useEffect, useState } from 'react';
import { Clock, Globe, ArrowRightLeft, Check } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TimeAndCurrencyContent = () => {
  // Time-related state and functions
  useEffect(() => {
    // Update city times on component mount
    updateCityTimes();
    
    // Set up interval to update times every minute
    const intervalId = setInterval(updateCityTimes, 60000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);
  
  const updateCityTimes = () => {
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    };
    
    // Get current time
    const now = new Date();
    
    // New York (UTC-5/UTC-4)
    const nyTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    document.getElementById('ny-time')!.textContent = formatTime(nyTime);
    
    // London (UTC+0/UTC+1)
    const londonTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }));
    document.getElementById('ldn-time')!.textContent = formatTime(londonTime);
    
    // Tokyo (UTC+9)
    const tokyoTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
    document.getElementById('tk-time')!.textContent = formatTime(tokyoTime);
    
    // Sydney (UTC+10/UTC+11)
    const sydneyTime = new Date(now.toLocaleString('en-US', { timeZone: 'Australia/Sydney' }));
    document.getElementById('sy-time')!.textContent = formatTime(sydneyTime);
  };

  // Currency converter state and functions
  const [amount, setAmount] = useState<string>("2");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [result, setResult] = useState<string>("");
  const [exchangeRates, setExchangeRates] = useState<{[key: string]: number}>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  ];

  useEffect(() => {
    // Fetch exchange rates on component mount
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
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
        // Convert to USD first (base currency), then to target currency
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
    
    setIsLoading(false);
  };

  return (
    <div className="p-4 md:p-6 flex flex-col items-center">
      <div className="w-full max-w-md">
        <Tabs defaultValue="currency" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 w-full">
            <TabsTrigger value="time" className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              <span>World Time</span>
            </TabsTrigger>
            <TabsTrigger value="currency" className="flex items-center justify-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Currency Converter</span>
            </TabsTrigger>
          </TabsList>
          
          {/* World Time Tab Content */}
          <TabsContent value="time" className="mt-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex justify-center mb-6 pt-6">
                <iframe 
                  src="https://free.timeanddate.com/clock/i8v1bmgo/n110/szw180/szh180/hoc000/hbw6/cf100/hgr0" 
                  frameBorder="0" 
                  width="180" 
                  height="180"
                  className="mx-auto"
                  title="World Clock"
                ></iframe>
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded-b-lg">
                <div className="flex flex-col">
                  <span className="font-medium text-[#2C5AAE]">New York:</span>
                  <span id="ny-time" className="text-gray-700">-</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-[#2C5AAE]">London:</span>
                  <span id="ldn-time" className="text-gray-700">-</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-[#2C5AAE]">Tokyo:</span>
                  <span id="tk-time" className="text-gray-700">-</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-[#2C5AAE]">Sydney:</span>
                  <span id="sy-time" className="text-gray-700">-</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Currency Converter Tab Content */}
          <TabsContent value="currency" className="mt-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6">
              <h3 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
                Global Tools
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
                        {currencies.map((currency) => (
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
                        {currencies.map((currency) => (
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
                  disabled={isLoading}
                  className="w-full py-2 px-4 rounded-md bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  {isLoading ? (
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
        </Tabs>
      </div>
    </div>
  );
};

export default TimeAndCurrencyContent;
