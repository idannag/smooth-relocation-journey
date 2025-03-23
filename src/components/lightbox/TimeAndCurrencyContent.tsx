
import React, { useEffect } from 'react';
import { Clock, CreditCard } from 'lucide-react';

const TimeAndCurrencyContent = () => {
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
  
  return (
    <div className="p-4 md:p-6 flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-4xl">
        {/* World Time Section */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-[#2C5AAE]" />
            <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">World Time</h3>
          </div>
          
          <div className="flex justify-center mb-4">
            <iframe 
              src="https://free.timeanddate.com/clock/i8v1bmgo/n110/szw180/szh180/hoc000/hbw6/cf100/hgr0" 
              frameBorder="0" 
              width="180" 
              height="180"
              className="mx-auto"
              title="World Clock"
            ></iframe>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm bg-gray-50 p-3 rounded-lg">
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
        
        {/* Currency Converter Section */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-[#2C5AAE]" />
            <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">Currency Converter</h3>
          </div>
          
          <iframe 
            src="https://themoneyconverter.com/MoneyConverter?from=USD&to=EUR&amount=1" 
            frameBorder="0"
            width="100%"
            height="280"
            className="mx-auto rounded-lg overflow-hidden border border-gray-200"
            title="Currency Converter"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TimeAndCurrencyContent;
