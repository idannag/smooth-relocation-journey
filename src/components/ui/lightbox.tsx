import LatestArticles from "@/components/LatestArticles";
import { Globe, Clock, ShoppingCart, Headphones } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

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

// Service Request Form
const ServiceRequestForm = ({ service, onClose }: { service: string, onClose: () => void }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(5, { message: "Please enter a valid phone number." }),
    message: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('service', service);
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('message', values.message || '');
      formData.append('timestamp', new Date().toISOString());
      
      const response = await fetch('https://script.google.com/macros/s/AKfycbwPLu4d_ZwUPU-BwueoRCMTaD792rUuwiLURnHmD0S4I13GXP_IpHyP21RoHm7-C6n7/exec', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      
      const subject = `Service Request: ${service}`;
      const body = `
Name: ${values.name}
Email: ${values.email}
Phone: ${values.phone}
Service: ${service}
Message: ${values.message || 'No additional message.'}
      `;
      const mailtoLink = `mailto:sales@ocean-il.co.il?cc=shlomit.drenger@ocean-il.co.il&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink, '_blank');
      
      toast({
        title: "Request Submitted",
        description: "Your service request has been sent successfully!",
        variant: "default",
      });
      
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-bold text-[#2C5AAE] mb-4">Request {service}</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 234 567 8900" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please provide any additional details about your request"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-md disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin h-4 w-4" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

// Services Component for the Lightbox
const Services = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  
  const availableServices = [
    {
      id: "SRV-001",
      service: "Taxes – Filing & Advisory",
      description: "Filing tax reports and providing tax consultation for returning residents."
    },
    {
      id: "SRV-002",
      service: "Shipping & Logistics",
      description: "Handling international and domestic shipping, including customs and delivery."
    },
    {
      id: "SRV-003",
      service: "Property Search – Temporary, Rental & Purchase",
      description: "Finding suitable housing for short-term stays, rentals, or purchases."
    },
    {
      id: "SRV-004",
      service: "Tools for Coping with Change – Expert Psychologist",
      description: "Providing practical tools and guidance from a specialist to manage transitions."
    },
    {
      id: "SRV-005",
      service: "Storage Solutions",
      description: "Secure short-term and long-term storage options for personal and household items."
    }
  ];

  const handleOrderService = (service: string) => {
    setSelectedService(service);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedService("");
  };

  if (showForm) {
    return <ServiceRequestForm service={selectedService} onClose={closeForm} />;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 sm:p-4 max-w-4xl mx-auto h-full overflow-y-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
        My Services
      </h2>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableServices.map((service, index) => (
            <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#2C5AAE]">{service.service}</h3>
                  <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                  <button 
                    onClick={() => handleOrderService(service.service)}
                    className="w-full mt-4 py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-md text-sm hover:opacity-90 transition-opacity"
                  >
                    Order Service
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="px-6 py-4 bg-gray-50">
          <button 
            onClick={() => handleOrderService("Custom Service")}
            className="w-full py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-md font-medium hover:opacity-95 transition-opacity"
          >
            Request Custom Service
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom AI Assistant
const CustomAIAssistant = () => {
  return (
    <div className="h-full w-full bg-white flex flex-col">
      <div className="p-4 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white">
        <h2 className="text-xl font-bold text-center">My 24/7 AI Assistant</h2>
      </div>
      <div className="flex-grow w-full h-[calc(100%-60px)]">
        <iframe 
          src="https://chatgpt.com/g/g-67b6c40963908191b77e23c6fecc2e57-relocation-ai-24-7-assistant" 
          className="w-full h-full border-0"
          title="AI Assistant"
          allow="microphone; camera; fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation allow-storage-access-by-user-activation"
        />
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
  const articleContent = {
    title: title,
    date: "May 15, 2023",
    author: "Ocean Relocation Team",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.</p>
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
                 index === 4 ? "Financial Planning for Expats" : 
                 index === 5 ? "Cultural Adaptation Strategies" : 
                 "Healthcare Systems Comparison"}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Essential information to help make your relocation journey smoother and more successful.
              </p>
              <button className="text-sm font-medium text-[#2C5AAE] hover:underline">
                Read Guide →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Lightbox Component
const Lightbox = ({ url, onClose }: LightboxProps) => {
  const isMobile = useIsMobile();
  
  const renderContent = () => {
    if (url === 'news') return <NewsContent />;
    if (url === 'guides') return <GuidesContent />;
    if (url === 'chatbot') return <CustomAIAssistant />;
    if (url === 'services') return <Services />;
    if (url === 'time') return <TimeAndCurrencyConverter />;
    
    if (url.startsWith('destination:')) {
      const city = url.split(':')[1];
      return <DestinationInfo city={city} />;
    }
    
    if (url.startsWith('article:')) {
      const title = url.split(':')[1];
      return <ArticleDetail title={title} />;
    }
    
    return (
      <div className="flex items-center justify-center h-full">
        <iframe 
          src={url} 
          className="w-full h-full border-0"
          title="External Content"
          allow="microphone; camera; fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation allow-storage-access-by-user-activation"
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="relative bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] h-[90vh] flex flex-col">
        <div className="absolute right-2 top-2 z-10">
          <button
            onClick={onClose}
            className="bg-white/10 backdrop-blur-sm text-gray-800 hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
