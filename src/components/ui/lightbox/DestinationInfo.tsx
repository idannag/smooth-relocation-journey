
interface DestinationInfoProps {
  city: string;
}

const DestinationInfo = ({ city }: DestinationInfoProps) => {
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
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 max-w-4xl mx-auto h-full overflow-y-auto">
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

export default DestinationInfo;
